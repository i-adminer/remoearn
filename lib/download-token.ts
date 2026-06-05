import crypto from 'crypto';

export function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function createDownloadUrl(productId: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/api/download/${productId}?token=${token}`;
}
