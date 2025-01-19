"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Dashboardicon from "@/public/dashboard-icon.svg";
import DashboardOutlineicon from "@/public/dashboard-outline-icon.svg";
import Usericon from "@/public/users-icon.svg";
import UserOutlineicon from "@/public/users-outline-icon.svg";
import Couponicon from "@/public/coupon-icon.svg";
import CouponOutlineicon from "@/public/coupon-outline-icon.svg";
import Ordericon from "@/public/orders-icon.svg";
import OrderOutlineicon from "@/public/order-outline-icon.svg";

function Sidebar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("/dashboard");
  const pathname = usePathname();
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      activeicon: Dashboardicon,
      Inactiveicon: DashboardOutlineicon,
    },
    {
      name: "Coupons",
      path: "/dashboard/coupons",
      activeicon: Couponicon,
      Inactiveicon: CouponOutlineicon,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      activeicon: Usericon,
      Inactiveicon: UserOutlineicon,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      activeicon: Ordericon,
      Inactiveicon: OrderOutlineicon,
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 mt-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
                activeTab === item.path
                  ? "bg-white text-gray-800"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveTab(item.path); // Update active tab
                router.push(item.path); // Navigate to the path
              }}
            >
              {/* Check if the tab is active and display the appropriate icon */}
              <Image
                src={
                  activeTab === item.path ? item.activeicon : item.Inactiveicon
                }
                alt={`${item.name} Icon`}
                width={20}
                height={20}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full py-2 bg-red-500 hover:bg-red-600 rounded"
          onClick={() => router.push("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
