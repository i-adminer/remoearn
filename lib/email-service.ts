import * as nodemailer from 'nodemailer';
import { Order } from './db/mongodb-schema';
import {
  paymentReceiptEmail,
  pdfDeliveryEmail,
  proxyServiceEmail,
  adminNotificationEmail,
} from './email-templates';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPaymentReceiptEmail(order: Order) {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `RemoEarn <${process.env.SMTP_FROM}>`,
      to: order.email,
      subject: `Payment Successful - Order ${order.orderId}`,
      html: paymentReceiptEmail(order),
    });

    // Also send to admin
    await transporter.sendMail({
      from: `RemoEarn <${process.env.SMTP_FROM}>`,
      to: 'info@remoearn.com',
      subject: `New Order: ${order.orderId} - ${order.customerName}`,
      html: adminNotificationEmail(order, order.items[0].type),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendPDFDeliveryEmail(
  order: Order,
  downloadLinks: { title: string; url: string }[]
) {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `RemoEarn <${process.env.SMTP_FROM}>`,
      to: order.email,
      subject: `Your Digital Products - Order ${order.orderId}`,
      html: pdfDeliveryEmail(order, downloadLinks),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendProxyServiceEmail(order: Order) {
  try {
    const transporter = createTransporter();
    
    // Email to customer
    await transporter.sendMail({
      from: `RemoEarn <${process.env.SMTP_FROM}>`,
      to: order.email,
      subject: `Proxy Service Activated - Order ${order.orderId}`,
      html: proxyServiceEmail(order),
    });

    // Email to admin with customer details
    await transporter.sendMail({
      from: `RemoEarn <${process.env.SMTP_FROM}>`,
      to: 'info@remoearn.com',
      subject: `PROXY SERVICE - Customer Support Required: ${order.customerName}`,
      html: adminNotificationEmail(order, 'proxy'),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}
