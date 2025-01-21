import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "@/public/close-icon.svg";
import Swal from "sweetalert2";

interface PropsType {
  setIsOpen: (isOpen: boolean) => void;
}

function UserDetailsForm({ setIsOpen }: PropsType) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit() {}
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white  pt-3  rounded-lg shadow-lg w-[550px] ">
        <div className="flex justify-between items-center px-6 py-4 border-b-2">
          <h2 className="text-xl font-bold">Add Coupon</h2>
          <button
            className="p-0 bg-transparent border-none"
            onClick={() => setIsOpen(false)}
          >
            <Image src={CloseIcon} alt="close icon" width={25} height={25} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 h-[580px] overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="mb-4 mt-5">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex justify-center items-center gap-7">
              {/* Active Button */}
              <button
                onClick={() => setFormData({ ...formData, ["active"]: true })}
                className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-300 ${
                  formData.active
                    ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                    : "bg-transparent text-green-500 border-green-500 hover:bg-green-100"
                }`}
              >
                Active
              </button>

              {/* Inactive Button */}
              <button
                onClick={() => setFormData({ ...formData, ["active"]: false })}
                className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-300 ${
                  formData.active
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "bg-transparent text-red-500 border-red-500 hover:bg-red-100"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 w-full pb-8">
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
}

export default UserDetailsForm;
