"use client";

import { MapPin, Truck, Phone, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockDeliveries } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const deliverySteps = [
  { status: "ASSIGNED", label: "Assigned" },
  { status: "PICKED_UP", label: "Picked Up" },
  { status: "ON_THE_WAY", label: "On The Way" },
  { status: "DELIVERED", label: "Delivered" },
];

export default function NgoTrackPage() {
  const activeDeliveries = mockDeliveries.filter(
    (d) => d.status !== "DELIVERED" && d.status !== "CANCELLED"
  );

  const getStepIndex = (status: string) => {
    return deliverySteps.findIndex((s) => s.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Track Deliveries</h1>
        <p className="text-muted-foreground">
          Monitor incoming food deliveries in real-time
        </p>
      </div>

      {/* Active Deliveries */}
      {activeDeliveries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Truck className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">No active deliveries</h3>
            <p className="text-sm text-muted-foreground">
              Your incoming deliveries will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        activeDeliveries.map((delivery) => {
          const currentStep = getStepIndex(delivery.status);

          return (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Delivery #{delivery.id.slice(-4)}
                  </CardTitle>
                  <StatusBadge status={delivery.status} type="delivery" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Steps */}
                <div className="relative">
                  <div className="flex justify-between">
                    {deliverySteps.map((step, index) => (
                      <div
                        key={step.status}
                        className="flex flex-col items-center relative z-10"
                      >
                        <div
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors",
                            index <= currentStep
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-muted-foreground/30 text-muted-foreground"
                          )}
                        >
                          {index < currentStep ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-medium">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-xs mt-2 font-medium",
                            index <= currentStep
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Progress Line */}
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted -z-0">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${(currentStep / (deliverySteps.length - 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Pickup Address
                        </p>
                        <p className="text-sm text-foreground">
                          {delivery.pickupAddress}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Delivery Address
                        </p>
                        <p className="text-sm text-foreground">
                          {delivery.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Delivery Partner
                        </p>
                        <p className="text-sm text-foreground">
                          {delivery.deliveryPartnerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Estimated Time
                        </p>
                        <p className="text-sm text-foreground">
                          {delivery.estimatedTime} mins ({delivery.distance} km)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Driver
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}

      {/* Completed Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeliveries
              .filter((d) => d.status === "DELIVERED")
              .slice(0, 3)
              .map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      Delivery #{delivery.id.slice(-4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      From: {delivery.pickupAddress.slice(0, 30)}...
                    </p>
                  </div>
                  <StatusBadge status={delivery.status} type="delivery" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
