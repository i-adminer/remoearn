import { MessagesList } from '@/components/admin/messages-list';
import { getContactMessages } from '@/lib/actions/contact';

export const metadata = {
  title: 'Messages | Dashboard',
};

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">Contact form submissions</p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <MessagesList messages={messages} />
      </div>
    </div>
  );
}
