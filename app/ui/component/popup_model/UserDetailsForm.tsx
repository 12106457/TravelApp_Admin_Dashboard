import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "@/public/close-icon.svg";
import Spinner from "../../utility/spinner";
import Swal from "sweetalert2";
import { addCouponResponse, addUserResponse, UserItem, userResponse } from "../../models/response";
interface PropsType {
  setIsOpen: (isOpen: boolean) => void;
  onSave: (data:UserItem[]  | ((prev: UserItem[]) => UserItem[])) => void;
}

function UserDetailsForm({ setIsOpen,onSave }: PropsType) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password:"",
    phone: "",
    active: true,
  });
  const [Loading,setLoading]=useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
        setLoading(true);
        try {
          const response = await fetch("/api/user/add", {
            method: "POST",
            // headers: {
            //   authorization: Bearer ${localStorage.getItem('authToken')},
            //   'notesId': String(currentCallNote?.id),
            // },
            body: JSON.stringify({
              firstname: formData.firstname,
              lastname: formData.lastname,
              email: formData.email,
              password:formData.password,
              phone: formData.phone,
              active: formData.active,
            }),
          });
          const sResponse: addUserResponse =
            (await response.json()) as addUserResponse;
            setLoading(false);
            console.log(sResponse);
          if (sResponse.status) {
            Swal.fire({
              title: "Add New User Successful",
              icon: "success",
            });
            onSave((prev)=>[...prev,sResponse.data]);
            setIsOpen(false);
          } else {
            Swal.fire({
              title: "Failed to User",
              text: sResponse.message || "An unknown error occurred.",
              icon: "error",
            });
          }
        } catch (error) {
          // setLoading(false);
          console.error("Error adding New User:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while adding the User. Please try again.",
            icon: "error",
          });
        }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {Loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <Spinner loading={Loading} />
                </div>
              )}
      <div className="bg-white  pt-3  rounded-lg shadow-lg w-[550px] ">
        <div className="flex justify-between items-center px-6 py-4 border-b-2">
          <h2 className="text-xl font-bold">Add New User</h2>
          <button
            className="p-0 bg-transparent border-none"
            onClick={() => setIsOpen(false)}
          >
            <Image src={CloseIcon} alt="close icon" width={25} height={25} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 h-[600px] overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="mb-4 mt-5">
            <label className="block text-gray-700 mb-1">First Name</label>
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
            <label className="block text-gray-700 mb-1">Last Name</label>
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
            <label className="block text-gray-700 mb-1">Email</label>
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
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              placeholder="Enter name"
              required
              onWheel={(e) => e.preventDefault()}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Status</label>
            <div className="flex justify-center items-center gap-7">
              {/* Active Button */}
              <button
              type="button"
                onClick={() => setFormData({ ...formData, ["active"]: true })}
                className={`px-4 py-2 rounded-lg w-[50%] font-semibold border transition-all duration-300 ${
                  formData.active
                    ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                    : "bg-transparent text-green-500 border-green-500 hover:bg-green-100"
                }`}
              >
                Active
              </button>

              {/* Inactive Button */}
              <button
              type="button"
                onClick={() => setFormData({ ...formData, ["active"]: false })}
                className={`px-4 py-2 rounded-lg w-[50%] font-semibold border transition-all duration-300 ${
                  !formData.active
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
              onClick={(e)=>handleSubmit(e)}
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
