import {
  Utensils,
  Search,
  Truck,
  ShieldCheck,
  BarChart3,
  Bell,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Utensils,
    title: "Easy Food Listing",
    description:
      "Donors can quickly list surplus food with photos, quantities, and pickup details in minutes.",
  },
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "NGOs can search and filter available food by type, location, quantity, and urgency.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Our delivery partners ensure food reaches NGOs safely and on time with real-time tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Verification",
    description:
      "Multi-point verification ensures food quality and safety before delivery.",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description:
      "Track your contribution with detailed analytics on meals provided and waste reduced.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Get real-time alerts for new donations, request updates, and delivery status.",
  },
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description:
      "Automatically match donors with nearby NGOs to minimize delivery time and costs.",
  },
  {
    icon: Clock,
    title: "Emergency Donations",
    description:
      "Special handling for time-sensitive donations to ensure nothing goes to waste.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Fight Food Waste
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive platform designed for donors, NGOs, and delivery partners
            to work together seamlessly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-background border-border hover:border-primary/50 transition-colors group"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
