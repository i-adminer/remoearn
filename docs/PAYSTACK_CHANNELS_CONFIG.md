# Paystack Payment Channels Configuration

## 🎯 **Goal: Enable Card, M-Pesa, Airtel Money, and M-Pesa Till**

By default, Paystack shows all available payment channels in Kenya:
- ✅ **Card** (Visa, Mastercard, Amex)
- ✅ **M-Pesa** (STK Push)
- ✅ **Airtel Money**
- ✅ **M-Pesa Till** (Business to Business)
- ❌ **Pesalink** (optional - disable if not needed)
- ❌ **Bank Transfer** (optional - disable if not needed)

---

## 📋 **How to Enable All Mobile Money Options**

### **Step 1: Go to Dashboard Settings**

1. Login to Paystack Dashboard: https://dashboard.paystack.com
2. Click **Settings** (gear icon) in sidebar
3. Click **Preferences** tab

### **Step 2: Configure Payment Channels**

Look for section: **"Accept payments via"**

You'll see checkboxes for available channels:

```
☑ Card
☑ Mobile Money
☐ Bank Transfer
☐ USSD
☐ QR
☐ Pesalink
```

### **Step 3: Enable What You Need**

**Keep Checked:**
- ✅ **Card** - For Visa, Mastercard payments
- ✅ **Mobile Money** - This enables ALL: M-Pesa, Airtel Money, M-Pesa Till

**Optionally Uncheck:**
- ❌ **Bank Transfer** (if you don't need it)
- ❌ **USSD** (if you don't need it)
- ❌ **Pesalink** (if you don't need it)

### **Step 4: Mobile Money Automatically Includes:**

When "Mobile Money" is checked, Paystack automatically enables:
- ✅ **M-Pesa** (Personal - STK Push)
- ✅ **Airtel Money** (Personal accounts)
- ✅ **M-Pesa Till** (Business to Business payments)

You don't need to select each one individually!

### **Step 5: Save Changes**

Click **"Save Changes"** button at bottom of page.

---

## ✅ **Verification**

After saving, test the checkout flow:

1. Go to your checkout page
2. Fill in customer details
3. Click "Pay Now"
4. On Paystack hosted page, you should see:
   - **Card** option (Visa, Mastercard logos)
   - **M-Pesa** option (STK Push)
   - **Airtel Money** option
   - **M-Pesa Till** option (for business payments)

---

## 🔧 **What Customers Will See**

### **On Paystack Payment Page:**

**Option 1: Pay with Card**
- Card number input
- Expiry and CVV
- Secure 3D authentication

**Option 2: Pay with M-Pesa**
- Phone number input (+254...)
- STK push sent to phone
- Enter M-Pesa PIN to confirm

**Option 3: Pay with Airtel Money**
- Phone number input
- SMS confirmation code
- Enter Airtel Money PIN

**Option 4: Pay with M-Pesa Till**
- M-Pesa Till number input
- Business to business payment
- Authorize on business phone

---

## 📸 **Dashboard Screenshot Reference**

The Preferences page looks like this:

```
┌─────────────────────────────────────────┐
│  Settings > Preferences                  │
├─────────────────────────────────────────┤
│                                          │
│  Accept payments via:                    │
│                                          │
│  ☑ Card                                  │
│  ☑ Mobile Money                          │
│  ☐ Bank Transfer                         │
│  ☐ USSD                                  │
│  ☐ QR                                    │
│                                          │
│  [Save Changes]                          │
└─────────────────────────────────────────┘
```

---

## ⚠️ **Important Notes**

1. **Test Mode vs Live Mode**: Settings apply to both test and live modes. Make sure to configure in the correct environment.

2. **Customer Experience**: Fewer options = faster checkout. Card + M-Pesa covers 95%+ of Kenyan payments.

3. **Can't Find Option?**: Some channels may not be visible if:
   - Not available in your region (Kenya)
   - Not activated for your account
   - Requires special application

4. **Need M-Pesa Till?**: If you need business-to-business payments, keep M-Pesa Till enabled.

---

## 🆘 **Troubleshooting**

### **Problem: Still seeing Airtel Money**

**Solution**: 
- Go to Preferences
- Under Mobile Money, uncheck "Airtel Money"
- Save changes

### **Problem: Can't disable certain channels**

**Solution**: 
- Card cannot be disabled (always available)
- Mobile Money checkbox controls ALL mobile money options
- Contact Paystack support if issues persist

### **Problem: Changes not reflecting**

**Solution**:
- Clear browser cache
- Test in incognito/private window
- Wait 5 minutes for changes to propagate
- Verify you're in correct environment (test/live)

---

## 📞 **Support**

If you need help configuring payment channels:

- **Email**: support@paystack.com
- **Technical**: techsupport@paystack.com
- **Dashboard**: https://dashboard.paystack.com

---

**Last Updated**: 2026-06-05  
**Status**: ✅ Configuration Guide Complete
