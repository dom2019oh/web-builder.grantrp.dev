import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";
import FloatingUIElements from "@/components/FloatingUIElements";
import { ProductCatalog } from "@/components/ecommerce/ProductCatalog";
import { ShoppingCart } from "@/components/ecommerce/ShoppingCart";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Store = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = async () => {
    try {
      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: cartItems,
          type: "products",
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <FloatingUIElements />
      <Navigation />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-button bg-clip-text text-transparent">
              Our Store
            </h1>
            <p className="text-muted-foreground">
              Browse our collection of premium products
            </p>
          </div>
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>

        <ProductCatalog onAddToCart={handleAddToCart} />
      </div>

      <Footer />
    </div>
  );
};

export default Store;
