import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { menuData } from "./src/data/menu";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, "data");

// Create data directory for file persistence if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// API Endpoints
app.get("/api/v1/menu", (req, res) => {
  res.json({
    success: true,
    data: menuData
  });
});

app.post("/api/v1/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const feedbackPath = path.join(DATA_DIR, "feedback.json");
  let feedbackList = [];
  
  if (fs.existsSync(feedbackPath)) {
    try {
      feedbackList = JSON.parse(fs.readFileSync(feedbackPath, "utf-8"));
    } catch {
      feedbackList = [];
    }
  }

  const newFeedback = {
    id: Date.now().toString(),
    name,
    email,
    message,
    created_at: new Date().toISOString()
  };

  feedbackList.push(newFeedback);
  fs.writeFileSync(feedbackPath, JSON.stringify(feedbackList, null, 2), "utf-8");

  console.log(`[Feedback Received] Name: ${name}, Email: ${email}`);
  res.json({ success: true, message: "Feedback recorded successfully" });
});

app.post("/api/v1/orders", (req, res) => {
  const { customer_details, items, total_amount } = req.body;
  if (!customer_details || !items || !total_amount) {
    return res.status(400).json({ success: false, error: "Missing order metadata" });
  }

  const ordersPath = path.join(DATA_DIR, "orders.json");
  let ordersList = [];

  if (fs.existsSync(ordersPath)) {
    try {
      ordersList = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
    } catch {
      ordersList = [];
    }
  }

  const newOrder = {
    id: `CRUST-${Date.now()}`,
    customer_details,
    items,
    total_amount,
    status: "pending",
    created_at: new Date().toISOString()
  };

  ordersList.push(newOrder);
  fs.writeFileSync(ordersPath, JSON.stringify(ordersList, null, 2), "utf-8");

  console.log(`[Order Recorded] Order ID: ${newOrder.id}, Amount: ₹${total_amount}`);
  res.json({ success: true, message: "Order processed successfully", data: newOrder });
});

// Serve frontend build in production
const buildPath = path.join(__dirname, "dist");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
