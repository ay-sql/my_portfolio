'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function AboutSection() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Enter your bio" rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="resumeLink">Resume Link</Label>
        <Input id="resumeLink" type="url" placeholder="Enter resume URL" />
      </div>
    </div>
  )
}
