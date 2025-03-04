use contracts::LotteryERC20::LotteryERC20;
use contracts::LotteryERC20::LotteryERC20::{Burn, Mint};
use contracts::LotteryERC20::{
    IBurnableDispatcher, IBurnableDispatcherTrait, IMintableDispatcher, IMintableDispatcherTrait,
    INITIAL_SUPPLY,
};
use openzeppelin_token::erc20::erc20::ERC20Component;
use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use openzeppelin_utils::serde::SerializedAppend;
use snforge_std::{
    CheatSpan, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait,
    cheat_caller_address, declare, spy_events,
};
use starknet::{ContractAddress, contract_address_const};


fn owner() -> ContractAddress {
    contract_address_const::<'owner'>()
}

fn recipient() -> ContractAddress {
    contract_address_const::<'recipient'>()
}

fn alice() -> ContractAddress {
    contract_address_const::<'alice'>()
}

fn bob() -> ContractAddress {
    contract_address_const::<'bob'>()
}

fn deploy_erc20(recipient: ContractAddress, owner: ContractAddress) -> ContractAddress {
    let contract_class = declare("LotteryERC20").unwrap().contract_class();
    let mut calldata = array![];
    calldata.append_serde(recipient);
    calldata.append_serde(owner);
    let (contract_address, _) = contract_class.deploy(@calldata).unwrap();
    contract_address
}

#[test]
fn test_mint_at_deploy() {
    let owner = owner();
    let recipient = recipient();
    let contract_address = deploy_erc20(recipient, owner);

    let dispatcher = IERC20Dispatcher { contract_address };

    let balance = dispatcher.balance_of(recipient);
    assert(balance == INITIAL_SUPPLY, 'Wrong balance for recipient');
    let balance = dispatcher.balance_of(owner);
    assert(balance == 0, 'Wrong balance for owner');
}

#[test]
fn test_owner_can_mint() {
    let owner = owner();
    let recipient = recipient();
    let alice = contract_address_const::<'alice'>();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let previous_balance = erc20.balance_of(owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(owner, amount);
    let balance = erc20.balance_of(owner);
    assert(balance - previous_balance == amount, 'Wrong amount after mint');

    let previous_balance = erc20.balance_of(alice);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, amount);
    let balance = erc20.balance_of(alice);
    assert(balance - previous_balance == amount, 'Wrong amount after mint');
}

#[test]
#[should_panic(expected: 'Caller is not the owner')]
fn test_only_owner_can_mint() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let contract_address = deploy_erc20(recipient, owner);

    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, 1000);
}

#[test]
fn test_supply_is_updated_after_mint() {
    let owner = owner();
    let recipient = recipient();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let previous_supply = erc20.total_supply();
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(owner, amount);
    let supply = erc20.total_supply();
    assert(supply - previous_supply == amount, 'Wrong supply after mint');
}

#[test]
fn test_mint_emit_event() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let mut spy = spy_events();
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, amount);
    spy
        .assert_emitted(
            @array![
                (contract_address, LotteryERC20::Event::Mint(Mint { recipient: alice, amount })),
            ],
        );
}

#[test]
fn test_user_can_burn() {
    let owner = owner();
    let recipient = recipient();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let previous_balance = erc20.balance_of(recipient);
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    IBurnableDispatcher { contract_address }.burn(amount);
    let balance = erc20.balance_of(recipient);
    assert(previous_balance - balance == amount, 'Wrong amount after burn');
}

#[test]
fn test_burn_emit_event() {
    let owner = owner();
    let recipient = recipient();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let mut spy = spy_events();
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    IBurnableDispatcher { contract_address }.burn(amount);
    spy
        .assert_emitted(
            @array![
                (contract_address, LotteryERC20::Event::Burn(Burn { burner: recipient, amount })),
            ],
        );
}

#[test]
fn test_supply_is_updated_after_burn() {
    let owner = owner();
    let recipient = recipient();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let previous_supply = erc20.total_supply();
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    IBurnableDispatcher { contract_address }.burn(amount);
    let supply = erc20.total_supply();
    assert(previous_supply - supply == amount, 'Wrong supply after burn');
}

#[test]
#[should_panic(expected: 'ERC20: insufficient balance')]
fn test_user_cant_burn_more_than_balance() {
    let owner = owner();
    let recipient = recipient();
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let balance = erc20.balance_of(recipient);
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    IBurnableDispatcher { contract_address }.burn(balance + 1);
}

