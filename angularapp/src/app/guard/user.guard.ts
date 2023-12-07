import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private user:AuthService,private route:Router){}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(this.user.isuserloggedin()){
      return true
    }
    else{
      localStorage.clear()
      this.route.navigate(['login'])
      return false
    }
  }
  
}
