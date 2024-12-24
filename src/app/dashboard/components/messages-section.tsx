'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesSection() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      toast({
        description: 'Message deleted successfully',
      });
      
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        variant: "destructive",
        description: 'Failed to delete message',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <Badge variant="secondary">{messages.length} Messages</Badge>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message._id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/40 pb-4">
              <div className="flex justify-between items-start">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground">From:</span>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground">Email:</span>
                    <a 
                      href={`mailto:${message.email}`} 
                      className="text-sm text-primary hover:underline"
                    >
                      {message.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground">Date:</span>
                    <span className="text-sm">{formatDate(message.createdAt)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(message._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <span className="font-semibold text-muted-foreground">Message:</span>
                <p className="text-sm whitespace-pre-wrap bg-muted/30 p-3 rounded-md">
                  {message.message}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <Card className="p-8">
            <div className="text-center text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm mt-1">When someone sends you a message, it will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}