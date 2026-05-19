import type { Metadata } from "next";
import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SaveBite's mission to reduce food waste and feed communities across India.",
};

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We believe everyone deserves access to nutritious food. Our platform is built on the foundation of caring for communities.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Every feature we build is designed to maximize food rescue and minimize waste. We measure success by meals delivered.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We bring together donors, NGOs, and delivery partners into a collaborative ecosystem that works for everyone.",
  },
  {
    icon: Award,
    title: "Trust",
    description:
      "Transparency and verification at every step ensure that food donations reach those who need them safely.",
  },
];

const team = [
  {
    name: "Anita Desai",
    role: "Founder & CEO",
    bio: "Former food industry executive with 15 years of experience. Started SaveBite after witnessing massive food waste at events.",
    initials: "AD",
  },
  {
    name: "Vikram Mehta",
    role: "CTO",
    bio: "Tech veteran who previously built logistics platforms. Passionate about using technology for social good.",
    initials: "VM",
  },
  {
    name: "Sunita Rao",
    role: "Head of Partnerships",
    bio: "Spent 10 years in the NGO sector. Brings deep understanding of community needs and charitable operations.",
    initials: "SR",
  },
  {
    name: "Arjun Singh",
    role: "Head of Operations",
    bio: "Logistics expert who ensures smooth food delivery operations across all partner cities.",
    initials: "AS",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Mission: Zero Food Waste, Zero Hunger
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              SaveBite was founded with a simple yet powerful vision - to create a world where
              no edible food goes to waste while people go hungry. We are building the bridge
              between surplus and need.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                It started with a question: Why does perfectly good food end up in landfills
                while millions struggle to find their next meal?
                This disconnect sparked the idea for SaveBite.
              </p>
              <p>
                In 2023, our founder Anita Desai witnessed trays of untouched food being
                discarded after a corporate event. That same evening, she passed by families
                sleeping hungry on the streets. This disconnect sparked the idea for FoodSave.
              </p>
              <p>
                Today, FoodSave connects hundreds of food donors - from five-star hotels to
                Today, SaveBite connects hundreds of food donors - from five-star hotels to
                neighborhood restaurants - with verified NGOs serving vulnerable communities.
                Our delivery network ensures food reaches those in need safely and on time.
              </p>
              <p>
                We have saved over 25 tons of food and provided more than 75,000 meals. But
                this is just the beginning. Our goal is to expand to 50 cities and serve
                1 million meals by 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at SaveBite.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind SaveBite working to make food rescue seamless.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { value: "10+", label: "Cities" },
              { value: "500+", label: "Donor Partners" },
              { value: "120+", label: "NGO Partners" },
              { value: "25", label: "Tons Food Saved" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
