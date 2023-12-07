import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reviewresponse } from 'src/app/helpers/review';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit,OnDestroy {
  
  carouselItems:Reviewresponse[]=[]
  private intervalId: any;
  constructor(private review:AppointmentService){}
 
  ngOnInit(): void {
    this.getreviews()
    this.startCarousel();
  }
  ngOnDestroy(): void {
    this.stopCarousel();
  }
  // Get review for that service center
  getreviews(){
    this.review.getreviews(localStorage.getItem("serviceCenterID")||'').subscribe(res=>{
      this.carouselItems=res
    })
  }
  
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextItem();
    }, 3000); // Adjust the interval duration as needed (in milliseconds)
  }

  stopCarousel(): void {
    clearInterval(this.intervalId);
  }
  currentIndex = 0;

  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }

  previousItem() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }
  getAverageRating(roundedRating:number){
    return '⭐'.repeat(roundedRating);
  }
}
