// hooks/useDisableRightClick.js
import { useEffect } from 'react';

const useDisableRightClick = () => {
    useEffect(() => {
        const handleRightClick = (e) => {
            e.preventDefault(); // Prevent the context menu from appearing
        };

        document.addEventListener('contextmenu', handleRightClick);

        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
        };
    }, []);
};

export default useDisableRightClick;
