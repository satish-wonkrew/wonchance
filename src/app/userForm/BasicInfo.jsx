/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CDatePicker } from "@coreui/react";
import DateOfBirthPicker from "@/components/etc/DateofBirth";
import { useUser } from "@/hooks/useUser";
const BasicInfo = ({ nextStep, prevStep, onFormDataChange, formData }) => {
  const [dateOfBirth, setDateOfBirth] = useState(
    formData.profile?.dateOfBirth
      ? new Date(formData.profile.dateOfBirth)
      : null
  );
  const [age, setAge] = useState(formData.profile?.age);
  const user = useUser();
  const profiltype = user.user?.ageGroup;
  const ageGroup = profiltype;

  console.log("====================================");
  console.log(ageGroup);
  console.log("====================================");
  useEffect(() => {
    if (dateOfBirth) {
      const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (
          month < 0 ||
          (month === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      };
      setAge(calculateAge(dateOfBirth));
      onFormDataChange({
        profile: {
          ...formData.profile,
          dateOfBirth: dateOfBirth.toISOString(),
          age: calculateAge(dateOfBirth),
        },
      });
    }
  }, [dateOfBirth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ profile: { ...formData.profile, [name]: value } });
  };

  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="profile.firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.firstName"
              name="firstName"
              value={formData.profile?.firstName || ""}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.lastName"
              name="lastName"
              value={formData.profile?.lastName || ""}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.screenName">
              Screen Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.screenName"
              name="screenName"
              value={formData.profile?.screenName || ""}
              onChange={handleChange}
              placeholder="Enter your screen name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.dateOfBirth">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <DateOfBirthPicker
              value={formData.profile?.dateOfBirth}
              onDateChange={handleDateChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              disabled
              type="number"
              id="age"
              name="age"
              value={age}
              readOnly
              className="mt-1 bg-gray-100 border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>

          {ageGroup === "adult" ? null : (
            <>
              <div>
                <Label htmlFor="profile.fathersName">
                  Father Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="profile.fathersName"
                  name="fathersName"
                  value={formData.profile?.fathersName || ""}
                  onChange={handleChange}
                  placeholder="Enter your Father Name"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="profile.mothersName">
                  Mother Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="profile.motherName"
                  name="mothersName"
                  value={formData.profile?.mothersName || ""}
                  onChange={handleChange}
                  placeholder="Enter your Mother Name"
                  required
                  className="mt-1"
                />
              </div>
            </>
          )}

          {ageGroup === "kid" ? null : (
            <div className="mb-4">
              <Label
                htmlFor="profile.maritalStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Marital Status <span className="text-red-500">*</span>
              </Label>

              <select
                id="profile.maritalStatus"
                name="maritalStatus"
                value={formData.profile?.maritalStatus || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          )}

          <div>
            <Label htmlFor="profile.nativeState">
              Native State <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.nativeState"
              name="nativeState"
              value={formData.profile?.nativeState || ""}
              onChange={handleChange}
              placeholder="Enter your native state"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.nativePlace">
              Native Place <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.nativePlace"
              name="nativePlace"
              value={formData.profile?.nativePlace || ""}
              onChange={handleChange}
              placeholder="Enter your native place"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.nationality">
              Nationality <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.nationality"
              name="nationality"
              value={formData.profile?.nationality || ""}
              onChange={handleChange}
              placeholder="Enter your nationality"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.currentCity">
              Current City <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.currentCity"
              name="currentCity"
              value={formData.profile?.currentCity || ""}
              onChange={handleChange}
              placeholder="Enter your current city"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="profile.address"
              name="address"
              value={formData.profile?.address || ""}
              onChange={handleChange}
              placeholder="Enter your full address"
              required
              className="mt-1"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between flex-wrap">
          <Button
            onClick={prevStep}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
