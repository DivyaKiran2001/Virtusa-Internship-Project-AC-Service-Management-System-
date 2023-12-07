import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import ValidateForm from 'src/app/helpers/validateForm';
import { ServicecenterService } from 'src/app/services/servicecenter.service';

@Component({
  selector: 'app-edit-service-center',
  templateUrl: './edit-service-center.component.html',
  styleUrls: ['./edit-service-center.component.css']
})
export class EditServiceCenterComponent implements OnInit {
// Decalrations
  servicesarr: serviceCenter[] = [];
  editCenter!: FormGroup
  successmessage: string = ''
  errormessage: string = ''
  update:boolean=false
  EditserviceButtonText='edit'

  constructor(private fb: FormBuilder, private services: ServicecenterService) {
    this.editCenter = this.fb.group({
      serviceCenterID: ['', Validators.required],
      serviceCenterName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      serviceCenterPhone: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      serviceCenterAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,#\\-]+$')]],
      serviceCenterImageUrl: ['', Validators.required],
      serviceCenteramailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      serviceCenterDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.\\s\\/]+$')]]
    })
  }
  ngOnInit(): void {
    this.getservice();
  }
// Get All Service Center
  getservice() {
    this.services.getService().subscribe(Response => { 
      this.servicesarr = Response;
    })
  }
// fill Form to edit those service Center
  updateform(ser: serviceCenter) {
    this.editCenter.setValue({
      serviceCenterID: ser.serviceCenterID,
      serviceCenterName: ser.serviceCenterName,
      serviceCenterPhone: ser.serviceCenterPhone,
      serviceCenterAddress: ser.serviceCenterAddress,
      serviceCenterImageUrl: ser.serviceCenterImageUrl,
      serviceCenteramailId: ser.serviceCenteramailId,
      serviceCenterDescription: ser.serviceCenterDescription
    })
  }
// Edit Service Center API CALL
  onedit() {
    if (this.editCenter.valid) {
      this.EditserviceButtonText = "loading..."
      this.services.updateservice(this.editCenter.value).subscribe({
        next: (res => {
          this.getservice()
          this.successmessage = "Service Center Updated Successfully"
          setTimeout(() => {
            this.successmessage = ''
          }, 5000);
          this.update=true
          this.EditserviceButtonText = "edit"
          document.getElementById('closemodal')?.click();
        })
        , error: (err => {
          this.errormessage = err?.error.message
          setTimeout(() => {
            this.errormessage = '';
          }, 5000);
          this.EditserviceButtonText = "edit"
        })
      })
    } else {
      if (this.editCenter.pristine) {
        this.errormessage = "Enter Details of Service Center"
        setTimeout(() => {
          this.successmessage = '';
        }, 5000);
      }
      else {
        ValidateForm.validateAllFormFileds(this.editCenter);
        this.errormessage = "Enter Valid Service Center Details"
        setTimeout(() => {
          this.successmessage = '';
        }, 5000);

      }
    }
  }

// Delete service Center
  ondelete(id: string) {
    this.services.deleteservice(id).subscribe((res: any) => {
      this.successmessage = res.message
      setTimeout(() => {
        this.successmessage = '';
      }, 5000);
      this.getservice();
    });

  }
// Show Error in inputs After submit Form
  showFieldErrors() {
    Object.keys(this.editCenter.controls).forEach((key) => {
      this.editCenter.get(key)?.markAsTouched();
    });
  }
}
