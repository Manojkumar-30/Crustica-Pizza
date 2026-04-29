export interface MenuItem {
  name: string;
  price: number | { reg: number; lg: number };
  tag?: "Bestseller" | "Veg" | "Chef's Special";
  description?: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    items: [
      { name: "Margherita", price: { reg: 250, lg: 410 }, tag: "Veg", description: "Classic tomato sauce, fresh mozzarella, and aromatic basil.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800" },
      { name: "Aglio-E-Olio", price: { reg: 310, lg: 495 }, tag: "Chef's Special", description: "Infused garlic oil, chili flakes, and fresh herbs.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
      { name: "Basilico Verde", price: { reg: 310, lg: 500 }, tag: "Veg", description: "Rich basil pesto base with fresh mozzarella.", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=800" },
      { name: "Be Bianca", price: { reg: 350, lg: 495 }, tag: "Veg", description: "White base with artisan cheeses and delicate toppings.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800" },
      { name: "E Spinaci", price: { reg: 320, lg: 480 }, tag: "Veg", description: "Fresh spinach leaves with garlic and creamy cheese.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800" },
      { name: "Four Season", price: { reg: 290, lg: 450 }, tag: "Bestseller", description: "A quartered mix of our most loved seasonal toppings.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800" },
      { name: "Marinara", price: { reg: 220, lg: 410 }, tag: "Veg", description: "Simple, honest tomato sauce with garlic and oregano.", image: "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?auto=format&fit=crop&q=80&w=800" },
      { name: "Paneer Affumicara", price: { reg: 325, lg: 480 }, tag: "Bestseller", description: "Smoked paneer with a perfect blend of spices.", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800" },
      { name: "Smoked Crimson", price: { reg: 275, lg: 495 }, tag: "Veg", description: "Sun-dried tomatoes and roasted peppers.", image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800" },
      { name: "The Ember Glaze", price: { reg: 275, lg: 510 }, tag: "Chef's Special", description: "Sweet and spicy glaze with fresh harvest toppings.", image: "https://images.unsplash.com/photo-1567305041168-96df58f5068a?auto=format&fit=crop&q=80&w=800" },
      { name: "Truffle Shroom", price: { reg: 350, lg: 480 }, tag: "Bestseller", description: "Earthy mushrooms with aromatic truffle infusion.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
      { name: "Cacao Affection", price: { reg: 0, lg: 525 }, tag: "Chef's Special", description: "A unique sweet sensation (Available in 12\" only).", image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=800" },
      { name: "The Protein Stack", price: { reg: 0, lg: 510 }, tag: "Veg", description: "Loaded with high-protein botanical toppings (12\" only).", image: "https://images.unsplash.com/photo-1620374645310-f9d97e733268?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "fries",
    name: "Fries",
    items: [
      { name: "Classic Salted Fries", price: 160, tag: "Veg", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=800" },
      { name: "Crustica Pizza Fries", price: 250, tag: "Bestseller", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800" },
      { name: "Double Cheese Fries", price: 250, tag: "Veg", image: "https://images.unsplash.com/photo-1585692462151-5b7782161a0b?auto=format&fit=crop&q=80&w=800" },
      { name: "Truffle Garlic Parmesan Fries", price: 230, tag: "Chef's Special", image: "https://images.unsplash.com/photo-1630431341973-02e1b662ce3b?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "panini",
    name: "Panini & Appetisers",
    items: [
      { name: "Rustic Garlic Loaf - Classic", price: 180, tag: "Veg", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=800" },
      { name: "Rustic Garlic Loaf - Confit Tomato & Pesto", price: 210, tag: "Bestseller", image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=800" },
      { name: "Rustic Garlic Loaf - Spicy Chilli Mix", price: 200, tag: "Veg", image: "https://images.unsplash.com/photo-1585030230238-a83ebfb42e31?auto=format&fit=crop&q=80&w=800" },
      { name: "Dunk Bites", price: 225, tag: "Bestseller", image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&q=80&w=800" },
      { name: "Charred Mushroom & Cream Cheese", price: 295, tag: "Veg", image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=800" },
      { name: "Paneer Pomodoro Melt", price: 275, tag: "Veg", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      { name: "Cottage Pizza Steak Burger", price: 295, tag: "Chef's Special", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" },
      { name: "Mac & Cheese Nachos Burger", price: 260, tag: "Bestseller", image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      { name: "Classic Basil Tomato Pasta", price: 275, tag: "Veg", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800" },
      { name: "Linguine Pesto Punch Pasta", price: 295, tag: "Bestseller", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "combos",
    name: "Combos",
    items: [
      { name: "Classic Italiano", price: 310, tag: "Veg", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800" },
      { name: "Fries & Fizz", price: 280, tag: "Veg", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" },
      { name: "Latte & Loaf", price: 295, tag: "Veg", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
      { name: "Burgerlicious", price: 375, tag: "Bestseller", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800" },
      { name: "Slice & Sip", price: 375, tag: "Veg", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800" },
      { name: "Sweet Truth", price: 375, tag: "Veg", image: "https://images.unsplash.com/photo-1563729784474-d77dbb9382f9?auto=format&fit=crop&q=80&w=800" },
      { name: "Green Garden Combo", price: 385, tag: "Veg", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Classic Coffee", price: 140, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800" },
      { name: "Cafe Latte", price: 160, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
      { name: "Cappuccino", price: 160, image: "https://images.unsplash.com/photo-1534687941688-6c966ca3c078?auto=format&fit=crop&q=80&w=800" },
      { name: "Cafe Mocha", price: 180, image: "https://images.unsplash.com/photo-1572442388796-11668aa44c05?auto=format&fit=crop&q=80&w=800" },
      { name: "Espresso (Single/Double)", price: { reg: 90, lg: 130 }, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800" },
      { name: "Classic Cold Coffee", price: 180, image: "https://images.unsplash.com/photo-1461023058943-07cb12ee64e8?auto=format&fit=crop&q=80&w=800" },
      { name: "Chocos Cold Coffee", price: 230, image: "https://images.unsplash.com/photo-1572442388796-11668aa44c05?auto=format&fit=crop&q=80&w=800" },
      { name: "Caramel Latte (Iced)", price: 250, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
      { name: "Classic Iced Latte", price: 170, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800" },
      { name: "Iced Americano", price: 150, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800" },
      { name: "Iced Mocha", price: 200, image: "https://images.unsplash.com/photo-1572442388796-11668aa44c05?auto=format&fit=crop&q=80&w=800" },
      { name: "Vietnamese Latte", price: 220, image: "https://images.unsplash.com/photo-1534687941688-6c966ca3c078?auto=format&fit=crop&q=80&w=800" },
      { name: "Ginger Watermelon Soda", price: 190, image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=800" },
      { name: "Green Tea Honey Iced Tea", price: 210, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" },
      { name: "Honey Long Black", price: 290, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800" },
      { name: "Lemongrass Kafir Cooler", price: 230, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" },
      { name: "Ocean Latte", price: 250, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800" },
      { name: "Bangalore Breeze", price: 180, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" },
      { name: "Mango Masala Cooler", price: 180, image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800" },
      { name: "Mojito (Classic/Guava/Masala)", price: 160, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=800" },
      { name: "Chocolate Milkshake", price: 200, image: "https://images.unsplash.com/photo-1572442388796-11668aa44c05?auto=format&fit=crop&q=80&w=800" },
      { name: "Mango Milkshake", price: 210, image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800" },
      { name: "Strawberry Milkshake", price: 200, image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&q=80&w=800" },
      { name: "Soft Drinks / Water", price: 40, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Brownie With Coffee Ice Cream", price: 220, tag: "Bestseller", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800" },
      { name: "Tiramisu", price: 210, tag: "Chef's Special", image: "https://images.unsplash.com/photo-1571115177098-24ea148dea07?auto=format&fit=crop&q=80&w=800" },
    ]
  }
];

export const addOns = [
  { name: "Extra Cheese", price: 30 },
  { name: "Peri Peri Seasoning", price: 20 },
];
