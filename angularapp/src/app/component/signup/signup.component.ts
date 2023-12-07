import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// Declarations
  signupButtonText: string = "signup"
  SignupForm!: FormGroup;
  errormessage: string = ''
  successmessage = ''
  pwd=false
  cpwd=false

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private share: ShareService) {

  }
  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      UserRole: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      UserName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      Password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator //using 'this' keyword to refer to instance method
    })
  }
// SignUp Api Call
  onsignup() {

    if (this.SignupForm.valid) {
      this.signupButtonText = 'Loading...';
      const usertype = this.SignupForm.get('UserRole')?.value
      const smail = this.SignupForm.get('Email')?.value
      const spwd = this.SignupForm.get('Password')?.value
      const signupData = {
        UserRole: usertype,
        Email: smail,
        UserName: this.SignupForm.get('UserName')?.value,
        MobileNumber: this.SignupForm.get('MobileNumber')?.value,
        Password: spwd
      };

      if (usertype === 'admin') {
          this.auth.adminsignup(signupData)
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail", smail)
              localStorage.setItem("Spwd", spwd)
              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              this.signupButtonText = 'signup'
              this.errormessage = err?.error.message
              setTimeout(() => {
                this.errormessage = '';
              }, 5000);
            })
          })      
      }
      else {
        this.auth.usersignup(signupData)
        
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail", smail)
              localStorage.setItem("Spwd", spwd)

              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              this.signupButtonText = 'signup'
              this.errormessage = err?.error.message
              setTimeout(() => {
                this.errormessage = '';
              }, 5000);
            })
          })
      }


    }
    else {
      ValidateForm.validateAllFormFileds(this.SignupForm);
      this.errormessage = 'Enter valid Details'
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);
    }


  }
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password')?.value;
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmpassword')?.setErrors(null);
    }
  }
}

