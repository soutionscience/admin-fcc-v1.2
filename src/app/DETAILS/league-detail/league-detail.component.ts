import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../util/api.service';
import { Compe } from '../../shared/compe.model';

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
  compe: any;

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
   console.log('this is what is sending ', resp)
  this.api.postResource('competitions ', resp)// post competition and add it to league
  .subscribe(compe=>{
    this.compe = compe
    console.log('compeResponsce ', this.compe._id)
    console.log('league ', this.league)
   this.api.postSpecificResouce('leagues',this.league, 'competitions', {"compeId":this.compe._id} )
   .subscribe(resp=>{
     console.log('resp from server ', resp)
   })

  })

 })
  }

}
