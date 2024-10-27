"use client";
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
const comfortableclothing = {
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

const interestedIn = {
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
    skills: formData.profile?.skillDetails?.skills || [],
    certifications: formData.profile?.skillDetails?.certifications || [],
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
    comfortableclothing: formData.profile?.interests?.comfortableclothing || [],
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

  const addWorkExperience = () => {
    const newWorkExperience = {
      experience: "",
      projects: [],
      availability: "",
      movies: "",
      upcomingProjects: "",
      shootPerDay: "",
      achievements: "",
      internationalMovie: "",
      worklinks: "",
    };
    setWorkDetails([...workDetails, newWorkExperience]);
  };

  const handleSkillChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    // Update the skillDetails state for the specific field
    setSkillDetails((prev) => {
      const updatedDetails = { ...prev, [field]: values };

      // Call onFormDataChange with the updated skillDetails
      onFormDataChange({
        ...formData,
        skillDetails: updatedDetails,
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
        <div className="bg-white p-6 rounded-lg shadow-md border">
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
              className="mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="readingLanguages">
              Reading Languages <span className="text-red-500">*</span>
            </Label>
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
              className="mt-2"
              required
            />
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <form>
            <div className="mb-4">
              {Object.keys(skillOptions).map((field) => (
                <div key={field} className="mt-4">
                  <Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    isMulti
                    options={skillOptions[field]}
                    value={skillDetails[field].map((skill) => ({
                      value: skill,
                      label: skill,
                    }))}
                    onChange={(options) => handleSkillChange(options, field)}
                    className="mt-2"
                    required
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
              <div className="flex flex-row gap-3 justify-evenly">
                <div className="mt-2 w-full">
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
                    className="border rounded p-1 mt-1 w-full"
                    required
                  />
                </div>
                <div className="mt-2 w-full">
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
                    className="border rounded p-1 mt-1 w-full"
                    required
                  />
                </div>
                {/* Add similar structure for other fields... */}
              </div>
            </div>
          </form>
        </div>

        {/* Social Media Profiles */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Social Media Profiles</h2>
          <form>
            <div className="mb-4">
              {socialMediaOptions.map((profile) => (
                <div key={profile.key} className="mt-4">
                  <Label>
                    {profile.label} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={socialMediaProfiles[profile.key] || ""}
                    onChange={(e) =>
                      handleSocialMediaChange(e.target.value, profile.key)
                    }
                    placeholder={`Your ${profile.label}`}
                    className="mt-2"
                    required
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
        {/* Work Details */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Work Details</h2>
          <form>
            <div className="mb-4">
              <Label>
                <span className="font-bold">
                  Movies
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                value={workDetails.movies}
                onChange={(e) => handleWorkChange("movies", e.target.value)}
                placeholder="Movies"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">
                  International Movie<span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
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
                <span className="font-bold">
                  Achievements<span className="text-red-500">*</span>
                </span>
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
                <span className="font-bold">
                  Experience<span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                value={workDetails.experience}
                onChange={(e) => handleWorkChange("experience", e.target.value)}
                placeholder="Experience"
                className="mb-2"
              />
            </div>
            <div className="mb-4">
              <Label>
                <span className="font-bold">
                  Upcoming Projects<span className="text-red-500">*</span>
                </span>
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
                <span className="font-bold">
                  Shoot PerDay<span className="text-red-500">*</span>
                </span>
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
          <h2 className="text-xl font-semibold mb-4">
            Interested Details<span className="text-red-500">*</span>
          </h2>
          <form>
            <div className="mb-4">
              <div className="flex justify-evenly gap-3">
                <div className="w-full">
                  {ageGroup === "kid" ? null : (
                    <>
                      <h3>
                        Comfortable Clothing
                        <span className="text-red-500">*</span>
                      </h3>
                      <Select
                        isMulti
                        options={getAvailableOptions(comfortableclothing)}
                        isDisabled={!gender || !ageGroup} // Disable if gender or age group is not selected
                        onChange={(selectedOptions) =>
                          handleInterestsChange(
                            selectedOptions,
                            "comfortableclothing"
                          )
                        }
                        value={interests.comfortableclothing.map((item) => ({
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
                    isMulti
                    options={getAvailableOptions(interestedIn)}
                    isDisabled={!gender || !ageGroup}
                    onChange={(selectedOptions) =>
                      handleInterestsChange(selectedOptions, "interestedIn")
                    }
                    value={interests.interestedIn?.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4"></div>
            <div className="mb-4"></div>
            <div className="mb-4">
              <div className="flex justify-evenly gap-3">
                <div className="w-full">
                  {gender === "male" ? null : (
                    <div>
                      <h3>
                        Interested Shoots{" "}
                        <span className="text-red-500">*</span>
                      </h3>
                      <Select
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
                  <h3>
                    Interested Media <span className="text-red-500">*</span>
                  </h3>
                  <Select
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
                  <h3>
                    Interested Roles <span className="text-red-500">*</span>
                  </h3>
                  <Select
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
