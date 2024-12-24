'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function SkillsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="newSkill">Add New Skill</Label>
        <div className="flex space-x-2">
          <Input id="newSkill" placeholder="Enter skill name" />
          <Button>Add</Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Current Skills</h3>
        <div className="grid grid-cols-3 gap-2">
          {['React', 'TypeScript', 'Next.js'].map((skill) => (
            <div key={skill} className="flex items-center justify-between bg-secondary p-2 rounded">
              <span>{skill}</span>
              <Button variant="ghost" size="sm" className="h-auto p-1 text-destructive">×</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
