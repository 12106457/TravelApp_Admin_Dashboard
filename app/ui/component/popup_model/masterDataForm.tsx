import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "@/public/close-icon.svg";
import Spinner from "../../utility/spinner";
import Swal from "sweetalert2";
import { addCouponResponse, addUserResponse, MasterDataItem, UserItem, userResponse } from "../../models/response";
interface PropsType {
  setIsOpen: (isOpen: boolean) => void;
  data?:MasterDataItem;
  onChange?: React.Dispatch<React.SetStateAction<MasterDataItem | undefined>>;
  CallApiFunction: () => Promise<void>;
}

function MasterDataForm({ setIsOpen,onChange,data,CallApiFunction }: PropsType) {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    symbol: "",
    active: true,
  });
  useEffect(()=>{
    console.log("incoming data:",data);
    setFormData(
        {
            name: data?.name||"",
            short_name: data?.short_name||"",
            symbol: data?.symbol||"",
            active: data?.active !== undefined ? data.active : true,
        }
    )
  },[]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value,id:data?.id||0 };
    setFormData(updatedFormData);

    // Correctly passing to onChange
    onChange?.(updatedFormData); 
  };

  const handleStatus=({ status }: { status: boolean })=>{
    const updatedFormData = { ...formData, ["active"]: status, id:data?.id||0};
    setFormData(updatedFormData);

    // Correctly passing to onChange
    onChange?.(updatedFormData);
  }

  const handleSubmit=(e:any)=>{
    if(formData.name.trim()===""){
      alert("Name field is required");
      return;
    }
    e.preventDefault();
    CallApiFunction();
    setIsOpen(false);
  }

  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white  pt-3  rounded-lg shadow-lg w-[550px] ">
        <div className="flex justify-between items-center px-6 py-4 border-b-2">
          <h2 className="text-xl font-bold">{data?"Edit Master Data":"Add New Master Data"}</h2>
          <button
            className="p-0 bg-transparent border-none"
            onClick={() => setIsOpen(false)}
          >
            <Image src={CloseIcon} alt="close icon" width={25} height={25} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 h-[435px] overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
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
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Short name</label>
            <input
              type="text"
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-1">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Status</label>
            <div className="flex justify-center items-center gap-7">
              {/* Active Button */}
              <button
              type="button"
                onClick={() => handleStatus({ status: true })}
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
                onClick={() =>handleStatus({ status: false })}
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
              {data?"Update":"Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MasterDataForm;
