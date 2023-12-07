import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceCenterComponent } from './edit-service-center.component';

describe('EditServiceCenterComponent', () => {
  let component: EditServiceCenterComponent;
  let fixture: ComponentFixture<EditServiceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
