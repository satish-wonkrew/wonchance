import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "@/redux/slices/projectSlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";
import { DialogClose } from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const availableCategories = [
  { value: "Web Series", label: "Web Series" },
  { value: "Comedy", label: "Comedy" },
  { value: "Thriller", label: "Thriller" },
  { value: "Drama", label: "Drama" },
];

const availableGenres = [
  { value: "Comedy", label: "Comedy" },
  { value: "Thriller", label: "Thriller" },
  { value: "Drama", label: "Drama" },
];

const UpdateProject = ({ project, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    categories: [],
    genre: [],
    projectImage: "", // Ensure it's a string
    projectStartDate: new Date(),
    projectEndDate: new Date(),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || "",
        description: project.description || "",
        categories: project.categories || [],
        genre: project.genre || [],
        projectImage: project.projectImage || "", // Ensure it's a string
        projectStartDate: project.projectStartDate
          ? new Date(project.projectStartDate)
          : new Date(),
        projectEndDate: project.projectEndDate
          ? new Date(project.projectEndDate)
          : new Date(),
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleFileUpload = (result) => {
    // Ensure result.file is a string URL or path
    setFormData((prev) => ({
      ...prev,
      projectImage: result.file || "", // Set to an empty string if no file
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = "Project Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.categories.length) newErrors.categories = "At least one category is required.";
    if (!formData.genre.length) newErrors.genre = "At least one genre is required.";
    if (!formData.projectStartDate) newErrors.projectStartDate = "Start Date is required.";
    if (!formData.projectEndDate) newErrors.projectEndDate = "End Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (validateForm()) {
      const updatedData = {
        projectName: formData.projectName,
        description: formData.description,
        categories: formData.categories,
        genre: formData.genre,
        projectImage: formData.projectImage, // Ensure this is a string
        projectStartDate: formData.projectStartDate.toISOString(),
        projectEndDate: formData.projectEndDate.toISOString(),
      };

      // Check if project ID is valid
      if (!project || !project._id) {
        console.error("Project ID is not defined");
        toast.error("Project ID is not defined.");
        return;
      }

      try {
        // Log data being sent to the backend for debugging
        console.log("Updating project with ID:", project._id);
        console.log("Updated Data:", updatedData);

        // Dispatch the updateProject action
        await dispatch(
          updateProject({ projectId: project._id, updatedData })
        ).unwrap();

        toast.success("Project updated successfully.");
        onClose();
      } catch (error) {
        console.error("Failed to update project:", error);
        toast.error(`Failed to update project: ${error.message}`);
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  if (!project) {
    return <p>Loading...</p>; // Or redirect the user to another page
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2"
      >
        Close &times;
      </Button>
      <div className="bg-white dark:bg-gray-800 p-8 max-w-3xl rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Update Project
        </h2>
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

          {/* Description */}
          <div className="flex flex-col">
            <Label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Categories
            </Label>
            <Select
              isMulti
              id="categories"
              options={availableCategories}
              onChange={(options) => handleSelectChange(options, "categories")}
              value={availableCategories.filter((option) =>
                formData.categories.includes(option.value)
              )}
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

          {/* Genre */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">Genre</Label>
            <Select
              isMulti
              id="genre"
              options={availableGenres}
              onChange={(options) => handleSelectChange(options, "genre")}
              value={availableGenres.filter((option) =>
                formData.genre.includes(option.value)
              )}
              placeholder="Select Genre"
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

          {/* Project Image */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Project Image
            </Label>
            <AdvancedFileUpload
              onUpload={handleFileUpload}
              file={formData.projectImage}
            />
            {errors.projectImage && (
              <p className="text-red-500 text-sm mt-1">{errors.projectImage}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
            <DatePicker
              selected={formData.projectStartDate}
              onChange={(date) => handleDateChange(date, "projectStartDate")}
              dateFormat="yyyy-MM-dd"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.projectStartDate && (
              <p className="text-red-500 text-sm mt-1">{errors.projectStartDate}</p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
            <DatePicker
              selected={formData.projectEndDate}
              onChange={(date) => handleDateChange(date, "projectEndDate")}
              dateFormat="yyyy-MM-dd"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.projectEndDate && (
              <p className="text-red-500 text-sm mt-1">{errors.projectEndDate}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
          >
            Update Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
