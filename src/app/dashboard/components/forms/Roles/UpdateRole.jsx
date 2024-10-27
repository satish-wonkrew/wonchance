import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "@/redux/slices/roleSlice"; // Adjust import path as needed
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import AdvancedFileUpload from "@/components/AdvancedFileUpload";
import { DialogClose } from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const skinTones = [
  { value: "Light", label: "Light" },
  { value: "Medium", label: "Medium" },
  { value: "Dark", label: "Dark" },
];

const bodyTypes = [
  { value: "Slim", label: "Slim" },
  { value: "Average", label: "Average" },
  { value: "Athletic", label: "Athletic" },
  { value: "Heavy", label: "Heavy" },
];

const UpdateRole = ({ role, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    skinTone: [],
    bodyType: [],
    noOfOpenings: "",
    openingsClosed: "",
    noOfShootDate: "",
    roleImage: "",
    createdBy: "",
    projectId: "",
    companyId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (role) {
      setFormData({
        roleName: role.roleName || "",
        description: role.description || "",
        skinTone: role.skinTone || [],
        bodyType: role.bodyType || [],
        noOfOpenings: role.noOfOpenings || "",
        openingsClosed: role.openingsClosed || "",
        noOfShootDate: role.noOfShootDate || "",
        roleImage: role.roleImage || "",
        createdBy: role.createdBy || "",
        projectId: role.projectId || "",
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.roleName) newErrors.roleName = "Role Name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.skinTone.length)
      newErrors.skinTone = "At least one skin tone is required.";
    if (!formData.bodyType.length)
      newErrors.bodyType = "At least one body type is required.";
    if (!formData.noOfOpenings)
      newErrors.noOfOpenings = "Number of Openings is required.";
    if (!formData.openingsClosed)
      newErrors.openingsClosed = "Number of Openings Closed is required.";
    if (!formData.noOfShootDate)
      newErrors.noOfShootDate = "Number of Shoot Dates is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedData = {
        roleName: formData.roleName,
        description: formData.description,
        skinTone: formData.skinTone,
        bodyType: formData.bodyType,
        noOfOpenings: formData.noOfOpenings,
        openingsClosed: formData.openingsClosed,
        noOfShootDate: formData.noOfShootDate,
        createdBy: formData.createdBy,
        projectId: formData.projectId,
      };

      if (!role || !role._id) {
        console.error("Role ID is not defined");
        toast.error("Role ID is not defined.");
        return;
      }

      try {
        console.log("Updating role with ID:", role._id);
        console.log("Updated Data:", updatedData);

        await dispatch(updateRole({ roleId: role._id, updatedData })).unwrap();

        toast.success("Role updated successfully.");
        onClose();
      } catch (error) {
        console.error("Failed to update role:", error);
        toast.error(`Failed to update role: ${error.message}`);
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  if (!role) {
    return <p>Loading...</p>;
  }
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2"
      >
        <span className="sr-only">Close</span>&times;
      </Button>
      <div className="bg-white dark:bg-gray-800 p-8 max-w-3xl rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Update Role
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div className="flex flex-col">
            <Label
              htmlFor="roleName"
              className="text-gray-700 dark:text-gray-300"
            >
              Role Name
            </Label>
            <Input
              id="roleName"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              placeholder="Enter role name"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.roleName && (
              <p className="text-red-500 text-sm mt-1">{errors.roleName}</p>
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
              placeholder="Enter role description"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Skin Tone */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Skin Tone
            </Label>
            <Select
              isMulti
              id="skinTone"
              options={skinTones}
              onChange={(options) => handleSelectChange(options, "skinTone")}
              value={skinTones.filter((option) =>
                formData.skinTone.includes(option.value)
              )}
              placeholder="Select Skin Tone"
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
            {errors.skinTone && (
              <p className="text-red-500 text-sm mt-1">{errors.skinTone}</p>
            )}
          </div>

          {/* Body Type */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Body Type
            </Label>
            <Select
              isMulti
              id="bodyType"
              options={bodyTypes}
              onChange={(options) => handleSelectChange(options, "bodyType")}
              value={bodyTypes.filter((option) =>
                formData.bodyType.includes(option.value)
              )}
              placeholder="Select Body Type"
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
            {errors.bodyType && (
              <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>
            )}
          </div>

          {/* Number of Openings */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Number of Openings
            </Label>
            <Input
              id="noOfOpenings"
              name="noOfOpenings"
              type="number"
              value={formData.noOfOpenings}
              onChange={handleChange}
              placeholder="Enter number of openings"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.noOfOpenings && (
              <p className="text-red-500 text-sm mt-1">{errors.noOfOpenings}</p>
            )}
          </div>

          {/* Openings Closed */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Openings Closed
            </Label>
            <Input
              id="openingsClosed"
              name="openingsClosed"
              type="number"
              value={formData.openingsClosed}
              onChange={handleChange}
              placeholder="Enter number of openings closed"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.openingsClosed && (
              <p className="text-red-500 text-sm mt-1">
                {errors.openingsClosed}
              </p>
            )}
          </div>

          {/* Number of Shoot Dates */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Number of Shoot Dates
            </Label>
            <Input
              id="noOfShootDate"
              name="noOfShootDate"
              type="number"
              value={formData.noOfShootDate}
              onChange={handleChange}
              placeholder="Enter number of shoot dates"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.noOfShootDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.noOfShootDate}
              </p>
            )}
          </div>

          {/* Project Name */}

          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">
              Project Name
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transition-transform transform hover:scale-105"
          >
            Update Role
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRole;
