export interface MenuItem {
  name: string;
  price: number | { reg: number; lg: number };
  tag?: "Bestseller" | "Veg" | "Chef's Special" | "Combo" | "Deal" | "Spicy" | "Vegan";
  description?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  prepTime?: string;
  calories?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "signature-pizzas",
    name: "Signature Pizza",
    items: [
      {
        name: "Aglio-e-Olio",
        price: { reg: 310, lg: 495 },
        description: "Wood-fired sourdough crust topped with roasted garlic, fresh garden veggies, artisan chilli oil, and aged Parmesan.",
        tag: "Chef's Special",
        image: "src/Assets/fries.jpg",
        rating: 4.9,
        reviews: 128,
        prepTime: "15-20 min",
        calories: 240
      },
      {
        name: "The Ember Glaze",
        price: { reg: 275, lg: 510 },
        description: "Smoky paneer cubes and crisp seasonal vegetables glazed with our house BBQ reduction and a signature cheese drizzle.",
        tag: "Spicy",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
        rating: 4.7,
        reviews: 95,
        prepTime: "20-25 min",
        calories: 280
      },
      {
        name: "Paneer Affumicara",
        price: { reg: 325, lg: 480 },
        description: "Authentic smoked paneer layered with zesty Peri Peri, caramelized onions, and our signature slow-fermented crust.",
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 214,
        prepTime: "20 min",
        calories: 310
      },
      {
        name: "Crustica Farmhouse",
        price: { reg: 329, lg: 520 },
        description: "A garden harvest of spicy jalapenos, crunchy onions, sweet corn, fresh capsicum, and vine-ripened tomatoes.",
        tag: "Veg",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        reviews: 156,
        prepTime: "18-22 min",
        calories: 220
      },
      {
        name: "Italian Lover",
        price: { reg: 349, lg: 619 },
        description: "The ultimate cheese indulgence featuring capsicum, mushrooms, baby corn, and black olives loaded with extra mozzarella.",
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 182,
        prepTime: "22-25 min",
        calories: 340
      },
      {
        name: "Heaven Queen",
        price: { reg: 399, lg: 779 },
        description: "A sophisticated blend of sweet tropical pineapple, savory olives, and velvety cream cheese on our sourdough base.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
        rating: 4.6,
        reviews: 84,
        prepTime: "20-22 min",
        calories: 290
      },
    ]
  },
  {
    id: "pizzas",
    name: "Signature Pizzasd",
    items: [
      { name: "Aglio-E-Olio", price: { reg: 310, lg: 495 }, tag: "Chef's Special", description: "Roasted Garlic, Veggies, Chilli Oil, Parmesan." },
      { name: "The Ember Glaze", price: { reg: 275, lg: 510 }, tag: "Veg", description: "Paneer, Veggies, BBQ Glaze, Cheese Drizzle." },
      { name: "Paneer Affumicara", price: { reg: 325, lg: 480 }, tag: "Bestseller", description: "Smoked Paneer, Peri Peri, Caramelized Onion." },
      { name: "Crustica Farmhouse", price: { reg: 329, lg: 520 }, tag: "Bestseller", description: "EJalapeno, Onion, Sweet Corn, Green Capsicum, Tomato." },
      { name: "Crustica Italian Lover", price: { reg: 349, lg: 619 }, tag: "Chef's Special", description: "Capsicum, Mushroom, Baby Corn, Black Olives with Extra Cheese Loaded." },
      { name: "Crustica Heaven Queen", price: { reg: 399, lg: 779 }, tag: "Veg", description: "Pineapple, Olives, Cream Cheese." },
    ]
  },
  {
    id: "Pizzas-1",
    name: "Pizza - Crafted Sourdough Crusts",
    items: [
      { name: "Margherita", price: { reg: 250, lg: 410 }, tag: "Veg", description: "Mozzarella, Gouda, Cheddar, Basil." },
      { name: "Four Seasons", price: { reg: 290, lg: 450 }, tag: "Chef's Special", description: "Olives, Mixed Cheese, Cream Cheese, Parmesan." },
      { name: "Truffle Shroom", price: { reg: 350, lg: 480 }, tag: "Veg", description: "Mushroom, Mixed Cheese, Basil Pesto." },
      { name: "Basilico Verde", price: { reg: 310, lg: 500 }, tag: "Veg", description: "Pesto Base, Zucchini, Broccoli." },
      { name: "Be Bianca", price: { reg: 350, lg: 495 }, tag: "Veg", description: "White Garlic Cream, Mushroom, Broccoli." },
      { name: "The Protein Stack", price: { reg: 350, lg: 510 }, tag: "Bestseller", description: "Mixed Cheese, Masala Paneer, Garlic Cream." },
    ]
  },
  {
    id: "Pizzas-2",
    name: "Split Choice Pizza",
    items: [
      { name: "Margherita + Paneer Affumicara", price: { reg: 287, lg: 450 }, tag: "Veg", description: "Mozzarella, Gouda, Cheddar, Basil + Smoked Paneer, Peri Peri, Caramelized Onion." },
      { name: "Four Seasons + The Ember Glaze", price: { reg: 283, lg: 480 }, tag: "Chef's Special", description: "Olives, Mixed Cheese, Cream Cheese, Parmesan + Paneer, Veggies, BBQ Glaze, Cheese Drizzle." },
      { name: "Truffle Shroom + Crustica Italian Lover", price: { reg: 350, lg: 550 }, tag: "Veg", description: "Mushroom, Mixed Cheese, Basil Pesto + Capsicum, Mushroom, Baby Corn, Black Olives with Extra Cheese Loaded." },
    ]
  },
  {
    id: "Pizzas-3",
    name: "Crustica Combos",
    items: [
      { name: "Kids Combo", price: 189, tag: "Veg", description: "6 Margherita + Salted Fries + Fanta." },
      { name: "Couple Combo", price: 732, tag: "Chef's Special", description: "8 Pizza (Any Pizza – Crafted Sourdough Crusts) + Classic Garlic Loaf + 2 Soft Drinks (250ml) + Brownie with Ice Cream." },
      { name: "Family Combo", price: 899, tag: "Veg", description: "12 Pizza (Any Pizza – Crafted Sourdough Crusts) + Pasta of Choice (Fresh Spaghetti Pasta) + Brownie with Ice Cream + Tiramisu." },
    ]
  },
  {
    id: "fries",
    name: "Fries",
    items: [
      { name: "Classic Salted Fries", price: 160, tag: "Veg" },
      { name: "Peri Peri Fries", price: 180, tag: "Veg" },
      { name: "Crustica Pizza Fries", price: 270, tag: "Bestseller" },
      { name: "Double Cheese Fries", price: 250, tag: "Veg" },
      { name: "Truffle Garlic Parmesan Fries", price: 250, tag: "Chef's Special" },
    ]
  },
  {
    id: "panini",
    name: "Panini & Appetisers",
    items: [
      { name: "Rustic Garlic Loaf - Classic", price: 180, tag: "Veg" },
      { name: "Rustic Garlic Loaf - Confit Tomato & Pesto", price: 210, tag: "Bestseller" },
      { name: "Rustic Garlic Loaf - Spicy Chilli Mix", price: 200, tag: "Veg" },
      { name: "Paneer Pomodoro Melt", price: 275, tag: "Veg" },
      { name: "Charred Mushroom & Cream Cheese", price: 295, tag: "Veg" }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      { name: "Mac & Cheese Nachos Burger", price: 260, tag: "Bestseller" },
      { name: "Cottage Pizza Steak Burger", price: 295, tag: "Chef's Special" }
    ]
  },
  {
    id: "pasta",
    name: "Spaghetti Pasta",
    items: [
      { name: "Classic Basil Tomato Pasta", price: 275, tag: "Veg" },
      { name: "Pesto Punch", price: 295, tag: "Bestseller" },
      { name: "Alfredo White Sauce Pasta", price: 289, tag: "Bestseller" },
      { name: "Mac & Cheese Pasta", price: 349, tag: "Veg" },

    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Classic Coffee", price: 140 },
      { name: "Cafe Latte", price: 160 },
      { name: "Cappuccino", price: 160 },
      { name: "Cafe Mocha", price: 180 },
      { name: "Espresso (Single/Double)", price: { reg: 90, lg: 130 } },
      { name: "Classic Cold Coffee", price: 180 },
      { name: "Chocos Cold Coffee", price: 230 },
      { name: "Caramel Latte (Iced)", price: 250 },
      { name: "Classic Iced Latte", price: 170 },
      { name: "Iced Americano", price: 150 },
      { name: "Iced Mocha", price: 200 },
      { name: "Vietnamese Latte", price: 220 },
      { name: "Ginger Watermelon Soda", price: 190 },
      { name: "Green Tea Honey Iced Tea", price: 210 },
      { name: "Honey Long Black", price: 290 },
      { name: "Lemongrass Kafir Cooler", price: 230 },
      { name: "Ocean Latte", price: 250 },
      { name: "Bangalore Breeze", price: 180 },
      { name: "Mango Masala Cooler", price: 180 },
      { name: "Mojito (Classic/Guava/Masala)", price: 160 },
      { name: "Chocolate Milkshake", price: 200 },
      { name: "Mango Milkshake", price: 210 },
      { name: "Strawberry Milkshake", price: 200 },
      { name: "Soft Drinks / Water", price: 40 },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Tiramisu", price: 210, tag: "Chef's Special" },
      { name: "Brownie With Ice Cream", price: 220, tag: "Bestseller" },
      { name: "Cheesecake – Strawberry", price: 299, tag: "Chef's Special" },
      { name: "Cheesecake – Biscoff", price: 219, tag: "Chef's Special" },
      { name: "Cheesecake – Blueberry", price: 299, tag: "Chef's Special" },
    ]
  },
  {
    id: "Sips & Pairings Deals",
    name: "Sips & Pairings Deals",
    items: [
      { name: "Fries & Fizz", price: 250, description: "Peri Peri Fries + Any Mojito." },
      { name: "Latte & Loaf", price: 210, description: "Classic Garlic Loaf + Any Hot Coffee." },
      { name: "Classic Italiano", price: 290, description: "Fresh Spaghetti Pasta + Bengaluru Breeze." },
      { name: "Slice & Sip", price: 375, description: "8 Margherita Pizza + Masala Mojito." },
    ]
  }
];

export const addOns = [
  { name: "Extra Cheese", price: 30 },
  { name: "Peri Peri Seasoning", price: 20 },
];
