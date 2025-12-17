# CaseHub Backend API

Node.js/Express backend for CaseHub phone case e-commerce store.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Update `.env` with your values:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Random secret key for JWT tokens
- `PORT`: Server port (default: 5000)

### 3. Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## Deployment on AWS EC2

### 1. Launch EC2 Instance
- Choose Ubuntu 20.04 LTS
- Configure security groups (ports 22, 80, 443, 5000)

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install PM2
```bash
sudo npm install -g pm2
```

### 4. Deploy Application
```bash
# Clone repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Set up environment variables
nano .env

# Start with PM2
pm2 start src/server.js --name casehub-api
pm2 startup
pm2 save
```

### 5. Configure Nginx (Optional)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/casehub
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/casehub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```