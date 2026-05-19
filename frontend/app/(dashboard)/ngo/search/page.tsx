"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Clock, Package, AlertCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockDonations } from "@/lib/mock-data";
import { FOOD_TYPES, FOOD_CATEGORIES, CITIES, DONATION_TYPES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Donation } from "@/lib/types";

export default function NgoSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [pickupType, setPickupType] = useState("SELF_PICKUP");
  const [requestMessage, setRequestMessage] = useState("");

  const availableDonations = mockDonations.filter((d) => d.status === "AVAILABLE");

  const filteredDonations = availableDonations.filter((donation) => {
    const matchesSearch = donation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFoodType =
      foodTypeFilter === "all" || donation.foodType === foodTypeFilter;
    const matchesCity =
      cityFilter === "all" || donation.pickupCity === cityFilter;
    return matchesSearch && matchesFoodType && matchesCity;
  });

  const handleRequest = () => {
    toast.success("Request submitted!", {
      description: "The donor will be notified of your request.",
    });
    setSelectedDonation(null);
    setRequestMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Find Food</h1>
        <p className="text-muted-foreground">
          Browse and request available food donations in your area
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
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
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDonations.length} available donations
      </div>

      {/* Donations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.map((donation) => (
          <Card key={donation.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {donation.title}
                </h3>
                {donation.donationType === "EMERGENCY" && (
                  <Badge variant="destructive" className="flex-shrink-0">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Urgent
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {donation.description}
              </p>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>
                    {donation.quantity} {donation.unit}
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {FOOD_TYPES.find((t) => t.value === donation.foodType)?.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{donation.pickupCity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Expires{" "}
                    {formatDistanceToNow(new Date(donation.expiryTime), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Donation Type Badge */}
              <div className="mb-4">
                {donation.donationType === "FREE" && (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    Free Donation
                  </Badge>
                )}
                {donation.donationType === "DELIVERY_CHARGE" && (
                  <Badge variant="secondary">
                    Free + Delivery: Rs {donation.deliveryCharge}
                  </Badge>
                )}
                {donation.donationType === "DISCOUNT" && (
                  <Badge variant="secondary">
                    <span className="line-through mr-1">
                      Rs {donation.originalPrice}
                    </span>
                    Rs {donation.discountPrice}
                  </Badge>
                )}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedDonation(donation)}
                  >
                    Request Food
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Food</DialogTitle>
                    <DialogDescription>
                      Submit a request for &ldquo;{donation.title}&rdquo;
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Pickup Method</Label>
                      <RadioGroup
                        value={pickupType}
                        onValueChange={setPickupType}
                        className="grid grid-cols-2 gap-4"
                      >
                        <label
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors",
                            pickupType === "SELF_PICKUP"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <RadioGroupItem
                            value="SELF_PICKUP"
                            className="sr-only"
                          />
                          <span className="font-medium">Self Pickup</span>
                          <span className="text-xs text-muted-foreground">
                            Free
                          </span>
                        </label>
                        <label
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors",
                            pickupType === "DELIVERY_REQUIRED"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <RadioGroupItem
                            value="DELIVERY_REQUIRED"
                            className="sr-only"
                          />
                          <span className="font-medium">Need Delivery</span>
                          <span className="text-xs text-muted-foreground">
                            {donation.deliveryCharge
                              ? `Rs ${donation.deliveryCharge}`
                              : "Fee applies"}
                          </span>
                        </label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message to Donor (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Share how you plan to use this food..."
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedDonation(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleRequest}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">No donations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
