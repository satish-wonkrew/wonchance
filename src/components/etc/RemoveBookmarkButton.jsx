import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark } from '@/redux/slices/bookmarksSlice';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { FaBookmark } from 'react-icons/fa';

const RemoveBookmarkButton = ({ roleId }) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

    const handleRemoveBookmark = () => {
        dispatch(removeBookmark(roleId))
            .unwrap()
            .then(() => {
                toast.success('Bookmark removed successfully!');
            })
            .catch(() => {
                toast.error('Failed to remove bookmark.');
            });
    };

    const isBookmarked = bookmarks?.some((bookmark) => bookmark._id === roleId);

    if (!isBookmarked) {
        return null; // Or display a message saying there's no bookmark to remove
    }

    return (
        <span onClick={handleRemoveBookmark}>
           <FaBookmark />
        </span>
    );
};

export default RemoveBookmarkButton;
