import Link from 'next/link';
import { CreditCard, Mail, Package, BarChart3 } from 'lucide-react';
import { getDb } from '@/lib/mongodb';
import { Collections } from '@/lib/db/mongodb-schema';

export const metadata = {
  title: 'Dashboard | RemoEarn',
};

async function getDashboardStats() {
  const db = await getDb();

  const [proxyCardsCount, productsCount, messagesCount, unreadMessages] = await Promise.all([
    db.collection(Collections.PROXY_CARDS).countDocuments(),
    db.collection(Collections.PRODUCTS).countDocuments(),
    db.collection(Collections.CONTACT_MESSAGES).countDocuments(),
    db.collection(Collections.CONTACT_MESSAGES).countDocuments({ isRead: false }),
  ]);

  return {
    proxyCards: proxyCardsCount,
    products: productsCount,
    messages: messagesCount,
    unreadMessages,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={CreditCard}
          label="Proxy Cards"
          value={stats.proxyCards}
          iconColor="text-blue-500"
          bgColor="bg-blue-500/10"
          href="/dashboard/proxy-cards"
        />
        <StatCard
          icon={Package}
          label="Products"
          value={stats.products}
          iconColor="text-green-500"
          bgColor="bg-green-500/10"
          href="/dashboard/products"
        />
        <StatCard
          icon={Mail}
          label="Messages"
          value={stats.messages}
          iconColor="text-purple-500"
          bgColor="bg-purple-500/10"
          href="/dashboard/messages"
        />
        <StatCard
          icon={BarChart3}
          label="Unread"
          value={stats.unreadMessages}
          iconColor="text-orange-500"
          bgColor="bg-orange-500/10"
          href="/dashboard/messages"
        />
      </div>

      <div className="rounded-lg border border-border/70 bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Create proxy cards to display on homepage</p>
          <p>• Add products to shop page</p>
          <p>• Review and respond to messages</p>
          <p>• Update your password in settings</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, iconColor, bgColor, href }: {
  icon: any;
  label: string;
  value: number;
  iconColor: string;
  bgColor: string;
  href: string;
}) {
  return (
    <Link href={href} className="block rounded-lg border border-border/70 bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center rounded-lg ${bgColor}`}>
          <Icon className={`size-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Link>
  );
}
