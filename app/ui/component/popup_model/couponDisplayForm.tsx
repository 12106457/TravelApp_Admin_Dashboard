import React from 'react'
import { Coupon, CouponDetails } from '../../models/response';
import Image from 'next/image';
import CloseIcon from "@/public/close-icon.svg";
interface propsType{
     setIsOpen: (isOpen: boolean) => void;
      data: CouponDetails[];
}
function couponDisplayForm({data,setIsOpen}:propsType) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
        className="bg-white  pt-3 pb-8 rounded-lg shadow-lg w-[70%] h-[80%] overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b-2">
          <h2 className="text-xl font-bold">User Coupons</h2>
          <button
            className="p-0 bg-transparent border-none"
            onClick={() => setIsOpen(false)}
          >
            <Image src={CloseIcon} alt="close icon" width={25} height={25} />
          </button>
        </div>

        <div className="f-full w-full overflow-y-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-800 text-white sticky top-0 z-10">
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Coupon Code</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Discount Type</th>
              <th className="p-3 text-left">Type of Booking</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.length > 0 ? (
              data.map((coupon, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-3 border border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <img
                      src={coupon.couponId.image}
                      alt={coupon.couponId.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="p-3 border border-gray-200">{coupon.couponId.name}</td>
                  <td className="p-3 border border-gray-200">{coupon.couponId.code}</td>
                  <td className="p-3 border border-gray-200">
                    {coupon.couponId.description}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.couponId.discountType}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.couponId.typeOfBooking.split(",").join(", ")}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.couponId.category}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.isActive ? (<span className='text-2xl'>✅</span>):(<span className='text-2xl'>❌</span>)
                    }
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="p-3 text-center text-gray-500 border border-gray-200"
                >
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        
        </div>
      </div>
  )
}

export default couponDisplayForm
