export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  addons?: Addon[];
  popular?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  category: 'size' | 'topping' | 'sauce' | 'extra';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: Addon[];
  totalPrice: number;
}

export const categories: Category[] = [
  { id: 'favorites', name: 'My Favourites', icon: '❤️' },
  { id: 'signature', name: 'Signature Pizza', icon: '🍕' },
  { id: 'large', name: 'Large Pizza (12 inch)', icon: '🍕' },
  { id: 'medium', name: 'Medium Pizza (10 inch)', icon: '🍕' },
  { id: 'small', name: 'Small Pizza (8 inch)', icon: '🍕' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'salads', name: 'Fresh Salads', icon: '🥗' },
  { id: 'appetizers', name: 'Appetizers', icon: '🥖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Beverages', icon: '🥤' },
];

const commonAddons: Addon[] = [
  // Size options
  { id: 'size-small', name: 'Small (8")', price: -200, category: 'size' },
  { id: 'size-medium', name: 'Medium (10")', price: 0, category: 'size' },
  { id: 'size-large', name: 'Large (12")', price: 200, category: 'size' },
  { id: 'size-xlarge', name: 'Extra Large (14")', price: 400, category: 'size' },
  
  // Toppings
  { id: 'topping-pepperoni', name: 'Extra Pepperoni', price: 150, category: 'topping' },
  { id: 'topping-mushrooms', name: 'Mushrooms', price: 100, category: 'topping' },
  { id: 'topping-bell-peppers', name: 'Bell Peppers', price: 100, category: 'topping' },
  { id: 'topping-olives', name: 'Black Olives', price: 120, category: 'topping' },
  { id: 'topping-cheese', name: 'Extra Cheese', price: 180, category: 'topping' },
  { id: 'topping-bacon', name: 'Crispy Bacon', price: 200, category: 'topping' },
  { id: 'topping-chicken', name: 'Grilled Chicken', price: 250, category: 'topping' },
  
  // Sauces
  { id: 'sauce-marinara', name: 'Marinara Sauce', price: 0, category: 'sauce' },
  { id: 'sauce-white', name: 'White Sauce', price: 50, category: 'sauce' },
  { id: 'sauce-bbq', name: 'BBQ Sauce', price: 50, category: 'sauce' },
  { id: 'sauce-pesto', name: 'Pesto Sauce', price: 80, category: 'sauce' },
  
  // Extras
  { id: 'extra-garlic', name: 'Garlic Bread', price: 150, category: 'extra' },
  { id: 'extra-dip', name: 'Ranch Dip', price: 80, category: 'extra' },
  { id: 'extra-parmesan', name: 'Parmesan Sprinkle', price: 60, category: 'extra' },
];

