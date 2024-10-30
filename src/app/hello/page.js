import { Button } from "@/components/ui/button";
import {
  fetchAllCompanies,
  fetchProjectsByCompanis,
} from "@/redux/slices/companySlice";
import {
  fetchAllUsers,
  updateUserApprovalStatus,
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
  const usersPerPage = 10;

  // Local state for filters, search, and assignment inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [assignError, setAssignError] = useState(null);
  const [isAssigning, setIsAssigning] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCompanyId) {
      dispatch(fetchProjectsByCompanis(selectedCompanyId));
    }
  }, [dispatch, selectedCompanyId, projectStatus]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An error occurred."
      );
    }
  }, [error]);

  // Handlers for search, filter, and sort inputs
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

  const handleApprove = (userId, isApproved) => {
    dispatch(updateUserApprovalStatus({ userId, isApproved }));
  };

  const handleAssignToProject = async (userId) => {
    if (!selectedProjectId || !selectedCompanyId) {
      setAssignError("Both Project and Company ID are required.");
      return;
    }

    const payload = {
      projectId: selectedProjectId,
      companyId: selectedCompanyId,
      userId: userId,
    };

    try {
      await dispatch(assignUserToProject(payload)).unwrap();
      setSelectedProjectId("");
      setSelectedCompanyId("");
      setAssignError(null);
      setIsAssigning(null);
      toast.success("User successfully assigned to project.");
    } catch (error) {
      setAssignError(error.message);
    }
  };

  const filteredUsers = currentUsers
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
          (filterStatus === "approved" && user.isApproved) ||
          (filterStatus === "notApproved" && !user.isApproved)) &&
        (filterRole === "all" || role === filterRole)
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

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Users List
      </h1>

      <div className="mb-4 flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Search and Filter Controls */}
        <input
          type="text"
          placeholder="Search by name, email, WCT ID or WhatsApp number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border w-80 border-gray-300 rounded-md"
        />
        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="notApproved">Not Approved</option>
        </select>
        {/* Role Filter */}
        <select
          value={filterRole}
          onChange={handleFilterRoleChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="crew">Crew</option>
          <option value="talent">Talent</option>
        </select>
      </div>

      {/* Users List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.profile.firstName} {user.profile.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>

            <Button
              variant="primary"
              onClick={() =>
                window.open(`/talent/${user.wctId}`, "_blank")
              }
              className="mt-2"
            >
              View Profile
            </Button>
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
