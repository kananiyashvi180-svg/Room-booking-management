"use client";

import { useState, useEffect, useCallback } from "react";
import { bookingsAPI } from "@/lib/api";
import type { IBooking } from "@/types";
import { toast } from "sonner";

export function useBookings(filters?: Record<string, string>) {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingsAPI.getAll(filters);
      if (res.success) {
        setBookings((res.data as IBooking[]) || []);
      } else {
        setError(res.error || "Failed to load bookings");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (data: Partial<IBooking>) => {
    const res = await bookingsAPI.create(data);
    if (res.success) {
      toast.success(res.message || "Booking created successfully");
      fetchBookings();
      return res.data as IBooking;
    } else {
      toast.error(res.error || "Failed to create booking");
      return null;
    }
  };

  const updateStatus = async (
    id: string,
    data: {
      status: string;
      managerNotes?: string;
      issuedQuantity?: number;
      expectedReturnDate?: string;
    }
  ) => {
    const res = await bookingsAPI.updateStatus(id, data);
    if (res.success) {
      toast.success(res.message || "Status updated");
      fetchBookings();
      return true;
    } else {
      toast.error(res.error || "Failed to update status");
      return false;
    }
  };

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    createBooking,
    updateStatus,
  };
}
