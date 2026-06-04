import { ProxyCardForm } from '@/components/admin/proxy-card-form';

export const metadata = {
  title: 'New Proxy Card | Dashboard',
};

export default function NewProxyCardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Proxy Card</h1>
        <p className="text-sm text-muted-foreground mt-1">Create a new proxy service card</p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProxyCardForm />
      </div>
    </div>
  );
}
