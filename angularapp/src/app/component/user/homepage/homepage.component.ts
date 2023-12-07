import { Component, OnInit } from '@angular/core';
import { Reviews } from 'src/app/helpers/review';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html', 
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // DECALRATIONS
  servicesarr: serviceCenter[] = [];
  reviewarr:Reviews[]=[]
  search:string=""
  ratingsMap: { [key: string]: number } = {};
  constructor (private services:ServicecenterService,private share:ShareService,private review:AppointmentService){

  }
  ngOnInit(): void {
    
    this.getservice();
  }
  // GET ALL SERVICE CENTERS
  getservice() {
    this.services.getService().subscribe(Response => {
      this.servicesarr = Response;
      this.getAverageRatings();
    })
   
  }
  
  // FOR RATINGS
  getAverageRatings() {
    this.servicesarr.forEach(service => {
      this.review.getreview(service.serviceCenterID).subscribe(res => {
        this.ratingsMap[service.serviceCenteramailId] = res;
      });
    });
  }
  getAverageRating(mailid: string): number {
    return this.ratingsMap[mailid] || 1;
  }
  getStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '⭐'.repeat(roundedRating);
  }
  

  getServiceCenter(serviceCenterID:string) {
    localStorage.setItem('serviceCenterID',serviceCenterID)
  }


}