export const menuItems: MenuItem[] = [
  // Signature Pizzas
  {
    id: 'hulk-pizza',
    name: 'The Hulk Pizza',
    description: 'Mozzarella, pizza sauce, chicken, caramelized onions, jalapeños, ricotta and a homemade pineapple chili sauce, pineapple',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons,
    popular: true
  },
  {
    id: 'tony-montana',
    name: 'Tony Montana Pizza',
    description: 'Tomato sauce, Ricotta cheese, mozzarella, jalapeños, bacon caramelized onions and homemade italian sausage',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons,
    popular: true
  },
  {
    id: 'elvira-pizza',
    name: 'Elvira Pizza',
    description: 'Hot honey, garlic, spinach, Italian sausage, mozzarella, and ricotta',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons
  },
  {
    id: 'parmesan-hot-pepperoni',
    name: 'Parmesan Hot Pepperoni Pizza',
    description: 'Mozzarella, Parmesan, Pizza Sauce, Jalapeños, Pepperoni with our house Hot Honey',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons
  },
  {
    id: 'supreme-pizza',
    name: 'Supreme Pizza',
    description: 'Mozzarella, pizza sauce, onion, green pepper, mushroom, black olives, pepperoni, Italian sausage',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons
  },
  {
    id: 'inside-out-veg',
    name: 'Inside Out Pizza (Veg)',
    description: 'Mozzarella, ricotta, parmesan cheese, double cheese, thick pizza sauce',
    price: 1325,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons
  },
  {
    id: 'half-half',
    name: 'Half & Half Pizza',
    description: 'Choose any two half pizzas from our menu',
    price: 1225,
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=300&h=300&fit=crop&crop=center',
    category: 'signature',
    addons: commonAddons
  },

  // Large Pizzas
  {
    id: 'margherita-large',
    name: 'Margherita Pizza (Large)',
    description: 'Fresh mozzarella, tomato sauce, fresh basil, olive oil',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop&crop=center',
    category: 'large',
    addons: commonAddons
  },
  {
    id: 'pepperoni-large',
    name: 'Pepperoni Pizza (Large)',
    description: 'Mozzarella cheese, pepperoni, tomato sauce',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop&crop=center',
    category: 'large',
    addons: commonAddons
  },
  {
    id: 'hawaiian-large',
    name: 'Hawaiian Pizza (Large)',
    description: 'Ham, pineapple, mozzarella cheese, tomato sauce',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=300&fit=crop&crop=center',
    category: 'large',
    addons: commonAddons
  },

  // Pasta
  {
    id: 'spaghetti-carbonara',
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, parmesan cheese, and black pepper',
    price: 950,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    category: 'pasta',
    addons: [
      { id: 'pasta-extra-cheese', name: 'Extra Parmesan', price: 100, category: 'extra' },
      { id: 'pasta-extra-bacon', name: 'Extra Bacon', price: 150, category: 'extra' },
      { id: 'pasta-garlic-bread', name: 'Garlic Bread', price: 200, category: 'extra' },
    ]
  },
  {
    id: 'penne-arrabbiata',
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic, red chilies, and fresh herbs',
    price: 850,
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=300&fit=crop&crop=center',
    category: 'pasta',
    addons: [
      { id: 'pasta-extra-cheese', name: 'Extra Parmesan', price: 100, category: 'extra' },
      { id: 'pasta-chicken', name: 'Grilled Chicken', price: 200, category: 'extra' },
      { id: 'pasta-garlic-bread', name: 'Garlic Bread', price: 200, category: 'extra' },
    ]
  },

  // Salads
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, caesar dressing',
    price: 750,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center',
    category: 'salads',
    addons: [
      { id: 'salad-chicken', name: 'Grilled Chicken', price: 200, category: 'extra' },
      { id: 'salad-shrimp', name: 'Grilled Shrimp', price: 250, category: 'extra' },
      { id: 'salad-avocado', name: 'Fresh Avocado', price: 150, category: 'extra' },
    ]
  },
  {
    id: 'garden-salad',
    name: 'Garden Fresh Salad',
    description: 'Mixed greens, tomatoes, cucumbers, bell peppers, red onions, balsamic vinaigrette',
    price: 650,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center',
    category: 'salads',
    addons: [
      { id: 'salad-feta', name: 'Feta Cheese', price: 120, category: 'extra' },
      { id: 'salad-olives', name: 'Kalamata Olives', price: 100, category: 'extra' },
    ]
  },

  // Appetizers
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    description: 'Freshly baked bread with garlic butter and herbs',
    price: 350,
    image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e5?w=300&h=300&fit=crop&crop=center',
    category: 'appetizers',
    addons: [
      { id: 'bread-cheese', name: 'Melted Mozzarella', price: 100, category: 'extra' },
    ]
  },
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella sticks with marinara sauce',
    price: 550,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=300&h=300&fit=crop&crop=center',
    category: 'appetizers',
    addons: [
      { id: 'sticks-extra-sauce', name: 'Extra Marinara', price: 50, category: 'extra' },
    ]
  },

  // Desserts
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 450,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&crop=center',
    category: 'desserts',
    addons: []
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 520,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&crop=center',
    category: 'desserts',
    addons: []
  },

  // Drinks
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Chilled Coca-Cola (330ml)',
    price: 120,
    image: 'https://images.unsplash.com/photo-1592444645479-6b3ddeced041?w=300&h=300&fit=crop&crop=center',
    category: 'drinks',
    addons: []
  },
  {
    id: 'fresh-orange',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice (250ml)',
    price: 180,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop&crop=center',
    category: 'drinks',
    addons: []
  },
];

export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getAllItems = (): MenuItem[] => {
  return menuItems;
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};