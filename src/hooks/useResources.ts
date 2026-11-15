"use client";

import { useState, useEffect, useCallback } from "react";
import { resourcesAPI } from "@/lib/api";
import type { IResource } from "@/types";
import { toast } from "sonner";

export function useResources(filters?: Record<string, string>) {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await resourcesAPI.getAll(filters);
      if (res.success) {
        setResources((res.data as IResource[]) || []);
      } else {
        setError(res.error || "Failed to load resources");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const createResource = async (data: Partial<IResource>) => {
    const res = await resourcesAPI.create(data);
    if (res.success) {
      toast.success(res.message || "Resource created");
      fetchResources();
      return true;
    } else {
      toast.error(res.error || "Failed to create resource");
      return false;
    }
  };

  const updateResource = async (id: string, data: Partial<IResource>) => {
    const res = await resourcesAPI.update(id, data);
    if (res.success) {
      toast.success(res.message || "Resource updated");
      fetchResources();
      return true;
    } else {
      toast.error(res.error || "Failed to update resource");
      return false;
    }
  };

  const deleteResource = async (id: string) => {
    const res = await resourcesAPI.delete(id);
    if (res.success) {
      toast.success("Resource deleted");
      fetchResources();
      return true;
    } else {
      toast.error(res.error || "Failed to delete resource");
      return false;
    }
  };

  return {
    resources,
    loading,
    error,
    refetch: fetchResources,
    createResource,
    updateResource,
    deleteResource,
  };
}
