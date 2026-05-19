"use client";

import { Package, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockDonations } from "@/lib/mock-data";
import { format } from "date-fns";

export default function DonorHistoryPage() {
  const completedDonations = mockDonations.filter(
    (d) => d.status === "DELIVERED" || d.status === "CANCELLED" || d.status === "EXPIRED"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Donation History</h1>
          <p className="text-muted-foreground">
            View all your past donations and their outcomes
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {completedDonations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-1">No history yet</h3>
              <p className="text-sm text-muted-foreground">
                Your completed donations will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          completedDonations.map((donation) => (
            <Card key={donation.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {donation.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {donation.quantity} {donation.unit}
                        </p>
                      </div>
                      <StatusBadge status={donation.status} type="donation" />
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span>
                        Created: {format(new Date(donation.createdAt), "PPP")}
                      </span>
                      <span>
                        Updated: {format(new Date(donation.updatedAt), "PPP")}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl font-bold text-foreground">38</div>
              <div className="text-sm text-muted-foreground">
                Successfully Delivered
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl font-bold text-foreground">2,500</div>
              <div className="text-sm text-muted-foreground">Meals Provided</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-3xl font-bold text-foreground">1.2 tons</div>
              <div className="text-sm text-muted-foreground">Food Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
