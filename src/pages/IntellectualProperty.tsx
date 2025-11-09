import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const IntellectualProperty = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto glass glass-glow rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-aurora-magenta bg-clip-text text-transparent">
            Intellectual Property Notice
          </h1>
          <p className="text-muted-foreground mb-8">Effective Date: November 1, 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Ownership of Content</h2>
              <p className="text-muted-foreground">
                All content, materials, software, designs, graphics, text, images, videos, logos, 
                trademarks, and other intellectual property displayed on Grant Development™'s website 
                and services are the exclusive property of Grant Development™ or its licensors and 
                are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Trademarks</h2>
              <p className="text-muted-foreground mb-3">
                The following are trademarks or registered trademarks of Grant Development™:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Grant Development™</li>
                <li>Grant Development logo and design marks</li>
                <li>All product names, service names, and slogans</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                These trademarks may not be used without the prior written permission of Grant Development™. 
                Any unauthorized use of our trademarks may violate trademark laws and result in legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Copyright Protection</h2>
              <p className="text-muted-foreground">
                All original content on our website, including but not limited to text, graphics, logos, 
                icons, images, audio clips, video clips, data compilations, and software, is the property 
                of Grant Development™ and is protected by United States and international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Restrictions on Use</h2>
              <p className="text-muted-foreground mb-3">You may not, without our express written permission:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of our services or content</li>
                <li>Modify, adapt, translate, or create derivative works based on our content</li>
                <li>Reverse engineer, decompile, or disassemble any software or technology</li>
                <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
              <p className="text-muted-foreground">
                For intellectual property inquiries, please contact us at:{" "}
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

export default IntellectualProperty;
