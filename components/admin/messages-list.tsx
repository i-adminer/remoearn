'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { markMessageAsRead } from '@/lib/actions/contact';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export function MessagesList({ messages }: { messages: Message[] }) {
  const handleMarkRead = async (id: string) => {
    await markMessageAsRead(id);
  };

  if (messages.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No messages yet</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg._id} className={`p-4 border rounded-lg ${msg.isRead ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-slate-950'}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold">{msg.subject}</h3>
              <p className="text-sm text-muted-foreground">{msg.name} ({msg.email})</p>
            </div>
            <div className="flex items-center gap-2">
              {!msg.isRead && (
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">New</span>
              )}
              <Button variant="ghost" size="sm" onClick={() => handleMarkRead(msg._id)} disabled={msg.isRead}>
                <CheckCircle2 className="size-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm">{msg.message}</p>
        </div>
      ))}
    </div>
  );
}
