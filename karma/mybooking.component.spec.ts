import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MybookingComponent } from './mybooking.component';

describe('MybookingComponent', () => {
  let component: MybookingComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [MybookingComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(MybookingComponent);
    component = fixture.componentInstance;
  });
  it('FE_myBookingTest', () => {
    expect(component).toBeTruthy();
  });
});