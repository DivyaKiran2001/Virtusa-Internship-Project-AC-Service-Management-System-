import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton!: ElementRef;
// Declaration
  loginButtonText: string = 'login';
  LoginForm!: FormGroup;
  errormessage:string=''
  successmessage=''
  showPassword=false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef,
   
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('Semail');
    const storedPassword = localStorage.getItem('Spwd');
    this.LoginForm = this.fb.group({
      Email: [storedEmail || '', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      Password: [storedPassword || '', Validators.required]
    });

    if (storedEmail && storedPassword) {
      setTimeout(() => {
        const loginButton = this.elRef.nativeElement.querySelector('#loginButton');
        loginButton.click(); 
        localStorage.removeItem('Semail')
        localStorage.removeItem('Spwd')
      });
    }
  }
  
// Login API Call
  onlogin() {
    if (this.LoginForm.valid) {
      this.loginButtonText = 'Loading...';
      const passwordValue = this.LoginForm.get('Password')?.value;
      const email = this.LoginForm.get('Email')?.value;
      localStorage.setItem('Email', email);
      localStorage.setItem('Password', passwordValue);
      if (passwordValue === 'Admin@123') {
        this.auth.adminlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            this.successmessage="Login Success"
            setTimeout(() => {
              this.successmessage = '';
            }, 5000);
            this.auth.setadmin('admin')
            this.router.navigate(['admin/dashboard']);
          },
          error: (err) => {
            this.loginButtonText = 'login';
           
            this.errormessage=err?.error.message
            setTimeout(() => {
              this.errormessage = '';
            }, 5000);
          }
        });
      } else {
        this.auth.userlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            this.successmessage="Login Success"
            setTimeout(() => {
              this.successmessage = '';
            }, 5000);
            if(res.userRole==='user'){
              this.auth.setuser('user')
              this.router.navigate(['user/homepage']); 
            }
            else
            {
              this.auth.setadmin('admin')
              this.router.navigate(['admin/dashboard']); 
            }
                     
          },
          error: (err) => {
            this.loginButtonText = 'login';
            this.errormessage=err?.error.message;
            setTimeout(() => {
              this.errormessage = '';
            }, 5000)
          }
        });
      }
    } else {
      if(this.LoginForm.pristine){
        this.errormessage='Enter your email and password'
        setTimeout(() => {
          this.errormessage = '';
        }, 5000);
      }
      else{
        ValidateForm.validateAllFormFileds(this.LoginForm);
      this.errormessage='Enter valid email and password'
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);
      }
      
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}