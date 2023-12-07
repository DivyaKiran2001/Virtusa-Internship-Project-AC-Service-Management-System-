import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerhomepageComponent } from './customerhomepage.component';

describe('CustomerhomepageComponent', () => {
  let component: CustomerhomepageComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [CustomerhomepageComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(CustomerhomepageComponent);
    component = fixture.componentInstance;
  });
  it('FE_customerHomePageTest', () => {
    expect(component).toBeTruthy();
  });
});