/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignedCompanyDetails,
  updateCompanyDetails,
} from "@/redux/slices/companySlice";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import LoadingSpinner from "@/components/ui/loading";
import { toast } from "sonner";

const Settings = () => {
  const dispatch = useDispatch();
  const { companyDetails, status, error } = useSelector(
    (state) => state.company
  );
  const { assignedCompany } = useSelector((state) => state.company);

  const [formData, setFormData] = useState({
    companyName: "",
    ownerFirstName: "",
    ownerLastName: "",
  });

  // Fetch company details when component mounts
  useEffect(() => {
    dispatch(fetchAssignedCompanyDetails());
  }, [dispatch]);

  // Populate form with current company details
  useEffect(() => {
    if (companyDetails && companyDetails.companyDetails) {
      setFormData({
        companyName: companyDetails.companyDetails.companyName || "",
        ownerFirstName: companyDetails.companyDetails.ownerFirstName || "",
        ownerLastName: companyDetails.companyDetails.ownerLastName || "",
      });
    }
  }, [companyDetails]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompanyDetails(formData));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <div className="flex flex-col md:flex-row items-center mb-8">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mb-6 md:mb-0 md:mr-6">
          <img
            src={
              `${IMAGE_API_END_POINT}${assignedCompany?.companyImage}` ||
              "/Img/Usericon.png"
            }
            alt="Company Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          />
          <button
            className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            onClick={() =>{
              // Upload company profile image
              // Add file upload logic here
              toast.warning('Img Upload Coming Soon!')
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v16h16V4H4zM4 4l8 8-8 8m16-16l-8 8 8 8"
              />
            </svg>
          </button>
        </div>
        {/* Company Info */}
        <div className="flex-grow">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            {assignedCompany?.companyName || "Company Name"}
          </h2>
          <p className="text-gray-500">
            {assignedCompany?.description ||
              "A brief company description goes here."}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Update Company Details
      </h2>

      {/* Loading spinner */}
      {status === "loading" && (
        <div className="flex justify-center mb-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Error message */}
      {error && <div className="mb-4 text-red-600">Error: {error}</div>}

      {assignedCompany && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Non-editable company details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Owner First Name
              </label>
              <input
                type="text"
                value={assignedCompany.ownerFirstName || ""}
                disabled
                className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Owner Last Name
              </label>
              <input
                type="text"
                value={assignedCompany.ownerLastName || ""}
                disabled
                className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                value={assignedCompany.ownerPhoneNumber || ""}
                disabled
                className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Created At
              </label>
              <input
                type="text"
                value={
                  assignedCompany.createdAt
                    ? new Date(assignedCompany.createdAt).toLocaleDateString()
                    : ""
                }
                disabled
                className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Editable fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
                className="w-full mt-1 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner First Name
              </label>
              <input
                type="text"
                name="ownerFirstName"
                value={formData.ownerFirstName}
                onChange={handleChange}
                placeholder="Enter owner's first name"
                required
                className="w-full mt-1 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Last Name
              </label>
              <input
                type="text"
                name="ownerLastName"
                value={formData.ownerLastName}
                onChange={handleChange}
                placeholder="Enter owner's last name"
                required
                className="w-full mt-1 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Update Company
            </button>
          </div>
        </form>
      )}

      {/* Success message */}
      {status === "succeeded" && (
        <p className="mt-4 text-green-600">
          Company details updated successfully
        </p>
      )}
    </div>
  );
};

export default Settings;
