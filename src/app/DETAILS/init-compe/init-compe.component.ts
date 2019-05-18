import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../util/api.service';

@Component({
  selector: 'app-init-compe',
  templateUrl: './init-compe.component.html',
  styleUrls: ['./init-compe.component.scss']
})
export class InitCompeComponent implements OnInit {
  @Input() league: string;
  initLeague: any[] = [];
  competition: any[]=[];
  show: boolean

  constructor(private api: ApiService, private ref: ChangeDetectorRef) { }

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
    this.api.getSpecificResource('competitions', id)
    .subscribe(resp=>{
      this.competition.push(resp);
      console.log('competition ', this.competition)
      this.ref.detectChanges()
    })
    this.show=!this.show;
    this.ref.detectChanges()
  }
  award(id){
    console.log('aawarding winner!!! ', id)
  }

  calculate(id){
    console.log('compe  id', id);
    this.api.getSpecificResource('winner', id)
    .subscribe(resp=>{
      console.log('what is in resp ', resp)
    })

  }

}
