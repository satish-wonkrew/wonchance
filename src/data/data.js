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
  console.log("====================================");
  console.log(ageGroup);
  console.log("====================================");

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
    <div className="flex flex-col min-h-screen max-w-4xl p-6 mx-auto bg-gray-100">
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Level */}
          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
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
          {/* Educational Qualification */}
          <div>
            <Label htmlFor="educationalQualification">
              Educational Qualification
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
            />
          </div>
          {/* Languages */}
          <div>
            <Label htmlFor="speakingLanguages">Speaking Languages</Label>
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
            />
          </div>
          <div>
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
              className="mt-2"
            />
          </div>
          {/* Physical Details */}
          <div>
            <Label>Physical Details</Label>
            <div className="mt-2">
              {/* Height */}
              <div className="flex flex-row gap-3">
                <div className="mt-2">
                  <Label>Height (cm)</Label>
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
                  />
                </div>

                {/* Weight */}
                <div className="mt-2">
                  <Label>Weight (kg)</Label>
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
                  />
                </div>
              </div>
              {/* Chest Fields*/}
              <div className="flex flex-row gap-3">
                <div className="mt-2">
                  <Label>Chest (cm)</Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.Chest || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("Chest", e.target.value)
                    }
                    placeholder="Enter chest in cm"
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>
                {/* Waist */}
                <div className="mt-2">
                  <Label>Waist (cm)</Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.waist || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("waist", e.target.value)
                    }
                    placeholder="Enter waist in cm"
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>
              </div>
              {/* Hip and shoe size */}
              <div className="flex flex-row gap-3">
                <div className="mt-2">
                  <Label>Hip (cm)</Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.hips || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("hips", e.target.value)
                    }
                    placeholder="Enter hip in cm"
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>
                {/* Shoe Size */}
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
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>
              </div>
              {/* Eye Color */}
              <div className="mt-2">
                <Label>Eye Color</Label>
                <select
                  type="text"
                  value={physicalDetails.eyeColor || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("eyeColor", e.target.value)
                  }
                  placeholder="Enter eye color"
                  className="border rounded p-1 mt-1 w-full"
                >
                  <option value="" disabled>
                    Select Eye Color
                  </option>
                  <option value="Light">Light</option>
                  <option value="Fair">Fair</option>
                  <option value="Medium">Medium</option>
                  <option value="Dark">Dark</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Hair Color */}
              

              {/* Skin Tone */}
              <div className="mt-2">
                <Label>Skin Tone</Label>
                <select
                  value={physicalDetails.skinTone || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("skinTone", e.target.value)
                  }
                  className="border rounded p-1 mt-1 w-full"
                >
                  <option value="" disabled>
                    Select skin tone
                  </option>
                  <option value="Light">Light</option>
                  <option value="Fair">Fair</option>
                  <option value="Medium">Medium</option>
                  <option value="Dark">Dark</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Body Type */}
              <div className="mt-2">
                <Label>Body Type</Label>
                <select
                  value={physicalDetails.bodyType || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("bodyType", e.target.value)
                  }
                  className="border rounded p-1 mt-1 w-full"
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
              <div className="mt-2">
                <Label>Body Shape</Label>
                <select
                  value={physicalDetails.bodyShape || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("bodyShape", e.target.value)
                  }
                  className="border rounded p-1 mt-1 w-full"
                >
                  <option value="" disabled>
                    Select body shape
                  </option>
                  <option value="Hourglass">Hourglass</option>
                  <option value="Pear">Pear</option>
                  <option value="Apple">Apple</option>
                  <option value="Rectangle">Rectangle</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex gap-5 mt-2">
              {/* Tattoos */}
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  checked={!!physicalDetails.tattoos}
                  onCheckedChange={(checked) =>
                    handlePhysicalDetailChange("tattoos", checked)
                  }
                />
                <Label>Tattoos</Label>
              </div>

              {/* Piercings */}
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  checked={!!physicalDetails.piercings}
                  onCheckedChange={(checked) =>
                    handlePhysicalDetailChange("piercings", checked)
                  }
                />
                <Label>Piercings</Label>
              </div>
            </div>
          </div>
          {/* /* Social Media Profiles  */}
          <div>
            <Label>Social Media Profiles</Label>
            {socialMediaOptions.map((profile) => (
              <div key={profile.key} className="mt-4">
                <Label>{profile.label}</Label>
                <Input
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

          <div>
            {/* Gender= male and female and ageGroup = kid hide for Comfortable Clothing */}
            {ageGroup === "kid" ? null : (
              <>
                <h3>Comfortable Clothing</h3>
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

          <div>
            <h3>Interested In</h3>
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
          {gender === "male" ? null : (
            <div>
              <h3>Interested Shoots</h3>
              <Select
                isMulti
                options={getAvailableOptions(interestedShoots)}
                isDisabled={!gender || !ageGroup}
                onChange={(selectedOptions) =>
                  handleInterestsChange(selectedOptions, "interestedShoots")
                }
                value={interests.interestedShoots.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
          )}

          <div>
            <h3>Interested Media</h3>
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

          <div>
            <h3>Interested Roles</h3>
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
          {/* Skills */}
          <div>
            <Label>Skills</Label>
            {Object.keys(skillOptions).map((field) => (
              <div key={field} className="mt-4">
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Select
                  isMulti
                  options={skillOptions[field]}
                  value={skillDetails[field].map((skill) => ({
                    value: skill,
                    label: skill,
                  }))}
                  onChange={(options) => handleSkillChange(options, field)}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
          {/* Work Details */}
          <div>
            <Label>Work Experience</Label> <br />
            <div className="mt-4">
              {/* <Input
                value={workDetails.projects}
                onChange={(e) => handleWorkChange("projects", e.target.value)}
                placeholder="Projects"
                className="mb-2"
              /> */}
              {/* <Input
                value={workDetails.availability}
                onChange={(e) =>
                  handleWorkChange("availability", e.target.value)
                }
                placeholder="Availability"
                className="mb-2"
              /> */}
              <Label>
                <span className="font-bold">Movies</span>
              </Label>
              <Input
                value={workDetails.movies}
                onChange={(e) => handleWorkChange("movies", e.target.value)}
                placeholder="Movies"
                className="mb-2"
              />
              <Label>
                <span className="font-bold">International Movie</span>
              </Label>
              <Input
                value={workDetails.internationalMovie}
                onChange={(e) =>
                  handleWorkChange("internationalMovie", e.target.value)
                }
                placeholder="International Movie"
                className="mb-2"
              />
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
              <Label>
                <span className="font-bold">Experience</span>
              </Label>
              <Input
                value={workDetails.experience}
                onChange={(e) => handleWorkChange("experience", e.target.value)}
                placeholder="Experience"
                className="mb-2"
              />
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
              <Label>
                <span className="font-bold">Shoot PerDay</span>
              </Label>
              <Input
                value={workDetails.shootPerDay}
                onChange={(e) =>
                  handleWorkChange("shootPerDay", e.target.value)
                }
                placeholder="Shoot Per Day"
                className="mb-2"
              />

              {/* <Input
                value={workDetails.worklinks}
                onChange={(e) => handleWorkChange("worklinks", e.target.value)}
                placeholder="Work Links"
                className="mb-2"
              /> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default MidlleInfo;
