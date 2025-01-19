"use client";
import React, { useEffect, useState } from "react";
import { Coupon, couponResponse } from "@/app/ui/models/response";
import Image from "next/image";
import EditIcon from "@/public/edit-icon.svg";
import DeleteIcon from "@/public/delete-icon.svg";
import AddNewCouponForm from "@/app/ui/component/popup_model/addNewCouponForm";
import UpdateExistingCouponForm from "@/app/ui/component/popup_model/updateExistingCouponForm";
import Swal from "sweetalert2";
function page() {
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<Coupon>();
  useEffect(() => {
    FetchAPI();
  }, []);
  useEffect(() => {
    console.log("couponList:", couponList);
  }, [couponList]);

  const deleteAPI = async (id: string) => {
    try {
      const response = await fetch("/api/coupon/delete", {
        method: "DELETE",
        headers: {
          // authorization: Bearer ${localStorage.getItem('authToken')},
          id: id,
        },
        // body: JSON.stringify({
        //   is_completed: true, // Send the updated content to the server
        // }),
      });
      const sResponse: couponResponse =
        (await response.json()) as couponResponse;

      console.log("response:", sResponse);
      if (sResponse.status) {
        setCouponList((prev) => {
          const updatedList = prev.filter((item) => item._id !== id);
          return updatedList;
        });
        Swal.fire({
          title: "Delete Coupon Successful",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed to delete Coupon",
          text: sResponse.message || "An unknown error occurred.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating notes:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while delete the coupon. Please try again.",
        icon: "error",
      });
    }
  };

  const FetchAPI = async () => {
    try {
      const response = await fetch("/api/coupon/get", {
        method: "GET",
        // headers: {
        //   authorization: Bearer ${localStorage.getItem('authToken')},
        //   'notesId': String(currentCallNote?.id),
        // },
        // body: JSON.stringify({
        //   is_completed: true, // Send the updated content to the server
        // }),
      });
      const sResponse: couponResponse =
        (await response.json()) as couponResponse;

      console.log("response:", sResponse);
      if (sResponse.status) {
        setCouponList(sResponse.data);
      }
    } catch (error) {
      console.error("Error updating notes:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching the coupon. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <div className="w-full h-14 mb-4 flex justify-end items-center">
        <button
          className="p-2 bg-blue-600 rounded text-white mr-3 font-medium"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New Coupon
        </button>
      </div>
      <div className="overflow-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Discount Type</th>
              <th className="p-3 text-left">Type of Booking</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Edit</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {couponList.length > 0 ? (
              couponList.map((coupon, index) => (
                <tr key={coupon.code} className="even:bg-gray-100">
                  <td className="p-3 border border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <img
                      src={coupon.image}
                      alt={coupon.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="p-3 border border-gray-200">{coupon.name}</td>
                  <td className="p-3 border border-gray-200">
                    {coupon.description}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.discountType}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.typeOfBooking}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.category}
                  </td>
                  <td className="p-3 border border-gray-200 text-center cursor-pointer">
                    <div
                      className="flex justify-center items-center space-x-2"
                      onClick={() => {
                        setIsEditOpen(true);
                        setEditData(coupon);
                      }}
                    >
                      <Image
                        src={EditIcon}
                        alt="edit icon"
                        width={20}
                        height={20}
                      />
                      <span className="text-blue-600 font-semibold">Edit</span>
                    </div>
                  </td>
                  <td
                    className="p-3 border border-gray-200 text-center cursor-pointer"
                    onClick={() => {
                      deleteAPI(coupon._id);
                    }}
                  >
                    <div className="flex justify-center items-center space-x-2">
                      <Image
                        src={DeleteIcon}
                        alt="delete icon"
                        width={20}
                        height={20}
                      />
                      <span className="text-red-600 font-semibold">Delete</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="p-3 text-center text-gray-500 border border-gray-200"
                >
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <AddNewCouponForm
          setIsOpen={setIsOpen}
          onSave={(data) => {
            if (typeof data === "function") {
              setCouponList(data);
            } else {
              setCouponList((prev) => [...prev, data]);
            }
          }}
        />
      )}
      {isEditOpen && (
        <UpdateExistingCouponForm
          setIsOpen={setIsEditOpen}
          onSave={(updatedCoupon) => {
            setCouponList((prevCoupons) =>
              prevCoupons.map(
                (coupon) =>
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
