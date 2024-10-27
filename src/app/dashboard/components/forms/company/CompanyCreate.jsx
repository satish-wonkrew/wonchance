/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCompany, updateCompany } from "@/redux/slices/companySlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";

const companyTypes = [
  { value: "Production House", label: "Production House" },
  { value: "Ad Agency", label: "Ad Agency" },
  // Add more types as needed
];

const availableCategories = [
  { value: "Movies", label: "Movies" },
  { value: "Anchoring", label: "Anchoring" },
  { value: "Pilot Films", label: "Pilot Films" },
  { value: "Web Series", label: "Web Series" },
  { value: "Dubbing Artist", label: "Dubbing Artist" },
  { value: "TV Serials", label: "TV Serials" },
  { value: "Ad Shoots", label: "Ad Shoots" },
  { value: "Short Films", label: "Short Films" },
  { value: "Music Albums", label: "Music Albums" },
  // Add more categories as needed
];

const CreateCompany = ({ onClose, existingCompany }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    categories: [],
    companyImage: null,
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
    ownerPhoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingCompany) {
      setFormData({
        companyName: existingCompany.companyName || "",
        companyType: existingCompany.companyType || "",
        categories: existingCompany.categories || [],
        companyImage: existingCompany.companyImage || null,
        ownerFirstName: existingCompany.ownerFirstName || "",
        ownerLastName: existingCompany.ownerLastName || "",
        ownerEmail: existingCompany.ownerEmail || "",
        ownerPhoneNumber: existingCompany.ownerPhoneNumber || "",
      });
    }
  }, [existingCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleFileUpload = (result) => {
    setFormData((prev) => ({
      ...prev,
      companyImage: result.file,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company Name is required.";
    if (!formData.companyType) newErrors.companyType = "Company Type is required.";
    if (formData.categories.length === 0) newErrors.categories = "At least one category is required.";
    if (!formData.ownerFirstName) newErrors.ownerFirstName = "Owner's First Name is required.";
    if (!formData.ownerLastName) newErrors.ownerLastName = "Owner's Last Name is required.";
    if (!formData.ownerEmail) newErrors.ownerEmail = "Owner's Email is required.";
    if (!formData.ownerPhoneNumber) newErrors.ownerPhoneNumber = "Owner's Phone Number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataObj = new FormData();
      formDataObj.append("companyName", formData.companyName);
      formDataObj.append("companyType", formData.companyType);
      formDataObj.append("categories", JSON.stringify(formData.categories));
      if (formData.companyImage) formDataObj.append("companyImage", formData.companyImage);
      formDataObj.append("ownerFirstName", formData.ownerFirstName);
      formDataObj.append("ownerLastName", formData.ownerLastName);
      formDataObj.append("ownerEmail", formData.ownerEmail);
      formDataObj.append("ownerPhoneNumber", formData.ownerPhoneNumber);

      try {
        if (existingCompany) {
          await dispatch(updateCompany({ id: existingCompany._id, formData: formDataObj })).unwrap();
          toast.success("Company updated successfully.");
        } else {
          await dispatch(createCompany(formDataObj)).unwrap();
          toast.success("Company created successfully.");
        }
        onClose();
      } catch (error) {
        toast.error(`Failed to ${existingCompany ? "update" : "create"} company: ${error.message}`);
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-8 max-w-3xl rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          {existingCompany ? "Update Company" : "Create Company"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Company Name */}
          <div className="flex flex-col">
            <Label htmlFor="companyName" className="text-gray-700 dark:text-gray-300">
              Company Name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          {/* Company Type */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">Company Type</Label>
            <div className="flex flex-col space-y-1">
              {companyTypes.map((type) => (
                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="companyType"
                    value={type.value}
                    checked={formData.companyType === type.value}
                    onChange={handleChange}
                    className="form-radio text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-900"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{type.label}</span>
                </label>
              ))}
            </div>
            {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <Label htmlFor="categories" className="text-gray-700 dark:text-gray-300">
              Categories
            </Label>
            <Select
              id="categories"
              name="categories"
              options={availableCategories}
              isMulti
              onChange={handleSelectChange}
              value={availableCategories.filter((option) => formData.categories.includes(option.value))}
              placeholder="Select Categories"
              className="react-select"
              styles={{
                container: (provided) => ({
                  ...provided,
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  marginTop: "0.25rem",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#2563eb" : provided.backgroundColor,
                  color: state.isSelected ? "white" : provided.color,
                }),
              }}
            />
            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
          </div>

          {/* Company Image */}
          <div className="flex flex-col col-span-2">
            <Label className="text-gray-700 dark:text-gray-300">Company Image</Label>
            <AdvancedFileUpload onFileUpload={handleFileUpload} />
            {errors.companyImage && <p className="text-red-500 text-sm mt-1">{errors.companyImage}</p>}
          </div>

          {/* Owner Details */}
          <div className="flex flex-col">
            <Label htmlFor="ownerFirstName" className="text-gray-700 dark:text-gray-300">
              Owner's First Name
            </Label>
            <Input
              id="ownerFirstName"
              name="ownerFirstName"
              value={formData.ownerFirstName}
              onChange={handleChange}
              placeholder="Enter owner's first name"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.ownerFirstName && <p className="text-red-500 text-sm mt-1">{errors.ownerFirstName}</p>}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="ownerLastName" className="text-gray-700 dark:text-gray-300">
              Owner's Last Name
            </Label>
            <Input
              id="ownerLastName"
              name="ownerLastName"
              value={formData.ownerLastName}
              onChange={handleChange}
              placeholder="Enter owner's last name"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.ownerLastName && <p className="text-red-500 text-sm mt-1">{errors.ownerLastName}</p>}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="ownerEmail" className="text-gray-700 dark:text-gray-300">
              Owner's Email
            </Label>
            <Input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Enter owner's email"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.ownerEmail && <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="ownerPhoneNumber" className="text-gray-700 dark:text-gray-300">
              Owner's Phone Number
            </Label>
            <Input
              id="ownerPhoneNumber"
              name="ownerPhoneNumber"
              type="tel"
              value={formData.ownerPhoneNumber}
              onChange={handleChange}
              placeholder="Enter owner's phone number"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.ownerPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.ownerPhoneNumber}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {existingCompany ? "Update Company" : "Create Company"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
