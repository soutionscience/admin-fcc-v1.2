import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { Factory } from '../shared/address';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
  coinBase: string;
  leagueAddress: string;
  gas: string = '1000000'
  showLoading: boolean;
  competitions: string []=[]

  constructor(private web3Service: Web3Service, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.initAllCompetitons();
  
  }
  getAllLeagues(account){ //gets leagues and calls its competitons
    console.log('calling getallleagues')
    this.web3Service.getAllLeagues(account, Factory, this.gas)
    .subscribe(resp=> {this.leagueAddress= resp[0]
                       this.getCompetition(this.leagueAddress)
                      })// leagues address
  }

  initAllCompetitons(){
    this.showLoading = true;
    this.web3Service.getCoinBase() // returns coinbase  and uses it to  get all leagues
    .subscribe(resp=>{
      this.coinBase = resp
      this.getAllLeagues(resp)
    })

  }
  getCompetition(leagueAd){
    console.log('calling getCompe')

   this.web3Service.getAllCompetions(this.coinBase, leagueAd, this.gas)
   .subscribe(resp=>{
     this.competitions=resp;
    console.log('competitions', this.competitions)
     this.showLoading = false;
     this.ref.detectChanges()
   })
   this.ref.detectChanges()

}
}