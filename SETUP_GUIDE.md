# 🚀 Alibzon E-commerce Setup Guide

## Step 1: Environment Variables Setup

Your `.env.local` file has been configured with basic values. Here's what you need to do:

### ✅ Already Configured:

- **MongoDB URI**: Your MongoDB Atlas connection is set up
- **JWT Secret**: Generated secure keys for authentication
- **Next.js URL**: Set to localhost:3000

### 🔧 Need to Configure (Optional for basic functionality):

#### 1. Stripe Payment (for payment processing)

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_key
```

**How to get Stripe keys:**

1. Go to [stripe.com](https://stripe.com)
2. Create account → Dashboard → Developers → API Keys
3. Copy "Publishable key" and "Secret key" (use test keys for development)

#### 2. Cloudinary (for image uploads)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**How to get Cloudinary credentials:**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Create free account → Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### 3. Google OAuth (for Google login)

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**How to get Google OAuth:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add `http://localhost:3000` to authorized origins

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Start the Application

```bash
npm run dev
```

## Step 4: Test the Application

1. **Open browser**: Go to `http://localhost:3000`
2. **Test features**:
   - Browse products on home page
   - Register a new account
   - Login with your account
   - Add products to cart
   - View cart and checkout flow

## Step 5: Add Sample Products (Optional)

Since you don't have products yet, you can:

1. **Use the mock data**: The app includes sample products for testing
2. **Create an admin account**: Register normally, then manually change role in database
3. **Add products via API**: Use tools like Postman to add products

## 🔍 Troubleshooting

### Common Issues:

#### 1. MongoDB Connection Error

- **Problem**: Can't connect to database
- **Solution**: Check if your MongoDB Atlas cluster is running and IP is whitelisted

#### 2. Module Not Found Errors

- **Problem**: Import path issues
- **Solution**: All import paths have been fixed to use relative paths

#### 3. Environment Variables Not Loading

- **Problem**: Variables not accessible
- **Solution**: Restart the development server after changing `.env.local`

### 📱 Testing Checklist:

- [ ] Home page loads with products
- [ ] Navigation menu works
- [ ] User registration works
- [ ] User login works
- [ ] Add to cart functionality
- [ ] Cart page displays items
- [ ] Product detail pages work
- [ ] Search functionality
- [ ] Mobile responsive design

## 🎯 Next Steps After Basic Setup:

1. **Add Real Products**: Create products through admin panel or API
2. **Configure Payments**: Set up Stripe for real payments
3. **Add Images**: Configure Cloudinary for product images
4. **Deploy**: Deploy to Vercel or other hosting platform
5. **Custom Domain**: Set up your own domain name

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set correctly
4. Make sure MongoDB Atlas is accessible

## 🔐 Security Notes:

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Enable MongoDB Atlas IP whitelisting
- Use HTTPS in production

---

**Your Alibzon e-commerce website is ready to run! 🛍️**
