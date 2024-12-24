'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function FooterSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Social Media Links</Label>
        <div className="space-y-2">
          {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
            <div key={platform} className="flex space-x-2">
              <Input type="url" placeholder={`${platform} URL`} />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="copyrightText">Copyright Text</Label>
        <Input id="copyrightText" placeholder="Enter copyright text" />
      </div>
    </div>
  )
}
