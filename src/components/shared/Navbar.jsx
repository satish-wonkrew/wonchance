"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User, Settings, UserPlus, File } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { IMAGE_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Navbar = ({ showMenuItems = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, status, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error("Error fetching user profile");
    }
  }, [error]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Cookies.remove("token");
        Cookies.remove("user");

        toast.success(res.data.message);
        router.push("/auth");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const { authState, fetchUserProfile } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case "Super Admin":
        return [
          "Dashboard",
          "User Management",
          "Reports",
          "Settings",
          "Admin Portal",
        ];
      case "Company Admin":
        return [
          "Dashboard",
          "Manage Company",
          "Users",
          "Reports",
          "Company Settings",
        ];
      case "Company Manager":
        return [
          "Dashboard",
          "Manage Projects",
          "Team",
          "Reports",
          "Project Overview",
        ];
      case "Project Admin":
        return [
          "Dashboard",
          "Project Overview",
          "Manage Tasks",
          "Reports",
          "Task Management",
        ];
      case "crew":
        return [
          "Home",
          "Application",
          "Roles",
          "Casting",
          "Reports",
          "Profile",
        ];
      case "Project Manager":
        return ["Dashboard", "Tasks", "Team", "Reports", "Project Tasks"];
      case "talent":
        return [
          "Home",
          "Casting Call",
          "Auditions",
          "My Applications",
          "Profile",
        ];
      case "Public User":
        return ["Home", "Casting Call", "About", "Contact"];
      default:
        return ["Home", "About", "Contact"];
    }
  };

  const AnimatedLink = ({ href, children }) => {
    const isActive = router.pathname === href;

    return (
      <div className="relative inline-block">
        <a
          href={href}
          className={`relative transition cursor-pointer ${
            isActive ? "text-blue-500" : "text-gray-500"
          } hover:text-white dark:text-white dark:hover:text-gray-300`}
        >
          {children}
        </a>
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full bg-red-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 ${
            isActive ? "scale-x-100" : ""
          }`}
        ></span>
      </div>
    );
  };

  const menuItems = getMenuItems();

  return (
    <header className="bg-black items-center shadow-lg fixed  top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center h-[100px] justify-between">
          <Link href="/" className="block text-teal-600 dark:text-teal-600">
            <Image
              src="/Img/home/Logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="mx-10"
            />
          </Link>

          {showMenuItems && (
            <nav className="hidden md:block">
              <ul className="relative flex items-center gap-6 text-sm">
                {menuItems.map((item) => (
                  <li key={item} className="relative group">
                    <AnimatedLink
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profilePictureUrl
                          ? user.profilePictureUrl
                          : "/Img/Usericon.png"
                      } // Use a ternary operator for fallback
                      alt={user?.fullName || "User"} // Fallback for alt text
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>{user?.profile?.screenName || "No name"}</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {user?.role === "talent" && (
                      <>
                        <Link href="/User/profiles">
                          <DropdownMenuItem>
                            <File className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/User/bookmarks">
                          <DropdownMenuItem>
                            <File className="mr-2 h-4 w-4" />
                            <span>My Bookmarks</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/User/applications">
                          <DropdownMenuItem>
                            <File className="mr-2 h-4 w-4" />
                            <span>My Applications</span>
                            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/User/profiles/update">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Profile Update</span>
                            <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user?.role === "crew" && (
                      <>
                        <Link href="/User/profiles">
                          <DropdownMenuItem>
                            <File className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>

                        <Link href="/dashboard">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                            <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/waitting">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Waitting Page</span>
                            <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {(user?.role === "Super Admin" ||
                      user?.role === "Company Admin") && (
                      <DropdownMenuItem className="cursor-pointer">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Admin Portal</span>
                        <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="w-28 h-11">
                <Link href="/auth">Login</Link>
              </Button>
            )}

            <button
              onClick={toggleMenu}
              className="block md:hidden rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-700 dark:bg-gray-800 dark:text-white dark:hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && showMenuItems && (
          <nav className="md:hidden mt-4">
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Label
                      as="a"
                      className="block rounded-lg bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white"
                    >
                      {item}
                    </Label>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
