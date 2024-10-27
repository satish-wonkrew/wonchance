"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Sun,
  Users,
  Menu,
  X,
  CameraIcon,
} from "lucide-react";
import { BsTools } from "react-icons/bs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/redux/slices/userSlice";
import { setCurrentView } from "@/redux/slices/viewSlice";
import { FaProjectDiagram } from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  const userRole = profile?.profile?.role;
  const hasAccess =
    userRole &&
    [
      "Super Admin",
      "Company Admin",
      "Company Manager",
      "Project Admin",
      "Project Manager",
      "User",
    ].includes(userRole);

  const handleMenuItemClick = (view) => {
    dispatch(setCurrentView(view));
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case "Super Admin":
        return [
          {
            title: "Home",
            icon: <Home className="mr-3" size={20} />,
            view: "home",
          },
          {
            title: "Users",
            icon: <Users className="mr-3" size={20} />,
            view: "users",
          },
          {
            title: "Companies",
            icon: <FileText className="mr-3" size={20} />,
            view: "company",
          },
          {
            title: "Projects",
            icon: <FaProjectDiagram className="mr-3" size={20} />,
            view: "projects",
          },
          {
            title: "Casting Calls",
            icon: <CameraIcon className="mr-3" size={20} />,
            view: "adminCasting",
          },
          {
            title: "Settings",
            icon: <Settings className="mr-3" size={20} />,
            view: "settings",
          },
          {
            title: "Help",
            icon: <HelpCircle className="mr-3" size={20} />,
            view: "help",
          },
        ];
      case "Company Admin":
        return [
          {
            title: "Users",
            icon: <Users className="mr-3" size={20} />,
            view: "AssignedUsers",
          },
          {
            title: "Projects",
            icon: <FaProjectDiagram className="mr-3" size={20} />,
            view: "CompanyProject",
          },
          {
            title: "Casting Calls",
            icon: <CameraIcon className="mr-3" size={20} />,
            view: "CastingByCompany",
          },
          {
            title: "Settings",
            icon: <Settings className="mr-3" size={20} />,
            view: "Admin-Company-Srttings",
          },
        ];
      case "Company Manager":
        return [
          {
            title: "Users",
            icon: <Users className="mr-3" size={20} />,
            view: "AssignedUsers",
          },
          {
            title: "Projects",
            icon: <FaProjectDiagram className="mr-3" size={20} />,
            view: "CompanyProject",
          },
          {
            title: "Casting Calls",
            icon: <CameraIcon className="mr-3" size={20} />,
            view: "CastingByCompany",
          },
        ];
      case "Project Admin":
        return [
          {
            title: "Projects",
            icon: <FaProjectDiagram className="mr-3" size={20} />,
            view: "MyProjects",
          },
          {
            title: "Casting Calls",
            icon: <CameraIcon className="mr-3" size={20} />,
            view: "CastingbyProject",
          },
          {
            title: "Settings",
            icon: <Settings className="mr-3" size={20} />,
            view: "settings",
          },
        ];
      case "Project Manager":
        return [
          {
            title: "Casting Calls",
            icon: <CameraIcon className="mr-3" size={20} />,
            view: "CastingbyProject",
          },
          {
            title: "Settings",
            icon: <Settings className="mr-3" size={20} />,
            view: "settings",
          },
        ];
      default:
        return [];
    }
  };

  if (!hasAccess) return null;

  const menuItems = renderMenuItems();

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gray-100 dark:bg-gray-900 fixed shadow-lg">
        <a
          href="/dashboard"
          className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Dashboard
          </span>
        </a>
        <div className="flex flex-col p-4 space-y-4">
          <div className="relative">
            <Input placeholder="Search..." className="w-full" />
          </div>
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className={cn(
                  "flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
                )}
                onClick={() => handleMenuItemClick(item.view)}
              >
                {item.icon}
                <span className="flex-1">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center p-4">
          <Button variant="outline" className="w-full">
            <Sun className="mr-2" size={20} />
            Light Mode
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gray-100 dark:bg-gray-900 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Dashboard
            </span>
            <Button variant="ghost" className="ml-2">
              <X size={24} />
            </Button>
          </div>
          <div className="relative mt-4">
            <Input placeholder="Search..." className="w-full" />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className={cn(
                  "flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
                )}
                onClick={() => handleMenuItemClick(item.view)}
              >
                {item.icon}
                <span className="flex-1">{item.title}</span>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
