// app/_not-found.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Example of using a custom button component
import { motion } from 'framer-motion'; // Animation library

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Animated Image */}

      {/* Main Content */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Interactive Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search our site..."
          className="p-2 border border-gray-300 rounded-lg"
        />
        <Button className="ml-2 bg-primary hover:bg-blue-700 text-white">
          Search
        </Button>
      </div>

      {/* Call to Action */}
      <div className="space-x-4 mb-8">
        <Link href="/" passHref>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/contact" passHref>
          <Button className="bg-gray-500 hover:bg-gray-600 text-white">
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Fun Elements */}
      <div className="text-sm text-gray-500">
        <p>Feeling lost? Check out these links:</p>
        <ul className="mt-2">
          <li>
            <Link href="/about">
              <span className="text-blue-500 hover:underline">About Us</span>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <span className="text-blue-500 hover:underline">Blog</span>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <span className="text-blue-500 hover:underline">FAQ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
