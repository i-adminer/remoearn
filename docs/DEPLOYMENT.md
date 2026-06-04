# Deployment Checklist

## Pre-Deployment

### Database Setup
- [ ] Create MongoDB Atlas cluster
- [ ] Add database user with read/write permissions
- [ ] Whitelist IP addresses (0.0.0.0/0 for serverless)
- [ ] Copy connection string to `.env.local`
- [ ] Run seed script: `pnpm tsx lib/db/seed-admin.ts`

### Email Configuration
- [ ] Create Zoho Mail account or use existing
- [ ] Generate app-specific password
- [ ] Configure SMTP settings in `.env.local`
- [ ] Test email sending from contact form

### Media Storage
- [ ] Create Cloudinary account
- [ ] Copy cloud name, API key, and secret
- [ ] Configure in `.env.local`
- [ ] Test image uploads

### Security
- [ ] Generate strong SESSION_SECRET (32+ characters)
- [ ] Change ADMIN_INITIAL_PASSWORD to secure password
- [ ] Update admin password after first login
- [ ] Review .gitignore (ensure .env.local is excluded)

## Deployment (Vercel)

### Environment Variables
Set in Vercel dashboard:
```
MONGODB_URI
SESSION_SECRET
ADMIN_EMAIL
ADMIN_INITIAL_PASSWORD
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
SMTP_FROM
```

### Deploy Steps
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy
5. Run seed script in production (use Vercel CLI or manual MongoDB insert)

### Post-Deployment
- [ ] Test admin login
- [ ] Create test proxy card
- [ ] Create test product
- [ ] Submit test contact form
- [ ] Verify email delivery
- [ ] Test homepage displays proxy cards
- [ ] Test shop page displays products
- [ ] Change admin password

## Production Configuration

### MongoDB Atlas
- [ ] Enable backup
- [ ] Set up monitoring
- [ ] Review security settings

### Cloudinary
- [ ] Set upload presets
- [ ] Configure transformations
- [ ] Enable automatic optimization

### Email
- [ ] Verify sender domain (for better deliverability)
- [ ] Set up email templates
- [ ] Monitor email quotas

## Monitoring

- [ ] Set up Vercel analytics
- [ ] Monitor MongoDB metrics
- [ ] Track email delivery rates
- [ ] Review error logs regularly

## Optional Enhancements

- [ ] Add Stripe payment integration
- [ ] Add M-Pesa payment support
- [ ] Implement download tokens
- [ ] Create order management system
- [ ] Add customer dashboard
- [ ] Set up automated backups
