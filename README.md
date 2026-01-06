# Alibzon - Next.js E-commerce Website

A full-featured e-commerce website built with Next.js, featuring product management, user authentication, shopping cart, and order management.

## 🚀 Features

### 🔥 Technology Stack

- **Next.js 14** (App Router)
- **TailwindCSS** (UI Styling)
- **MongoDB** (Database)
- **JWT Authentication**
- **Stripe Payment Integration**
- **Cloudinary** (Image Upload)
- **React Context** (State Management)

### 🛍️ Core Features

#### Navigation & UI

- Responsive navbar with search functionality
- Category-based navigation (Home, Winter, Men, Women, Kids)
- Shopping cart with item count
- User authentication status display

#### Product Management

- Product grid layout with sorting options
- Product detail pages with image zoom
- Size and color selection
- Stock management
- Product reviews and ratings
- Similar products recommendations

#### Shopping Cart

- Add/remove items
- Quantity management
- Price calculations (subtotal, VAT, delivery)
- Persistent cart storage

#### User Authentication

- Email/Phone login
- User registration
- Google OAuth integration (ready)
- Password reset functionality
- User dashboard

#### Order Management

- Checkout process
- Address management
- Multiple payment methods:
  - Mobile Banking (Bkash/Nagad)
  - Credit/Debit Cards
  - Net Banking
  - Cash on Delivery
- Order tracking
- Order status updates

#### Admin Panel

- Product management (CRUD)
- Order management
- User management
- Analytics dashboard

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd alibzon-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/alibzon
JWT_SECRET=your-jwt-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if using local installation)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env.local with your Atlas connection string
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
alibzon-nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── product/[id]/      # Product details
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── Auth/              # Authentication components
│   ├── Cart/              # Cart components
│   ├── Footer/            # Footer component
│   ├── Home/              # Home page components
│   ├── Navbar/            # Navigation components
│   └── Product/           # Product components
├── lib/                   # Utility functions
│   ├── mongodb.js         # Database connection
│   └── reducers/          # State management
├── models/                # MongoDB models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
└── public/                # Static assets
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/[id]` - Update product (Admin)
- `DELETE /api/products/[id]` - Delete product (Admin)

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (Admin)

## 🎨 UI Components

### Key Components

- **Navbar**: Navigation with search and cart
- **ProductCard**: Product display card
- **ProductDetails**: Detailed product view
- **CartPage**: Shopping cart management
- **LoginPage/RegisterPage**: Authentication forms

### Styling

- TailwindCSS for responsive design
- Custom CSS classes for consistent styling
- Mobile-first approach

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Protected routes check authentication
4. User context provides auth state globally

## 🛒 Shopping Flow

1. Browse products on home page
2. View product details
3. Add to cart with size/color selection
4. Review cart and proceed to checkout
5. Login if not authenticated
6. Enter shipping address
7. Select payment method
8. Place order
9. Order confirmation

## 📱 Mobile Responsiveness

- Fully responsive design
- Mobile-optimized navigation
- Touch-friendly interface
- Optimized images and loading

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Email: support@alibzon.com

---

**Happy Shopping! 🛍️**
