import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShareService {
  serviceName:string=''
  serviceNumber:string=''
  serviceemailid:string=''
  serviceimage:string=''
  Mailid:string=localStorage.getItem('email')||''
  setServiceCenter(data1:string,data2:string,data3:string,data4:string):any{
    this.serviceName=data1;
    this.serviceNumber=data2;
    this.serviceemailid=data3;
    this.serviceimage=data4;
    console.log(this.serviceName)
  }
}
