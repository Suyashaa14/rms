import React from 'react';
import { motion } from 'framer-motion';
import {type Category } from './menuData';
import { cn } from '../../lib/utils';

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isMobile?: boolean;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  isMobile = false,
}) => {
  return (
    <motion.div 
      className="w-64 bg-category border-r border-menu-border h-full overflow-y-auto"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-menu-border">
        <h2 className="text-lg font-semibold text-category-foreground flex items-center gap-2">
          <span className="text-primary">🍽️</span>
          Categories
        </h2>
      </div>
      
      <div className="p-4 space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
              "hover:bg-category-hover hover:shadow-sm",
              activeCategory === category.id
                ? "bg-category-active text-category-active-foreground shadow-md"
                : "text-category-foreground hover:text-category-foreground"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium text-sm">{category.name}</span>
            {activeCategory === category.id && (
              <motion.div
                className="ml-auto w-2 h-2 bg-category-active-foreground rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;