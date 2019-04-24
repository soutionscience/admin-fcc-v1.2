import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../util/api.service';

@Component({
  selector: 'app-create-compe',
  templateUrl: './create-compe.component.html',
  styleUrls: ['./create-compe.component.css']
})
export class CreateCompeComponent implements OnInit {
  compeForm: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.compeForm = this.fb.group({
      prize: ['', [Validators.required] ],
      gas: ['1000000', [Validators.required] ]
    })
  }

  createNewCompe(){
    // this.api.
    
  }
  
}

