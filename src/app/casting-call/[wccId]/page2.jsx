/* eslint-disable @next/next/no-img-element */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchCastingDetailsByWccId,
  applyForCasting,
} from "@/redux/slices/castingSlice";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { FaBuilding, FaCalendarAlt, FaUser, FaFilm, FaAddressCard } from "react-icons/fa";
import { format } from "date-fns";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";

const CastingDetails = () => {
  const dispatch = useDispatch();
  const { wccId } = useParams();
  const [showModal, setShowModal] = useState(false);

  // Access the casting details and status from the Redux store
  const { castingDetails, status, error } = useSelector(
    (state) => state.castings
  );

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (wccId) {
      dispatch(fetchCastingDetailsByWccId(wccId));
    }
  }, [dispatch, wccId]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 3000); // Autoplay every 3 seconds
    return () => clearInterval(autoplay); // Cleanup on unmount
  }, [emblaApi]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const onSelect = () => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Function to handle apply button click
  const handleApply = () => {
    dispatch(applyForCasting(wccId));
    setShowModal(true);
  };

  // Conditional rendering based on status
  if (status === "loading") return <p className="text-center text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error?.message || error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <BreadcrumbSection />
      
      {/* Casting Call Details Section */}
      {castingDetails && Object.keys(castingDetails).length > 0 ? (
        <Card className="bg-white rounded-lg p-8 shadow-lg mb-10 w-full max-w-5xl transition hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-orange-600">
              Casting Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: FaFilm, label: "Casting Call Name", value: castingDetails.casting.title || "No Title Available" },
                { icon: FaBuilding, label: "Company Name", value: castingDetails.casting.role?.project?.company?.companyName || "No Company Name Available" },
                { icon: FaCalendarAlt, label: "Casting Date", value: castingDetails.casting.castingDate ? format(new Date(castingDetails.casting.castingDate), "PPP") : "No Casting Date Available" },
                { icon: FaCalendarAlt, label: "Expiry Date", value: castingDetails.casting.expiryDate ? format(new Date(castingDetails.casting.expiryDate), "PPP") : "No Expiry Date Available" },
                { icon: FaAddressCard, label: "Category", value: castingDetails.casting.role?.project?.categories?.join(", ") || "No Categories Available" },
                { icon: FaFilm, label: "Project Name", value: castingDetails.casting.role?.project?.projectName || "No Project Name Available" },
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
      ) : (
        <p className="text-center text-gray-500">No details available</p>
      )}

      {/* Role Details Carousel */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Embla carousel container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {castingDetails?.casting?.role && (
              <div className="embla__slide flex-[0_0_100%] p-6 hover:shadow-xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-orange-600">
                      Role Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: FaUser, label: "Role Name", value: castingDetails.casting.role.roleName || "No Role Available" },
                        { icon: FaUser, label: "Body Type", value: castingDetails.casting.role.bodyType || "No Body Type Specified" },
                        { icon: FaCalendarAlt, label: "Age Range", value: `${castingDetails.casting.role.ageRange.minAge} - ${castingDetails.casting.role.ageRange.maxAge}` },
                        { icon: FaUser, label: "Gender", value: castingDetails.casting.role.gender || "No Gender Specified" },
                        { icon: FaUser, label: "Skin Tone", value: castingDetails.casting.role.skinTone || "No Skin Tone Specified" },
                        { icon: FaUser, label: "Openings", value: castingDetails.casting.role.noOfOpenings || "No Openings Specified" },
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
                        <li>{castingDetails.casting.role.description || "No Description Available"}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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

      {/* Apply Button */}
      <Button
        onClick={handleApply}
        className="w-full py-3 px-6 border border-gray-300 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 mt-8"
      >
        Apply
      </Button>

      {/* Modal for success or additional information */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="p-6 bg-white rounded-lg border border-gray-300 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">
            Application Submitted
          </h2>
          <p>Your application has been submitted successfully.</p>
          <Button
            onClick={() => setShowModal(false)}
            className="mt-4 py-2 px-4 border border-gray-300 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default CastingDetails;
