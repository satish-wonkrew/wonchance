/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { deleteProject, fetchAllProjects } from "@/redux/slices/projectSlice";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import { useTheme } from "next-themes";
import Modal from "@/components/ui/modal";
import { formatDate } from "@/utils/formatDate";
import CreateProject from "../components/forms/Crewproject/projectCreate";
import UpdateProject from "../components/forms/Crewproject/UpdateProject";
import CreateRole from "../components/forms/Roles/CreateRole";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const projectStatus = useSelector((state) => state.projects.status);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchAllProjects());
    }
  }, [dispatch, projectStatus]);
  const handleAddRole = () => {
    setShowRoleForm(true); // Set the state to show the role form
  };
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
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSortChange = (event) => setSort(event.target.value);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log("====================================");
  console.log(projects);
  console.log("====================================");

  const handleViewDetails = (project) => setSelectedProject(project);
  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowUpdateForm(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const projectArray = Array.isArray(projects) ? projects : [];

  console.log("====================================");
  console.log(projectArray);
  console.log("====================================");
  const filteredProjects = projectArray
    .filter((project) =>
      project.projectName?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.projectName.localeCompare(b.projectName);
      }
      if (sort === "category") {
        return a.projectCategory.localeCompare(b.projectCategory);
      }
      return 0;
    });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`p-5 md:px-10 lg:px-20 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="font-bold text-3xl mb-6">Project List</h2>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <select
            value={sort}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            Add New Project
          </Button>
          <Button
            onClick={handleAddRole} // Add the onClick event for adding roles
          >
            Add New Role
          </Button>
        </div>
      </div>
      {showForm && <CreateProject onClose={() => setShowForm(false)} />}
      {showRoleForm && <CreateRole onClose={() => setShowRoleForm(false)} />}
      {showUpdateForm && (
        <UpdateProject
          project={selectedProject}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
      {selectedProject && !showUpdateForm && (
        <Modal
          onClose={() => setSelectedProject(null)}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
              {selectedProject.projectName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Genre:</strong> {selectedProject.genre}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 flex overflow-auto flex-wrap">
                  <strong>Description:</strong>
                  {truncateText(selectedProject.description, 25)}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Categories:</strong>{" "}
                  {selectedProject.categories.join(", ")}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Company:</strong> {selectedProject.ownerFirstName}{" "}
                  {selectedProject.company?.companyName}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  <strong>Start Date:</strong>{" "}
                  {formatDate(selectedProject.projectStartDate)}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  <strong>End Date:</strong>{" "}
                  {formatDate(selectedProject.projectEndDate)}
                </p>
              </div>
              <div>
                <img
                  src={`${IMAGE_API_END_POINT}${selectedProject.projectImage}`}
                  alt={selectedProject.projectName || "Project Image"}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
                  Company: {selectedProject.company?.companyName}
                </h2>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Owner:</strong>{" "}
                  {selectedProject.company?.ownerFirstName}{" "}
                  {selectedProject.company?.ownerLastName}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  <strong>Categories:</strong>{" "}
                  {selectedProject.company?.categories.join(", ")}
                </p>
              </div>
              <div>
                <img
                  src={`${IMAGE_API_END_POINT}${selectedProject.company?.companyImage}`}
                  alt={selectedProject.company?.companyName || "Company Image"}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6"></div>
          </div>
        </Modal>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.length > 0 ? (
          paginatedProjects.map((project) => (
            <Card
              key={project._id}
              className={`relative bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : ""
              }`}
            >
              <CardHeader className="relative">
                <img
                  src={`${IMAGE_API_END_POINT}${project.projectImage}`}
                  alt={project.projectName || "Project Image"}
                  className="object-cover w-full h-32 transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-lg font-semibold">Featured</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold">
                  {project.projectName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {truncateText(project.description, 20)}
                </CardDescription>
                <strong>
                  Company:{" "}
                  {truncateText(project.company?.companyName, 35) || "N/A"}
                </strong>

                <p className="text-gray-700 mt-2">
                  {project.categories?.join(", ")}
                </p>
                <p className="mt-2 text-gray-600">
                  Genre: {project.genre?.join(", ")}
                </p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Start Date
                  </span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {project.projectStartDate
                      ? new Date(project.projectStartDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Unknown"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    End Date
                  </span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {project.projectEndDate
                      ? new Date(project.projectEndDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Ongoing"}
                  </span>
                </div>
              </CardFooter>
              <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                    onClick={() => handleViewDetails(project)}
                    aria-label={`View details of ${project.projectName}`}
                  >
                    View Details
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleEdit(project)}
                      aria-label={`Edit ${project.projectName}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDelete(project._id)}
                      aria-label={`Delete ${project.projectName}`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="mr-2"
        >
          Previous
        </Button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProjectList;
