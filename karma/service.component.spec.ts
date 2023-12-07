import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceComponent } from './service.component';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [ServiceComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
  });
  it('FE_serviceTest', () => {
    expect(component).toBeTruthy();
  });
});