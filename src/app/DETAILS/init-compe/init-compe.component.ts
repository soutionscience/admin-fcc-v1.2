import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../util/api.service';
import { Web3Service } from '../../util/web3.service';

@Component({
  selector: 'app-init-compe',
  templateUrl: './init-compe.component.html',
  styleUrls: ['./init-compe.component.scss']
})
export class InitCompeComponent implements OnInit {
  @Input() league: string;
  initLeague: any[] = [];
  competition: any[]=[];
  competitors: string [];
  show: boolean
  etherScan: string;

  constructor(private api: ApiService, private ref: ChangeDetectorRef,
    private web3: Web3Service) { }

  ngOnInit() {
    this.getCompetitions()
    this.show= false;
  }
  getCompetitions(){
    this.api.getSpecificResource('leagues', this.league)
    .subscribe(resp=>{
      this.initLeague.push(resp);
			console.log("TCL: InitCompeComponent -> getCompetitions -> this.nitLeague", this.initLeague)
     this.ref.detectChanges();
    })
  }

  showContent(id){
    console.log('id ', id)
    this.api.getVerySpecificResouce('competitions', id, 'teams')
    .subscribe(resp=>{
     this.competitors = resp;
     console.log('competititor ', this.competitors)
      this.ref.detectChanges()
    })
    this.show=!this.show;
    this.ref.detectChanges()
  }

  award(userId, compeId, userEtherId, compeEtherId){
    console.log('player ', userEtherId, ' ', 'compe ', compeEtherId, ' playerId ', userId, ' compeId ', compeId);
    this.web3.awardWinner(compeEtherId, userEtherId, '1000000')
    .subscribe(resp=>{
      console.log('awarded winner ', resp);
      this.etherScan = resp;
      this.api.postSpecificResouce('competitions', compeId, 'winner', {'winner':userId} )
    .subscribe(resp=>{
      console.log('winner awarded', resp)
      this.ref.detectChanges()
    })

    })
    

  }

  calculate(id){
    console.log('compe  id', id);
    this.api.getSpecificResource('winner', id)
    .subscribe(resp=>{
      console.log('what is in resp ', resp)
    })

  }

}
