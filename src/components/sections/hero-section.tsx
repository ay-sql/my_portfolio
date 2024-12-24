'use client';

import { useEffect, useState, memo, useMemo } from 'react';
import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const defaultContent: HeroContent = {
  title: 'Creative Developer & Designer',
  subtitle: 'Crafting beautiful and functional digital experiences with modern technologies',
  description: 'Passionate about creating innovative web solutions that help businesses grow',
  ctaText: "Let's Work Together",
  ctaLink: '#contact'
};

const LoadingSpinner = memo(() => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-white font-medium">Loading...</p>
    </div>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

const HeroButtons = memo(({ ctaLink, ctaText }: { ctaLink: string; ctaText: string }) => (
  <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
    <Link
      href={ctaLink || '#contact'}
      className="gold-gradient-btn text-black font-semibold px-6 py-3 rounded-full text-sm transition-all text-center"
    >
      {ctaText || "Let's Work Together"}
    </Link>
    <Link
      href="/portfolio"
      className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black dark:text-white transition-all"
    >
      View My Work
    </Link>
  </div>
));
HeroButtons.displayName = 'HeroButtons';

function HeroSectionComponent() {
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/hero');
        const data = await response.json();
        
        if (isMounted && data && Object.keys(data).length > 0) {
          setContent(prevContent => ({
            ...prevContent,
            ...data,
            ctaLink: data.ctaLink || prevContent.ctaLink
          }));
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [setIsLoading]);

  const memoizedContent = useMemo(() => ({
    title: content.title,
    subtitle: content.subtitle,
    ctaLink: content.ctaLink,
    ctaText: content.ctaText
  }), [content.title, content.subtitle, content.ctaLink, content.ctaText]);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted relative">
      {isLoading && <LoadingSpinner />}
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-6 md:gap-12">
        <div className="flex-1 space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            {memoizedContent.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {memoizedContent.subtitle}
          </p>
          <HeroButtons ctaLink={memoizedContent.ctaLink} ctaText={memoizedContent.ctaText} />
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSectionComponent);
