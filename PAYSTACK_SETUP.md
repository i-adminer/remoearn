# Paystack Payment Integration - Setup Guide

## ✅ **COMPLETED IMPLEMENTATION**

### **What Changed:**
1. **Removed Daraja API Integration** - No more M-Pesa STK push code
2. **Unified Payment System** - Paystack handles both card and M-Pesa payments
3. **Simplified Checkout** - Single form → Direct to Paystack hosted page
4. **Customer Details** - First name, last name, email, phone sent to Paystack

### **How It Works:**

#### **Customer Journey:**
1. Customer adds products to cart
2. Goes to checkout page
3. Fills in: First Name, Last Name, Email, Phone
4. Clicks "Pay Now" button
5. Redirected to **Paystack Hosted Page**
6. Chooses payment method:
   - **M-Pesa** → Receives STK push → Enters PIN
   - **Card** → Enters card details → Completes payment
7. Redirected back to success page with order details

#### **M-Pesa Flow (Handled by Paystack):**
- Customer selects M-Pesa on Paystack page
- Paystack sends STK push to customer's phone
- Customer receives prompt with OTP
- Customer enters OTP and confirms with PIN
- Payment completed automatically

### **Phone Number Format:**
- **User enters:** `0712345678` or `0112345678`
- **Backend converts to:** `+254712345678` (required by Paystack)
- **Automatic conversion** in payment action

---

## 🔧 **SETUP INSTRUCTIONS**

### **1. Get Paystack Keys**
Go to: https://dashboard.paystack.com/#/settings/developer

Copy your keys:
```bash
PAYSTACK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

### **2. Enable Payment Methods in Paystack Dashboard**

#### **Enable Mobile Money (M-Pesa):**
1. Go to: https://dashboard.paystack.com/#/settings/preferences
2. Scroll to **Payment Channels**
3. Check the box for **Mobile Money**
4. Save changes

#### **Enable Cards:**
Cards are enabled by default. No action needed.

### **3. Configure Webhook (Important!)**

Set your webhook URL in Paystack dashboard:
```
https://yourdomain.com/api/webhooks/paystack
```

**Local Testing:** Use ngrok or similar to expose localhost
```bash
ngrok http 3000
# Use the ngrok URL: https://xxxx.ngrok.io/api/webhooks/paystack
```

### **4. Set M-Pesa Payout Account**

To receive M-Pesa payments:
1. Go to: https://dashboard.paystack.com/#/settings/bank
2. Add your M-Pesa phone number (Safaricom)
3. Payments will be settled to this M-Pesa account

---

## 🧪 **TESTING**

### **Test Credentials (Provided by Paystack):**

#### **Test Card:**
```
Card Number: 4084 0840 0084 0004
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
PIN: 1234
OTP: 123456
```

#### **Test M-Pesa:**
```
Phone: +254710000000
```
Note: In test mode, M-Pesa doesn't send real STK push. Paystack simulates the flow.

### **Test Flow:**
1. Add products to cart
2. Go to checkout
3. Fill in test details:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: 0710000000
4. Click "Pay Now"
5. On Paystack page:
   - For **card test**: Use test card above
   - For **M-Pesa test**: Select M-Pesa, use test phone
6. Complete payment
7. Check order in success page

---

## 🔒 **SECURITY FEATURES**

✅ **PCI Compliant** - No card data touches your server  
✅ **HMAC Webhook Verification** - Validates all webhook requests  
✅ **Server-Side Secret Keys** - Never exposed to client  
✅ **Customer Data Protection** - Sent securely to Paystack  
✅ **Order Reference Tracking** - Unique IDs prevent tampering  

---

## 📊 **PAYSTACK DASHBOARD FEATURES**

### **View Transactions:**
https://dashboard.paystack.com/#/transactions

See all payments with:
- Payment method used (M-Pesa, Visa, Mastercard)
- Customer details
- Transaction status
- Settlement status

### **Settlement Schedule:**
- Payments settled in **T+2** (2 working days)
- Example: Monday payment → Wednesday settlement
- Settled to your bank or M-Pesa account

---

## 💰 **PRICING**

### **Kenya Pricing:**
- **Local cards:** 2.9% + KES 20
- **International cards:** 3.9% + KES 20
- **Mobile Money (M-Pesa):** 2.9% + KES 20
- **No setup fees, no monthly fees**

Full pricing: https://paystack.com/ke/pricing

---

## 🚀 **PRODUCTION CHECKLIST**

- [ ] Replace test keys with live keys in `.env.local`
- [ ] Update `NEXT_PUBLIC_APP_URL` to your domain
- [ ] Configure webhook URL with your domain
- [ ] Enable Mobile Money in dashboard preferences
- [ ] Add M-Pesa payout account
- [ ] Test card payment with live keys
- [ ] Test M-Pesa payment with live keys
- [ ] Verify webhook receives payment confirmations
- [ ] Monitor first few transactions in dashboard

---

## 📝 **ENVIRONMENT VARIABLES**

```bash
# Paystack (Handles both Card and M-Pesa payments)
PAYSTACK_SECRET_KEY=sk_live_xxxxx  # Live key for production
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx  # Live key for production

# App URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com  # Your production domain
```

---

## 🆘 **SUPPORT**

- **Technical Issues:** techsupport@paystack.com
- **General Support:** support@paystack.com
- **Documentation:** https://paystack.com/docs
- **M-Pesa Docs:** https://support.paystack.com/hc/en-us/articles/9741649633052

---

## ✨ **BENEFITS OF THIS APPROACH**

1. **Simpler Code** - One payment provider instead of two
2. **Better UX** - Unified checkout experience
3. **Easier Maintenance** - Single integration to manage
4. **Automatic STK Push** - Paystack handles M-Pesa complexity
5. **Professional UI** - Paystack's hosted page is tested and optimized
6. **Better Security** - PCI compliance handled by Paystack
7. **Unified Dashboard** - See all transactions in one place
8. **Easier Testing** - Paystack provides test credentials

---

**Last Updated:** 2026-06-05  
**Status:** ✅ Production Ready
