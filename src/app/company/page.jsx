"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";
import {
  fetchAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/redux/slices/companySlice";

export default function CompanyForm() {
  const dispatch = useDispatch();
  const { companies, status, error } = useSelector((state) => state.company);

  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("Production House");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null); // For editing
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCompanies()); // Fetch companies when component mounts
  }, [dispatch]);

  const categories = [
    "Movies",
    "Music",
    "Fashion",
    "Technology",
    "Sports",
    "Education",
    "Entertainment",
  ];

  const handleFileUpload = (result) => {
    setSelectedFile(result.file);
  };

  const handleCategorySelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCategoryInput("");
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== categoryToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !firstName || !lastName || !phoneNumber || !email) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyType", companyType);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("ownerFirstName", firstName);
    formData.append("ownerLastName", lastName);
    formData.append("ownerPhoneNumber", phoneNumber);
    formData.append("ownerEmailId", email);
    if (selectedFile) {
      formData.append("companyImage", selectedFile);
    }

    try {
      let response;
      if (editMode) {
        response = await fetch(
          `${COMPANY_API_END_POINT}/${selectedCompany._id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await fetch(`${COMPANY_API_END_POINT}`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      const text = await response.text();

      try {
        const result = JSON.parse(text);
        if (response.ok) {
          if (editMode) {
            toast.success("Company updated successfully.");
          } else {
            toast.success(result.message);
          }
          dispatch(fetchAllCompanies()); // Refresh the list of companies
          resetForm();
        } else {
          toast.error(result.message || "An error occurred.");
        }
      } catch (error) {
        toast.error(`Server responded with non-JSON data: ${text}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setCompanyName("");
    setCompanyType("Production House");
    setSelectedCategories([]);
    setCategoryInput("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setSelectedFile(null);
    setSelectedCompany(null);
    setEditMode(false);
  };

  const handleEditCompany = (company) => {
    setCompanyName(company.name);
    setCompanyType(company.type);
    setSelectedCategories(company.categories);
    setFirstName(company.ownerFirstName);
    setLastName(company.ownerLastName);
    setPhoneNumber(company.ownerPhoneNumber);
    setEmail(company.ownerEmailId);
    setSelectedCompany(company);
    setEditMode(true);
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await fetch(`${COMPANY_API_END_POINT}/${companyId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const text = await response.text();

        try {
          const result = JSON.parse(text);
          if (response.ok) {
            toast.success("Company deleted successfully.");
            dispatch(fetchAllCompanies()); // Refresh the list of companies
          } else {
            toast.error(result.message || "An error occurred.");
          }
        } catch (error) {
          toast.error(`Server responded with non-JSON data: ${text}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <AdvancedFileUpload onFileUpload={handleFileUpload} />

        <p className="text-xs text-gray-500 mt-2">Maximum File Size: 1MB</p>
        <p className="text-xs text-gray-500">
          Recommended Resolution: 1080px X 1920px
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Company Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
            />
            <FaSearch className="absolute top-3 right-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Company Type
          </label>
          <div className="flex items-center space-x-8">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="companyType"
                value="Production House"
                checked={companyType === "Production House"}
                onChange={() => setCompanyType("Production House")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-800">Production House</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="companyType"
                value="Ad Agency"
                checked={companyType === "Ad Agency"}
                onChange={() => setCompanyType("Ad Agency")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-800">Ad Agency</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Category
          </label>
          <Command className="w-full border border-gray-300 rounded-lg shadow-sm">
            <CommandInput
              placeholder="Select a category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
            <CommandList>
              <CommandEmpty>No matching categories found.</CommandEmpty>
              <CommandGroup>
                {categories
                  .filter(
                    (category) =>
                      category
                        .toLowerCase()
                        .includes(categoryInput.toLowerCase()) &&
                      !selectedCategories.includes(category)
                  )
                  .map((category) => (
                    <CommandItem
                      key={category}
                      onSelect={() => handleCategorySelect(category)}
                    >
                      {category}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="inline-flex items-center bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {category}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-2 text-xs text-gray-400 hover:text-gray-600 transition-all duration-150 ease-in-out"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Details
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
            />
          </div>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="primary"
          className="w-full mt-6"
        >
          {editMode ? "Update Company" : "Submit"}
        </Button>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Company List
          </h2>
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company._id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.type}</p>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleEditCompany(company)}
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Button>
                  <Button
                    onClick={() => handleDeleteCompany(company._id)}
                    variant="danger"
                    className="flex items-center space-x-2"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
