"use client";

import { Crown, Check, Zap, Shield, Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "Rs 0",
    period: "forever",
    description: "Basic access to food donations",
    features: [
      "Access to free donations",
      "Self pickup option",
      "Basic search filters",
      "Email notifications",
      "Standard support",
    ],
    limitations: [
      "Limited to 10 requests/month",
      "No priority access",
      "No delivery requests",
    ],
    current: true,
  },
  {
    name: "Premium",
    price: "Rs 999",
    period: "per month",
    description: "Unlimited access with priority features",
    features: [
      "Unlimited food requests",
      "Priority access to new donations",
      "Request delivery service",
      "Advanced search & filters",
      "Real-time notifications",
      "Priority support",
      "Analytics dashboard",
      "Bulk request feature",
    ],
    limitations: [],
    current: false,
    popular: true,
  },
];

const premiumBenefits = [
  {
    icon: Zap,
    title: "Priority Access",
    description: "Get notified first when new donations are available",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description: "Build trust with donors through verified status",
  },
  {
    icon: Clock,
    title: "Faster Delivery",
    description: "Priority assignment to delivery partners",
  },
  {
    icon: Star,
    title: "Premium Support",
    description: "Dedicated support team for your queries",
  },
];

export default function NgoSubscriptionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-4">
          <Crown className="h-3 w-3 mr-1" />
          Premium Plans
        </Badge>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Upgrade Your Impact
        </h1>
        <p className="text-muted-foreground">
          Get unlimited access to food donations and priority features to serve
          more beneficiaries.
        </p>
      </div>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative",
              plan.popular && "border-primary shadow-lg"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.current && (
                  <Badge variant="secondary">Current Plan</Badge>
                )}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li
                    key={limitation}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="h-4 w-4 flex items-center justify-center flex-shrink-0">
                      -
                    </span>
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button className="w-full">
                  Upgrade to {plan.name}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          Premium Benefits
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {premiumBenefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="p-4 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Can I cancel anytime?
            </h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. You will continue
              to have access until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Is there a trial period?
            </h4>
            <p className="text-sm text-muted-foreground">
              We offer a 7-day free trial for all new Premium subscribers. No
              credit card required to start.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              What payment methods are accepted?
            </h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, debit cards, UPI, and net banking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
