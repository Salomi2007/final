require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "iPhone 15 Pro Clear Case",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
    category: "iPhone 15",
    description: "Crystal clear protection with military-grade drop protection.",
    featured: true,
    stock: 50
  },
  {
    name: "Samsung Galaxy S24 Leather Case",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Samsung Galaxy",
    description: "Premium leather case with card slot and magnetic closure.",
    featured: true,
    stock: 30
  },
  {
    name: "iPhone 14 Rugged Armor Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400",
    category: "iPhone 14",
    description: "Heavy-duty protection with reinforced corners and kickstand.",
    featured: false,
    stock: 40
  },
  {
    name: "Google Pixel 8 Silicone Case",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400",
    category: "Google Pixel",
    description: "Soft-touch silicone with precise cutouts and wireless charging support.",
    featured: true,
    stock: 25
  },
  {
    name: "iPhone 13 Wallet Case",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400",
    category: "iPhone 13",
    description: "Folio-style case with multiple card slots and cash pocket.",
    featured: false,
    stock: 35
  },
  {
    name: "OnePlus 12 Gaming Case",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    category: "OnePlus",
    description: "Gaming-optimized case with cooling vents and trigger buttons.",
    featured: false,
    stock: 20
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Products seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
