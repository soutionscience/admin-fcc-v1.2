import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../util/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  players: String [];
  playerCount: Number

  constructor(private api: ApiService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPlayers()
  }
  getPlayers(){
    this.api.getResource('users')
    .subscribe(resp=>{
      this.players = resp;
      this.playerCount = resp.length;
      this.ref.detectChanges()

    })
  }


}
