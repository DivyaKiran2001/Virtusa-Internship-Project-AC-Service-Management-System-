import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/helpers/account';
import { AccountService } from 'src/app/services/account.service';;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  // Declaration
  userarr:Account[]=[]
  isDropdownOpen = false;
  email=localStorage.getItem('Email')||""
  errormessage=''
  successmessage=''
  isNavbarTogglerActive = false;
  constructor(private acc:AccountService,private router:Router,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getaccount(this.email)
    
  }
  // Get user details
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
  // Clear the account details
  logout(){
    localStorage.clear()
  }
}

