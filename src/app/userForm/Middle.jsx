import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import languageOptions from "@/data/languageOptions.json";
// import socialMediaOptions from "@/data/socialMediaOptions.json";
import interestOptions from "@/data/interestOptions.json";
import skillOptions from "@/data/skillOptions.json";
import { useUser } from "@/hooks/useUser";
const comfortableClothing = {
  "Casual wear": {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Sleeveless: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Pants: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Shorts: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Jeans: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Shirts: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  "T-Shirt": {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Skirt: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
  "Swim wear": {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
  },
  Suit: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
  },
  Kurta: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
  },
  Lungi: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
  },
  Sherwani: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
  },
  Dhoti: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
  },
  Western: {
    hideForMaleKids: true,
    hideForFemaleKids: false,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
  Saree: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
  Kurti: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
  Gown: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
  "Indo-Western": {
    hideForMaleKids: true,
    hideForFemaleKids: false,
    hideForMaleAdults: true,
    hideForFemaleAdults: false,
  },
};

const comfortableWith = {
  "Body painting": {
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForMaleKids: false,
    hideForFemaleKids: false,
  },
  Singing: {
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForMaleKids: false,
    hideForFemaleKids: false,
  },
  Shirtless: {
    hideForMaleAdults: false,
    hideForFemaleAdults: true,
    hideForMaleKids: true,
    hideForFemaleKids: true,
  },
  "Outstation shoot": {
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForMaleKids: false,
    hideForFemaleKids: false,
  },
  Dancing: {
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForMaleKids: false,
    hideForFemaleKids: false,
  },
  "Fight scene": {
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForMaleKids: false,
    hideForFemaleKids: false,
  },
  "Kissing scene": {
    hideForMaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForFemaleKids: true,
  },
  "Bold scenes": {
    hideForMaleKids: true,
    hideForMaleAdults: false,
    hideForFemaleAdults: false,
    hideForFemaleKids: true,
  },
  Topless: {
    hideForMaleKids: true,
    hideForFemaleKids: true,
    hideForMaleAdults: true,
  },

  "Semi nude": { hideForMaleKids: true, hideForFemaleKids: true },
  Nude: { hideForMaleKids: true, hideForFemaleKids: true },
};

const interestedShoots = {
  "Saree shoot": { hideForMaleAdults: true, hideForMaleKids: true },
  "Lehenga shoot": { hideForMaleAdults: true, hideForMaleKids: true },
  "Ramp show": { hideForMaleAdults: true, hideForMaleKids: true },
  "Designer shoot": { hideForMaleAdults: true, hideForMaleKids: true },
  "Western shoot": { hideForMaleAdults: true, hideForMaleKids: true },
  "Calendar shoots": { hideForMaleAdults: true, hideForMaleKids: true },
  "Bikini shoot": {
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForMaleKids: true,
  },
  "Lingerie shoot": {
    hideForFemaleKids: true,
    hideForMaleAdults: true,
    hideForMaleKids: true,
  },
};

const interestedMedia = {
  "Music albums": {},
  "TV serials": {},
  "Web series": {},
  Anchoring: {},
  Movies: {},
  "Pilot films": {},
  "Short Films": {},
  "AD shoots": {},
};

const interestedRoles = {
  Hero: { hideForFemaleAdults: true, hideForFemaleKids: true },
  Heroine: { hideForMaleAdults: true, hideForMaleKids: true },
  "Supporting Cast": {},
  Villain: {},
  Cameo: {},
  "Junior Artist/Background Artist": {},
  "Recurring Character": {},
};

