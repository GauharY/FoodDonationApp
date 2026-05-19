import { TrendingUp, Users, Leaf, Heart } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "75,000+",
    label: "Meals Provided",
    description: "Nutritious meals delivered to those in need",
  },
  {
    icon: Users,
    value: "1,250",
    label: "Active Partners",
    description: "Donors, NGOs, and delivery partners working together",
  },
  {
    icon: Leaf,
    value: "25 tons",
    label: "Food Saved",
    description: "Surplus food rescued from going to waste",
  },
  {
    icon: Heart,
    value: "50,000+",
    label: "Lives Impacted",
    description: "Beneficiaries served through our platform",
  },
];

export function Statistics() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg">
            Every donation counts. See how our community is making a real difference
            in fighting hunger and reducing food waste.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card border hover:border-primary/50 transition-colors"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
