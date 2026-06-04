# RemoEarn Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and update:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/remoearn

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Zoho Email
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=info@remoearn.com
SMTP_PASS=your_zoho_app_password
SMTP_FROM=info@remoearn.com

# Admin Credentials
ADMIN_EMAIL=admin@remoearn.com
ADMIN_INITIAL_PASSWORD=changeme123

# Session Secret (generate random 32+ chars)
SESSION_SECRET=your-long-random-secret-key-here
```

### 3. Seed Admin User
```bash
pnpm tsx lib/db/seed-admin.ts
```

### 4. Start Development
```bash
pnpm dev
```

Visit http://localhost:3000

## Admin Access

1. Navigate to `/admin/login`
2. Login with credentials from `.env.local`
3. Access dashboard at `/dashboard`

## Features Implemented

### ✅ Authentication System
- JWT-based sessions with httpOnly cookies
- Secure login/logout
- Password update functionality
- Protected dashboard routes

### ✅ Proxy Card Management
- CRUD operations for proxy service cards
- Affiliate link support
- Active/inactive toggle
- Display order control
- **Dashboard**: `/dashboard/proxy-cards`

### ✅ Product Management
- PDF and Proxy product types
- Multiple image support (up to 3)
- Category and tags
- Publish/unpublish toggle
- **Dashboard**: `/dashboard/products`

### ✅ Contact Form
- Nodemailer + Zoho SMTP integration
- Saves messages to database
- Sends email notifications
- Read/unread status tracking
- **Dashboard**: `/dashboard/messages`

### ✅ Dynamic Content
- Homepage fetches proxy cards from MongoDB
- Shop page displays published products
- Fallback to static content if no DB data

## Project Structure

```
lib/
├── mongodb.ts              # Database connection
├── cloudinary.ts           # Media uploads
├── auth/
│   ├── session.ts         # JWT session management
│   └── actions.ts         # Login/logout/password
├── actions/
│   ├── proxy-cards.ts     # Proxy CRUD
│   ├── products.ts        # Product CRUD
│   └── contact.ts         # Contact form
└── db/
    ├── mongodb-schema.ts  # TypeScript types
    └── seed-admin.ts      # Admin seeding

app/
├── admin/login/           # Login page
├── (dashboard)/
│   └── dashboard/
│       ├── proxy-cards/   # Proxy management
│       ├── products/      # Product management
│       ├── messages/      # Contact messages
│       └── settings/      # Password update
└── (site)/
    ├── page.tsx          # Homepage (dynamic)
    └── shop/             # Shop page (dynamic)

components/
├── admin/                # Dashboard components
└── site/                 # Public site components
```

## Database Collections

### admins
- email, password (bcrypt)
- createdAt, updatedAt

### proxy_cards
- title, price, description, features[]
- frontImageUrl, backImageUrl
- affiliateLink, buttonText
- isActive, order
- createdAt, updatedAt

### products
- type ('pdf' | 'proxy')
- title, slug, description, price
- images[], pdfUrl, affiliateLink
- isPublished, category, tags[]
- createdAt, updatedAt

### contact_messages
- name, email, subject, message
- isRead, readAt, createdAt

## API Routes (Server Actions)

All operations use Next.js Server Actions (no API endpoints):

- **Auth**: `lib/auth/actions.ts`
- **Proxy Cards**: `lib/actions/proxy-cards.ts`
- **Products**: `lib/actions/products.ts`
- **Contact**: `lib/actions/contact.ts`

## Security Features

- JWT tokens in httpOnly cookies
- bcrypt password hashing
- Server-side authentication checks
- Session expiration (7 days)
- CSRF protection (built-in Next.js)

## Next Steps

1. Set up MongoDB Atlas cluster
2. Create Cloudinary account
3. Configure Zoho SMTP
4. Seed admin user
5. Start creating content!

## Payment Integration (TODO)

- Stripe checkout
- M-Pesa STK push
- Order management
- Download tokens
