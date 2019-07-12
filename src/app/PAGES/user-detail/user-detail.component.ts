import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../util/api.service';
import { AuthService } from '../../util/auth.service';
import { Web3Service } from '../../util/web3.service';
import { TokenService } from '../../util/token.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: String [];
  adminUser: String;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private ref: ChangeDetectorRef,
    private auth: AuthService,
    private tokenService: TokenService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getUser(id);
    this.getAdminAddress()
  }
  getUser(id){
    this.apiService.getSpecificResource('users', id)
    .subscribe(resp=>{
      this.user= resp
    })
  }

  award(id, amount){
    console.log('the fuck is admin ', this.adminUser)
    this.tokenService.awardTokens(this.adminUser, id, amount, '1000000')
    .subscribe()
  }
  getAdminAddress(){
  this.adminUser= this.auth.getAddress() 

  }

}
