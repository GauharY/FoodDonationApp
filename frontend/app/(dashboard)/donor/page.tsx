"use client";

import Link from "next/link";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockDonations, mockDonorStats } from "@/lib/mock-data";
import { useAuth } from "@/lib/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";

const stats = [
  {
    title: "Total Donations",
    value: mockDonorStats.totalDonations,
    icon: Package,
    description: "All time donations",
    trend: "+12%",
  },
  {
    title: "Active Donations",
    value: mockDonorStats.activeDonations,
    icon: Clock,
    description: "Currently available",
    trend: null,
  },
  {
    title: "Completed",
    value: mockDonorStats.completedDonations,
    icon: CheckCircle,
    description: "Successfully delivered",
    trend: "+8%",
  },
  {
    title: "Impact Score",
    value: mockDonorStats.impactScore,
    icon: TrendingUp,
    description: "Meals provided: " + mockDonorStats.mealsProvided,
    trend: "+5%",
  },
];

export default function DonorDashboardPage() {
  const { user } = useAuth();
  const recentDonations = mockDonations.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0] || "Donor"}
          </h1>
          <p className="text-muted-foreground">
            Here is an overview of your donation activity
          </p>
        </div>
        <Button asChild>
          <Link href="/donor/add-donation">
            <Plus className="mr-2 h-4 w-4" />
            Add Donation
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
                {stat.trend && (
                  <span className="text-primary ml-2">{stat.trend}</span>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Donations</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/donor/donations">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {donation.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {donation.quantity} {donation.unit} &bull;{" "}
                      {formatDistanceToNow(new Date(donation.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <StatusBadge status={donation.status} type="donation" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/donor/add-donation">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Donation</h3>
                <p className="text-sm text-muted-foreground">
                  List surplus food for pickup
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/donor/analytics">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">View Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track your impact
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/donor/history">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Donation History</h3>
                <p className="text-sm text-muted-foreground">
                  View past donations
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
