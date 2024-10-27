"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "@/redux/slices/projectSlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";
import {
  createProjectByCompany,
  fetchAllCompanies,
} from "@/redux/slices/companySlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRole from "../Roles/CreateRole";

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

const CreateProject = ({ onClose, existingProject,nextStep }) => {
  const dispatch = useDispatch();
  const [showRoleComponent, setShowRoleComponent] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const companies = useSelector((state) => state.company.companies);
  const [formData, setFormData] = useState({
    projectName: "",
    genre: "",
    categories: [],
    projectImage: null,
    projectStartDate: "",
    projectEndDate: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        projectName: existingProject.projectName || "",
        genre: existingProject.genre || "",
        categories: existingProject.categories || [],
        projectImage: existingProject.projectImage || null,
        projectStartDate: existingProject.projectStartDate || "",
        projectEndDate: existingProject.projectEndDate || "",
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
      formDataObj.append("categories", JSON.stringify(formData.categories));

      // Only append projectImage if it's selected
      if (formData.projectImage) {
        formDataObj.append("projectImage", formData.projectImage);
      } else {
        // Handle case where projectImage is required but not provided
        toast.error("Project image is required.");
        return;
      }

      formDataObj.append("projectStartDate", formData.projectStartDate);
      formDataObj.append("projectEndDate", formData.projectEndDate);
      formDataObj.append("description", formData.description);

      try {
        // Check if we are updating an existing project or creating a new one
        if (existingProject) {
          // Ensure existingProject._id is available and correct
          await dispatch(
            updateProject({ id: existingProject._id, formData: formDataObj })
          ).unwrap();

          toast.success("Project updated successfully.");
          onClose(); // Close the form or redirect as needed
        } else {
          await dispatch(createProjectByCompany(formDataObj)).unwrap();
          setShowRoleComponent(true);
          setDialogOpen(true); // Open the confirmation dialog
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-8 max-w-3xl rounded-lg shadow-lg w-full">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            {existingProject ? "Update Project" : "Create Project"}
          </h2>
          {/* <Button
            onClick={() => {
              setDialogOpen(true); // Open the confirmation dialog
            }}
          >
            Next
          </Button> */}
          <Button onClick={nextStep}
          >
            Next
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
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
                    ? "#f9fafb"
                    : "white",
                  color: state.isSelected ? "#111827" : "#4b5563",
                  ":active": {
                    backgroundColor: state.isSelected
                      ? "#f9fafb"
                      : "#f3f4f6",
                  },
                }),
              }}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
            )}
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
              value={availableCategories.filter((cat) =>
                formData.categories.includes(cat.value)
              )}
              onChange={(selectedOptions) =>
                handleSelectChange("categories", selectedOptions)
              }
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
                    ? "#f9fafb"
                    : "white",
                  color: state.isSelected ? "#111827" : "#4b5563",
                  ":active": {
                    backgroundColor: state.isSelected
                      ? "#f9fafb"
                      : "#f3f4f6",
                  },
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
              id="projectImage"
              onFileUpload={handleFileUpload}
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.projectImage && (
              <p className="text-red-500 text-sm mt-1">{errors.projectImage}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectStartDate"
              className="text-gray-700 dark:text-gray-300"
            >
              Start Date
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
              <p className="text-red-500 text-sm mt-1">{errors.projectStartDate}</p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <Label
              htmlFor="projectEndDate"
              className="text-gray-700 dark:text-gray-300"
            >
              End Date
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
              <p className="text-red-500 text-sm mt-1">{errors.projectEndDate}</p>
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
              rows="4"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            {existingProject ? "Update Project" : "Create Project"}
          </Button>
        </form>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div></div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Created Successfully</DialogTitle>
              <DialogDescription>
                The project has been created successfully. Do you want to create roles for this project now?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  setShowRoleComponent(true);
                  setDialogOpen(false);
                }}
              >
                Yes
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setDialogOpen(false);
                  onClose();
                }}
              >
                No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Conditionally Render CreateRole Component */}
        {showRoleComponent && <CreateRole onClose={() => setShowRoleComponent(false)} />}
      </div>
    </div>
  );
};

export default CreateProject;
