import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllCompanies } from "@/redux/slices/companySlice";
import { fetchProjectsByCompanis } from "@/redux/slices/projectSlice";
import {
  fetchAllUsers,
  updateUserApprovalStatus,
  deleteUser,
  assignUserToProject,
} from "@/redux/slices/talentSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.talent);
  const companies = useSelector((state) => state.company.companies);
  const { projects, projectStatus } = useSelector((state) => state.projects);
  const route = useRouter();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 50;
  // Local state for filters, search, and assignment inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [assignError, setAssignError] = useState(null);
  const [isAssigning, setIsAssigning] = useState(null); // To toggle assignment inputs

  // Fetch all users on component mount
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  // Fetch all companies on component mount
  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  const getNextApprovalStatus = (currentStatus) => {
    switch (currentStatus) {
      case "active":
        return "inactive"; // Revoking approval
      case "inactive":
        return "pending"; // Setting to pending
      case "pending":
        return "active"; // Approving the user
      default:
        return "pending"; // Default to pending if status is unknown
    }
  };

  const getButtonLabel = (currentStatus) => {
    switch (currentStatus) {
      case "active":
        return "Revoke Approval";
      case "inactive":
        return "Set to Pending";
      case "pending":
        return "Approve User";
      default:
        return "Approve User";
    }
  };
  const getApprovalLabel = (status) => {
    switch (status) {
      case "active":
        return "Approved"; // User is approved
      case "inactive":
        return "Not Approved"; // User is not approved
      case "pending":
        return "Pending Approval"; // User is pending approval
      default:
        return "Unknown Status"; // In case of unexpected status
    }
  };

  // Fetch projects by selected company
  useEffect(() => {
    if (selectedCompanyId) {
      dispatch(fetchProjectsByCompanis(selectedCompanyId));
    }
  }, [dispatch, selectedCompanyId, projectStatus]);

  console.log("====================================");
  console.log(selectedCompanyId);
  console.log("====================================");
  // Handle errors with toast
  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An error occurred."
      );
    }
  }, [error]);
  // Handlers for search and filter inputs
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);
  const handleFilterRoleChange = (e) => setFilterRole(e.target.value);
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  // Pagination handlers
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleApprove = (userId, currentStatus) => {
    const newStatus = getNextApprovalStatus(currentStatus);
    dispatch(updateUserApprovalStatus({ userId, isApproved: newStatus }));
  };
  console.log("====================================");
  console.log(projects);
  console.log("====================================");
  // Handler to assign a user to both project and company
  const handleAssignToProject = async (userId) => {
    if (!selectedProjectId || !selectedCompanyId) {
      setAssignError("Both Project and Company ID are required.");
      return;
    }

    const payload = {
      projectId: selectedProjectId,
      companyId: selectedCompanyId,
      userId: userId, // userId passed into the function
    };

    try {
      // Dispatch the action to assign the user to both project and company
      await dispatch(assignUserToProject(payload)).unwrap();

      // Clear inputs and errors on success
      setSelectedProjectId("");
      setSelectedCompanyId("");
      setAssignError(null);
      setIsAssigning(null); // Hide inputs after assignment
      toast.success("User successfully assigned to project.");
    } catch (error) {
      setAssignError(error.message);
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
  console.log("====================================");
  console.log(users);
  console.log("====================================");

  // Filter and sort users based on search term and selected filters
  const filteredUsers = users
    .filter((user) => {
      const fullName =
        `${user.profile.firstName} ${user.profile.lastName}`.toLowerCase();
      const email = user.profile?.email?.toLowerCase();
      const whatsappNumber = user.whatsappNumber?.toLowerCase();
      const wctId = user.wctId?.toLowerCase();
      const role = user.role?.toLowerCase();

      return (
        (fullName.includes(searchTerm.toLowerCase()) ||
          email?.includes(searchTerm.toLowerCase()) ||
          whatsappNumber?.includes(searchTerm.toLowerCase()) ||
          wctId?.includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" ||
          (filterStatus === "active" && user.isApproved === "active") ||
          (filterStatus === "inactive" && user.isApproved === "inactive") ||
          (filterStatus === "pending" && user.isApproved === "pending")) &&
        (filterRole === "all" || user.role === filterRole)
      );
    })
    .sort((a, b) => {
      const aField = a.profile[sortField]?.toLowerCase() || "";
      const bField = b.profile[sortField]?.toLowerCase() || "";
      if (sortOrder === "asc") {
        return aField.localeCompare(bField);
      } else {
        return bField.localeCompare(aField);
      }
    });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Users List
      </h1>
      {/* Count Users Data */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:gap-6">
        <p className="text-gray-700 dark:text-gray-300">
          Total Users: {users.length}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Approved Users:{" "}
          {users.filter((user) => user.isApproved === "active").length}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Not Approved Users:{" "}
          {users.filter((user) => user.isApproved === "inactive").length}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Pending Approval:{" "}
          {users.filter((user) => user.isApproved === "pending").length}
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:gap-6">
        <input
          type="text"
          placeholder="Search by name, email, WCT ID or WhatsApp number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border w-80 border-gray-300 rounded-md"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="active">Approved</option>
          <option value="inactive">Not Approved</option>
          <option value="pending">Pending Approval</option>
        </select>

        <select
          value={filterRole}
          onChange={handleFilterRoleChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="crew">Crew</option>
          <option value="talent">Talent</option>
        </select>
        <select
          value={sortField}
          onChange={handleSortFieldChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="firstName">Sort by First Name</option>
          <option value="lastName">Sort by Last Name</option>
          <option value="email">Sort by Email</option>
        </select>
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Assignment Inputs */}
      {isAssigning && (
        <div className="mb-4 flex gap-4">
          <Select onValueChange={setSelectedCompanyId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Company</SelectLabel>
                {companyOptions?.map((company) => (
                  <SelectItem key={company.value} value={company.value}>
                    {company.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedProjectId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Project" />
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
        </div>
      )}

      {assignError && <p className="text-red-600">{assignError}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div
              className={`absolute top-0 right-0 mt-4 mr-4 px-3 py-1 text-sm font-medium rounded-full ${
                user.isApproved === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : user.isApproved === "inactive"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" // For "pending"
              }`}
            >
              {getApprovalLabel(user.isApproved)}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={
                    user.profilePictureUrl || "https://placehold.co/150x150.png"
                  }
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.profile.firstName} {user.profile.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Phone:</strong> {user.whatsappNumber || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>ID:</strong> {user.wctId || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Role:</strong> {user.role || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Address:</strong> {user.profile.address || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4">
              <Button
                className="mr-2"
                variant="secondary"
                onClick={() => handleApprove(user._id, user.isApproved)}
              >
                {getButtonLabel(user.isApproved)}
              </Button>
              {/* <Button
                variant="destructive"
                onClick={() => dispatch(deleteUser(user.id))}
              >
                Delete User
              </Button> */}
              <Button
                className="mx-2"
                onClick={() => window.open(`/talent/${user.wctId}`, "_blank")}
              >
                View
              </Button>
              <Button
                className="mx-2"
                onClick={() =>
                  window.open(
                    `/dashboard/admin/userForm/${user.wctId}`,
                    "_blank"
                  )
                }
              >
                Update
              </Button>
              <Button
                className="mt-2"
                variant="primary"
                onClick={() =>
                  setIsAssigning((prevUserId) =>
                    prevUserId === user.id ? null : user.id
                  )
                }
              >
                {isAssigning === user.id
                  ? "Cancel Assignment"
                  : "Assign to Project"}
              </Button>
              {isAssigning === user.id && (
                <Button
                  className="mt-2"
                  variant="primary"
                  onClick={() => handleAssignToProject(user.id)}
                >
                  Confirm Assignment
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminUsers;
