"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockDeliveries } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package,
  Navigation,
  Phone,
  Star
} from "lucide-react";

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  
  const activeDeliveries = mockDeliveries.filter(
    (d) => d.status === "PICKED_UP" || d.status === "IN_TRANSIT"
  );
  const pendingPickups = mockDeliveries.filter((d) => d.status === "ASSIGNED");
  const completedToday = mockDeliveries.filter(
    (d) => d.status === "DELIVERED"
  ).length;

  const stats = [
    {
      title: "Active Deliveries",
      value: activeDeliveries.length,
      icon: Truck,
      color: "text-blue-500",
    },
    {
      title: "Pending Pickups",
      value: pendingPickups.length,
      icon: Package,
      color: "text-amber-500",
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      title: "Total Distance",
      value: "45 km",
      icon: MapPin,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Delivery Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your deliveries and track your progress
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
          <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-muted"}`} />
          <Label htmlFor="online-status" className="font-medium">
            {isOnline ? "Online" : "Offline"}
          </Label>
          <Switch
            id="online-status"
            checked={isOnline}
            onCheckedChange={setIsOnline}
          />
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              Pending Pickups
            </CardTitle>
            <CardDescription>
              Food donations waiting to be picked up
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPickups.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No pending pickups at the moment
              </p>
            ) : (
              pendingPickups.slice(0, 3).map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">Donation #{delivery.donationId}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{delivery.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Pickup by {delivery.estimatedPickup || "ASAP"}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Navigation className="mr-1 h-3 w-3" />
                    Start
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Active Deliveries
            </CardTitle>
            <CardDescription>
              Deliveries currently in progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeDeliveries.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No active deliveries
              </p>
            ) : (
              activeDeliveries.slice(0, 3).map((delivery) => (
                <div
                  key={delivery.id}
                  className="rounded-lg border p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Delivery #{delivery.id}</p>
                      <StatusBadge status={delivery.status} className="mt-1" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="mr-1 h-3 w-3" />
                      Contact
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-muted-foreground">Pickup</p>
                        <p>{delivery.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="ml-1 border-l-2 border-dashed border-muted h-4" />
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-muted-foreground">Drop-off</p>
                        <p>{delivery.dropoffAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Mark Delivered
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Navigation className="mr-1 h-4 w-4" />
                      Navigate
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Performance</CardTitle>
          <CardDescription>Your delivery statistics for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-emerald-500">{completedToday}</p>
              <p className="text-sm text-muted-foreground">Deliveries Completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">45 km</p>
              <p className="text-sm text-muted-foreground">Distance Covered</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">32 min</p>
              <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
