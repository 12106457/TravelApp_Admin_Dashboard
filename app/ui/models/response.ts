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

export type masterDataResponse={
status:boolean,
message:string,
data: MasterDataItem[];
}

export type MasterDataItem={
id:number,
name:string,
short_name?:string,
symbol?:string,
}

export interface UserItem {
_id: string;
active: boolean;
firstname: string;
lastname: string;
email: string;
password: string;
phone: string;
coupons: CouponDetails[];
couponCount: number;
}

export interface CouponDetails {
_id: string;
userId: string;
couponId: Coupon;
minOrderValue: number;
maxDiscount: number;
isActive: boolean;
startDate: string;
endDate: string;
__v: number;
}

export interface userResponse{
status:boolean,
  message:string,
  data:UserItem[];
}

export interface addUserResponse{
  status:boolean,
    message:string,
    data:UserItem;
  }
