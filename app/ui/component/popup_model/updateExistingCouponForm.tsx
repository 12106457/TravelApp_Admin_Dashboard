import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "@/public/close-icon.svg";
import Swal from "sweetalert2";
import {
  couponResponse,
  addCouponResponse,
  Coupon,
  MasterDataItem,
} from "../../models/response";
import MultiSelectField from "../../reuseableComponent/multiSelectComponent";
type PopupFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  data?: Coupon;
  onSave: (updatedCoupon: Coupon) => void;
};

type FormData = {
  name: string;
  image: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: string;
  category: string;
};

const PopupForm: React.FC<PopupFormProps> = ({ setIsOpen, onSave, data }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    image: "",
    code: "",
    description: "",
    discountType: "",
    discountValue: "",
    category: "",
  });
  const [typeOfBooking, setTypeOfBooking] = useState<MasterDataItem[]>([]);

  useEffect(() => {
    setFormData({
      name: data?.name || "",
      image: data?.image || "",
      code: data?.code || "",
      description: data?.description || "",
      discountType: data?.discountType || "",
      discountValue: String(data?.discountValue) || "",
      category: data?.category || "",
    });
  }, [data]);

  const [discountTypeList, setDiscountTypeList] = useState<MasterDataItem[]>(
    []
  );
  const [typeOfBookingList, setTypeOfBookingList] = useState<MasterDataItem[]>(
    []
  );
  const [categoryList, setCategoryList] = useState<MasterDataItem[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("masterData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const discounttype: MasterDataItem[] = parsedData?.discountType || [];
      setDiscountTypeList(discounttype);
      const typeofbooking: MasterDataItem[] = parsedData?.typeOfBooking || [];

      const filterlist = data?.typeOfBooking
        .split(",")
        .map((item) => typeofbooking.find((type) => type.name === item))
        .filter((item): item is MasterDataItem => item !== undefined); // Type guard to filter out `undefined`

      setTypeOfBooking(filterlist || []);

      setTypeOfBookingList(typeofbooking);
      const categorys: MasterDataItem[] = parsedData?.couponCategory || [];
      setCategoryList(categorys);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(Number(formData.discountValue))) {
      Swal.fire({
        title: "Invalid Discount Value",
        text: "Please enter a valid number for discount value.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch("/api/coupon/update", {
        method: "PUT",
        headers: {
          //   authorization: Bearer ${localStorage.getItem('authToken')},
          id: data?._id || "",
        },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          code: formData.code,
          description: formData.description,
          discountValue: Number(formData.discountValue),
          discountType: formData.discountType,
          typeOfBooking: typeOfBooking.map((item) => item.name).join(","),
          category: formData.category,
        }),
      });
      const sResponse = await response.json();
      console.log("response:", sResponse);

      if (sResponse.status) {
        Swal.fire({
          title: "Update Coupon Details",
          icon: "success",
        });
        onSave(sResponse.data);
        setIsOpen(false);
      } else {
        Swal.fire({
          title: "Failed to Update Coupon",
          text: sResponse.message || "An unknown error occurred.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating the coupon. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white  pt-3 pb-8 rounded-lg shadow-lg w-[550px] h-[630px] overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b-2">
          <h2 className="text-xl font-bold">Add Coupon</h2>
          <button
            className="p-0 bg-transparent border-none"
            onClick={() => setIsOpen(false)}
          >
            <Image src={CloseIcon} alt="close icon" width={25} height={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8">
          {/* Name Field */}
          <div className="mb-4 mt-5">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Image URL Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Coupon Code"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows={3}
              required
            />
          </div>

          {/* Discount Type Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Discount Type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Discount Type</option>
              {discountTypeList.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Discount Value</label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discount Value"
              required
            />
          </div>

          {/* Type of Booking Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Type Of Booking</label>
            <MultiSelectField
              options={typeOfBookingList.map((user) => ({
                id: user.id,
                name: user.name,
              }))}
              selectedValues={typeOfBooking}
              onChange={(selected) => setTypeOfBooking(selected)}
              placeholder="Select"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categoryList.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
