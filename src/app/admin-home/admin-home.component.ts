import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../util/api.service';
import { Web3Service } from '../util/web3.service';
import { AuthService } from '../util/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  players: String [];
  playerCount: Number;
  coinBase: String;
  accountBalance: String

  constructor(private api: ApiService,
    private ref: ChangeDetectorRef,
    private web3: Web3Service,
    private auth: AuthService) { }

  ngOnInit() {
    this.getCoinBase()
    this.getPlayers();
  }

  getCoinBase(){
    this.web3.getCoinBase()
    .subscribe(resp=>{
      this.coinBase = resp;
      this.auth.setAdress(this.coinBase)
      this.web3.getTokenBalance(this.coinBase)
      .subscribe(resp=> this.accountBalance = resp)
     
    })
  }

  getPlayers(){
    setTimeout(()=>{
    this.api.getResource('users')
    .subscribe(resp=>{
      this.players = resp;
      this.playerCount = resp.length;
      this.ref.detectChanges()

    })
  }, 1000)

  }

}
