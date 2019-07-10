import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAdress: string ='address'

  constructor() { }
  setAdress(address){
    console.log('set local storage')
    localStorage.setItem(this.userAdress, address)
  }
  getAddress(){
   return localStorage.getItem(this.userAdress)
  }
}