#[test]
fn test_transfer() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let previous_balance = erc20.balance_of(recipient);
    let previous_balance_alice = erc20.balance_of(alice);
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer(alice, amount);
    let balance = erc20.balance_of(recipient);
    assert(previous_balance - balance == amount, 'Wrong amount after transfer');
    let balance = erc20.balance_of(alice);
    assert(balance - previous_balance_alice == amount, 'Wrong amount after transfer');
}


#[test]
fn test_transfer_emit_event() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let mut spy = spy_events();
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer(alice, amount);
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    ERC20Component::Event::Transfer(
                        ERC20Component::Transfer { from: recipient, to: alice, value: amount },
                    ),
                ),
            ],
        );
}

#[test]
#[should_panic(expected: 'ERC20: insufficient balance')]
fn test_transfer_not_enough_balance() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let balance = erc20.balance_of(recipient);
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer(alice, balance + 1);
}

#[test]
fn test_transfer_from() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let bob = bob();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, 2 * amount);

    let erc20 = IERC20Dispatcher { contract_address };
    let previous_balance_alice = erc20.balance_of(alice);
    let previous_balance_bob = erc20.balance_of(bob);

    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, amount);

    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer_from(alice, bob, amount);

    let balance_alice = erc20.balance_of(alice);
    let balance_bob = erc20.balance_of(bob);
    assert(previous_balance_alice - balance_alice == amount, 'Wrong amount after transfer');
    assert(balance_bob - previous_balance_bob == amount, 'Wrong amount after transfer');
}

#[test]
fn test_transfer_from_emit_event() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let bob = bob();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, 2 * amount);

    let erc20 = IERC20Dispatcher { contract_address };
    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, amount);

    let mut spy = spy_events();
    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer_from(alice, bob, amount);
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    ERC20Component::Event::Transfer(
                        ERC20Component::Transfer { from: alice, to: bob, value: amount },
                    ),
                ),
            ],
        );
}

#[test]
#[should_panic(expected: 'ERC20: insufficient allowance')]
fn test_transfer_from_not_enough_allowance() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let bob = bob();
    let amount = 1000;
    let allowed_amount = amount - 1;
    let contract_address = deploy_erc20(recipient, owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, amount);

    let erc20 = IERC20Dispatcher { contract_address };
    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, allowed_amount);

    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer_from(alice, bob, amount);
}

#[test]
#[should_panic(expected: 'ERC20: insufficient balance')]
fn test_transfer_from_not_enough_balance() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let bob = bob();
    let amount = 1000;
    let transfer_amount = amount + 1;
    let contract_address = deploy_erc20(recipient, owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, amount);

    let erc20 = IERC20Dispatcher { contract_address };
    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, transfer_amount);

    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer_from(alice, bob, transfer_amount);
}
#[test]
fn test_allowance() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let allowance = erc20.allowance(alice, recipient);
    assert(allowance == 0, 'Wrong allowance');
    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, amount);
    let allowance = erc20.allowance(alice, recipient);
    assert(allowance == amount, 'Wrong allowance');
}

#[test]
fn test_allowance_is_updated_after_transfer_from() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let bob = bob();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    cheat_caller_address(contract_address, owner, CheatSpan::TargetCalls(1));
    IMintableDispatcher { contract_address }.mint(alice, 2 * amount);

    let erc20 = IERC20Dispatcher { contract_address };

    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, amount);
    let previous_allowance = erc20.allowance(alice, recipient);

    cheat_caller_address(contract_address, recipient, CheatSpan::TargetCalls(1));
    erc20.transfer_from(alice, bob, amount);

    let allowance = erc20.allowance(alice, recipient);

    assert(previous_allowance - allowance == amount, 'Wrong allowance after transfer');
}

#[test]
fn test_approve_emit_event() {
    let owner = owner();
    let recipient = recipient();
    let alice = alice();
    let amount = 1000;
    let contract_address = deploy_erc20(recipient, owner);
    let erc20 = IERC20Dispatcher { contract_address };
    let mut spy = spy_events();
    cheat_caller_address(contract_address, alice, CheatSpan::TargetCalls(1));
    erc20.approve(recipient, amount);
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    ERC20Component::Event::Approval(
                        ERC20Component::Approval {
                            owner: alice, spender: recipient, value: amount,
                        },
                    ),
                ),
            ],
        );
}
