import {Injectable} from '@angular/core';
import contract from 'truffle-contract';
import {Subject, Observable, observable} from 'rxjs';
import { Factory, League } from '../shared/address';
import { ObserversModule } from '@angular/cdk/observers';

declare let require: any;
const Web3 = require('web3');
// const web3= Web3();


declare let window: any;
let account : string;
let factoryJson = require('../../../build/contracts/LeagueFactory.json');
let leagueJson = require('../../../build/contracts/League.json')

@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  private account: string;
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    // window.addEventListener('load', (event) => {
     this.checkAndInstatiateWeb3();
      this.checkMetamask();
      this.getSingleAccount();
     

    // });
  }
  checkAndInstatiateWeb3 = () => {
    // console.log('what is in json??' , campaignFactory)
     // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {


      console.warn(
       'using metamsk detected'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(Web3.givenProvider);
      // account = this.getCoinBaseHere();
      // console.log('coinbase ', account)
      return this.web3;
    } else {

      // const provider = new Web3.providers.HttpProvider(
      //   'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
      // );
      // this.web3 = new Web3(provider);
      console.warn(
        'No web3 detected'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      // needs to be changed to better fall back plan
      // this.web3 = new Web3();

      return null;
    }

  }

  checkMetamask():Observable<any>{
    return Observable.create(observer=>{
      if(typeof window.web3 !== 'undefined'){ //web 3 installed
        // let accounts = this.getCoinBaseHere()
        console.log('what is in accounts? ', account)

        if(account){ // if account is unlocked return 2

          observer.next(2)
          observer.complete()

        }else{
          observer.next(1)// no web3 installed
          observer.complete()

        }


      }else{
        observer.next(3)
        observer.complete()
      }

    })

  }
  getCoinBase():Observable<any>{
    console.log('calling get accounts')
    return Observable.create(observer=>{
      this.web3.eth.getAccounts((err, resp)=>{
        if(err) observer.next(err)
        observer.next(resp[0])
        observer.complete()
      })
    })
  }

 getSingleAccount(){
 this.web3.eth.getAccounts((err, resp)=>{
   account = resp[0];
  })
 }

 signTransaction(nonce):Observable<any>{
  // nounce= this.web3.utils.toHex( nounce.challenge)
  console.log('received ', nonce)

  let nonceValue = nonce.nonce
  console.log('signing nounce ', nonceValue)

  let from = account
  
   
   return Observable.create(observer=>{
  
  
    this.web3.eth.personal.sign(this.web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonceValue}`), from,(err, result)=>{
		
      if(err){ console.log('error signing the token');
            observer.next(err)}
            else{
              console.log('SIGNED ', result)
              let signedObject={
                nonce: nonceValue,
                sign: result
              }
            observer.next(signedObject)
            observer.complete()
            }
    })

   })
 }

 // create contract instance
 createContractInstance(addr, contractJson){
   let instance;
   let abi =contractJson.abi;
   instance = new this.web3.eth.Contract(abi, addr);
   console.log("TCL: createContractInstance -> instance ", instance )
   return instance
}
// all depolyed getLeagues

getAllLeagues(account, addr, gasToUse):Observable<any>{
  return Observable.create(observer=>{
    let instance = this.createContractInstance(addr, factoryJson);
    let transactionObject = {
      from: account,
      gas: gasToUse
    }
    instance.methods.GetAllLeagues().call(transactionObject, (err, result) => {
      if (err) {
        
        observer.error(err)
      } else {

        observer.next(result);
        observer.complete()
      }

    })

  })

}
//get all comeptions in this weeks league
getAllCompetions(account, addr, gasToUse):Observable<any>{
  console.log('getting')
  return Observable.create(observer=>{
    let instance = this.createContractInstance(addr, leagueJson);
		console.log("TCL: instance", instance)
    
    let transactionObject = {
      from: account,
      gas: gasToUse
    }
  
    instance.methods.getCompetitionCount().call(transactionObject,(err, result)=>{
		  let compe =[];	
      if(err) throw err;
      if(result<1){
        console.log('no competitions in this league', result)
      }else{
        console.log('number of competioins is ', result)
        for (let index = 0; index < result; index++) {
					console.log("TCL: index", index)
           instance.methods.competitions(index).call(transactionObject, (err, result)=>{
            if (err) {
						console.log("TCL: err", err)
          
              observer.error(err)
            }
            else{
              console.log('result', result)
          let obj ={
                prizeMoney: this.web3.utils.fromWei(result[2], 'ether'),
                Title: "10 Ethereum weekend jackpot",
                playerCount: result[4],
                maxPlayers: result[3]
        
              }
              compe.push(obj)
							console.log("TCL: compe", compe)
              


            }
            console.log('compe ',compe)
            observer.next(compe)
            observer.complete()

          })
         
          
        }
      }
    })
  
  

  })
}
getCompetitionCount(acc, addr, gas):Observable<any>{
  let instance = this.createContractInstance(addr, leagueJson);
  return Observable.create(obsever=>{
    
    let transactionObject = {
      from: account,
      gas: gas
    }
    instance.methods.getCompetitionCount().call(transactionObject,(err, result)=>{
      if(err){
        obsever.error(err);

      }else{
        let obj={
          number: result,
          instance: instance
        }
        obsever.next(obj);
        obsever.complete()
      }
    })

  })

}
getCompetitions(account, gas, number, instance):Observable<any>{
  return Observable.create(observer=>{
    let transactionObject = {
      from: account,
      gas: gas
    }
    instance.methods.competitions(number).call(transactionObject, (err, result)=>{
      if(err){
        observer.error(err)
      }else{
        observer.next(result);
        observer.complete()
      }
    })
  })
}



joinCompe(acc, gas, index):Observable<any>{
  return Observable.create(observer=>{
    let transactionObject={
      from: acc,
      gas: gas

    }
    let instance = this.createContractInstance(League, leagueJson);
    instance.methods.joinCompetition(index).send(transactionObject, (err, resp)=>{
      console.log('this works ', index)
      if(err) {
        observer.error(err)
      }else{
        console.log('this also works')
     observer.next(resp);
     observer.complete()
      }
    })

  })

}


  
}
