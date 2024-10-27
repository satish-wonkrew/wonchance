import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '@/redux/slices/userSlice'; // Adjust the path based on your file structure

export const useUser = () => {
  const dispatch = useDispatch();
  
  // Get the user profile, status, and error from the Redux state
  const { profile, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);
  
  const user = profile?.profile
  return { user, status, error };
};
