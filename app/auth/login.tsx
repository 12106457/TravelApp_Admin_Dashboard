"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { couponResponse, masterDataResponse } from "../ui/models/response";

function page() {
  const route = useRouter();

  const handleSubmit = () => {
    fetchMasterData();
    fetchTotalMasterData();
    route.push("/dashboard");
  };

  const fetchTotalMasterData= async ()=>{
    try {
      const response = await fetch("/api/masterdata/getTotalMasterData", {
        method: "GET",
        // headers: {
        //   authorization: Bearer ${localStorage.getItem('authToken')},
        //   'notesId': String(currentCallNote?.id),
        // },
      });
      const sResponse: masterDataResponse =
        (await response.json()) as masterDataResponse;

      //   console.log("response:", sResponse);
      if (sResponse.status) {
        localStorage.setItem("completeMasterData", JSON.stringify(sResponse.data));
      } else {
        Swal.fire({
          title: "Error",
          text: sResponse.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating notes:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching the coupon. Please try again.",
        icon: "error",
      });
    }
  }

  const fetchMasterData = async () => {
    try {
      const response = await fetch("/api/masterdata/get", {
        method: "GET",
        // headers: {
        //   authorization: Bearer ${localStorage.getItem('authToken')},
        //   'notesId': String(currentCallNote?.id),
        // },
      });
      const sResponse: masterDataResponse =
        (await response.json()) as masterDataResponse;

      //   console.log("response:", sResponse);
      if (sResponse.status) {
        localStorage.setItem("masterData", JSON.stringify(sResponse.data));
      } else {
        Swal.fire({
          title: "Error",
          text: sResponse.message,
          icon: "error",
        });
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
    <div className="w-screen h-screen flex justify-center items-center">
      <button
        className="p-5 px-20 bg-blue-500 text-white text-xl "
        onClick={() => handleSubmit()}
      >
        Login
      </button>
    </div>
  );
}

export default page;
