"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
import { useAuth } from "@/lib/hooks/use-auth";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");

      // Redirect based on user role
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        switch (user.role) {
          case "ADMIN":
            router.push("/admin");
            break;
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
            router.push("/");
        }
      }
    } catch {
      toast.error("Invalid credentials", {
        description: "Please check your email and password.",
      });
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Demo accounts (any password works):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: "donor@restaurant.com",
                  password: "demo123",
                })
              }
              className="p-2 rounded border bg-card hover:bg-accent text-left"
            >
              <div className="font-medium">Donor</div>
              <div className="text-muted-foreground truncate">
                donor@restaurant.com
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: "ngo@helpinghands.org",
                  password: "demo123",
                })
              }
              className="p-2 rounded border bg-card hover:bg-accent text-left"
            >
              <div className="font-medium">NGO</div>
              <div className="text-muted-foreground truncate">
                ngo@helpinghands.org
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: "delivery@partner.com",
                  password: "demo123",
                })
              }
              className="p-2 rounded border bg-card hover:bg-accent text-left"
            >
              <div className="font-medium">Delivery</div>
              <div className="text-muted-foreground truncate">
                delivery@partner.com
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: "admin@savebite.com",
                  password: "demo123",
                })
              }
              className="p-2 rounded border bg-card hover:bg-accent text-left"
            >
              <div className="font-medium">Admin</div>
              <div className="text-muted-foreground truncate">
                admin@savebite.com
              </div>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
