import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const Cookies = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto glass glass-glow rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-8">Effective Date: November 1, 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your computer or mobile device when 
                you visit a website. They are widely used to make websites work more efficiently and 
                provide information to website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground mb-3">Grant Development™ uses cookies to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Enable you to sign in to your account</li>
                <li>Analyze how you use our website</li>
                <li>Improve website functionality and user experience</li>
                <li>Provide personalized content and recommendations</li>
                <li>Monitor and analyze website performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function properly. They enable core 
                functionality such as security, network management, and accessibility. You cannot opt 
                out of these cookies.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.2 Performance Cookies</h3>
              <p className="text-muted-foreground">
                These cookies collect information about how visitors use our website, such as which 
                pages are visited most often. This data helps us improve how our website works.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.3 Functional Cookies</h3>
              <p className="text-muted-foreground">
                These cookies allow our website to remember choices you make (such as your username, 
                language, or region) and provide enhanced, more personalized features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us at:{" "}
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

export default Cookies;
