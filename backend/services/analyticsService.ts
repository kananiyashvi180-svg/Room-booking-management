import Resource from "@backend/models/Resource";
import Booking from "@backend/models/Booking";
import connectDB from "@backend/config/db";
import type { AnalyticsData, IResource } from "@backend/types";

export async function getAnalytics(): Promise<AnalyticsData> {
  await connectDB();

  const [
    totalResources,
    availableResources,
    totalBookings,
    pendingRequests,
    bookingsByStatusAgg,
    frequentlyBookedAgg,
    recentBookings,
    overdueBookings,
    issuedBookings,
    recentlyAddedResources,
    upcomingBookings,
    pendingList,
    monthlyAgg,
    categoryAgg,
  ] = await Promise.all([
    Resource.countDocuments({ isActive: true }),
    Resource.countDocuments({ isActive: true, available: { $gt: 0 } }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "Pending" }),
    Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Booking.aggregate([
      { $match: { status: { $in: ["Pending", "Approved", "Completed"] } } },
      { $group: { _id: "$resource", bookingCount: { $sum: 1 } } },
      { $sort: { bookingCount: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "resources",
          localField: "_id",
          foreignField: "_id",
          as: "resource",
        },
      },
      { $unwind: "$resource" },
    ]),
    Booking.find()
      .populate("resource")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    Booking.find({
      status: "Approved",
      expectedReturnDate: { $lt: new Date(), $exists: true },
    }).countDocuments(),
    Booking.find({
      status: "Approved",
      $expr: { $gt: ["$issuedQuantity", "$returnedQuantity"] },
    }).countDocuments(),
    Resource.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    Booking.find({
      status: "Approved",
      startDate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    })
      .populate("resource")
      .sort({ startDate: 1 })
      .limit(5)
      .lean(),
    Booking.find({ status: "Pending" })
      .populate("resource")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().setMonth(new Date().getMonth() - 6)
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Resource.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  const bookedResources = await Resource.countDocuments({
    isActive: true,
    available: 0,
  });

  const bookingsByStatus: Record<string, number> = {};
  bookingsByStatusAgg.forEach(
    (s: { _id: string; count: number }) => {
      bookingsByStatus[s._id] = s.count;
    }
  );

  const monthlyList = monthlyAgg.map((m: { _id: string; count: number }) => ({
    month: m._id,
    count: m.count,
  }));

  const categoryDistribution = categoryAgg.map(
    (c: { _id: string; count: number }) => ({
      category: c._id,
      count: c.count,
    })
  );

  const mostBooked = frequentlyBookedAgg.map(
    (f: { resource: unknown; bookingCount: number }) => {
      const res = f.resource as { _id?: unknown; name?: string; category?: string };
      return {
        resourceId: res?._id ? String(res._id) : undefined,
        name: res?.name || "Equipment",
        category: res?.category || "General",
        bookingCount: f.bookingCount,
      };
    }
  );

  return {
    totalResources,
    availableResources,
    bookedResources,
    pendingRequests,
    currentlyIssued: issuedBookings,
    overdueReturns: overdueBookings,
    totalBookings,
    bookingsByStatus,
    statusCounts: bookingsByStatus,
    categoryStats: categoryAgg.map(
      (c: { _id: string; count: number }) => ({
        category: c._id,
        count: c.count,
        bookings: bookingsByStatus[c._id] || 0,
      })
    ),
    categoryDistribution,
    frequentlyBooked: frequentlyBookedAgg.map(
      (f: { resource: unknown; bookingCount: number }) => ({
        resource: f.resource,
        bookingCount: f.bookingCount,
      })
    ),
    mostBookedResources: mostBooked,
    recentBookings: recentBookings as unknown as AnalyticsData["recentBookings"],
    recentlyAddedResources: recentlyAddedResources as unknown as IResource[],
    upcomingBookings: upcomingBookings as unknown as AnalyticsData["upcomingBookings"],
    pendingList: pendingList as unknown as AnalyticsData["pendingList"],
    monthlyBookings: monthlyList,
    monthlyTrends: monthlyList,
  };
}
