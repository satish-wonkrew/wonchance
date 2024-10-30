"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const router = usePathname();
  const noFooterRoutes = ["/auth", "/signup", "/dashboard"]; // Include dashboard and other routes

  // Hide footer on authentication and dashboard pages
  if (noFooterRoutes.includes(router.pathname)) return null;

  return (
    <footer className="bg-black text-white">
      <div className="container py-10 mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center md:items-start space-y-10 md:space-y-0">
        {/* Left Section: Logo and Socials */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="mb-4">
            <Image
              src="/Img/home/Logo.png"
              alt="Wonchance Logo"
              width={150}
              height={40}
            />
          </div>
          <h2 className="text-xl font-semibold">
            From Wonchance to Ad Spotlight!
          </h2>
          <p className="text-gray-400">Follow Us</p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaWhatsapp className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaYoutube className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/talents" className="hover:text-white transition">
                Talents
              </a>
            </li>
            <li>
              <a href="/casting-call" className="hover:text-white transition">
                Casting Call
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Initiative */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-4">An initiative by</h3>
          <div className="mb-4">
            <Image
              src="/Img/footer/Wonkrew.png"
              alt="Wonkrew Logo"
              width={150}
              height={30}
            />
          </div>
          <div>
            <Image
              src="/Img/footer/scream.png"
              alt="Scream Creations Logo"
              width={150}
              height={30}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t py-2 border-gray-800 pt-6 flex flex-col lg:flex-row justify-between items-center px-4 md:px-8 lg:px-16">
        <p className="text-gray-500 text-sm">
          ©2023 Satz Venture Nurturers Pvt Ltd. All Rights Reserved.
        </p>
        <p className="text-sm text-gray-500 mt-4 lg:mt-0">
          Made with <span className="text-red-500">❤</span> by{" "}
          <a href="#" className="text-white hover:underline transition">
            WONKREW
          </a>
        </p>
      </div>
    </footer>
  );
}
