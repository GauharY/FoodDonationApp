"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockDeliveries } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { 
  ClipboardCheck, 
  Camera, 
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  Package,
  Clock,
  Send
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const verificationChecklist = [
  { id: "packaging", label: "Food is properly packaged and sealed", icon: Package },
  { id: "temperature", label: "Temperature requirements met (if applicable)", icon: Thermometer },
  { id: "quantity", label: "Quantity matches the donation details", icon: ClipboardCheck },
  { id: "quality", label: "Food appears fresh and safe for consumption", icon: CheckCircle2 },
  { id: "labels", label: "All items are properly labeled with expiry dates", icon: Clock },
];

export default function VerificationPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<string>("");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [condition, setCondition] = useState<string>("");

  const activeDeliveries = mockDeliveries.filter(
    (d) => d.status === "IN_TRANSIT" || d.status === "PICKED_UP"
  );

  const handleChecklistChange = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = verificationChecklist.every((item) => checklist[item.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Food Verification</h1>
        <p className="text-muted-foreground">
          Verify food quality and safety before completing delivery
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Delivery</CardTitle>
              <CardDescription>
                Choose a delivery to verify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a delivery to verify" />
                </SelectTrigger>
                <SelectContent>
                  {activeDeliveries.map((delivery) => (
                    <SelectItem key={delivery.id} value={delivery.id}>
                      Delivery #{delivery.id.slice(0, 8)} - {delivery.pickupAddress.split(",")[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-emerald-500" />
                Verification Checklist
              </CardTitle>
              <CardDescription>
                Complete all checks before marking the delivery as verified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {verificationChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-3 rounded-lg border p-4"
                >
                  <Checkbox
                    id={item.id}
                    checked={checklist[item.id] || false}
                    onCheckedChange={() => handleChecklistChange(item.id)}
                    disabled={!selectedDelivery}
                  />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor={item.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Label>
                  </div>
                  {checklist[item.id] && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Food Condition</CardTitle>
              <CardDescription>
                Rate the overall condition of the food
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={condition} onValueChange={setCondition} disabled={!selectedDelivery}>
                <SelectTrigger>
                  <SelectValue placeholder="Select food condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent - Perfect condition</SelectItem>
                  <SelectItem value="good">Good - Minor issues</SelectItem>
                  <SelectItem value="acceptable">Acceptable - Some concerns</SelectItem>
                  <SelectItem value="poor">Poor - Significant issues</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any observations or notes about the food condition..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  disabled={!selectedDelivery}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photo Evidence
              </CardTitle>
              <CardDescription>
                Take photos for verification records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-3">
                  Take photos of the food items
                </p>
                <Button variant="outline" disabled={!selectedDelivery}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Photos help maintain quality records and resolve disputes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Checklist Progress</span>
                  <span className="font-medium">
                    {Object.values(checklist).filter(Boolean).length} / {verificationChecklist.length}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${(Object.values(checklist).filter(Boolean).length / verificationChecklist.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {!allChecked && selectedDelivery && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-500">
                    Please complete all checklist items before submitting
                  </p>
                </div>
              )}

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!selectedDelivery || !allChecked || !condition}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Verification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
