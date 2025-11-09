import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, ArrowLeft, Home, Mail, Settings, User, Bell, Heart, Star, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: JSX.Element;
}

const ComponentLibrary = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const components: Component[] = [
    {
      id: "button-variants",
      name: "Button Variants",
      description: "Multiple button styles and states",
      category: "buttons",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
            Gradient Button
          </Button>
        </div>
      ),
    },
    {
      id: "button-sizes",
      name: "Button Sizes",
      description: "Different button sizes",
      category: "buttons",
      preview: (
        <div className="flex items-center flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Heart className="h-4 w-4" /></Button>
        </div>
      ),
    },
    {
      id: "glass-card",
      name: "Glass Card",
      description: "Beautiful glassmorphism card with Aurora gradient",
      category: "cards",
      preview: (
        <Card className="glass glass-glow border-0 w-full">
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
            <CardDescription>With gradient glow effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is a beautiful glass card component with interactive hover effects.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "feature-card",
      name: "Feature Card",
      description: "Card for showcasing features with icon",
      category: "cards",
      preview: (
        <Card className="glass border-0 hover:glass-glow transition-all cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-gradient-aurora-cyan flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Amazing Feature</CardTitle>
            <CardDescription>Description of your feature goes here</CardDescription>
          </CardHeader>
        </Card>
      ),
    },
    {
      id: "input-field",
      name: "Input Field",
      description: "Text input with label",
      category: "forms",
      preview: (
        <div className="space-y-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      ),
    },
    {
      id: "glass-input",
      name: "Glass Input",
      description: "Input field with glass effect",
      category: "forms",
      preview: (
        <div className="space-y-2 w-full">
          <Label>Glass Style Email</Label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="glass w-full px-3 py-2 rounded-md"
          />
        </div>
      ),
    },
    {
      id: "checkbox",
      name: "Checkbox",
      description: "Interactive checkbox with label",
      category: "forms",
      preview: (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
          />
          <Label htmlFor="terms" className="cursor-pointer">Accept terms and conditions</Label>
        </div>
      ),
    },
    {
      id: "switch",
      name: "Switch",
      description: "Toggle switch component",
      category: "forms",
      preview: (
        <div className="flex items-center space-x-2">
          <Switch 
            id="notifications" 
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
          />
          <Label htmlFor="notifications" className="cursor-pointer">Enable notifications</Label>
        </div>
      ),
    },
    {
      id: "slider",
      name: "Slider",
      description: "Interactive range slider",
      category: "forms",
      preview: (
        <div className="space-y-2 w-full">
          <Label>Volume: {sliderValue[0]}%</Label>
          <Slider 
            value={sliderValue} 
            onValueChange={setSliderValue}
            max={100}
            step={1}
          />
        </div>
      ),
    },
    {
      id: "badges",
      name: "Badges",
      description: "Status and label badges",
      category: "display",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      ),
    },
    {
      id: "avatar",
      name: "Avatar",
      description: "User profile avatar",
      category: "display",
      preview: (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      id: "progress",
      name: "Progress Bar",
      description: "Progress indicator",
      category: "display",
      preview: (
        <div className="space-y-2 w-full">
          <Label>Loading Progress</Label>
          <Progress value={66} />
        </div>
      ),
    },
    {
      id: "separator",
      name: "Separator",
      description: "Visual divider line",
      category: "display",
      preview: (
        <div className="w-full space-y-4">
          <div className="text-sm">Content above</div>
          <Separator />
          <div className="text-sm">Content below</div>
        </div>
      ),
    },
    {
      id: "alert",
      name: "Alert",
      description: "Alert notification box",
      category: "feedback",
      preview: (
        <Alert className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your dashboard by clicking on them.
          </AlertDescription>
        </Alert>
      ),
    },
    {
      id: "alert-destructive",
      name: "Alert Destructive",
      description: "Error alert notification",
      category: "feedback",
      preview: (
        <Alert variant="destructive" className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      ),
    },
    {
      id: "accordion",
      name: "Accordion",
      description: "Expandable content sections",
      category: "layout",
      preview: (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      id: "tabs",
      name: "Tabs",
      description: "Tabbed content sections",
      category: "layout",
      preview: (
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="glass">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <p className="text-sm">Account settings content</p>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <p className="text-sm">Password settings content</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "icon-buttons",
      name: "Icon Buttons",
      description: "Buttons with icons",
      category: "buttons",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="icon">
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      id: "button-with-icon",
      name: "Buttons with Icons",
      description: "Text buttons with icons",
      category: "buttons",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline">
            Settings
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      id: "toast-demo",
      name: "Toast Notification",
      description: "Click to trigger toast",
      category: "feedback",
      preview: (
        <Button 
          onClick={() => toast.success("This is a toast notification!", {
            description: "It appears at the bottom of your screen"
          })}
        >
          Show Toast
        </Button>
      ),
    },
  ];

  const categories = ["all", "buttons", "cards", "forms", "display", "feedback", "layout"];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">Component Library</h1>
          <p className="text-foreground/70">Interactive UI components for your website - click and interact with any component below</p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="glass">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="capitalize"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {components
                  .filter(c => category === "all" || c.category === category)
                  .map((component) => (
                    <Card key={component.id} className="glass glass-glow border-0 overflow-hidden hover:scale-[1.02] transition-transform">
                      <CardHeader>
                        <CardTitle>{component.name}</CardTitle>
                        <CardDescription>{component.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="glass p-6 rounded-lg">
                          {component.preview}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ComponentLibrary;
