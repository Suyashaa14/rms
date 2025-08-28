import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { categories, getItemsByCategory, getAllItems,type MenuItem, type Addon, type CartItem } from './menuData';
import CategorySidebar from './CategorySidebar';
import MenuItems from './MenuItems';
import CartSidebar from './CartSidebar';
import { useToast } from '../../hooks/use-toast';
import { Input } from '../../components/ui/input';
import { Search, Menu as MenuIcon, X, ShoppingCart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('signature');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const { toast } = useToast();

  const allItems = getAllItems();
  
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return getItemsByCategory(activeCategory);
    }
    
    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory, allItems]);

  const handleAddToCart = useCallback((menuItem: MenuItem, quantity: number, selectedAddons: Addon[]) => {
    const basePrice = menuItem.price;
    const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = (basePrice + addonPrice) * quantity;

    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      menuItem,
      quantity,
      selectedAddons,
      totalPrice,
    };

    setCartItems(prev => [...prev, cartItem]);
    
    toast({
      title: "Added to cart!",
      description: `${menuItem.name} has been added to your cart.`,
    });
  }, [toast]);

  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const basePrice = item.menuItem.price;
        const addonPrice = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
        const totalPrice = (basePrice + addonPrice) * newQuantity;
        
        return {
          ...item,
          quantity: newQuantity,
          totalPrice,
        };
      }
      return item;
    }));
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  }, [toast]);

  const handleCheckout = useCallback(() => {
    toast({
      title: "Checkout",
      description: "Proceeding to checkout... (Demo)",
    });
  }, [toast]);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      className="h-screen flex flex-col lg:flex-row bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b border-menu-border p-4 flex items-center justify-between">
        <Sheet open={showMobileCategories} onOpenChange={setShowMobileCategories}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <MenuIcon className="w-4 h-4 mr-2" />
              Categories
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(category) => {
                setActiveCategory(category);
                setShowMobileCategories(false);
                clearSearch();
              }}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>

        <Sheet open={showMobileCart} onOpenChange={setShowMobileCart}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <CartSidebar
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Category Sidebar */}
      <div className="hidden lg:block">
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(category) => {
            setActiveCategory(category);
            clearSearch();
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Search Bar */}
        <div className="bg-card border-b border-menu-border p-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
          )}
        </div>

        <MenuItems
          items={filteredItems}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Desktop Cart Sidebar */}
      <div className="hidden lg:block">
        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </motion.div>
  );
};

export default Menu;