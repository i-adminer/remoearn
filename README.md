# RemoEarn - Remote Income Platform

A serverless Next.js application for selling digital products and proxy services with MongoDB Atlas, admin dashboard, and integrated payment solutions.

## Features

- ✅ **MongoDB Atlas Integration** - Serverless database with full CRUD operations
- ✅ **Admin Authentication** - Secure login with JWT session management and password updates
- ✅ **Proxy Card Management** - Create and manage proxy service cards with affiliate links
- ✅ **Product Management** - Full CRUD for PDF and proxy products with image support
- ✅ **Contact Form** - Nodemailer integration with Zoho SMTP for email delivery
- ✅ **Dynamic Content** - Homepage and shop fetch data from MongoDB
- ✅ **Cloudinary Ready** - Media upload utility configured
- 🚧 **Payment Integration** - Stripe and M-Pesa support (coming soon)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB Atlas
- **Authentication**: JWT with httpOnly cookies
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Media Storage**: Cloudinary
- **Email**: Nodemailer + Zoho

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `SESSION_SECRET` - Random 32+ character string for JWT signing
- `ADMIN_EMAIL` - Initial admin email
- `ADMIN_INITIAL_PASSWORD` - Initial admin password
- `CLOUDINARY_*` - Your Cloudinary credentials
- `SMTP_*` - Your Zoho SMTP credentials

### 3. Seed Admin User

```bash
pnpm tsx lib/db/seed-admin.ts
```

This creates the initial admin user with credentials from your `.env.local`.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Admin Dashboard

Access the admin dashboard at `/admin/login`:

1. Login with your admin credentials
2. Navigate through:
   - **Overview** - Dashboard statistics
   - **Proxy Cards** - Manage homepage proxy service cards
   - **Products** - Manage PDF and proxy products (WIP)
   - **Messages** - View contact form submissions (WIP)
   - **Settings** - Update your password

### Proxy Cards

Create proxy service cards that appear on the homepage:

1. Go to **Dashboard > Proxy Cards**
2. Click **New Card**
3. Fill in:
   - Title, Price, Description
   - Features (one per line)
   - Front/Back image URLs (optional)
   - Affiliate link (required)
   - Button text
   - Display order

Cards can be toggled active/inactive and will automatically show on the homepage.

## Project Structure

```
app/
├── (site)/                 # Public-facing pages
│   ├── page.tsx           # Homepage
│   ├── shop/              # Product listing
│   └── products/          # Product details
├── (dashboard)/           # Protected admin area
│   └── dashboard/
│       ├── page.tsx       # Dashboard overview
│       ├── proxy-cards/   # Proxy card management
│       ├── products/      # Product management (WIP)
│       ├── messages/      # Contact messages (WIP)
│       └── settings/      # Admin settings
└── admin/
    └── login/             # Admin login page

components/
├── admin/                 # Admin-specific components
│   ├── login-form.tsx
│   ├── proxy-card-form.tsx
│   └── proxy-cards-list.tsx
├── site/                  # Public site components
└── ui/                    # Reusable UI components

lib/
├── mongodb.ts             # MongoDB connection
├── db/
│   ├── mongodb-schema.ts  # TypeScript schemas
│   └── seed-admin.ts      # Admin seeding script
├── auth/
│   ├── session.ts         # Session management
│   └── actions.ts         # Auth server actions
└── actions/
    └── proxy-cards.ts     # Proxy card CRUD actions
```

## MongoDB Collections

### `admins`
- email, password (bcrypt hashed)
- createdAt, updatedAt

### `proxy_cards`
- title, price, description
- features (array)
- frontImageUrl, backImageUrl
- affiliateLink, buttonText
- isActive, order
- createdAt, updatedAt

### `contact_messages` (WIP)
- name, email, subject, message
- isRead, readAt
- createdAt

### `products` (WIP)
- type: 'pdf' | 'proxy'
- title, slug, description, price
- images (array, max 3)
- pdfUrl (PDF products only)
- affiliateLink (proxy products only)
- isPublished, category, tags
- createdAt, updatedAt

## Security

- **Authentication**: JWT tokens stored in httpOnly cookies
- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: 7-day expiration with automatic cleanup
- **Protected Routes**: Server-side authentication checks
- **CSRF Protection**: Built-in Next.js protection

## Development Workflow

1. **Database Changes**: Update `lib/db/mongodb-schema.ts`
2. **New Features**: Create server actions in `lib/actions/`
3. **Admin Pages**: Add to `app/(dashboard)/dashboard/`
4. **Components**: Organize in `components/admin/` or `components/site/`

## TODO

- [ ] Stripe payment integration
- [ ] M-Pesa payment integration
- [ ] Order management
- [ ] Download tokens for digital products
- [ ] Email templates for order confirmations
- [ ] Customer dashboard

## License

Private project - All rights reserved
