export interface Reviews{
    id:number
    userEmailId:string
    review:string
    rating:number
    serviceCenterId:string
}
export interface Reviewresponse {
    review: Reviews;
    user: string;
  }
  