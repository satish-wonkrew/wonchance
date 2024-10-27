import Link from 'next/link';
import React from 'react';

const UserWaitingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-gray-200">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl text-center">
        {/* Navigation Bar */}
        <nav className="w-full mb-8">
          <ul className="flex justify-center space-x-8 text-blue-600 font-semibold">
            <li>
              <Link href="/" className="hover:text-blue-800 transition duration-300">Home</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-800 transition duration-300">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* Header message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">We Are Processing Your Request</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your submission! Our team is reviewing your details. You will be notified via email once the review is completed.
        </p>

        {/* Loading animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>

        {/* Additional links to other actions (if needed) */}
        <div className="mb-8">
          <p className="text-gray-500">
            Need assistance? You can always go back to the <Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link> page or check your <Link href="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>.
          </p>
        </div>

        {/* Company Contact Details */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions, feel free to contact us using the details below:
          </p>
          <div className="mt-4 text-left space-y-2">
            <p className="text-gray-700">
              <strong>Company Name:</strong> YourCompany Ltd.
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:support@yourcompany.com" className="text-blue-500 hover:text-blue-700">support@yourcompany.com</a>
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> <a href="tel:+11234567890" className="text-blue-500 hover:text-blue-700">+1 (123) 456-7890</a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 1234 Main Street, City, Country
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWaitingPage;
