"use client"
import React from "react";
import { MainContent } from "./components/CompanyUi/maincontent";
import CompanyList from "./components/CompanyList";
import Manage from "./Manage/page";
import ProjectList from "./admin/Project";

const page = () => {
  return (
    <div>
      {/* <MainContent /> */}
      <Manage/>
      {/* <CompanyList/> */}
    </div>
  );
};

export default page;
