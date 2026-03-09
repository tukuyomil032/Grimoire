import { create } from 'zustand';
import type { RecentProject } from '@/models/types';

interface ProjectState {
  /** Currently opened project directory path */
  projectPath: string | null;
  /** Project name derived from directory */
  projectName: string | null;
  /** Recent projects list */
  recentProjects: RecentProject[];
  /** Whether a project is currently loaded */
  isProjectOpen: boolean;

  // Actions
  setProject: (path: string, name: string) => void;
  closeProject: () => void;
  addRecentProject: (project: RecentProject) => void;
  removeRecentProject: (path: string) => void;
  setRecentProjects: (projects: RecentProject[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectPath: null,
  projectName: null,
  recentProjects: [],
  isProjectOpen: false,

  setProject: (path, name) =>
    set({
      projectPath: path,
      projectName: name,
      isProjectOpen: true,
    }),

  closeProject: () =>
    set({
      projectPath: null,
      projectName: null,
      isProjectOpen: false,
    }),

  addRecentProject: (project) =>
    set((state) => ({
      recentProjects: [
        project,
        ...state.recentProjects.filter((p) => p.path !== project.path),
      ].slice(0, 10),
    })),

  removeRecentProject: (path) =>
    set((state) => ({
      recentProjects: state.recentProjects.filter((p) => p.path !== path),
    })),

  setRecentProjects: (projects) => set({ recentProjects: projects }),
}));
