"use client"
import { MasterDataItem } from '@/app/ui/models/response';
import Spinner from '@/app/ui/utility/spinner';
import { camelCaseToTitle } from '@/app/ui/utility/textToCamelConverter';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import EditIcon from "@/public/edit-icon.svg";
import Swal from 'sweetalert2';

const page = () => {
    const {category}=useParams();
     const [loading, setLoading] = useState(false);
     const [categoryData,setCategoryData]=useState<MasterDataItem[]>([]);
    const currentpath=usePathname();
    const updatedCurrentPath = currentpath
        .split("/") 
        .filter(Boolean) 
        .map((segment) => camelCaseToTitle(segment)) 
        .join(" / "); 
    useEffect(()=>{
        const storedData = localStorage.getItem("masterData");
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              const categoryKey = typeof category === "string" ? category : category?.[0];
              const categorys: MasterDataItem[] = parsedData?.[categoryKey||""] || [];
              setCategoryData(categorys);
            }
    },[category]);

    const handleupdate = async (e: React.FormEvent)=> {
        e.preventDefault();
        setLoading(true);
            try {
              const response = await fetch("/api/masterdata/update", {
                method: "PUT",
                headers: {
                  //   authorization: Bearer ${localStorage.getItem('authToken')},
                  category: category+"" || "",
                },
                body: JSON.stringify({
                    
                  
                }),
              });
              const sResponse = await response.json();
              console.log("response:", sResponse);
              setLoading(false);
              if (sResponse.status) {
                Swal.fire({
                  title: "Update User Details Successful",
                  icon: "success",
                });
                // onSave(sResponse.data);
                // setIsOpen(false);
              } else {
                Swal.fire({
                  title: "Failed to Update User Details",
                  text: sResponse.message || "An unknown error occurred.",
                  icon: "error",
                });
              }
            } catch (error) {
              setLoading(false);
              console.error("Error adding coupon:", error);
              Swal.fire({
                title: "Error",
                text: "An error occurred while updating the User Details. Please try again.",
                icon: "error",
              });
            }
            
      }
  return (
    <div className="w-full h-screen p-4 bg-gray-100">
        {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <Spinner loading={loading} />
                </div>
              )}
      <div className="w-full h-14 mb-4 flex justify-start items-center">
        <div className="text-2xl font-bold">
          {updatedCurrentPath}
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Short Name</th>
                            <th className="px-6 py-3 text-left">Symbol</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-center">Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.length > 0 ? (
                            categoryData.map((item) => (
                                <tr key={item.id} className="border-t hover:bg-gray-100">
                                    <td className="px-6 py-3">{item?.id}</td>
                                    <td className="px-6 py-3">{item?.name}</td>
                                    <td className="px-6 py-3">{item?.short_name}</td>
                                    <td className="px-6 py-3">{item?.symbol}</td>
                                    <td className="px-6 py-3">{item?.active ?(<span className='text-2xl'>✅</span>):(<span className='text-2xl'>❌</span>)}</td>
                                    <td className="p-3 border border-gray-200 text-center cursor-pointer">
                                            <div
                                            className="flex justify-center items-center space-x-2"
                                            // onClick={() => {
                                            //     setIsEditOpen(true);
                                            //     setEditData(coupon);
                                            // }}
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
                                <td colSpan={5} className="px-6 py-3 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default page
