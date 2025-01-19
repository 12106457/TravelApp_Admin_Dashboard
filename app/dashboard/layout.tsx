import React, { ReactNode } from "react";
import Sidebar from "../ui/component/sidebar";
interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-start">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
