"use client";

import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRequests } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";

export default function NgoRequestsPage() {
  const pendingRequests = mockRequests.filter((r) => r.status === "PENDING");
  const approvedRequests = mockRequests.filter((r) => r.status === "APPROVED");
  const allRequests = mockRequests;

  const RequestCard = ({ request }: { request: (typeof mockRequests)[0] }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">
                Request #{request.id.slice(-4)}
              </h3>
              <StatusBadge status={request.status} type="request" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Donation ID: {request.donationId}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Qty: {request.requestedQuantity}</span>
              <span>
                {request.pickupType === "SELF_PICKUP"
                  ? "Self Pickup"
                  : "Delivery Required"}
              </span>
              <span>
                {formatDistanceToNow(new Date(request.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {request.message && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                &ldquo;{request.message}&rdquo;
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            {request.status === "PENDING" && (
              <Button variant="destructive" size="sm">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Requests</h1>
        <p className="text-muted-foreground">
          Track and manage your food requests
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({allRequests.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {allRequests.length === 0 ? (
            <EmptyState message="No requests yet. Start by searching for food." />
          ) : (
            allRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingRequests.length === 0 ? (
            <EmptyState message="No pending requests" />
          ) : (
            pendingRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-4">
          {approvedRequests.length === 0 ? (
            <EmptyState message="No approved requests yet" />
          ) : (
            approvedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Request Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">
                {allRequests.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-amber-500/10">
              <div className="text-2xl font-bold text-amber-600">
                {pendingRequests.length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10">
              <div className="text-2xl font-bold text-green-600">
                {approvedRequests.length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <div className="text-2xl font-bold text-primary">72</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
