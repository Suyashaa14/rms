import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type{ MenuItem, Addon } from './menuData';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Card, CardContent } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Plus, Minus, Star, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

interface MenuItemsProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number, addons: Addon[]) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedAddons([]);
  };

  const handleAddonToggle = (addon: Addon, checked: boolean) => {
    if (checked) {
      setSelectedAddons(prev => [...prev, addon]);
    } else {
      setSelectedAddons(prev => prev.filter(a => a.id !== addon.id));
    }
  };

  const handleSizeChange = (sizeAddon: Addon) => {
    setSelectedAddons(prev => [
      ...prev.filter(a => a.category !== 'size'),
      sizeAddon
    ]);
  };

  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    const basePrice = selectedItem.price;
    const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return (basePrice + addonPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      onAddToCart(selectedItem, quantity, selectedAddons);
      setSelectedItem(null);
      setQuantity(1);
      setSelectedAddons([]);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  const groupAddonsByCategory = (addons: Addon[]) => {
    return addons.reduce((acc, addon) => {
      if (!acc[addon.category]) {
        acc[addon.category] = [];
      }
      acc[addon.category].push(addon);
      return acc;
    }, {} as Record<string, Addon[]>);
  };

  return (
    <div className="flex-1 p-6 bg-menu overflow-y-auto">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-primary">🍽️</span>
          Our Menu
        </motion.h1>

        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-card rounded-xl border border-menu-border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-6">
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                       {/* Image */}
                       <motion.div 
                         className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-muted group"
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={() => handleImageClick(item.image)}
                       >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {item.popular && (
                          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground z-10">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </motion.div>

                       {/* Content */}
                       <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start mb-3">
                           <div className="flex-col sm:flex-row sm:justify-between sm:items-start">
                             <div className="mb-2 sm:mb-0">
                               <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">
                                 {item.name}
                               </h3>
                               <p className="text-muted-foreground text-sm leading-relaxed">
                                 {item.description}
                               </p>
                             </div>
                           </div>
                         </div>

                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                           <div className="flex items-center gap-4">
                             <span className="text-xl sm:text-2xl font-bold text-primary">
                               {formatPrice(item.price)}
                             </span>
                           </div>

                           <Button
                             onClick={() => handleItemSelect(item)}
                             className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
                           >
                             <Plus className="w-4 h-4 mr-2" />
                             Add to Cart
                           </Button>
                         </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
              src={selectedImage || ''}
              alt="Menu item preview"
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Item Customization Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              {/* Item Image and Description */}
              <div className="flex gap-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(selectedItem.price)}
                  </div>
                </div>
              </div>

              {/* Addons */}
              {selectedItem.addons && selectedItem.addons.length > 0 && (
                <div className="space-y-4">
                  {Object.entries(groupAddonsByCategory(selectedItem.addons)).map(([category, addons]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-semibold text-lg capitalize">
                        {category === 'size' ? 'Choose Size' : 
                         category === 'topping' ? 'Add Toppings' :
                         category === 'sauce' ? 'Choose Sauce' : 'Extras'}
                      </h4>

                      {category === 'size' ? (
                        <RadioGroup
                          value={selectedAddons.find(a => a.category === 'size')?.id || ''}
                          onValueChange={(value: string) => {
                            const addon = addons.find(a => a.id === value);
                            if (addon) handleSizeChange(addon);
                          }}
                        >
                          {addons.map(addon => (
                            <div key={addon.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={addon.id} />
                              <Label className="flex-1 flex justify-between">
                                <span>{addon.name}</span>
                                <span className={cn(
                                  "font-medium",
                                  addon.price === 0 ? "text-muted-foreground" :
                                  addon.price > 0 ? "text-accent" : "text-destructive"
                                )}>
                                  {addon.price === 0 ? 'Free' : 
                                   addon.price > 0 ? `+${formatPrice(addon.price)}` : 
                                   formatPrice(addon.price)}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="space-y-2">
                          {addons.map(addon => (
                            <div key={addon.id} className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedAddons.some(a => a.id === addon.id)}
                                onCheckedChange={(checked: boolean | 'indeterminate') => 
                                  handleAddonToggle(addon, checked === true)
                                }
                              />
                              <Label className="flex-1 flex justify-between">
                                <span>{addon.name}</span>
                                <span className={cn(
                                  "font-medium",
                                  addon.price === 0 ? "text-muted-foreground" : "text-accent"
                                )}>
                                  {addon.price === 0 ? 'Free' : `+${formatPrice(addon.price)}`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(calculateTotalPrice())}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 text-lg font-medium"
              >
                Add to Cart - {formatPrice(calculateTotalPrice())}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItems;