'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeftOnRectangleIcon, 
  ChatBubbleBottomCenterTextIcon, 
  FolderIcon, 
  HomeIcon, 
  PencilSquareIcon, 
  TagIcon, 
  UserIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar'

interface Tag {
  _id: string;
  name: string;
}

interface DashboardSidebarProps {
  className?: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => Promise<void>;
}

export function DashboardSidebar({ className, activeSection, setActiveSection, handleLogout }: DashboardSidebarProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getValidCachedTags = () => {
    try {
      const cachedTags = localStorage.getItem('tags');
      if (!cachedTags) return null;
      
      const { expiry } = JSON.parse(cachedTags);
      const isExpired = new Date().getTime() > expiry;
      
      if (isExpired) return null;
      
      return JSON.parse(cachedTags).data;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        // First check cache
        const cachedTags = getValidCachedTags();
        if (cachedTags) {
          setTags(cachedTags);
          setIsLoading(false);
          return;
        }

        // If no valid cache, fetch from API
        const response = await fetch('/api/tags');
        const data = await response.json();
        
        // Update state and cache
        setTags(data);
        localStorage.setItem('tags', JSON.stringify({
          data,
          expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
        }));
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []); // Empty dependency array since we only want to run once on mount

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const menuItems = [
    { id: 'hero', name: 'Hero Section', icon: HomeIcon },
    { id: 'about', name: 'About Section', icon: UserIcon },
    { id: 'skills', name: 'Skills Section', icon: WrenchScrewdriverIcon },
    { id: 'projects', name: 'Projects Section', icon: FolderIcon },
    { id: 'blog', name: 'Blog Section', icon: PencilSquareIcon },
    { id: 'tags', name: 'Tags Section', icon: TagIcon },
    { id: 'contact', name: 'Contact Section', icon: ChatBubbleBottomCenterTextIcon },
  ];

  return (
    <Sidebar className={className}>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleSectionChange(item.id)}
                    isActive={activeSection === item.id}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-6">
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={handleLogout}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
