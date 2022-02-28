import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';
// import { MS,INIT } from "../smart-contracts/michelson";
import { MS,INIT } from "../../../smart-contract/michelson";

const provider = 'https://hangzhounet.smartpy.io/';
async function deploy() {
    const tezos = new TezosToolkit(provider);
    await importKey(
      tezos,
      "qcpqedqq.bgoxbsct@teztnets.xyz", //mail
      "oCuMptn7sq", //password
      [           
        "jacket",  //passphrase
		"fire",
		"sample",
		"filter",
		"there",
		"ship",
		"pistol",
		"swarm",
		"infant",
		"sand",
		"degree",
		"replace",
		"soup",
		"gossip",
		"hood"
      ].join(' '),
      "57a58ba2e1cfa419ea4c4e7636b47e2ffd1e3527"  //private key
    );
    
    try {
        const op = await tezos.contract.originate({
          //smart contract code
          // code: MS,
          code: `{ parameter (or (or (unit %get_details) (pair %update_details (pair (pair (pair (int %id) (option %new_category string)) (pair (option %new_controller address) (option %new_createdAt string))) (pair (pair (option %new_description string) (option %new_manufacturedIn string)) (pair (option %new_model string) (option %new_name string)))) (option %new_profile bytes))) (pair %update_owner (pair (pair (int %id) (string %new_category)) (pair (string %new_createdAt) (string %new_description))) (pair (pair (string %new_manufacturedIn) (string %new_model)) (pair (string %new_name) (address %new_owner))))) ; storage (pair (big_map %identities int (pair (pair (pair (pair (string %category) (address %controller)) (pair (string %createdAt) (string %description))) (pair (pair (string %manufacturedIn) (string %model)) (pair (string %name) (address %owner)))) (bytes %profile))) (int %next_id)) ; code { UNPAIR ; IF_LEFT { IF_LEFT { DROP } { SWAP ; PUSH mutez 0 ; AMOUNT ; COMPARE ; NEQ ; IF { PUSH string "Updating details doesn't cost anything." ; FAILWITH } {} ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CDR ; SENDER ; COMPARE ; NEQ ; AND ; IF { PUSH string "You are not the owner or controller of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DIG 2 ; DUP 5 ; CDR ; IF_NONE { DUP 3 ; CDR } {} ; DUP 4 ; CAR ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DIG 7 ; CAR ; CAR ; CDR ; CAR ; IF_NONE { DUP 6 ; CAR ; CAR ; CAR ; CDR } {} ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } } { DUP ; DUG 2 ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; IF { PUSH string "You are not the owner of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DUG 2 ; DUP ; DUG 3 ; CDR ; DIG 5 ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 6 ; CAR ; CAR ; CAR ; CDR ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } ; NIL operation ; PAIR } }`,
          //storage state
          // init: INIT,
          init: `(Pair { Elt 1 (Pair (Pair (Pair (Pair "newly" "tz1KmAMKKFS9HzGZHvEqyJWhYF4pjqnSQ6av") "02/25/2022" "this is for testing") (Pair "01/02/2021" "testing") "aman" "tz1KmAMKKFS9HzGZHvEqyJWhYF4pjqnSQ6av") 0x0501000000026869) } 2)`,
        })
    
        //beginning to deploy
        console.log('Awaiting confirmation...')
        const contract = await op.contract()
        //deployment report: amount of used gas, storage state
        console.log('Gas Used', op.consumedGas)
        console.log('Storage', await contract.storage())
        //operation hash one can use to find the contract in the explorer
        console.log('Operation hash:', op.hash)
      } catch (ex) {
        console.error(ex)
      }
    }

deploy();