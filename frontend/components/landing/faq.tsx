"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can donate food on SaveBite?",
    answer:
      "Anyone with surplus food can donate - restaurants, hotels, event venues, caterers, corporate cafeterias, and even individuals. You just need to sign up as a donor, get verified, and start listing your surplus food.",
  },
  {
    question: "How do NGOs get verified on the platform?",
    answer:
      "NGOs need to register with valid documentation including their registration certificate, PAN card, and proof of operation. Our team reviews applications within 24-48 hours. Verified NGOs get access to all platform features.",
  },
  {
    question: "What types of food can be donated?",
    answer:
      "We accept cooked food, raw ingredients, packaged items, bakery products, dairy, fruits, and vegetables. All food must be safe for consumption and within its expiry period. Perishable items should have at least 2-4 hours of shelf life.",
  },
  {
    question: "How does the delivery system work?",
    answer:
      "When an NGO requests food, they can either pick it up themselves or request delivery. Our verified delivery partners are assigned based on location and availability. They verify food quality at pickup and ensure safe transport.",
  },
  {
    question: "Is there any cost to use SaveBite?",
    answer:
      "SaveBite is free for donors and basic NGO accounts. NGOs can request self-pickup donations at no cost. For deliveries, there may be a small delivery fee depending on distance. Premium NGO subscriptions offer additional features.",
  },
  {
    question: "How do you ensure food quality and safety?",
    answer:
      "We have a multi-point verification system. Donors provide food details and images. Delivery partners verify freshness, quantity, packaging, and image match at pickup. NGOs confirm quality at delivery. Any issues are flagged immediately.",
  },
  {
    question: "Can I track my donation&apos;s impact?",
    answer:
      "Yes! Donors get detailed analytics showing total donations, meals provided, food waste prevented, and beneficiaries reached. You can download impact reports for CSR documentation and social media sharing.",
  },
  {
    question: "What happens to emergency donations?",
    answer:
      "Emergency donations are marked as high priority with shorter expiry windows. They appear at the top of NGO searches with urgent labels. We send push notifications to nearby NGOs and prioritize quick delivery assignment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions? We have answers. If you cannot find what you are looking for,
            feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
