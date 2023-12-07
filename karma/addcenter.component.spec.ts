import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddcenterComponent } from './addcenter.component';

describe('AddcenterComponent', () => {
  let component: AddcenterComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [AddcenterComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(AddcenterComponent);
    component = fixture.componentInstance;
  });
  it('FE_addcenterTest', () => {
    expect(component).toBeTruthy();
  });
});