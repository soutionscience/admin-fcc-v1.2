import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Observable } from 'rxjs';
import { Factory, League, Token} from '../shared/address';

declare let require: any;
const Web3 = require('web3');
declare let window: any;
let tokenContract = require('../../../build/contracts/fantasyCoinV3.json')


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private web3: any;

  constructor(private web3Service: Web3Service) { }

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
  awardTokens(admin, player, amount, gasToUse):Observable<any>{
    console.log("TCL: TokenService -> constructor -> admin, player, amount", admin, player, amount)
    return Observable.create(observer=>{
      let instance = this.web3Service.createContractInstance(Token, tokenContract);
      let transactionObj ={
        from: admin,
      gas: gasToUse
      }
      instance.methods.transfer(player, amount).send(transactionObj, (err, resp)=>{
        if(err){
          console.log('error', err)
          observer.error(err)
        }else{
          console.log('worked!!', resp);
          observer.next(resp);
          observer.complete(resp)
        }
      })
    })
  }
}
