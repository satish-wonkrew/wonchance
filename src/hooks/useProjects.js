// hooks/useProjects.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createProject, deleteProject, fetchAllProjects, fetchProjectById, updateProject } from '@/redux/slices/projectSlice';

// Custom hook for managing projects
const useProjects = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const project = useSelector((state) => state.projects.project);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllProjects());
        }
    }, [dispatch, status]);

    const loadProjects = () => {
        dispatch(fetchAllProjects());
    };

    const getProjectById = (id) => {
        dispatch(fetchProjectById(id));
    };

    const addProject = (projectData) => {
        dispatch(createProject(projectData));
    };

    const editProject = (projectId, updatedData) => {
        dispatch(updateProject({ projectId, updatedData }));
    };

    const removeProject = (id) => {
        dispatch(deleteProject(id));
    };

    return {
        projects,
        project,
        status,
        error,
        loadProjects,
        getProjectById,
        addProject,
        editProject,
        removeProject,
    };
};

export default useProjects;
