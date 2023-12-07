export interface Appointment{
    id:number
    userEmailId:string
    productName:string
    productModelNo:string
    dateOfPurchase:string
    contactNumber:string
    problemDescription:string
    date:string
    time:string
    serviceCenterId:string

}
export interface AppointmentResponse {
    product: Appointment;
    serviceCenterName: string;
  }