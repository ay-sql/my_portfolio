'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  NewspaperIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About', href: '/#about', icon: UserIcon },
    { name: 'Portfolio', href: '/portfolio', icon: BriefcaseIcon },
    { name: 'Blog', href: '/blog', icon: NewspaperIcon },
    { name: 'Contact', href: '/#contact', icon: EnvelopeIcon },
  ];

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold dark:text-white">
            Ayoub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="gold-gradient-btn text-black font-semibold px-4 py-2 rounded-full text-sm"
            >
              Hire Me
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Hire Me Button */}
            <Link
              href="/#contact"
              className="gold-gradient-btn text-black font-semibold px-4 py-2 rounded-full text-sm"
            >
              Hire Me
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Slide-over */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out h-screen flex flex-col ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white ml-auto block"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu items */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
