"use client";
import React, { useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllCompanies } from "@/redux/slices/companySlice";
import LoadingSpinner from "@/components/ui/loading"; // Adjust based on your actual path
import { toast } from "sonner"; // Adjust based on your actual path
import { useDispatch, useSelector } from "react-redux";

export const MainContent = () => {
  const dispatch = useDispatch();
  const { companies, status, error } = useSelector((state) => state.companies);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        await dispatch(fetchAllCompanies()).unwrap();
      } catch (err) {
        toast.error(err.message || "Failed to fetch companies.");
      }
    };

    if (status === 'idle') {
      fetchCompanies();
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, index) => (
            <Card
              key={index}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-lg rounded-lg"
            >
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
              </CardHeader>
              <CardContent className="h-32 md:h-64">
                <Skeleton className="w-full h-full rounded-md" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <main className="space-y-6">
        {/* First 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {companies.slice(0, 4).map((company) => (
            <Card
              key={company.id}
              className="border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className={`bg-gradient-to-r p-2 rounded-t-lg ${company.gradient}`}>
                <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {company.title}
                </Label>
              </CardHeader>
              <CardContent className={`h-32 md:h-64 bg-gradient-to-r ${company.gradient} rounded-md`} />
              <CardFooter className="text-center">Footer Content</CardFooter>
            </Card>
          ))}
        </div>

        {/* Large Card */}
        <Card className="border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
          <CardHeader>
            <Label>Large Card Title</Label>
          </CardHeader>
          <CardContent className="h-96 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300" />
          <CardFooter className="text-center">Footer Content</CardFooter>
        </Card>

        {/* Second Section of Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {companies.slice(4, 8).map((company) => (
            <Card
              key={company.id}
              className="border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <Label>{company.title}</Label>
              </CardHeader>
              <CardContent className={`h-48 md:h-72 bg-gradient-to-r ${company.gradient}`} />
              <CardFooter className="text-center">Footer Content</CardFooter>
            </Card>
          ))}
        </div>

        {/* Another Large Card */}
        <Card className="border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
          <CardHeader>
            <Label>Another Large Card Title</Label>
          </CardHeader>
          <CardContent className="h-96 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300" />
          <CardFooter className="text-center">Footer Content</CardFooter>
        </Card>

        {/* Remaining Cards */}
        <div className="grid grid-cols-2 gap-4">
          {companies.slice(8).map((company) => (
            <Card
              key={company.id}
              className="border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <Label>{company.title}</Label>
              </CardHeader>
              <CardContent className={`h-48 md:h-72 bg-gradient-to-r ${company.gradient}`} />
              <CardFooter className="text-center">Footer Content</CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
