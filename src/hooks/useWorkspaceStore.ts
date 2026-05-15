import type { User, WorkSpace, WorkspaceStore } from "@/types/workspace";
import { useEffect, useState } from "react";

export function useWorkspaceStore(user: User | null) {
  const [workspaces, setWorkspaces] = useState<WorkSpace[]>(() => {
    if (!user?._id) return [];

    try {
      const raw = localStorage.getItem("workspaces");

      const store: WorkspaceStore = raw ? JSON.parse(raw) : {};

      return store[user._id]?.workspaces || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!user?._id) return;

    try {
      const raw = localStorage.getItem("workspaces");

      const store: WorkspaceStore = raw ? JSON.parse(raw) : {};

      store[user._id] = {
        workspaces,
      };

      localStorage.setItem("workspaces", JSON.stringify(store));
    } catch (err) {
      console.error(err);
    }
  }, [workspaces, user?._id]);

  function createWorkspace(name: string, description: string) {
    const newWorkspace: WorkSpace = {
      id: crypto.randomUUID(),
      name,
      description,
      leafNodes: [],
      nodes: [],
      created_at: Date.now(),
    };

    setWorkspaces((prev) => [...prev, newWorkspace]);
  }

  function modifyWorkSpace(
    workspaceId: string,
    newName: string,
    newDescription: string,
  ) {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === workspaceId
          ? {
              ...w,
              name: newName,
              description: newDescription,
            }
          : w,
      ),
    );
  }

  return {
    workspaces,
    createWorkspace,
    modifyWorkSpace,
  };
}