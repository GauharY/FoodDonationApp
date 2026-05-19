"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/hooks/use-auth";
import { USER_ROLES } from "@/lib/constants";
import type { UserRole } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"role" | "details">("role");
  const [formData, setFormData] = useState({
    role: "" as UserRole | "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRoleSelect = (role: UserRole) => {
    setFormData({ ...formData, role });
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
      });

      toast.success("Account created!", {
        description:
          formData.role === "DONOR"
            ? "You can start donating food now."
            : "Your account is pending approval.",
      });

      // Redirect based on role
      switch (formData.role) {
        case "DONOR":
          router.push("/donor");
          break;
        case "NGO":
          router.push("/ngo");
          break;
        case "DELIVERY_PARTNER":
          router.push("/delivery");
          break;
        default:
          router.push("/login");
      }
    } catch {
      toast.error("Registration failed", {
        description: "Please try again.",
      });
    }
  };

  if (step === "role") {
    return (
      <Card className="border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Join SaveBite</CardTitle>
          <CardDescription>
            Choose how you want to contribute to reducing food waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.role}
            onValueChange={(value) => handleRoleSelect(value as UserRole)}
            className="space-y-3"
          >
            {USER_ROLES.map((role) => (
              <label
                key={role.value}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors",
                  formData.role === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <RadioGroupItem value={role.value} className="mt-1" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{role.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                </div>
                {formData.role === role.value && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </label>
            ))}
          </RadioGroup>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="space-y-1">
        <button
          type="button"
          onClick={() => setStep("role")}
          className="text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          &larr; Change role
        </button>
        <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
        <CardDescription>
          Sign up as{" "}
          <span className="text-primary font-medium">
            {USER_ROLES.find((r) => r.value === formData.role)?.label}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {formData.role === "DELIVERY_PARTNER"
                ? "Full Name"
                : "Organization / Name"}
            </Label>
            <Input
              id="name"
              placeholder={
                formData.role === "DONOR"
                  ? "Restaurant or business name"
                  : formData.role === "NGO"
                  ? "NGO name"
                  : "Your full name"
              }
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {formData.role !== "DONOR" && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {formData.role === "NGO"
                  ? "NGO accounts require admin approval. You will be notified once verified."
                  : "Delivery partner accounts require verification. You will receive approval within 24-48 hours."}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
