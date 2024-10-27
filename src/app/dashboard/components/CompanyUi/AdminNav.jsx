"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ViewGridIcon } from "@radix-ui/react-icons";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

const AdminNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <div className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex justify-between items-center px-4 py-2.5 lg:px-6 lg:py-3">
        {/* Logo */}
        <a href="https://flowbite.com" className="flex items-center">
          <img src="/Img/Logo.png" className="h-10 md:h-12" alt="Logo" />
        </a>

        {/* Search Form */}
        <form
          action="#"
          method="GET"
          className={`relative ${isSearchOpen ? 'block' : 'hidden'} md:block md:w-96`}
        >
          <Input
            type="text"
            name="search"
            id="topbar-search"
            placeholder="Search"
            className="pl-10 rounded-lg border-gray-300 shadow-sm"
            icon={<Search className="h-5 w-5 text-gray-500" />}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {/* Navbar Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-controls="drawer-navigation"
            onClick={() => alert('Open drawer')}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="View notifications"
            className="relative"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="View apps"
          >
            <ViewGridIcon className="h-6 w-6" />
          </Button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 dark:bg-gray-800">
              <DropdownMenuGroup>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
