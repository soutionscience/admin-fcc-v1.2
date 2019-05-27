import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { ApiService } from '../util/api.service';
import { MatDialog } from '@angular/material';
import { CreateLeagueComponent } from '../dialogs/create-league/create-league.component';
import { TestBed } from '@angular/core/testing';
import { TestDialogComponent } from '../dialogs/test-dialog/test-dialog.component';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  coinBase: string;
  leagues: string [];
  leagueId: string;
  selectedLeague: string;
  initialisedLeagues: string [];
  noLeague: string;


  constructor(private web3: Web3Service, private Api: ApiService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getCoinBase();
    console.log('woeking in factory')
  }
  getCoinBase(){
    this.web3.getCoinBase()
    .subscribe(resp=>{
      this.coinBase = resp;
      this.getDeployedLeagues();
    })
  }
  newLeague(){
    console.log("deploying new league");
    this.web3.deployLeagues(this.coinBase, '1000000')
    .subscribe(resp=>{
      console.log('new league deployed with address ', resp)
    })
 
  }
  getDeployedLeagues(){
    this.web3.getDeployedLeagues(this.coinBase, '1000000')
    .subscribe(resp=>{
      // console.log('deployed leagues = ', resp);
      if(resp.length == 0){
       this.noLeague =' there are no league deployed with this factory'
      }
      this.leagues = resp;
      // this.ref.detectChanges();
      this.getInitializedLeagues()
    })
  }
  initialize(l){
    console.log('initializing')
   this.leagueId = l;
   console.log('league id ', this.leagueId)
   this.ref.detectChanges()
  }

  getInitializedLeagues(){
    this.Api.getResource('leagues')
    .subscribe(resp=>{
      
      this.initialisedLeagues = resp;
      console.log('initialized ', this.initialisedLeagues)
      this.ref.detectChanges()
    })
  }

  setLeague(l){
  this.selectedLeague = l;
  this.ref.detectChanges();
  }

}
