"use client";
import React, { useEffect, useState } from "react";
import {
  Coupon,
  CouponDetails,
  couponResponse,
  MasterDataItem,
  UserItem,
  userResponse,
} from "@/app/ui/models/response";
import Image from "next/image";
import EditIcon from "@/public/edit-icon.svg";
import DeleteIcon from "@/public/delete-icon.svg";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { camelCaseToTitle } from "@/app/ui/utility/textToCamelConverter";
import UserDetailsForm from "@/app/ui/component/popup_model/UserDetailsForm";
import Spinner from "@/app/ui/utility/spinner";
import CouponDisplayForm from "@/app/ui/component/popup_model/couponDisplayForm";
import EditUserDetailsForm from "@/app/ui/component/popup_model/editUserDetailsForm"
function page() {
  const [UserList, setUserList] = useState<UserItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<UserItem>();
  const [Loading,setLoading]=useState(false);
  const [viewCoupons,setViewCoupons]=useState(false);
  const [couponData,setCouponData]=useState<CouponDetails[]>([]);
  const currentpath = usePathname();

  const updatedCurrentPath = currentpath
    .split("/")
    .filter(Boolean)
    .map((segment) => camelCaseToTitle(segment))
    .join(" / ");

  useEffect(() => {
    FetchAPI();
  }, []);

  // const deleteAPI = async (id: string) => {
  //   try {
  //     const response = await fetch("/api/coupon/delete", {
  //       method: "DELETE",
  //       headers: {
  //         // authorization: Bearer ${localStorage.getItem('authToken')},
  //         id: id,
  //       },
  //       // body: JSON.stringify({
  //       //   is_completed: true, // Send the updated content to the server
  //       // }),
  //     });
  //     const sResponse: couponResponse =
  //       (await response.json()) as couponResponse;

  //     console.log("response:", sResponse);
  //     if (sResponse.status) {
  //       setCouponList((prev) => {
  //         const updatedList = prev.filter((item) => item._id !== id);
  //         return updatedList;
  //       });
  //       Swal.fire({
  //         title: "Delete Coupon Successful",
  //         icon: "success",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Failed to delete Coupon",
  //         text: sResponse.message || "An unknown error occurred.",
  //         icon: "error",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating notes:", error);
  //     Swal.fire({
  //       title: "Error",
  //       text: "An error occurred while delete the coupon. Please try again.",
  //       icon: "error",
  //     });
  //   }
  // };

  const FetchAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/get", {
        method: "GET",
        // headers: {
        //   authorization: Bearer ${localStorage.getItem('authToken')}
        // },
      
      });
      const sResponse: userResponse = (await response.json()) as userResponse;

      setLoading(false);
      if (sResponse.status) {
        setUserList(sResponse.data);
      }
    } catch (error) {
      console.error("Error updating notes:", error);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching the coupon. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      {Loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <Spinner loading={Loading} />
                </div>
              )}
      <div className="w-full h-14 mb-4 flex justify-between items-center">
        <div className="text-2xl font-bold">{updatedCurrentPath}</div>
        <button
          className="p-2 bg-blue-600 rounded text-white mr-3 font-medium"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New User
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">No of Coupons</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {UserList.length > 0 ? (
              UserList.map((item, index) => (
                <tr key={item._id} className="even:bg-gray-100">
                  <td className="p-3 border border-gray-200 text-center">
                    {index + 1}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {item.firstname}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {item.lastname}
                  </td>
                  <td className="p-3 border border-gray-200">{item.email}</td>
                  <td className="p-3 border border-gray-200">{item.phone}</td>
                  <td className="p-3 border border-gray-200 text-center cursor-pointer group relative hover:bg-orange-100"
                  onClick={()=>{setViewCoupons(true);setCouponData(item.coupons)}}
                  >
                    <div className="flex justify-center items-center space-x-2">
                      <span className="text-black font-semibold group-hover:hidden">{item.couponCount}</span> {/* Show coupon count by default */}
                      <span
                        className="text-orange-600  font-semibold group-hover:block hidden absolute"
                        style={{ left: 0, right: 0 }}
                      >
                        View
                      </span>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200">
                    {item.active? (<span className='text-2xl'>✅</span>):(<span className='text-2xl'>❌</span>)
                    }
                  </td>
                  <td className="p-3 border border-gray-200 text-center cursor-pointer">
                    <div
                      className="flex justify-center items-center space-x-2"
                      onClick={() => {
                        setIsEditOpen(true);
                        setEditData(item)
                      }}
                    >
                      <Image
                        src={EditIcon}
                        alt="edit icon"
                        width={20}
                        height={20}
                      />
                      {/* <span className="text-blue-600 font-semibold">Edit</span> */}
                    </div>
                  </td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-3 text-center text-gray-500 border border-gray-200"
                >
                  No User available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isOpen && <UserDetailsForm 
      setIsOpen={setIsOpen} 
      onSave={setUserList}
      />}
      {
        viewCoupons && <CouponDisplayForm setIsOpen={setViewCoupons} data={couponData} />
      }
      {isEditOpen && (
        <EditUserDetailsForm
          setIsOpen={setIsEditOpen}
          onSave={(updatedCoupon: UserItem) => {
            setUserList((prevCoupons: UserItem[]) =>
              prevCoupons.map((coupon: UserItem) =>
                coupon._id === updatedCoupon._id
                  ? updatedCoupon // Replace the matching coupon
                  : coupon // Keep the others unchanged
              )
            );
          }}
          data={editData}
        />
      )}
    </div>
  );
}

export default page;
