"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DONATION_TYPES, FOOD_TYPES, FOOD_CATEGORIES, UNITS } from "@/lib/constants";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AddDonationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    foodType: "",
    foodCategory: "",
    donationType: "FREE",
    quantity: "",
    unit: "servings",
    expiryHours: "6",
    pickupAddress: "",
    pickupCity: "",
    pickupPincode: "",
    pickupInstructions: "",
    deliveryCharge: "",
    discountPrice: "",
    originalPrice: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Donation listed successfully!", {
      description: "Your food is now available for NGOs to request.",
    });

    setIsSubmitting(false);
    router.push("/donor/donations");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/donor/donations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Donation</h1>
          <p className="text-muted-foreground">
            List surplus food for NGOs to request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
            <CardDescription>
              Provide information about the food you are donating
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Fresh Vegetable Biryani"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the food, ingredients, how it was prepared..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Food Type</Label>
                <Select
                  value={formData.foodType}
                  onValueChange={(v) => updateField("foodType", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FOOD_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.foodCategory}
                  onValueChange={(v) => updateField("foodCategory", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {FOOD_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="e.g., 50"
                  value={formData.quantity}
                  onChange={(e) => updateField("quantity", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Unit</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(v) => updateField("unit", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expires In</Label>
                <Select
                  value={formData.expiryHours}
                  onValueChange={(v) => updateField("expiryHours", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Food Images</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation Type */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Type</CardTitle>
            <CardDescription>
              Choose how you want to donate this food
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.donationType}
              onValueChange={(v) => updateField("donationType", v)}
              className="grid gap-3 sm:grid-cols-2"
            >
              {DONATION_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    formData.donationType === type.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value={type.value} className="mt-0.5" />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {type.description}
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>

            {/* Conditional fields based on donation type */}
            {formData.donationType === "DELIVERY_CHARGE" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="deliveryCharge">Delivery Charge (INR)</Label>
                <Input
                  id="deliveryCharge"
                  type="number"
                  min="0"
                  placeholder="e.g., 100"
                  value={formData.deliveryCharge}
                  onChange={(e) => updateField("deliveryCharge", e.target.value)}
                />
              </div>
            )}

            {formData.donationType === "DISCOUNT" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (INR)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    min="0"
                    placeholder="e.g., 1000"
                    value={formData.originalPrice}
                    onChange={(e) => updateField("originalPrice", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Discounted Price (INR)</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    min="0"
                    placeholder="e.g., 400"
                    value={formData.discountPrice}
                    onChange={(e) => updateField("discountPrice", e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pickup Location */}
        <Card>
          <CardHeader>
            <CardTitle>Pickup Location</CardTitle>
            <CardDescription>
              Where should the food be picked up from?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Address</Label>
              <Textarea
                id="pickupAddress"
                placeholder="Full address for pickup"
                value={formData.pickupAddress}
                onChange={(e) => updateField("pickupAddress", e.target.value)}
                rows={2}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pickupCity">City</Label>
                <Input
                  id="pickupCity"
                  placeholder="e.g., Mumbai"
                  value={formData.pickupCity}
                  onChange={(e) => updateField("pickupCity", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupPincode">Pincode</Label>
                <Input
                  id="pickupPincode"
                  placeholder="e.g., 400053"
                  value={formData.pickupPincode}
                  onChange={(e) => updateField("pickupPincode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupInstructions">
                Pickup Instructions (Optional)
              </Label>
              <Input
                id="pickupInstructions"
                placeholder="e.g., Use back entrance, ask for manager"
                value={formData.pickupInstructions}
                onChange={(e) => updateField("pickupInstructions", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" asChild>
            <Link href="/donor/donations">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Donation"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
