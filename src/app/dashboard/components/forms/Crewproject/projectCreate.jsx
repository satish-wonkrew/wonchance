"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "@/redux/slices/projectSlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";
import {
  fetchAllCompanies,
  fetchAllCompany,
  fetchCompanies,
} from "@/redux/slices/companySlice";

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

const availableGenres = [
  { value: "Action", label: "Action" },
  { value: "Drama", label: "Drama" },
  { value: "Comedy", label: "Comedy" },
  { value: "Romance", label: "Romance" },
  // Add more genres as needed
];

const CreateProject = ({ onClose, existingProject }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [formData, setFormData] = useState({
    projectName: "",
    genre: "",
    categories: "",
    projectImage: null,
    projectStartDate: "",
    projectEndDate: "",
    companyId: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAllCompany());
  }, [dispatch]);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        projectName: existingProject.projectName || "",
        genre: existingProject.genre || "",
        categories: existingProject.categories || "",
        projectImage: existingProject.projectImage || null,
        projectStartDate: existingProject.projectStartDate || "",
        projectEndDate: existingProject.projectEndDate || "",
        companyId: existingProject.companyId || "",
        description: existingProject.description || "",
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleFileUpload = (result) => {
    if (result.file) {
      setFormData((prev) => ({
        ...prev,
        projectImage: result.file,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName)
      newErrors.projectName = "Project Name is required.";
    if (!formData.genre) newErrors.genre = "Genre is required.";
    if (formData.categories.length === 0)
      newErrors.categories = "At least one category is required.";
    if (!formData.projectStartDate)
      newErrors.projectStartDate = "Project Start Date is required.";
    if (!formData.projectEndDate)
      newErrors.projectEndDate = "Project End Date is required.";
    if (!formData.companyId) newErrors.companyId = "Company is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (validateForm()) {
      const formDataObj = new FormData();

      // Append form fields to FormData
      formDataObj.append("projectName", formData.projectName);
      formDataObj.append("genre", formData.genre);
      formDataObj.append("categories", formData.categories);

      // Only append projectImage if it's selected
      if (formData.projectImage) {
        formDataObj.append("projectImage", formData.projectImage);
      } else {
        // Handle case where projectImage is required but not provided
        // You may need to show an error or provide a default value
        toast.error("Project image is required.");
        return;
      }

      formDataObj.append("projectStartDate", formData.projectStartDate);
      formDataObj.append("projectEndDate", formData.projectEndDate);
      formDataObj.append("companyId", formData.companyId);
      formDataObj.append("description", formData.description);

      try {
        // Check if we are updating an existing project or creating a new one
        if (existingProject) {
          // Ensure existingProject._id is available and correct
          await dispatch(
            updateProject({ id: existingProject._id, formData: formDataObj })
          ).unwrap();
          toast.success("Project updated successfully.");
        } else {
          await dispatch(createProject(formDataObj)).unwrap();
          toast.success("Project created successfully.");
        }

        // Close the form or redirect as needed
        onClose();
      } catch (error) {
        toast.error(
          `Failed to ${existingProject ? "update" : "create"} project: ${
            error.message
          }`
        );
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };
  const company = Array.isArray(companies) ? companies : [];
  const companyOptions = company.map((company) => ({
    value: company._id,
    label: company.companyName,
  }));

  console.log("====================================");
  console.log(company);
  console.log("====================================");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 max-w-3xl w-full mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 text-center">
          {existingProject ? "Update Project" : "Create Project"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Project Name */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectName"
              className="text-gray-700 dark:text-gray-300"
            >
              Project Name
            </Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
            )}
          </div>

          {/* Genre */}
          <div className="flex flex-col">
            <Label htmlFor="genre" className="text-gray-700 dark:text-gray-300">
              Genre
            </Label>
            <Select
              id="genre"
              name="genre"
              options={availableGenres}
              value={availableGenres.find(
                (genre) => genre.value === formData.genre
              )}
              onChange={(selectedOption) =>
                handleSelectChange("genre", [selectedOption])
              }
              placeholder="Select genre"
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
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : provided.backgroundColor,
                  color: state.isSelected ? "white" : provided.color,
                }),
              }}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <Label
              htmlFor="categories"
              className="text-gray-700 dark:text-gray-300"
            >
              Categories
            </Label>
            <Select
              id="categories"
              name="categories"
              options={availableCategories}
              isMulti
              onChange={(selectedOptions) =>
                handleSelectChange("categories", selectedOptions)
              }
              value={availableCategories.filter((option) =>
                formData.categories.includes(option.value)
              )}
              placeholder="Select categories"
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
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : provided.backgroundColor,
                  color: state.isSelected ? "white" : provided.color,
                }),
              }}
            />
            {errors.categories && (
              <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
            )}
          </div>

          {/* Project Image */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectImage"
              className="text-gray-700 dark:text-gray-300"
            >
              Project Image
            </Label>
            <AdvancedFileUpload
              onFileUpload={handleFileUpload}
              preview={formData.projectImage}
              showPreview={false}
            />
            {formData.projectImage && (
              <img
                src={URL.createObjectURL(formData.projectImage)}
                alt="Project Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md mx-auto"
              />
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectStartDate"
              className="text-gray-700 dark:text-gray-300"
            >
              Project Start Date
            </Label>
            <Input
              id="projectStartDate"
              name="projectStartDate"
              type="date"
              value={formData.projectStartDate}
              onChange={handleChange}
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.projectStartDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectStartDate}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectEndDate"
              className="text-gray-700 dark:text-gray-300"
            >
              Project End Date
            </Label>
            <Input
              id="projectEndDate"
              name="projectEndDate"
              type="date"
              value={formData.projectEndDate}
              onChange={handleChange}
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.projectEndDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectEndDate}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <Label
              htmlFor="companyId"
              className="text-gray-700 dark:text-gray-300"
            >
              Company
            </Label>
            <Select
              id="companyId"
              name="companyId"
              options={companyOptions}
              value={companyOptions?.find(
                (option) => option.value === formData.companyId
              )}
              onChange={(selectedOption) =>
                handleChange({
                  target: {
                    name: "companyId",
                    value: selectedOption ? selectedOption.value : "",
                  },
                })
              }
              placeholder="Select company"
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
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : provided.backgroundColor,
                  color: state.isSelected ? "white" : provided.color,
                }),
              }}
            />
            {errors.companyId && (
              <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="4"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {existingProject ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
