export type Coupon = {
    _id: string; 
    code: string; 
    name: string; 
    description: string; 
    discountType: "FLAT" | "PERCENTAGE"; 
    discountValue: number; 
    typeOfBooking: string; 
    image: string;
    category:string; 
    createdAt: string; 
  };

export type couponResponse={
    status:boolean,
    message:string,
    data:Coupon[];
  }

export type addCouponResponse={
  status:boolean,
  message:string,
  data:Coupon;
}
  