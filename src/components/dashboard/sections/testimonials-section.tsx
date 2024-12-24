'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export function TestimonialsSection() {
  return (
    <div className="space-y-6">
      <Button>Add New Testimonial</Button>
      <div className="space-y-4">
        {['John Doe', 'Jane Smith'].map((name) => (
          <Card key={name}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{name}</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
