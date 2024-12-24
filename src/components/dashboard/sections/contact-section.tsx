'use client'

import { useState } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ContactSection() {
  const [selectedMessage, setSelectedMessage] = useState<null | {
    name: string
    email: string
    message: string
    date: string
  }>(null)

  const messages = [
    { 
      name: 'John Doe', 
      email: 'john@example.com', 
      message: 'Hello, I would like to discuss a potential project with you. Please let me know when you are available for a call.', 
      date: '2024-01-20' 
    },
    { 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      message: 'Hi, I am interested in your web development services. Can you please send me more information about your packages and pricing?', 
      date: '2024-01-19' 
    },
  ]

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.email}>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
              <TableCell>{message.date}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessage(message)}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">From</h4>
              <p className="text-sm text-muted-foreground">{selectedMessage?.name} ({selectedMessage?.email})</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Date</h4>
              <p className="text-sm text-muted-foreground">{selectedMessage?.date}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Message</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
