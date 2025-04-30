use starknet::ContractAddress;

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts for Cairo ^0.20.0
pub const INITIAL_SUPPLY: u256 = 0; // initial supply

const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");
const BURNER_ROLE: felt252 = selector!("BURNER_ROLE");
const PAUSER_ROLE: felt252 = selector!("PAUSER_ROLE");

#[starknet::interface]
pub trait IMintable<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
    fn grant_minter_role(ref self: TContractState, minter: ContractAddress);
    fn revoke_minter_role(ref self: TContractState, minter: ContractAddress);
    fn set_minter_allowance(ref self: TContractState, minter: ContractAddress, allowance: u256);
    fn get_minter_allowance(self: @TContractState, minter: ContractAddress) -> u256;
    fn get_authorized_minters(self: @TContractState) -> Array<ContractAddress>;
}

#[starknet::interface]
pub trait IBurnable<TContractState> {
    fn burn(ref self: TContractState, amount: u256);
    fn burn_from(ref self: TContractState, account: ContractAddress, amount: u256);
    fn grant_burner_role(ref self: TContractState, burner: ContractAddress);
    fn revoke_burner_role(ref self: TContractState, burner: ContractAddress);
    fn set_burner_allowance(ref self: TContractState, burner: ContractAddress, allowance: u256);
    fn get_burner_allowance(self: @TContractState, burner: ContractAddress) -> u256;
    fn get_authorized_burners(self: @TContractState) -> Array<ContractAddress>;
}

#[starknet::contract]
pub mod StarkPlayERC20 {
    use openzeppelin_access::accesscontrol::AccessControlComponent;
    use openzeppelin_access::accesscontrol::DEFAULT_ADMIN_ROLE;
    use openzeppelin_introspection::interface::{ISRC5Dispatcher, ISRC5DispatcherTrait};
    use openzeppelin_introspection::src5::SRC5Component;
    use openzeppelin_security::PausableComponent;
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use openzeppelin_upgrades::UpgradeableComponent;
    use openzeppelin_upgrades::interface::IUpgradeable;
    use starknet::storage::{Map, StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ClassHash, ContractAddress, get_caller_address};
    use super::{BURNER_ROLE, IBurnable, IMintable, MINTER_ROLE};

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: PausableComponent, storage: pausable, event: PausableEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl PausableImpl = PausableComponent::PausableImpl<ContractState>;
    #[abi(embed_v0)]
    impl AccessControlMixinImpl =
        AccessControlComponent::AccessControlMixinImpl<ContractState>;


    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
    impl PausableInternalImpl = PausableComponent::InternalImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
        minter_allowance: Map<ContractAddress, u256>,
        burner_allowance: Map<ContractAddress, u256>,
        minters: Map<u256, ContractAddress>,
        burners: Map<u256, ContractAddress>,
        minters_count: u256,
        burners_count: u256,
        minter_index: Map<ContractAddress, u256>,
        burner_index: Map<ContractAddress, u256>,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Burn {
        #[key]
        pub burner: ContractAddress,
        #[key]
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Mint {
        #[key]
        pub recipient: ContractAddress,
        #[key]
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MinterAllowanceSet {
        #[key]
        pub minter: ContractAddress,
        #[key]
        pub allowance: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct BurnerAllowanceSet {
        #[key]
        pub burner: ContractAddress,
        #[key]
        pub allowance: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
        Burn: Burn,
        Mint: Mint,
        MinterAllowanceSet: MinterAllowanceSet,
        BurnerAllowanceSet: BurnerAllowanceSet,
    }

    #[constructor]
    fn constructor(ref self: ContractState, recipient: ContractAddress, admin: ContractAddress) {
        self.erc20.initializer("$tarkPlay", "STARKP");
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, admin);
        // this is not minting any token initially
    //self.erc20.mint(recipient, INITIAL_SUPPLY);
    }

    #[abi(embed_v0)]
    impl MintableImpl of IMintable<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            self.pausable.assert_not_paused();
            let caller = get_caller_address();
            self.accesscontrol.assert_only_role(MINTER_ROLE);
            let allowance = self.minter_allowance.read(caller);
            assert(allowance >= amount, 'Insufficient minter allowance');
            self.minter_allowance.write(caller, allowance - amount);
            self.erc20.mint(recipient, amount);
            self.emit(Mint { recipient, amount });
        }

        fn grant_minter_role(ref self: ContractState, minter: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            assert(is_contract(minter), 'Minter must be a contract');
            self.accesscontrol._grant_role(MINTER_ROLE, minter);
            let index = self.minters_count.read();
            self.minters.write(index, minter);
            self.minter_index.write(minter, index);
            self.minters_count.write(index + 1);
        }

        fn revoke_minter_role(ref self: ContractState, minter: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol._revoke_role(MINTER_ROLE, minter);
            let index = self.minter_index.read(minter);
            let last_index = self.minters_count.read() - 1;
            if index != last_index {
                let last_minter = self.minters.read(last_index);
                self.minters.write(index, last_minter);
                self.minter_index.write(last_minter, index);
            }
            self.minters.write(last_index, zero_address_const());
            self.minter_index.write(minter, 0);
            self.minters_count.write(last_index);
        }

        fn set_minter_allowance(ref self: ContractState, minter: ContractAddress, allowance: u256) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.minter_allowance.write(minter, allowance);
            self.emit(MinterAllowanceSet { minter, allowance });
        }

