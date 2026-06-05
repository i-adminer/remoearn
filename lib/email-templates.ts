import { Order } from './db/mongodb-schema';

export function getEmailTemplate(content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RemoEarn</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">RemoEarn</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Earn Remotely, Live Freely</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} RemoEarn. All rights reserved.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Need help? <a href="mailto:info@remoearn.com" style="color: #667eea; text-decoration: none;">info@remoearn.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </body>
</html>
  `;
}

export function paymentReceiptEmail(order: Order) {
  const itemsList = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <strong style="color: #111827;">${item.title}</strong><br>
            <span style="color: #6b7280; font-size: 13px;">${item.type === 'pdf' ? 'PDF Guide' : 'Proxy Service'}</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827;">
            ${item.price}
          </td>
        </tr>
      `
    )
    .join('');

  const content = `
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px;">Payment Successful! 🎉</h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 16px; line-height: 1.5;">
      Thank you for your purchase, ${order.customerName}! Your payment has been processed successfully.
    </p>
    
    <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #111827;">${order.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Date</td>
          <td style="padding: 8px 0; text-align: right; color: #111827;">${new Date(order.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Payment Method</td>
          <td style="padding: 8px 0; text-align: right; color: #111827;">Paystack</td>
        </tr>
      </table>
    </div>

    <h3 style="margin: 32px 0 16px; color: #111827; font-size: 18px;">Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${itemsList}
      <tr>
        <td style="padding: 16px 0; font-weight: 700; color: #111827; font-size: 16px;">Total</td>
        <td style="padding: 16px 0; text-align: right; font-weight: 700; color: #111827; font-size: 16px;">
          KSh ${(order.totalAmount / 100).toLocaleString()}
        </td>
      </tr>
    </table>

    <p style="margin: 32px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
      If you have any questions, feel free to reach out to us at <a href="mailto:info@remoearn.com" style="color: #667eea; text-decoration: none;">info@remoearn.com</a>
    </p>
  `;

  return getEmailTemplate(content);
}

export function pdfDeliveryEmail(order: Order, downloadLinks: { title: string; url: string }[]) {
  const linksList = downloadLinks
    .map(
      (link) => `
        <div style="margin-bottom: 16px; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid #667eea;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #111827; font-size: 15px;">${link.title}</p>
          <a href="${link.url}" style="display: inline-block; padding: 10px 20px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Download PDF
          </a>
        </div>
      `
    )
    .join('');

  const content = `
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px;">Your Digital Products 📚</h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 16px; line-height: 1.5;">
      Hi ${order.customerName}, your payment was successful! Here are your PDF downloads:
    </p>

    ${linksList}

    <div style="margin: 32px 0; padding: 16px; background-color: #fef3c7; border-radius: 6px; border-left: 3px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
        <strong>Important:</strong> Download links are valid for 30 days. Please save the files to your device.
      </p>
    </div>

    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
      Need help? Email us at <a href="mailto:info@remoearn.com" style="color: #667eea; text-decoration: none;">info@remoearn.com</a>
    </p>
  `;

  return getEmailTemplate(content);
}

export function proxyServiceEmail(order: Order) {
  const content = `
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px;">Welcome to RemoEarn Proxy! 🚀</h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 16px; line-height: 1.5;">
      Hi ${order.customerName}, thank you for purchasing our proxy service!
    </p>

    <div style="margin: 24px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
      <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6;">
        ✨ Our team is preparing your proxy service setup. You'll receive your access details and instructions within 24 hours.
      </p>
    </div>

    <h3 style="margin: 24px 0 12px; color: #111827; font-size: 18px;">What's Next?</h3>
    <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.8;">
      <li>Our support team will contact you via email</li>
      <li>We'll help you set up and configure your proxy</li>
      <li>You'll receive full documentation and support</li>
    </ul>

    <div style="margin: 32px 0; padding: 16px; background-color: #f0fdf4; border-radius: 6px; border-left: 3px solid #22c55e;">
      <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.5;">
        <strong>Order ID:</strong> ${order.orderId}<br>
        <strong>Email:</strong> ${order.email}<br>
        <strong>Phone:</strong> ${order.phone}
      </p>
    </div>

    <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
      Questions? Reply to this email or contact <a href="mailto:info@remoearn.com" style="color: #667eea; text-decoration: none;">info@remoearn.com</a>
    </p>
  `;

  return getEmailTemplate(content);
}

export function adminNotificationEmail(order: Order, productType: 'pdf' | 'proxy') {
  const productDetails = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.title}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.type}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.price}</td>
        </tr>
      `
    )
    .join('');

  const content = `
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px;">New Order Received 🔔</h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 16px;">
      ${productType === 'proxy' ? '<strong style="color: #dc2626;">PROXY SERVICE - Customer Support Required</strong>' : 'PDF product order processed successfully'}
    </p>

    <h3 style="margin: 24px 0 12px; color: #111827; font-size: 18px;">Order Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; background-color: #f9fafb; font-weight: 600; border: 1px solid #e5e7eb;">Order ID</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${order.orderId}</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9fafb; font-weight: 600; border: 1px solid #e5e7eb;">Customer Name</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${order.customerName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9fafb; font-weight: 600; border: 1px solid #e5e7eb;">Email</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${order.email}" style="color: #667eea;">${order.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9fafb; font-weight: 600; border: 1px solid #e5e7eb;">Phone</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${order.phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9fafb; font-weight: 600; border: 1px solid #e5e7eb;">Total Amount</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: 700;">KSh ${(order.totalAmount / 100).toLocaleString()}</td>
      </tr>
    </table>

    <h3 style="margin: 24px 0 12px; color: #111827; font-size: 18px;">Products</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background-color: #f9fafb;">
        <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb; font-weight: 600;">Product</th>
        <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb; font-weight: 600;">Type</th>
        <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb; font-weight: 600;">Price</th>
      </tr>
      ${productDetails}
    </table>

    ${
      productType === 'proxy'
        ? `
    <div style="margin: 24px 0; padding: 16px; background-color: #fee2e2; border-radius: 6px; border-left: 3px solid #dc2626;">
      <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">
        ACTION REQUIRED: Contact customer within 24 hours for proxy service setup
      </p>
    </div>
    `
        : ''
    }
  `;

  return getEmailTemplate(content);
}
