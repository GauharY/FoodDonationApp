import { Upload, Search, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Upload,
    title: "List Your Food",
    description:
      "Donors list surplus food with details like type, quantity, expiry time, and pickup location.",
    role: "Donors",
  },
  {
    step: 2,
    icon: Search,
    title: "Discover & Request",
    description:
      "NGOs browse available donations, filter by their needs, and request the food they can use.",
    role: "NGOs",
  },
  {
    step: 3,
    icon: Truck,
    title: "Pickup & Verify",
    description:
      "Delivery partners pick up the food, verify its quality, and transport it safely to NGOs.",
    role: "Delivery Partners",
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Receive & Report",
    description:
      "NGOs receive the food, confirm delivery, and report impact to complete the cycle.",
    role: "NGOs",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How SaveBite Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple four-step process that connects surplus food with those who need it most.
          </p>
        </div>

        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="relative text-center">
                {/* Step number */}
                <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-background border">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <div className="inline-block px-2 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {item.role}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
