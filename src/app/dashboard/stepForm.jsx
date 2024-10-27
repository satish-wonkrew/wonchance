"use client";
import React, { useState } from "react";
import CreateProject from "./components/forms/Crewproject/ProjectbyCompany";
import CreateRole from "./components/forms/Roles/CreateRole";
import { CreateCastingCall } from "./components/forms/Casting/CreateCasting";

const StepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <CreateProject
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 2:
      return (
        <CreateRole
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    default:
      return <div>Not Found</div>;
  }
};

export default StepForm;
