"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaUser,
  FaFilm,
  FaAddressCard,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchRolesByProject } from "@/redux/slices/roleSlice";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const CombinedPage = () => {
  const { roles, status, error } = useSelector((state) => state.roles);
  const { id: projectId } = useParams(); // Destructure projectId from useParams
  const dispatch = useDispatch();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedProject = projectId;
  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchRolesByProject({ id: selectedProject }));
    }
  }, [dispatch, selectedProject]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 3000); // Autoplay every 3 seconds
    return () => clearInterval(autoplay); // Cleanup on unmount
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (status === "loading") {
    return <p>Loading roles...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  // Assuming roles array has at least one item
  const projectDetails = roles[0]?.project || {}; // Use only the first project's details

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* <Button>
            <MdArrowBackIos onClick={scrollPrev} />
            <span className="mx-4">Dashboard</span>
        </Button> */}
      {/* Project Details Section */}
      <Card className="bg-white rounded-lg p-8 shadow-lg mb-10 w-full max-w-5xl transition hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-orange-600">
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FaFilm,
                label: "Project Name",
                value: projectDetails.projectName,
              },
              {
                icon: FaBuilding,
                label: "Company Name",
                value: projectDetails.company?.companyName,
              },
              {
                icon: FaCalendarAlt,
                label: "Project Start Date",
                value: projectDetails.projectStartDate
                  ? format(
                      new Date(projectDetails.projectStartDate),
                      "MMM dd, yyyy"
                    )
                  : "N/A",
              },
              {
                icon: FaFilm,
                label: "Company Type",
                value: projectDetails.company?.companyType,
              },
              {
                icon: FaCalendarAlt,
                label: "Project End Date",
                value: projectDetails.projectEndDate
                  ? format(
                      new Date(projectDetails.projectEndDate),
                      "MMM dd, yyyy"
                    )
                  : "N/A",
              },
              {
                icon: FaAddressCard,
                label: "Category",
                value: projectDetails.company?.categories,
              },
            ].map(({ icon: Icon, label, value }, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <Icon className="text-orange-600 mt-1" />
                <div>
                  <p className="font-bold">{label}</p>
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Details Carousel */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Embla carousel container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {roles.map((role) => (
              <div
                key={role._id}
                className="embla__slide flex-[0_0_100%] p-6 hover:shadow-xl"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-orange-600">
                      Role Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: FaUser,
                          label: "Role Name",
                          value: role.roleName,
                        },
                        {
                          icon: FaUser,
                          label: "Body Type",
                          value: role.bodyType,
                        },
                        {
                          icon: FaCalendarAlt,
                          label: "Age Range",
                          value: `${role.ageRange.minAge} - ${role.ageRange.maxAge}`,
                        },
                        {
                          icon: FaUser,
                          label: "Skin Tone",
                          value: role.skinTone,
                        },
                        { icon: FaUser, label: "Gender", value: role.gender },
                        {
                          icon: FaUser,
                          label: "Openings",
                          value: role.noOfOpenings,
                        },
                      ].map(({ icon: Icon, label, value }, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <Icon className="text-orange-600 mt-1" />
                          <div>
                            <p className="font-bold">{label}</p>
                            <p>{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="font-bold">Description</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                        <li>{role.description}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Carousel Controls */}
        <div className="flex justify-between mt-4">
          <button
            className="p-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
            onClick={scrollPrev}
            aria-label="Previous Slide"
          >
            <MdArrowBackIos className="text-2xl" />
          </button>
          <button
            className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            onClick={scrollNext}
            aria-label="Next Slide"
          >
            <MdArrowForwardIos className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedPage;
