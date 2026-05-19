"use client";

import Link from "next/link";
import { Plus, Package, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockDonations } from "@/lib/mock-data";
import { DONATION_TYPES, FOOD_TYPES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export default function DonorDonationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch = donation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFoodType =
      foodTypeFilter === "all" || donation.foodType === foodTypeFilter;
    const matchesStatus =
      statusFilter === "all" || donation.status === statusFilter;
    return matchesSearch && matchesFoodType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Donations</h1>
          <p className="text-muted-foreground">
            Manage and track all your food donations
          </p>
        </div>
        <Button asChild>
          <Link href="/donor/add-donation">
            <Plus className="mr-2 h-4 w-4" />
            Add Donation
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={foodTypeFilter} onValueChange={setFoodTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Food Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {FOOD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="REQUESTED">Requested</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-1">No donations found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || foodTypeFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding your first donation"}
              </p>
              <Button asChild>
                <Link href="/donor/add-donation">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Donation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredDonations.map((donation) => (
            <Card
              key={donation.id}
              className="hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {donation.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {donation.description}
                        </p>
                      </div>
                      <StatusBadge status={donation.status} type="donation" />
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <span>
                        {donation.quantity} {donation.unit}
                      </span>
                      <span>
                        {FOOD_TYPES.find((t) => t.value === donation.foodType)?.label}
                      </span>
                      <span>
                        {
                          DONATION_TYPES.find((t) => t.value === donation.donationType)
                            ?.label
                        }
                      </span>
                      <span>
                        {formatDistanceToNow(new Date(donation.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    {donation.status === "AVAILABLE" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
