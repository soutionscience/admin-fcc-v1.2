import { Component, OnInit, Inject, ChangeDetectorRef, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../util/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent implements OnInit {
  createLeagueForm: FormGroup;
  @Input() leagueDetail: string

  constructor(
  private fb: FormBuilder,
  private api: ApiService, private ref: ChangeDetectorRef,
  private location: Location) { }

  ngOnInit() {
    this.createForm()
   this.ref.detectChanges()
  }
  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   console.log('test')
    
  // }

  createForm(){
    console.log('creating form')
    this.createLeagueForm =this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    })

  }

  save(){
  this.createLeagueForm.value.etherId = this.leagueDetail;
  this.api.postResource('leagues ', this.createLeagueForm.value)
  .subscribe(resp=>{
    console.log('created new league ');
    this.reload()
  })
 
    
  }
  reload(){
    location.reload()
    
    
  }
  initialize(){
    console.log('initializing form')
    this.createForm()
  }

}
