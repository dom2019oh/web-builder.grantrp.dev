import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto glass glass-glow rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mb-8">Effective Date: November 1, 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Grant Development™ services, you agree to be bound by these 
                Terms of Use and all applicable laws and regulations. If you do not agree with any 
                of these terms, you are prohibited from using or accessing our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-3">
                Permission is granted to temporarily access the materials on Grant Development™'s 
                website for personal, non-commercial transitory viewing only. This is the grant of 
                a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software on our platform</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground">
                When you create an account with us, you must provide accurate, complete, and current 
                information. Failure to do so constitutes a breach of the Terms. You are responsible 
                for safeguarding your account credentials and for any activities or actions under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Use, please contact us at:{" "}
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

export default TermsOfUse;
