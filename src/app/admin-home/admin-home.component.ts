import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../util/api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  players: String [];
  playerCount: Number

  constructor(private api: ApiService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPlayers();
  }
  getPlayers(){
    setTimeout(()=>{
    this.api.getResource('users')
    .subscribe(resp=>{
      this.players = resp;
      this.playerCount = resp.length;
      this.ref.detectChanges()

    })
  }, 1000)

  }

}
