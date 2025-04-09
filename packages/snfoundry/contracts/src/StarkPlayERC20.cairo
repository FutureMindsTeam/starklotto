use starknet::ContractAddress;

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts for Cairo ^0.20.0
pub const INITIAL_SUPPLY: u256 = 0; // initial supply

#[starknet::interface]
pub trait IMintable<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
}

#[starknet::interface]
pub trait IBurnable<TContractState> {
    fn burn(ref self: TContractState, amount: u256);
}

#[starknet::contract]
pub mod StarkPlayERC20 {
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use openzeppelin_upgrades::UpgradeableComponent;
    use openzeppelin_upgrades::interface::IUpgradeable;
    use starknet::{ClassHash, ContractAddress, get_caller_address};

    use super::{IBurnable, IMintable, INITIAL_SUPPLY};
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);


    // External
    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;

    // Internal
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
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

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
        Burn: Burn,
        Mint: Mint,
    }

    #[constructor]
    fn constructor(ref self: ContractState, recipient: ContractAddress, owner: ContractAddress) {
        self.erc20.initializer("$tarkPlay", "STARKP");
        self.ownable.initializer(owner);
        
        // this is not minting any token initially
        //self.erc20.mint(recipient, INITIAL_SUPPLY);
    }

    #[abi(embed_v0)]
    impl MintableImpl of IMintable<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
           //TODO: security, add authorized addresses like vault contract
            self.ownable.assert_only_owner();
            self.erc20.mint(recipient, amount);
            self.emit(Mint { recipient, amount });
        }
    }

    #[abi(embed_v0)]
    impl BurnableImpl of IBurnable<ContractState> {
        fn burn(ref self: ContractState, amount: u256) {
            //TODO: security, add authorized addresses like vault contract
            let burner = get_caller_address();
            self.erc20.burn(burner, amount);
            self.emit(Burn { burner, amount });
        }
    }

    //
    // Upgradeable
    //

    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }
}