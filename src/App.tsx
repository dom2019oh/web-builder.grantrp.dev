import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingCreditsButton from "@/components/FloatingCreditsButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import TemplateGallery from "./pages/TemplateGallery";
import TemplateMarket from "./pages/TemplateMarket";
import ProjectSettings from "./pages/ProjectSettings";
import ComponentLibrary from "./pages/ComponentLibrary";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import RefundsCancellations from "./pages/RefundsCancellations";
import Cookies from "./pages/Cookies";
import IntellectualProperty from "./pages/IntellectualProperty";
import Billing from "./pages/Billing";
import Credits from "./pages/Credits";
import Store from "./pages/Store";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor/:projectId" element={<Editor />} />
      <Route path="/templates" element={<TemplateGallery />} />
      <Route path="/template-market" element={<TemplateMarket />} />
      <Route path="/settings" element={<ProjectSettings />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/store" element={<Store />} />
      <Route path="/components" element={<ComponentLibrary />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/refunds-cancellations" element={<RefundsCancellations />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/intellectual-property" element={<IntellectualProperty />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingCreditsButton />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
