import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../util/api.service';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {
  @Input() league: string;
  competitions: string [];
  showCompetitions: Boolean;
  compeForm: FormGroup

  constructor(private web3: Web3Service,
   private fb: FormBuilder, private ref: ChangeDetectorRef,
   private api: ApiService) { }

  ngOnInit() {
    this.getLeagueDetails()
    this.showCompetitions = false;
    this.createCompeForm();
  }
  getLeagueDetails(){
    this.web3.getDeployedCompetitions(this.league, '1000000')
    .subscribe(resp=>{
    // this.competitions = resp;
    if(resp.length<1){
    this.showCompetitions = false
    }else{
      this.showCompetitions = true;
      this.competitions = resp
    }
    this.ref.detectChanges()
    })

   

  }
  createCompeForm(){
    this.compeForm = this.fb.group({
       name: '',
      maxPlayers: '',
      prize:''
    })
    
  }

  createCompe(){
   this.web3.CreateCompeInstance(this.league, '1000000', this.compeForm.value)
   .subscribe(resp=>{
     console.log('successfuly deployed competitions ', resp);
     
   })

  }
  init(c){
    console.log('caling init')
 this.web3.getCompetitions(c)
 .subscribe(resp=>{
   resp.etherId = c
  this.api.postResource('competitions ', resp)// post competition and add it to league
  .subscribe(resp=>{

  })

 })
  }

}
