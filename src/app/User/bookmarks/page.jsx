"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading";
import { fetchBookmarks, removeBookmark } from "@/redux/slices/bookmarksSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/ui/alert"; // Ensure Alert component is imported
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const MyCastingBookmarksPage = () => {
  const dispatch = useDispatch();
  const navigate = useRouter(); // Initialize useRouter
  const { bookmarks = [], status, error } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <Alert type="error" message={`Error: ${error}`} />;
  }

  const handleRedirect = (castingId) => {
    navigate.push(`/casting-call/${castingId}`);
  };

  const handleRemoveBookmark = (roleId) => {
    dispatch(removeBookmark(roleId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Casting Bookmarks</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.length === 0 ? (
          <p className="text-gray-600">No bookmarks found.</p>
        ) : (
          bookmarks.map((bookmark) => (
            <Card key={bookmark._id} className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
              <CardHeader className="p-4 bg-gray-50 rounded-t-lg">
                <CardTitle className="text-2xl font-semibold text-gray-900">{bookmark.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {bookmark.wccId}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">{bookmark.notes}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center">
                <Button onClick={() => handleRedirect(bookmark.wccId)} className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                  View Casting
                </Button>
                <Button onClick={() => handleRemoveBookmark(bookmark._id)} variant="outlined" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200">
                <FaTrash />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCastingBookmarksPage;