        fn get_minter_allowance(self: @ContractState, minter: ContractAddress) -> u256 {
            self.minter_allowance.read(minter)
        }

        fn get_authorized_minters(self: @ContractState) -> Array<ContractAddress> {
            let mut minters = ArrayTrait::new();
            let count = self.minters_count.read();
            let mut i = 0;
            while i < count {
                minters.append(self.minters.read(i));
                i += 1;
            };
            minters
        }
    }

    #[abi(embed_v0)]
    impl BurnableImpl of IBurnable<ContractState> {
        fn burn(ref self: ContractState, amount: u256) {
            self.pausable.assert_not_paused();

            let burner = get_caller_address();
            self.accesscontrol.assert_only_role(BURNER_ROLE);
            let allowance = self.burner_allowance.read(burner);
            assert(allowance >= amount, 'Insufficient burner allowance');
            self.burner_allowance.write(burner, allowance - amount);
            self.erc20.burn(burner, amount);
            self.emit(Burn { burner, amount });
        }

        fn burn_from(ref self: ContractState, account: ContractAddress, amount: u256) {
            let caller = get_caller_address();
            self.accesscontrol.assert_only_role(BURNER_ROLE);
            let allowance = self.burner_allowance.read(caller);
            assert(allowance >= amount, 'Insufficient burner allowance');
            self.burner_allowance.write(caller, allowance - amount);
            self.erc20.burn(account, amount);
            self.emit(Burn { burner: account, amount });
        }

        fn grant_burner_role(ref self: ContractState, burner: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            assert(is_contract(burner), 'Burner must be a contract');
            self.accesscontrol._grant_role(BURNER_ROLE, burner);
            let index = self.burners_count.read();
            self.burners.write(index, burner);
            self.burner_index.write(burner, index);
            self.burners_count.write(index + 1);
        }

        fn revoke_burner_role(ref self: ContractState, burner: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol._revoke_role(BURNER_ROLE, burner);
            let index = self.burner_index.read(burner);
            let last_index = self.burners_count.read() - 1;
            if index != last_index {
                let last_burner = self.burners.read(last_index);
                self.burners.write(index, last_burner);
                self.burner_index.write(last_burner, index);
            }
            self.burners.write(last_index, zero_address_const());
            self.burner_index.write(burner, 0);
            self.burners_count.write(last_index);
        }

        fn set_burner_allowance(ref self: ContractState, burner: ContractAddress, allowance: u256) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.burner_allowance.write(burner, allowance);
            self.emit(BurnerAllowanceSet { burner, allowance });
        }

        fn get_burner_allowance(self: @ContractState, burner: ContractAddress) -> u256 {
            self.burner_allowance.read(burner)
        }

        fn get_authorized_burners(self: @ContractState) -> Array<ContractAddress> {
            let mut burners = ArrayTrait::new();
            let count = self.burners_count.read();
            let mut i = 0;
            while i < count {
                burners.append(self.burners.read(i));
                i += 1;
            };
            burners
        }
    }

    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.upgradeable.upgrade(new_class_hash);
        }
    }

    fn is_contract(address: ContractAddress) -> bool {
        // Avoid zero address
        if address == zero_address_const() {
            return false;
        }
        // Check if the address supports the SRC5 interface
        let src5_dispatcher = ISRC5Dispatcher { contract_address: address };
        let src5_interface_id: felt252 =
            0x3f918d17e5ee77373b56385708f855659a07f75997f365cf8774862850866d; // replace with the actual interface ID
        src5_dispatcher.supports_interface(src5_interface_id)
    }

    fn zero_address_const() -> ContractAddress {
        '0x0'.try_into().unwrap()
    }
}
