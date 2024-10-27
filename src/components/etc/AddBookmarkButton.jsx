import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "@/redux/slices/bookmarksSlice";
import { toast } from "sonner";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const BookmarkButton = ({ roleId }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (roleId) { // Ensure roleId is defined
      setIsBookmarked(bookmarks.some((bookmark) => bookmark._id === roleId));
    }
  }, [bookmarks, roleId]); // Make sure roleId is included here

  const handleAddBookmark = () => {
    dispatch(addBookmark(roleId))
      .unwrap()
      .then(() => {
        toast.success("Bookmark added successfully!");
        setIsBookmarked(true);
      })
      .catch(() => {
        toast.error("Failed to add bookmark.");
      });
  };

  const handleRemoveBookmark = () => {
    dispatch(removeBookmark(roleId))
      .unwrap()
      .then(() => {
        toast.info("Bookmark removed successfully!");
        setIsBookmarked(false);
      })
      .catch(() => {
        toast.error("Failed to remove bookmark.");
      });
  };

  return (
    <button
      onClick={isBookmarked ? handleRemoveBookmark : handleAddBookmark}
      className="flex items-center transition duration-200"
      aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      
    </button>
  );
};

export default BookmarkButton;
