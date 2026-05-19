import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "FoodSave has transformed how we handle surplus food. Instead of throwing it away, we now feed hundreds of people every week. The platform is incredibly easy to use.",
    name: "Priya Sharma",
    role: "Operations Manager",
    organization: "Grand Hyatt Mumbai",
    initials: "PS",
  },
  {
    quote:
      "As an NGO, finding consistent food sources was always a challenge. FoodSave connects us with multiple donors, and the delivery tracking gives us peace of mind.",
    name: "Rajesh Patel",
    role: "Director",
    organization: "Feeding India Foundation",
    initials: "RP",
  },
  {
    quote:
      "Being a delivery partner with FoodSave is rewarding. Every pickup and delivery means someone gets to eat. The verification system ensures quality too.",
    name: "Amit Kumar",
    role: "Delivery Partner",
    organization: "Independent",
    initials: "AK",
  },
  {
    quote:
      "The emergency donation feature is a game-changer. When we have events with leftover food, we can quickly find NGOs who can pick it up the same day.",
    name: "Meera Reddy",
    role: "Event Manager",
    organization: "Taj Hotels",
    initials: "MR",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Organizations Across India
          </h2>
            <p className="text-muted-foreground text-lg">
            Hear from donors, NGOs, and delivery partners who are making a difference with SaveBite.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card border-border">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <blockquote className="text-foreground mb-6 text-pretty">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.organization}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
