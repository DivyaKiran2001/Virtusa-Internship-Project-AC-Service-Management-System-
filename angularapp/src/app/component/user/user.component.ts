import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/helpers/account';
import { AccountService } from 'src/app/services/account.service';;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userarr:Account[]=[]
  isDropdownOpen = false;
  email=localStorage.getItem('Email')||""
  errormessage=''
  successmessage=''
  isNavbarTogglerActive = false;
  UserData:any
  constructor(private acc:AccountService,private router:Router,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getaccount(this.email)
  }
  getaccount(email:string){
    this.acc.getAccount(email).subscribe(response => {
      this.userarr=response
    })
  }
  
  @HostListener('window:resize')
  onResize() {
    this.isNavbarTogglerActive = window.innerWidth <= 992;
  }

  toggleDropdown() {
    if (!this.isNavbarTogglerActive) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
  logout(){
    localStorage.clear()
  }
}

