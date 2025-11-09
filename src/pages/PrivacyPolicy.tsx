import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto glass glass-glow rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">Effective Date: November 1, 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Grant Development™ ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Personal Information</h3>
              <p className="text-muted-foreground mb-3">
                We may collect personal information that you voluntarily provide to us, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Payment and billing information</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-3">When you access our services, we may automatically collect:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Access times and referring website addresses</li>
                <li>Pages viewed and navigation patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information, updates, and security alerts</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve and optimize our website and services</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
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

export default PrivacyPolicy;
