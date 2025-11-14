import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Plus, Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium T-Shirt",
      description: "High-quality cotton t-shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: "Apparel",
      stock: 50,
    },
    {
      id: "2",
      name: "Classic Sneakers",
      description: "Comfortable everyday sneakers",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Footwear",
      stock: 30,
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddProduct = (product: Partial<Product>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      image: product.image || "",
      category: product.category || "",
      stock: product.stock || 0,
    };
    setProducts([...products, newProduct]);
    setShowAddDialog(false);
    toast.success("Product added!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Product Catalog</h2>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="glass glass-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="glass glass-glow max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="glass glass-glow overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onAddToCart(product)}
                  className="glass glass-glow flex-1"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setEditingProduct(product)}
                  className="glass"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="glass"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductForm = ({
  product,
  onSubmit,
  onCancel,
}: {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      stock: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="glass"
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="glass"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price ($)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="glass"
            required
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="glass"
            required
          />
        </div>
      </div>
      <div>
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="glass"
          required
        />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="glass"
          placeholder="https://..."
          required
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="glass flex-1">
          Cancel
        </Button>
        <Button type="submit" className="glass glass-glow flex-1">
          {product ? "Update" : "Add"} Product
        </Button>
      </div>
    </form>
  );
};
