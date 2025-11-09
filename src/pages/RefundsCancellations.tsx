import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const RefundsCancellations = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto glass glass-glow rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Refund & Cancellation Policy
          </h1>
          <p className="text-muted-foreground mb-8">Effective Date: November 1, 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Overview</h2>
              <p className="text-muted-foreground">
                At Grant Development™, we strive to provide exceptional services and products. This 
                Refund & Cancellation Policy outlines the conditions under which refunds and cancellations 
                are processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Refunds</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Custom Development Services</h3>
              <p className="text-muted-foreground mb-3">For custom development projects:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Refunds may be requested within 7 days of project initiation if no work has commenced</li>
                <li>Once development work has begun, refunds will be prorated based on work completed</li>
                <li>Completed milestones are non-refundable</li>
                <li>All refund requests must be submitted in writing via email</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2 Subscription Services</h3>
              <p className="text-muted-foreground mb-3">For recurring subscription services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You may cancel your subscription at any time through your account settings</li>
                <li>Cancellations take effect at the end of the current billing period</li>
                <li>No refunds are provided for partial billing periods</li>
                <li>Upon cancellation, you will retain access to services until the end of the paid period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Donations</h2>
              <p className="text-muted-foreground">
                All donations made to Grant Development™ are non-refundable. Donations are voluntary 
                contributions and are processed immediately upon payment. If you believe a donation was 
                made in error, please contact us within 24 hours at{" "}
                <a href="mailto:dom2019ogsapd@gmail.com" className="text-primary hover:underline">
                  dom2019ogsapd@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground">
                For refund or cancellation inquiries, please contact us at:{" "}
                <a href="mailto:dom2019ogsapd@gmail.com" className="text-primary hover:underline">
                  dom2019ogsapd@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundsCancellations;
