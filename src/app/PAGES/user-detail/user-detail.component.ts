import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../util/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: String []

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    
    this.getUser(id)
  }
  getUser(id){
    this.apiService.getSpecificResource('users', id)
    .subscribe(resp=>{
      this.user= resp
    })
  }

  award(id, amount){
    this.apiService.postSpecificResouce('users', id, 'coins', {'amount':amount})
    .subscribe(resp=>{
      this.ref.detectChanges()
      
    })
  }

}
