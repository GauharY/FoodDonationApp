"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockUsers, mockDonations, mockDeliveries } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { 
  Users, 
  Package, 
  Truck, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const donationTrends = [
  { month: "Jan", donations: 120, deliveries: 95 },
  { month: "Feb", donations: 145, deliveries: 130 },
  { month: "Mar", donations: 180, deliveries: 165 },
  { month: "Apr", donations: 220, deliveries: 200 },
  { month: "May", donations: 280, deliveries: 250 },
  { month: "Jun", donations: 350, deliveries: 320 },
];

const userGrowth = [
  { month: "Jan", donors: 50, ngos: 20, delivery: 15 },
  { month: "Feb", donors: 65, ngos: 28, delivery: 22 },
  { month: "Mar", donors: 85, ngos: 35, delivery: 30 },
  { month: "Apr", donors: 110, ngos: 45, delivery: 40 },
  { month: "May", donors: 140, ngos: 55, delivery: 50 },
  { month: "Jun", donors: 175, ngos: 68, delivery: 62 },
];

export default function AdminDashboard() {
  const totalUsers = mockUsers.length;
  const totalDonations = mockDonations.length;
  const activeDonations = mockDonations.filter(
    (d) => d.status === "AVAILABLE" || d.status === "REQUESTED"
  ).length;
  const pendingVerifications = mockUsers.filter((u) => !u.isVerified).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Donations",
      value: totalDonations,
      change: "+23%",
      trend: "up",
      icon: Package,
      color: "text-emerald-500",
    },
    {
      title: "Active Deliveries",
      value: mockDeliveries.filter((d) => d.status === "IN_TRANSIT").length,
      change: "+8%",
      trend: "up",
      icon: Truck,
      color: "text-purple-500",
    },
    {
      title: "Pending Verifications",
      value: pendingVerifications,
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "text-amber-500",
    },
  ];

  const recentDonations = mockDonations.slice(0, 5);
  const recentUsers = mockUsers.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage the entire food waste management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            View Reports
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Download Analytics
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation & Delivery Trends</CardTitle>
            <CardDescription>Monthly donation and delivery statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={donationTrends}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorDonations)"
                  />
                  <Area
                    type="monotone"
                    dataKey="deliveries"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorDeliveries)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth by Role</CardTitle>
            <CardDescription>Monthly user registration breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="donors" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ngos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delivery" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest food donations in the system</CardDescription>
            </div>
            <Link href="/admin/donations">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{donation.foodType}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.quantity} {donation.unit} - {donation.location}
                    </p>
                  </div>
                  <StatusBadge status={donation.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Newly registered users</CardDescription>
            </div>
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-emerald-500">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {user.role.toLowerCase().replace("_", " ")}
                    </Badge>
                    {user.isVerified ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