const MidlleInfo = ({ nextStep, prevStep, onFormDataChange, formData }) => {
  const [experienceLevel, setExperienceLevel] = useState(
    formData.profile?.experienceLevel || "Fresher"
  );
  const socialMediaOptions = [
    { key: "facebook", label: "Facebook" },
    { key: "twitter", label: "Twitter" },
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "youtube", label: "YouTube" },
  ];

  const [educationalQualification, setEducationalQualification] = useState(
    formData.profile?.educationalQualification || ""
  );
  const [speakingLanguages, setSpeakingLanguages] = useState(
    formData.profile?.speakingLanguages || []
  );
  const [readingLanguages, setReadingLanguages] = useState(
    formData.profile?.readingLanguages || []
  );
  const [physicalDetails, setPhysicalDetails] = useState(
    formData.profile?.physicalDetails || {}
  );
  const [workDetails, setWorkDetails] = useState(
    formData.profile?.workDetails?.projects || []
  );
  const [skillDetails, setSkillDetails] = useState({
    driving: formData.profile?.skillDetails?.driving || [],
    singing: formData.profile?.skillDetails?.singing || [],
    danceStyle: formData.profile?.skillDetails?.danceStyle || [],
    martialArts: formData.profile?.skillDetails?.martialArts || [],
    waterActivities: formData.profile?.skillDetails?.waterActivities || [],
  });
  const [certifications, setCertifications] = useState(
    formData.profile?.skillDetails?.certifications || []
  );
  const [socialMediaProfiles, setSocialMediaProfiles] = useState(
    formData.profile?.socialMedia || {}
  );
  const user = useUser();
  const [gender, setGender] = useState(user.user.gender || "male");
  const [ageGroup, setAgeGroup] = useState(user.user.ageGroup);

  const [interests, setInterests] = useState({
    hobbies: formData.profile?.interests?.hobbies || [],
    genres: formData.profile?.interests?.genres || [],
    interestedMedia: formData.profile?.interests?.interestedMedia || [],
    interestedRoles: formData.profile?.interests?.interestedRoles || [],
    comfortableWith: formData.profile?.interests?.comfortableWith || [],
    comfortableClothing: formData.profile?.interests?.comfortableClothing || [],
    interestedShoots: formData.profile?.interests?.interestedShoots || [],
  });
  const [tattoos, setTattoos] = useState(
    !!formData.profile?.physicalDetails?.tattoos
  );
  const [piercings, setPiercings] = useState(
    !!formData.profile?.physicalDetails?.piercings
  );
  const [availability, setAvailability] = useState(
    formData.profile?.workDetails?.availability || "Full-time"
  );

  const handleLanguagesChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    if (field === "speakingLanguages") {
      setSpeakingLanguages(values);
      onFormDataChange({
        profile: { ...formData.profile, speakingLanguages: values },
      });
    } else if (field === "readingLanguages") {
      setReadingLanguages(values);
      onFormDataChange({
        profile: { ...formData.profile, readingLanguages: values },
      });
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #cbd5e1", // Base border color
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      "&:hover": {
        border: "1px solid #60a5fa", // Border color on hover
      },
      "&:focus": {
        border: "1px solid #3b82f6", // Border color on focus
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)", // Focus outline
      },
      borderRadius: "8px", // Rounded edges (smaller radius for modern look)
      padding: "0.4rem 0.6rem", // Adjusted padding for reduced height
      minHeight: "25px", // Minimum height to control size
      transition: "border-color 0.2s ease, box-shadow 0.2s ease", // Smooth transitions
      fontSize: "0.875rem", // Smaller font size for a more modern look
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#bfdbfe", // Background color for selected items
      borderRadius: "8px", // Rounded edges
      transition: "background-color 0.2s ease", // Smooth transition for hover
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      padding: "0.1rem 0.4rem", // Adjusted padding for multiValue
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1e40af", // Color of the label in selected items
      fontWeight: "600", // Bold font for better readability
      padding: "0.1rem 0.4rem", // Padding for better spacing
      fontSize: "0.75rem", // Smaller font size for a modern touch
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#1e40af", // Color of the remove button
      cursor: "pointer", // Change cursor to pointer
      ":hover": {
        color: "#ef4444", // Change color on hover
        backgroundColor: "rgba(239, 68, 68, 0.1)", // Highlight background on hover
      },
      transition: "color 0.2s ease", // Smooth transition for color change
      padding: "0 0.2rem", // Padding for remove button
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#a1a1aa", // Placeholder color
      fontWeight: "400", // Lighter font weight for placeholder
      fontSize: "0.875rem", // Consistent font size with control
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px", // Rounded edges for dropdown
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for dropdown
      zIndex: 9999, // Ensure dropdown appears above other elements
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#e0f2fe"
        : state.isSelected
        ? "#bfdbfe"
        : "white", // Change background color based on state
      color: "#1e40af", // Text color
      cursor: "pointer", // Change cursor to pointer
      transition: "background-color 0.2s ease", // Smooth transition for background color
      fontSize: "0.875rem", // Consistent font size with other elements
      padding: "0.4rem 0.6rem", // Padding for options
      ":active": {
        backgroundColor: "#60a5fa", // Background color on active
      },
    }),
  };

  const handleGenderChange = (e) => setGender({});
  const handleAgeGroupChange = (e) => setAgeGroup();

  const handlePhysicalDetailChange = (field, value) => {
    setPhysicalDetails((prev) => ({ ...prev, [field]: value }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        physicalDetails: { ...physicalDetails, [field]: value },
      },
    });
  };

  const removeWorkExperience = (index) => {
    const updatedWorkDetails = workDetails.filter((_, i) => i !== index);
    setWorkDetails(updatedWorkDetails);
    onFormDataChange({
      profile: {
        ...formData.profile,
        workDetails: updatedWorkDetails,
      },
    });
  };

  const handleWorkChange = (field, value) => {
    const updatedWorkDetails = {
      ...workDetails,
      [field]: value,
    };
    setWorkDetails(updatedWorkDetails);
    onFormDataChange({
      profile: {
        ...formData.profile,
        workDetails: updatedWorkDetails,
      },
    });
  };

  // const addWorkExperience = () => {
  //   const newWorkExperience = {
  //     experience: "",
  //     projects: [],
  //     availability: "",
  //     movies: "",
  //     upcomingProjects: "",
  //     shootPerDay: "",
  //     achievements: "",
  //     internationalMovie: "",
  //     worklinks: "",
  //   };
  //   setWorkDetails([...workDetails, newWorkExperience]);
  // };

  const handleSkillChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    // Update the skillDetails state for the specific field
    setSkillDetails((prev) => {
      const updatedDetails = { ...prev, [field]: values };

      // Call onFormDataChange with the updated skillDetails
      onFormDataChange({
        profile: {
          ...formData.profile,
          skillDetails: updatedDetails,
        },
      });

      return updatedDetails; // Return the updated state
    });
  };
  const handleSkillDetailChange = (index, value) => {
    const updatedSkills = [...skillDetails.skills];
    updatedSkills[index] = value; // Assuming value is a string for the skill title
    setSkillDetails((prev) => ({ ...prev, skills: updatedSkills }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        skillDetails: { ...skillDetails, skills: updatedSkills },
      },
    });
  };

  const addSkill = () => {
    const newSkill = ""; // Adjust if you need more detail for new skills
    setSkillDetails((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...skillDetails.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setSkillDetails((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        skillDetails: {
          ...skillDetails,
          certifications: updatedCertifications,
        },
      },
    });
  };

  const addCertification = () => {
    setSkillDetails((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", institution: "", year: new Date().getFullYear() },
      ],
    }));
  };
  const handleSocialMediaChange = (value, profile) => {
    setSocialMediaProfiles((prev) => ({ ...prev, [profile]: value }));

    onFormDataChange({
      ...formData,
      profile: {
        ...formData.profile,
        socialMedia: {
          ...formData.profile.socialMedia,
          [profile]: value,
        },
      },
    });
  };

  // const handleInterestsChange = (selectedOptions, field) => {
  //   const values = selectedOptions
  //     ? selectedOptions.map((option) => option.value)
  //     : [];
  //   setInterests((prev) => ({ ...prev, [field]: values }));
  //   onFormDataChange({
  //     profile: {
  //       ...formData.profile,
  //       interests: { ...interests, [field]: values },
  //     },
  //   });
  // };

  // Handle Change for Interests
  const handleInterestsChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setInterests((prev) => {
      const updatedInterests = { ...prev, [field]: values };
      // Update the form data
      onFormDataChange({
        profile: {
          ...formData.profile,
          interests: updatedInterests,
        },
      });
      return updatedInterests; // Update state
    });
  };

  // Get available options based on selected gender and age group
  const getAvailableOptions = (data) => {
    return Object.entries(data)
      .filter(([key, value]) => {
        if (gender === "male" && ageGroup === "adult") {
          return !value.hideForMaleAdults; // Adults
        }
        if (gender === "male" && ageGroup === "kid") {
          return !value.hideForMaleKids; // Kids
        }
        if (gender === "female" && ageGroup === "adult") {
          return !value.hideForFemaleAdults; // Adults
        }
        if (gender === "female" && ageGroup === "kid") {
          return !value.hideForFemaleKids; // Kids
        }
        return true; // Show all if no gender/age group is selected
      })
      .map(([key]) => ({ value: key, label: key })); // Return formatted options
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg max-sm:col-span-2 shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <RadioGroup
              value={experienceLevel}
              onValueChange={(value) => {
                setExperienceLevel(value);
                onFormDataChange({
                  profile: { ...formData.profile, experienceLevel: value },
                });
              }}
              className="mt-2 flex flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fresher" id="r1" />
                <Label htmlFor="r1">Fresher</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Experienced" id="r2" />
                <Label htmlFor="r2">Experienced</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-4">
            <Label htmlFor="educationalQualification">
              Educational Qualification <span className="text-red-500">*</span>
            </Label>
            <Input
              id="educationalQualification"
              value={educationalQualification}
              onChange={(e) => {
                setEducationalQualification(e.target.value);
                onFormDataChange({
                  profile: {
                    ...formData.profile,
                    educationalQualification: e.target.value,
                  },
                });
              }}
              className="mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="speakingLanguages">
              Speaking Languages <span className="text-red-500">*</span>
            </Label>
            <Select
              isMulti
              options={languageOptions}
              value={speakingLanguages.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              onChange={(options) =>
                handleLanguagesChange(options, "speakingLanguages")
              }
              styles={customStyles}
              className="mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="readingLanguages">Reading Languages</Label>
            <Select
              isMulti
              options={languageOptions}
              value={readingLanguages.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              onChange={(options) =>
                handleLanguagesChange(options, "readingLanguages")
              }
              styles={customStyles}
              className="mt-2"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-lg max-sm:col-span-2 shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <form>
            <div className="mb-4">
              {Object.keys(skillOptions).map((field) => (
                <div key={field} className="mt-4">
                  <Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {field === "mandatorySkill" && (
                      <span className="text-red-500">*</span>
                    )}{" "}
                    {/* Marking a specific field as mandatory */}
                  </Label>
                  <Select
                    isMulti
                    options={skillOptions[field]}
                    value={skillDetails[field].map((skill) => ({
                      value: skill,
                      label: skill,
                    }))}
                    styles={customStyles}
                    onChange={(options) => handleSkillChange(options, field)}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Physical Details */}
        <div className="bg-white p-6 rounded-lg col-span-2 shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Physical Details</h2>
          <form>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Height Input */}
                <div className="mt-2">
                  <Label>
                    Height (cm) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    min={50}
                    max={250}
                    value={physicalDetails.height || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("height", e.target.value)
                    }
                    placeholder="Enter height in cm"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Weight Input */}
                <div className="mt-2">
                  <Label>
                    Weight (kg) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.weight || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("weight", e.target.value)
                    }
                    placeholder="Enter weight in kg"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Chest Input */}
                <div className="mt-2">
                  <Label>
                    Chest (cm) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.Chest || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("Chest", e.target.value)
                    }
                    placeholder="Enter chest in cm"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Waist Input */}
                <div className="mt-2">
                  <Label>
                    Waist (cm) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.waist || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("waist", e.target.value)
                    }
                    placeholder="Enter waist in cm"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Hip Input */}
                <div className="mt-2">
                  <Label>
                    Hip (cm) <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.hips || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("hips", e.target.value)
                    }
                    placeholder="Enter hip in cm"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Shoe Size Input */}
                <div className="mt-2">
                  <Label>Shoe Size</Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.shoeSize || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("shoeSize", e.target.value)
                    }
                    placeholder="Enter shoe size"
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Eye Color Select */}
                <div className="mt-2">
                  <Label>Eye Color</Label>
                  <select
                    value={physicalDetails.eyeColor || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("eyeColor", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select Eye Color
                    </option>
                    {/* Eye Color Option amber, blue, black, brown, gray, green, hazel, or red, */}
                    <option value="Amber">Amber</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Hazel">Hazel</option>
                    <option value="Brown">Brown</option>
                    <option value="Black">Black</option>
                    <option value="Gray">Gray</option>
                    <option value="Violet">Red</option>
                  </select>
                </div>

                {/* Skin Tone Select */}
                <div className="mt-2">
                  <Label>Skin Tone</Label>
                  <select
                    value={physicalDetails.skinTone || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("skinTone", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select skin tone
                    </option>
                    {/* Pale white, White to light beige, Beige, Light brown, Moderate brown and Dark brown or black add */}
                    <option value="Pale White">Pale White</option>
                    <option value="White to Light Beige">
                      White to Light Beige
                    </option>
                    <option value="Beige">Beige</option>
                    <option value="Light Brown">Light Brown</option>
                    <option value="Moderate Brown">Moderate Brown</option>
                    <option value="Dark Brown">Dark Brown</option>
                    <option value="Black">Black</option>
                  </select>
                </div>

                {/* Body Type Select */}
                <div className="mt-2">
                  <Label>Body Type</Label>
                  <select
                    value={physicalDetails.bodyType || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("bodyType", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select body type
                    </option>
                    <option value="Slim">Slim</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Average">Average</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-2">
                <Label>Body Shape</Label>
                <select
                  value={physicalDetails.bodyShape || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("bodyShape", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select body shape
                  </option>
                  <option value="Apple">Apple</option>
                  <option value="Pear">Pear</option>
                  <option value="Hourglass">Hourglass</option>
                  <option value="Rectangle">Rectangle</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Social Media Profiles */}
        <div className="bg-white max-sm:col-span-2 p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Social Media Profiles</h2>
          <form>
            <div className="mb-4">
              {socialMediaOptions.map((profile) => (
                <div key={profile.key} className="mt-4">
                  <Label>
                    {profile.label} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    required // Make this field mandatory
                    value={socialMediaProfiles[profile.key] || ""}
                    onChange={(e) =>
                      handleSocialMediaChange(e.target.value, profile.key)
                    }
                    placeholder={`Your ${profile.label}`}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Work Details */}
        <div className="bg-white max-sm:col-span-2 p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Work Details</h2>
          <form>
            <div className="mb-4">
              <Label>
                <span className="font-bold">Movies</span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                required // Make this field mandatory
                value={workDetails.movies}
                onChange={(e) => handleWorkChange("movies", e.target.value)}
                placeholder="Movies"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">International Movie</span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                required // Make this field mandatory
                value={workDetails.internationalMovie}
                onChange={(e) =>
                  handleWorkChange("internationalMovie", e.target.value)
                }
                placeholder="International Movie"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">Achievements</span>
              </Label>
              <Input
                value={workDetails.achievements}
                onChange={(e) =>
                  handleWorkChange("achievements", e.target.value)
                }
                placeholder="Achievements"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">Experience</span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                required // Make this field mandatory
                value={workDetails.experience}
                onChange={(e) => handleWorkChange("experience", e.target.value)}
                placeholder="Experience"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">Upcoming Projects</span>
              </Label>
              <Input
                value={workDetails.upcomingProjects}
                onChange={(e) =>
                  handleWorkChange("upcomingProjects", e.target.value)
                }
                placeholder="Upcoming Projects"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">Shoot Per Day</span>
              </Label>
              <Input
                value={workDetails.shootPerDay}
                onChange={(e) =>
                  handleWorkChange("shootPerDay", e.target.value)
                }
                placeholder="Shoot Per Day"
                className="mb-2"
              />
            </div>
          </form>
        </div>

        {/* Interested Details */}
        <div className="bg-white p-6 col-span-2 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Interested Details</h2>
          <form>
            <div className="mb-4">
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <div className="w-full">
                  {ageGroup === "kid" ? null : (
                    <>
                      <h3 className="font-medium">
                        Comfortable Clothing{" "}
                        <span className="text-red-500">*</span>
                      </h3>
                      <Select
                        isMulti
                        options={getAvailableOptions(comfortableClothing)}
                        isDisabled={!gender || !ageGroup} // Disable if gender or age group is not selected
                        onChange={(selectedOptions) =>
                          handleInterestsChange(
                            selectedOptions,
                            "comfortableClothing"
                          )
                        }
                        styles={customStyles}
                        value={interests.comfortableClothing.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-gray-700 font-medium">
                    Interested In <span className="text-red-500">*</span>
                  </label>
                  <Select
                    styles={customStyles}
                    isMulti
                    options={getAvailableOptions(comfortableWith)}
                    isDisabled={!gender || !ageGroup}
                    onChange={(selectedOptions) =>
                      handleInterestsChange(selectedOptions, "comfortableWith")
                    }
                    value={interests.comfortableWith?.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4"></div>

            <div className="mb-4">
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <div className="w-full">
                  {gender === "male" ? null : (
                    <div>
                      <h3 className="font-medium">Interested Shoots</h3>
                      <Select
                        styles={customStyles}
                        isMulti
                        options={getAvailableOptions(interestedShoots)}
                        isDisabled={!gender || !ageGroup}
                        onChange={(selectedOptions) =>
                          handleInterestsChange(
                            selectedOptions,
                            "interestedShoots"
                          )
                        }
                        value={interests.interestedShoots.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <h3 className="font-medium">
                    Interested Media <span className="text-red-500">*</span>
                  </h3>
                  <Select
                    styles={customStyles}
                    isMulti
                    options={getAvailableOptions(interestedMedia)}
                    isDisabled={!gender || !ageGroup}
                    onChange={(selectedOptions) =>
                      handleInterestsChange(selectedOptions, "interestedMedia")
                    }
                    value={interests.interestedMedia.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
                <div className="w-full">
                  <h3 className="font-medium">
                    Interested Roles <span className="text-red-500">*</span>
                  </h3>
                  <Select
                    styles={customStyles}
                    isMulti
                    options={getAvailableOptions(interestedRoles)}
                    isDisabled={!gender || !ageGroup}
                    onChange={(selectedOptions) =>
                      handleInterestsChange(selectedOptions, "interestedRoles")
                    }
                    value={interests.interestedRoles.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4"></div>
          </form>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default MidlleInfo;
