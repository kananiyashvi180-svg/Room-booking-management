const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: T; error?: string; message?: string }> {
  const url = `${BASE_URL}/api${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}

// Resources
export const resourcesAPI = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchAPI(`/resources${qs}`);
  },
  getById: (id: string) => fetchAPI(`/resources/${id}`),
  create: (data: unknown) =>
    fetchAPI("/resources", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: unknown) =>
    fetchAPI(`/resources/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchAPI(`/resources/${id}`, { method: "DELETE" }),
};

// Bookings
export const bookingsAPI = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchAPI(`/bookings${qs}`);
  },
  getById: (id: string) => fetchAPI(`/bookings/${id}`),
  create: (data: unknown) =>
    fetchAPI("/bookings", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: string, data: unknown) =>
    fetchAPI(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};

// Availability
export const availabilityAPI = {
  check: (params: {
    resourceId: string;
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
  }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return fetchAPI(`/availability?${qs}`);
  },
};

// Returns
export const returnsAPI = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchAPI(`/returns${qs}`);
  },
  create: (data: unknown) =>
    fetchAPI("/returns", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: unknown) =>
    fetchAPI(`/returns/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};

// Analytics
export const analyticsAPI = {
  get: () => fetchAPI("/analytics"),
};

// CSV Export helper
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h];
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
