"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);
  
  const closeMobileMenu = () => setNavOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled || navOpen ? 'bg-card' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Camera className="h-8 w-8 text-primary" />
            <span className={cn("text-xl font-bold font-headline", navOpen ? 'text-primary' : 'text-foreground')}>Aperture Visions</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild className={cn(
                pathname === link.href && 'bg-primary/10 text-primary'
              )}>
                <Link href={link.href} className="font-body">{link.label}</Link>
              </Button>
            ))}
             <Button asChild className="ml-4">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-[6px] relative"
              aria-label="Toggle menu"
            >
              <span className={cn(
                "block w-full h-0.5 bg-foreground transition-transform duration-300 ease-in-out",
                navOpen ? "rotate-45 translate-y-[5px]" : ""
              )}></span>
              <span className={cn(
                "block w-full h-0.5 bg-foreground transition-transform duration-300 ease-in-out",
                 navOpen ? "-rotate-45 -translate-y-[2px]" : ""
              )}></span>
            </button>
          </div>

        </div>
      </div>
      
       {/* Mobile Nav Overlay */}
        <div className={cn(
            "fixed inset-0 bg-background w-full h-screen transition-transform duration-500 ease-in-out md:hidden",
            navOpen ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
                <ul className="flex flex-col items-center gap-2 text-center">
                    {navLinks.map((link, index) => (
                    <li key={link.href} className="overflow-hidden">
                        <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={cn(
                                "inline-block text-3xl font-headline transition-transform duration-500",
                                navOpen ? 'translate-y-0' : 'translate-y-full'
                            )}
                            style={{ transitionDelay: navOpen ? `${0.2 + index * 0.05}s` : '0s' }}
                        >
                            {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                <div className={cn(
                    "absolute bottom-8 left-0 right-0 px-4 text-center transition-opacity duration-500",
                     navOpen ? 'opacity-100' : 'opacity-0',
                )} style={{ transitionDelay: navOpen ? '0.6s' : '0s' }}>
                    <p className="text-muted-foreground">Madurai, Tamil Nadu</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <a href="#" className="hover:text-primary">YouTube</a>
                        <a href="#" className="hover:text-primary">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
