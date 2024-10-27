
# 🎬 Casting Platform Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn-7A4BFF?style=for-the-badge)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Custom Hooks](https://img.shields.io/badge/Custom%20Hooks-5DADE2?style=for-the-badge&logo=react)

This is the **frontend** of the **Casting Platform**, built using **Next.js**, **Tailwind CSS**, **Shadcn UI** for styling, and **Redux** for state management. It also includes **custom React hooks** to handle API requests and manage application logic more effectively. The UI has been enhanced for a better user experience with **responsive design**, **dynamic components**, and **role-based views**.

## 🚀 Project Overview

The Casting Platform frontend is a web application designed for managing casting calls, roles, auditions, and user profiles. It includes features such as:

- **Role-Based Dashboards** for Talent, Company Admins, Project Managers, etc.
- **Dynamic and Responsive UI** powered by Tailwind CSS and Shadcn UI.
- **Custom Hooks** for fetching and managing API data efficiently.
- **Real-Time Data Handling** with Redux for state management.
- **Enhanced User Experience** with responsive layouts, modals, and interactive components.

---

## ⚙️ Tech Stack

- **Next.js**: React framework with server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework to build modern UIs quickly.
- **Shadcn UI**: Component library for building highly customizable interfaces.
- **Redux**: State management for handling global application state.
- **Axios**: Promise-based HTTP client for API calls.
- **Custom Hooks**: Abstracting logic for fetching and managing API data.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/casting-platform-frontend.git
cd casting-platform-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://api.wonchance.com/api
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend will be running on `http://localhost:4000`.

---

## 🛠️ State Management

The app uses **Redux** for managing application-wide state. Below are the key slices used:

- **userSlice**: Handles user authentication, role management, and profile data.
- **castingSlice**: Manages casting calls, roles, and applications.
- **projectSlice**: Stores company projects and related data.

The state is automatically updated based on **API responses** and controlled by **Redux Thunks**.

---

## 🔄 API Integration with Axios

API requests are managed using **Axios** for a more intuitive and manageable structure. All API routes are centralized, making it easier to adjust the backend endpoint. An example of fetching user profile data with Axios and Redux:

```js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
  return response.data;
});
```

---

## 🛠️ Custom Hooks

To handle the logic for fetching data and managing state, several **custom hooks** have been implemented. This improves reusability and makes the codebase more modular.

### Example of a Custom Hook (`useFetchCastingCalls.js`)

```js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchCastingCalls = () => {
  const [castingCalls, setCastingCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastingCalls = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/casting-calls`);
        setCastingCalls(response.data);
      } catch (error) {
        console.error('Error fetching casting calls:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCastingCalls();
  }, []);

  return { castingCalls, loading };
};

export default useFetchCastingCalls;
```

This hook can be reused across different components whenever casting calls need to be fetched.

---

## 📄 Pages & Components

The application is structured using Next.js pages and dynamic routes, making it scalable and efficient for handling multiple views. Below is a list of key pages:

| Page                     | Description                                          |
|---------------------------|------------------------------------------------------|
| `/`                       | Home page showing the latest casting calls           |
| `/casting-calls`          | List of all available casting calls and roles        |
| `/projects/[id]`          | Project details page with role listings              |
| `/profile/[userId]`       | User profile page for viewing and updating profile   |
| `/applications`           | User's dashboard for viewing applied casting roles   |

### Key Components:

- **Casting Call Card**: Displays each casting call with role details.
- **Profile Form**: Dynamic form for users to update their profile based on role type (Talent, Admin, etc.).
- **Modals**: Used for actions like applying for a role, editing profile information, and more.
- **Responsive Navbar**: Dynamic role-based navbar that changes based on user login state.

---

## 💄 Styling

The project leverages **Tailwind CSS** for utility-first styling, making the UI fully responsive and customizable. Pre-built **Shadcn UI components** are also used to speed up development and ensure consistency across the platform.

### Example of a Styled Button Using Shadcn UI

```js
import { Button } from 'shadcn/ui';

const SubmitButton = () => (
  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
);

export default SubmitButton;
```

---

## 📦 Enhancements & Features

### **Custom Hook System**:
- **useUser**: Fetches and manages user profile data with Redux.
- **useFetchProjects**: Fetches project data for company admins.
- **useApplyForRole**: Handles application submissions for roles.
- **useManageBookmarks**: Manages bookmarked casting calls for users.

### **UI Enhancements**:
- **Dynamic Forms**: Forms adjust based on user roles and casting call types.
- **Enhanced Responsive Design**: Optimized layouts using Tailwind for both desktop and mobile.
- **Real-Time Updates**: Notifications and application status updates integrated using Redux.

---

## 📝 Notes

- This project is in **active development** and not intended for public release at this stage.
- The code is intended for internal use by **Wonkrew** or authorized developers.

---

## 👨‍💻 Developed By

**Prathap**  
*Software Developer at Wonkrew*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Prathap-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/prathap-k)

### Key Additions:
1. **Custom Hooks**: Added a section showcasing the use of custom hooks, including code samples.
2. **UI Enhancements**: Emphasized the role-based dynamic UI and responsive design using Tailwind and Shadcn UI.
3. **Detailed API Integration**: More focus on API management using Axios and custom hooks.
4. **Component and Page Structure**: Outlined key pages and dynamic routes used in the app.
5. **Redux Slices**: Clearly defined state management with Redux, mentioning important slices.
6. **Modular Design**: Highlighted reusability through components, hooks, and dynamic forms.

Make sure to update the repository and profile links accordingly. Let me know if you need further improvements!
