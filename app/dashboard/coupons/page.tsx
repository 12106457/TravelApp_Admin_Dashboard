"use client";
import React, { useEffect, useState } from "react";
import {
  Coupon,
  couponResponse,
  MasterDataItem,
} from "@/app/ui/models/response";
import Image from "next/image";
import EditIcon from "@/public/edit-icon.svg";
import DeleteIcon from "@/public/delete-icon.svg";
import AddNewCouponForm from "@/app/ui/component/popup_model/addNewCouponForm";
import UpdateExistingCouponForm from "@/app/ui/component/popup_model/updateExistingCouponForm";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { camelCaseToTitle } from "@/app/ui/utility/textToCamelConverter";
import Spinner from "@/app/ui/utility/spinner";
function page() {
  const [couponCompleteList, setCouponcCompleteList] = useState<Coupon[]>([]);
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<Coupon>();

  const [categoryOption, setCategoryOption] = useState<MasterDataItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const currentpath=usePathname();
  const [Loading,setLoading]=useState(false);

  const updatedCurrentPath = currentpath
  .split("/") 
  .filter(Boolean) 
  .map((segment) => camelCaseToTitle(segment)) 
  .join(" / "); 

  useEffect(() => {
    const storedData = localStorage.getItem("masterData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const categorys: MasterDataItem[] = parsedData?.couponCategory || [];
      setCategoryOption(categorys);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setCouponList(couponCompleteList);
    } else {
      const updatedList = couponCompleteList.filter(
        (item) => item.category === selectedCategory
      );
      setCouponList(updatedList);
    }
  }, [selectedCategory, couponCompleteList]);

  useEffect(() => {
    FetchAPI();
  }, []);
  useEffect(() => {
    console.log("couponList:", couponList);
  }, [couponList]);

  const handleDeleteAPI=(id:string)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        deleteAPI(id);
      }
    });
  }

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
      setLoading(false);
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
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "An error occurred while delete the coupon. Please try again.",
        icon: "error",
      });
    }
  };

  const FetchAPI = async () => {
    setLoading(true);
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
      setLoading(false);
      if (sResponse.status) {
        setCouponList(sResponse.data);
        setCouponcCompleteList(sResponse.data);
      }
    } catch (error) {
      setLoading(false);
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
       {Loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <Spinner loading={Loading} />
                </div>
              )}
      <div className="w-full h-14 mb-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          {updatedCurrentPath}
        </div>
        <button
          className="p-2 bg-blue-600 rounded text-white mr-3 font-medium"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New Coupon
        </button>
      </div>
      <div className="flex p-4 border-[#eaeaea] bg-white gap-4 ml-[-12px]">
        {/* Add "All Categories" button */}
        <button
          className={`px-6 py-2 border rounded-lg text-sm font-semibold ${
            selectedCategory === "All"
              ? "bg-orange-500 text-white"
              : "text-black border-[#748892]"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All 
        </button>

        {/* Map through category options */}
        {categoryOption.map((status) => (
          <button
            key={status.id}
            className={`px-2 py-1 border rounded-lg text-sm font-semibold ${
              selectedCategory === status.name
                ? "bg-orange-500 text-white"
                : "text-black border-[#748892]"
            }`}
            onClick={() => setSelectedCategory(status.name)}
          >
            {status.name}
          </button>
        ))}
      </div>

      <div className="h-[564px] overflow-y-auto rounded-lg shadow-lg bg-white">
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
              <th className="p-3 text-left">Edit</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="">
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
                  <td className="p-3 border border-gray-200">{coupon.code}</td>
                  <td className="p-3 border border-gray-200">
                    {coupon.description}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.discountType}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {coupon.typeOfBooking.split(",").join(", ")}
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
                      {/* <span className="text-blue-600 font-semibold">Edit</span> */}
                    </div>
                  </td>
                  <td
                    className="p-3 border border-gray-200 text-center cursor-pointer"
                    onClick={() => {
                      handleDeleteAPI(coupon._id);
                    }}
                  >
                    <div className="flex justify-center items-center space-x-2">
                      <Image
                        src={DeleteIcon}
                        alt="delete icon"
                        width={20}
                        height={20}
                      />
                      {/* <span className="text-red-600 font-semibold">Delete</span> */}
                    </div>
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
      {isOpen && (
        <AddNewCouponForm
          setIsOpen={setIsOpen}
          onSave={(data) => {
            if (typeof data === "function") {
              setCouponList(data);
            } else {
              setCouponList((prev) => [...prev, data]);
              setCouponcCompleteList((prev)=>[...prev,data]);
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
            setCouponcCompleteList((prevCoupons) =>
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
