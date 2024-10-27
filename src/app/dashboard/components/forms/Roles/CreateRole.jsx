/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchAllCompanies } from "@/redux/slices/companySlice";
import {
  fetchAllProjects,
  fetchProjectsByCompany,
} from "@/redux/slices/projectSlice";
import { createRole } from "@/redux/slices/roleSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// Example suggestion lists
const skinToneOptions = [
  "Fair",
  "Light",
  "Medium",
  "Olive",
  "Tan",
  "Dark",
  "Deep",
];

const bodyTypeOptions = [
  "Slim",
  "Athletic",
  "Average",
  "Heavy",
  "Muscular",
  "Curvy",
  "Petite",
];

const CreateRole = ({ onClose, prevStep }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const { projects, status, error } = useSelector((state) => state.projects);
  const projectStatus = useSelector((state) => state.projects.status);
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    minAge: "",
    maxAge: "",
    gender: "",
    skinTone: "",
    bodyType: "",
    noOfOpenings: "",
    openingsClosed: "",
    noOfShootDate: "",
    createdBy: "", // This would be set from the authenticated user
    projectId: "", // Updated field name
    companyId: "", // Updated field name
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjectsByCompany());
    }
  }, [dispatch, projectStatus]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An error occurred."
      );
    }
  }, [error]);

  if (projectStatus === "loading") return <p>Loading...</p>;
  if (projectStatus === "failed") return <p>Error loading projects</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.roleName) newErrors.roleName = "Role Name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.minAge || !formData.maxAge)
      newErrors.ageRange = "Age range is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.noOfOpenings)
      newErrors.noOfOpenings = "Number of Openings is required.";
    if (!formData.openingsClosed)
      newErrors.openingsClosed = "Openings Closed is required.";
    if (!formData.noOfShootDate)
      newErrors.noOfShootDate = "Number of Shoot Dates is required.";
    if (!formData.projectId) newErrors.projectId = "Project is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const roleData = {
        roleName: formData.roleName,
        description: formData.description,
        ageRange: { minAge: formData.minAge, maxAge: formData.maxAge },
        gender: formData.gender,
        skinTone: formData.skinTone,
        bodyType: formData.bodyType,
        noOfOpenings: formData.noOfOpenings,
        openingsClosed: formData.openingsClosed,
        noOfShootDate: formData.noOfShootDate,
        createdBy: formData.createdBy, // Add the current user's ID here
        projectId: formData.projectId, // Updated field name
        companyId: formData.companyId, // Updated field name
      };
      console.log("====================================");
      console.log(roleData);
      console.log("====================================");

      try {
        await dispatch(createRole(roleData)).unwrap();
        toast.success("Role created successfully.");
      } catch (error) {
        toast.error(`Failed to create role: ${error.message}`);
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  const projectOptions = projects?.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  const companyOptions = companies.data?.map((project) => ({
    value: project._id,
    label: project.companyName,
  }));

  const companyId = projects;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 max-w-full sm:max-w-md md:max-w-xl lg:max-w-5xl rounded-lg shadow-lg w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0 text-gray-900 dark:text-gray-100">
            Create Role
          </h2>
          <div className="mt-4 sm:mt-0 flex flex-row gap-2">
            <Button onClick={prevStep} className="text-xs sm:text-base">
              Back
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 sm:gap-6"
        >
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
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
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
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter role description"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm h-24 sm:h-32"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Age Range */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col w-full sm:w-1/2">
              <Label
                htmlFor="minAge"
                className="text-gray-700 dark:text-gray-300"
              >
                Min Age
              </Label>
              <Input
                id="minAge"
                name="minAge"
                type="number"
                value={formData.minAge}
                onChange={handleChange}
                placeholder="Enter minimum age"
                className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
              />
              {errors.ageRange && (
                <p className="text-red-500 text-sm mt-1">{errors.ageRange}</p>
              )}
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <Label
                htmlFor="maxAge"
                className="text-gray-700 dark:text-gray-300"
              >
                Max Age
              </Label>
              <Input
                id="maxAge"
                name="maxAge"
                type="number"
                value={formData.maxAge}
                onChange={handleChange}
                placeholder="Enter maximum age"
                className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
              />
              {errors.ageRange && (
                <p className="text-red-500 text-sm mt-1">{errors.ageRange}</p>
              )}
            </div>
          </div>

          {/* Gender, Skin Tone, and Body Type */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Gender */}
            <div className="flex flex-col w-full sm:w-1/3">
              <Label className="text-gray-700 dark:text-gray-300">Gender</Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "gender")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {["Male", "Female", "Other"].map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Skin Tone */}
            <div className="flex flex-col w-full sm:w-1/3">
              <Label className="text-gray-700 dark:text-gray-300">
                Skin Tone
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "skinTone")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select skin tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Skin Tone</SelectLabel>
                    {skinToneOptions.map((tone) => (
                      <SelectItem key={tone} value={tone}>
                        {tone}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.skinTone && (
                <p className="text-red-500 text-sm mt-1">{errors.skinTone}</p>
              )}
            </div>

            {/* Body Type */}
            <div className="flex flex-col w-full sm:w-1/3">
              <Label className="text-gray-700 dark:text-gray-300">
                Body Type
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, "bodyType")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Body Type</SelectLabel>
                    {bodyTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.bodyType && (
                <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>
              )}
            </div>
          </div>

          {/* Number of Openings */}
          <div className="flex flex-col">
            <Label
              htmlFor="noOfOpenings"
              className="text-gray-700 dark:text-gray-300"
            >
              Number of Openings
            </Label>
            <Input
              id="noOfOpenings"
              name="noOfOpenings"
              type="number"
              value={formData.noOfOpenings}
              onChange={handleChange}
              placeholder="Enter number of openings"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
            />
            {errors.noOfOpenings && (
              <p className="text-red-500 text-sm mt-1">{errors.noOfOpenings}</p>
            )}
          </div>

          {/* Openings Closed */}
          <div className="flex flex-col">
            <Label
              htmlFor="openingsClosed"
              className="text-gray-700 dark:text-gray-300"
            >
              Openings Closed
            </Label>
            <Input
              id="openingsClosed"
              name="openingsClosed"
              type="number"
              value={formData.openingsClosed}
              onChange={handleChange}
              placeholder="Enter openings closed"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
            />
            {errors.openingsClosed && (
              <p className="text-red-500 text-sm mt-1">
                {errors.openingsClosed}
              </p>
            )}
          </div>

          {/* Number of Shoot Dates */}
          <div className="flex flex-col">
            <Label
              htmlFor="noOfShootDate"
              className="text-gray-700 dark:text-gray-300"
            >
              Number of Shoot Dates
            </Label>
            <Input
              id="noOfShootDate"
              name="noOfShootDate"
              type="number"
              value={formData.noOfShootDate}
              onChange={handleChange}
              placeholder="Enter number of shoot dates"
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-md shadow-sm"
            />
            {errors.noOfShootDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.noOfShootDate}
              </p>
            )}
          </div>

          {/* Project */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">Project</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "projectId")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Project</SelectLabel>
                  {projectOptions?.map((project) => (
                    <SelectItem key={project.value} value={project.value}>
                      {project.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.projectId && (
              <p className="text-red-500 text-sm mt-1">{errors.projectId}</p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-300">Company</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "companyId")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Company</SelectLabel>
                  {companyOptions?.map((project) => (
                    <SelectItem key={project.value} value={project.value}>
                      {project.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.projectId && (
              <p className="text-red-500 text-sm mt-1">{errors.projectId}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white dark:bg-blue-500"
            >
              Create Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
