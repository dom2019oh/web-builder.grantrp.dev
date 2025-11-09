import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI website builder work?",
    answer: "Our AI-powered builder uses advanced algorithms to understand your requirements and automatically generate professional websites. Simply describe what you need, and the AI will create a custom design tailored to your specifications."
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes! Pro and Business plans include custom domain support. You can connect your existing domain or purchase a new one through our platform."
  },
  {
    question: "What if I need help building my website?",
    answer: "We offer priority support for Pro and Business plans. Our team is available to assist you via email at dom2019ogsapd@gmail.com, and we provide comprehensive documentation and tutorials."
  },
  {
    question: "Can I switch plans later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any differences."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial on all plans so you can test our platform before committing. No credit card required to start."
  },
  {
    question: "What happens to my websites if I cancel?",
    answer: "Your websites will remain live until the end of your current billing period. After that, they'll be archived for 30 days, giving you time to export your data or reactivate your subscription."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Grant Development™
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass glass-glow rounded-lg px-6 border-0"
              >
                <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
