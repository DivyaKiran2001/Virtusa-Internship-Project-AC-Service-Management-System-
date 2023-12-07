import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../helpers/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  getaccounturl="https://8080-cabeefffffbabacbdeefceabbedabdfbab.project.examly.io/getaccount"
  deleteaccounturl="https://8080-cabeefffffbabacbdeefceabbedabdfbab.project.examly.io/deleteaccount"
  editaccounturl="https://8080-cabeefffffbabacbdeefceabbedabdfbab.project.examly.io/editaccount"
  // eid=localStorage.getItem('email')

  constructor(private http:HttpClient) { }
  getAccount(eid:string):Observable<Account[]>{
    return this.http.get<Account[]>(`${this.getaccounturl}/${eid}`);

  }
  deleteAccount(id:number):Observable<any>{
    return this.http.delete<any>(`${this.deleteaccounturl}/${id}`);
  }
 editAccount(acc: Account): Observable<any> {
    return this.http.put<any>(`${this.editaccounturl}/${acc.userId}`, acc);
  }
}
