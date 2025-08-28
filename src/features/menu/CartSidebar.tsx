import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {type CartItem } from './menuData';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Card, CardContent } from '../../components/ui/card';
import { ShoppingBag, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

interface CartSidebarProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  isMobile?: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isMobile = false,
}) => {
  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryCharge = subtotal > 0 ? 0 : 0; // Free delivery
  const vat = Math.round(subtotal * 0.0); // 0% VAT
  const grandTotal = subtotal + deliveryCharge + vat;

  return (
    <motion.div 
      className="w-80 bg-cart border-l border-menu-border h-full flex flex-col"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-menu-border">
        <h2 className="text-xl font-bold text-cart-total flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-primary" />
          MY BAG
          {cartItems.length > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </h2>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="popLayout">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items to get started!</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <Card className="border border-menu-border hover:border-primary/20 transition-colors duration-200">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-sm text-card-foreground truncate">
                              {item.menuItem.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Selected Addons */}
                          {item.selectedAddons.length > 0 && (
                            <div className="mb-2">
                              {item.selectedAddons.map(addon => (
                                <div key={addon.id} className="text-xs text-muted-foreground">
                                  + {addon.name} {addon.price > 0 && `(${formatPrice(addon.price)})`}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-sm font-bold text-primary">
                              {formatPrice(item.totalPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="border-t border-menu-border p-6 space-y-4"
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">SUB TOTAL</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">RESTAURANT SERVICE CHARGE</span>
              <span className="font-medium">{formatPrice(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">VAT</span>
              <span className="font-medium">{formatPrice(vat)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">DELIVERY CHARGE</span>
              <span className="font-medium">TBD</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-cart-total">GRAND TOTAL</span>
              <span className="text-primary">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full bg-cart-checkout hover:bg-cart-checkout/90 text-cart-checkout-foreground py-3 text-lg font-semibold rounded-lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Checkout
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Note: In the event that the restaurant price and the price listed below are different, 
            the restaurant store price will prevail in every case.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CartSidebar;