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
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
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
        isScrolled || navOpen || !isHomePage ? 'bg-card/95 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Camera className="h-8 w-8 text-primary" />
            <span className={cn("text-xl font-bold font-headline", isScrolled || navOpen || !isHomePage ? 'text-primary' : 'text-foreground')}>d3 creation studio</span>
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

          <div className="md:hidden z-50">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 relative"
              aria-label="Toggle menu"
            >
              <span className={cn(
                "block w-6 h-0.5 bg-primary transition-transform duration-300 ease-in-out",
                navOpen ? "rotate-45 translate-y-[.4rem]" : ""
              )}></span>
              <span className={cn(
                "block w-6 h-0.5 bg-primary transition-transform duration-300 ease-in-out",
                 navOpen ? "-rotate-45" : ""
              )}></span>
            </button>
          </div>

        </div>
      </div>
      
       {/* Mobile Nav Overlay */}
        <div className={cn(
            "fixed inset-0 bg-background w-full h-screen transition-all duration-500 ease-in-out md:hidden",
            navOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
                <ul className="flex flex-col items-center gap-4 text-center">
                    {navLinks.map((link, index) => (
                    <li key={link.href} className="overflow-hidden">
                        <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={cn(
                                "inline-block text-4xl font-headline transition-all duration-500 hover:text-accent",
                                pathname === link.href && 'text-accent',
                                navOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: navOpen ? `${0.5 + index * 0.1}s` : '0s' }}
                        >
                            {link.label}
                        </Link>
                    </li>
                    ))}
                    <li className='overflow-hidden pt-4'>
                       <Link
                            href="/contact"
                            onClick={closeMobileMenu}
                            className={cn(
                                "inline-block text-4xl font-headline transition-all duration-500 hover:text-accent",
                                pathname === '/contact' && 'text-accent',
                                navOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: navOpen ? `${0.5 + navLinks.length * 0.1}s` : '0s' }}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                <div className={cn(
                    "absolute bottom-8 left-0 right-0 px-4 text-center transition-opacity duration-500",
                     navOpen ? 'opacity-100' : 'opacity-0',
                )} style={{ transitionDelay: navOpen ? '1s' : '0s' }}>
                    <p className="text-muted-foreground">Madurai, Tamil Nadu</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <a href="https://www.youtube.com/@d3creation966" target="_blank" rel="noopener noreferrer" className="hover:text-primary">YouTube</a>
                        <a href="https://www.instagram.com/d3_creation_studio/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
