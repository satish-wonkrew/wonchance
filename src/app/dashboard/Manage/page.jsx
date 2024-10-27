"use client";
import React, { useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import CastingList from "../crew/casting";
import Adminusers from "../admin/adminUsers";
import AssignedUsers from "../Company Admin/AssignedUsers";
import CreateProjectForm from "../components/forms/Crewproject/ProjectbyCompany";
import ProjectsByCompany from "../Company Admin/Projects";
import CastingsList from "../Company Admin/Casting-Call";
import Settings from "../Company Admin/Settings";
import AssignedProjects from "../Project Admin/Projects";
import CastingCalls from "../Project Admin/CastingCall";
import AdminCasting from "../admin/casting";
import { AdminCastingCreate } from "../components/forms/Casting/CreateCastingByAdmin";

const Home = lazy(() => import("../crew/Home"));
const Projects = lazy(() => import("../admin/Project"));
const CompanyList = lazy(() => import("../admin/Company"));
const Application = lazy(() => import("../crew/Application"));
const Roles = lazy(() => import("../crew/Roles"));

const Manage = () => {
  const currentView = useSelector((state) => state.view?.currentView || "home");

  const renderContent = useMemo(() => {
    switch (currentView) {
      case "home":
        return <Home />;
      case "projects":
        return <Projects />;
      case "company":
        return <CompanyList />;
      case "application":
        return <Application />;
      case "roles":
        return <Roles />;
      case "casting-call":
        return <CastingList />;
      case "users":
        return <Adminusers />;
      case "adminCasting":
        return <AdminCastingCreate />;

      //Company Admin
      case "AssignedUsers":
        return <AssignedUsers />;
      case "CompanyProject":
        return <ProjectsByCompany />;
      case "CastingByCompany":
        return <CastingsList />;
      case "Admin-Company-Srttings":
        return <Settings />;

      // Project Admin
      case "MyProjects":
        return <AssignedProjects />;
      case "CastingbyProject":
        return <CastingCalls />;
      // Add more cases as needed...
      default:
        return <Home />;
    }
  }, [currentView]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-800">
      <Suspense fallback={<div>Loading...</div>}>{renderContent}</Suspense>
    </div>
  );
};

export default Manage;
