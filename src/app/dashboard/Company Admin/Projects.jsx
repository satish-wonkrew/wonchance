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
import {
  fetchProjectsByCompany,
  deleteProject,
} from "@/redux/slices/projectSlice";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import { useTheme } from "next-themes";
import Modal from "@/components/ui/modal";
import { formatDate } from "@/utils/formatDate";
import UpdateProject from "../components/forms/Crewproject/UpdateProject";
import CreateProject from "../components/forms/Crewproject/ProjectbyCompany";
import StepForm from "../stepForm";
import CreateRole from "../components/forms/Roles/CreateRole";
import { useRouter } from 'next/navigation'; // Import useRouter

const ProjectsByCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
  const { projects, status, error } = useSelector((state) => state.projects);
  const { theme } = useTheme();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false); // Add this state
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProjectsByCompany());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An error occurred."
      );
    }
  }, [error]);

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSortChange = (event) => setSort(event.target.value);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewDetails = (project) => {
    router.push(`/dashboard/project/${project._id}`); // Redirect to the project detail page
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowUpdateForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        toast.success("Project deleted successfully!");
      } catch (err) {
        toast.error(err || "Failed to delete project.");
      }
    }
  };

  const handleAddProject = () => {
    setShowProjectForm(true);
  };

  const handleAddRole = () => {
    setShowRoleForm(true); // Set the state to show the role form
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const projectArray = Array.isArray(projects) ? projects : [];

  const filteredProjects = projectArray
    .filter((project) =>
      project.projectName?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.projectName.localeCompare(b.projectName);
      }
      if (sort === "category") {
        return a.categories.join(", ").localeCompare(b.categories.join(", "));
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

  if (status === "failed") return <p>Error loading projects: {error}</p>;

  return (
    <div
      className={`p-5 md:px-10 lg:px-20 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="font-bold text-3xl mb-6">Projects by Company</h2>
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
            variant="outline"
            onClick={handleAddProject}
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
      {showProjectForm && <StepForm onClose={() => setShowProjectForm(false)} />}
      {showRoleForm && <CreateRole onClose={() => setShowRoleForm(false)} />}
      {showUpdateForm && selectedProject && (
        <UpdateProject
          project={selectedProject}
          onClose={() => {
            setShowUpdateForm(false);
            setSelectedProject(null);
          }}
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
                  <strong>Genre:</strong> {selectedProject.genre.join(", ")}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Description:</strong> {selectedProject.description}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Categories:</strong>{" "}
                  {selectedProject.categories.join(", ")}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  <strong>Company:</strong>{" "}
                  {selectedProject.company.companyName}
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
                {selectedProject.projectImage ? (
                  <img
                    src={`${IMAGE_API_END_POINT}${selectedProject.projectImage}`}
                    alt={selectedProject.projectName || "Project Image"}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.length > 0 ? (
          paginatedProjects.map((project) => (
            <Card
              key={project._id}
              className="bg-white dark:bg-gray-800 shadow-md"
            >
              <CardHeader>
                <CardTitle className="font-extrabold text-xl">
                  {truncateText(project.projectName, 25)}
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-300">
                  {truncateText(project.categories.join(", "), 30)}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-40 overflow-hidden">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {truncateText(project.description, 100)}
                </p>
                {project.projectImage && (
                  <img
                    src={`${IMAGE_API_END_POINT}${project.projectImage}`}
                    alt={project.projectName}
                    className="w-full h-auto mt-4 rounded-lg"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={() => handleViewDetails(project)}
                >
                  View Details
                </Button>
                <Button variant="primary" onClick={() => handleEdit(project)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
            No projects found.
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default ProjectsByCompany;
