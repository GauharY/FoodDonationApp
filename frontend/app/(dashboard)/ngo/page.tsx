"use client";

import Link from "next/link";
import {
  Search,
  ClipboardList,
  MapPin,
  Users,
  Package,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockDonations, mockRequests, mockNgoStats } from "@/lib/mock-data";
import { useAuth } from "@/lib/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";

const stats = [
  {
    title: "Total Requests",
    value: mockNgoStats.totalRequests,
    icon: ClipboardList,
    description: "All time requests",
  },
  {
    title: "Pending",
    value: mockNgoStats.pendingRequests,
    icon: Package,
    description: "Awaiting approval",
  },
  {
    title: "Completed",
    value: mockNgoStats.completedRequests,
    icon: TrendingUp,
    description: "Successfully received",
  },
  {
    title: "Beneficiaries",
    value: mockNgoStats.beneficiariesServed.toLocaleString(),
    icon: Users,
    description: "People served",
  },
];

export default function NgoDashboardPage() {
  const { user } = useAuth();
  const availableDonations = mockDonations.filter((d) => d.status === "AVAILABLE");
  const pendingRequests = mockRequests.filter((r) => r.status === "PENDING");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {user?.name?.split(" ")[0] || "Partner"}
          </h1>
          <p className="text-muted-foreground">
            Find and request food donations for your community
          </p>
        </div>
        <Button asChild>
          <Link href="/ngo/search">
            <Search className="mr-2 h-4 w-4" />
            Find Food
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Available Donations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Available Near You</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ngo/search">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableDonations.slice(0, 3).map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {donation.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {donation.quantity} {donation.unit} &bull;{" "}
                        {donation.pickupCity}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Request
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Requests</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ngo/requests">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <ClipboardList className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pending requests</p>
                </div>
              ) : (
                pendingRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Request #{request.id.slice(-4)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(request.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <StatusBadge status={request.status} type="request" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/ngo/search">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Search Food</h3>
                <p className="text-sm text-muted-foreground">
                  Browse available donations
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/ngo/track">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Track Deliveries</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor incoming food
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/ngo/requests">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">My Requests</h3>
                <p className="text-sm text-muted-foreground">
                  View request history
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
