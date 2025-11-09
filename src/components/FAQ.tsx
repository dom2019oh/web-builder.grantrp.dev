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
    answer: "Yes! We offer a 4-day free trial on all plans so you can test our platform before committing. No credit card required to start."
  },
  {
    question: "What happens to my websites if I cancel?",
    answer: "Your websites will remain live until the end of your current billing period. After that, they'll be archived for 30 days, giving you time to export your data or reactivate your subscription."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Aurora background effects - ENHANCED */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-15 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-10 aurora-animate" style={{ backgroundSize: '200% 200%', animationDirection: 'reverse', animationDuration: '25s' }} />
      <div className="absolute top-20 right-20 w-[450px] h-[450px] bg-aurora-cyan/15 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-[450px] h-[450px] bg-aurora-magenta/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-aurora-violet/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-button bg-clip-text text-transparent drop-shadow-glow" style={{ backgroundSize: '200% 200%' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/80">
            Everything you need to know about Grant Development™
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass glass-glow rounded-xl px-6 border border-aurora-cyan/10 hover:border-aurora-magenta/30 transition-all duration-300 hover:shadow-glow-magenta backdrop-blur-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-foreground hover:text-aurora-cyan hover:no-underline transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
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
