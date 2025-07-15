import Link from 'next/link';
import { Camera, Facebook, Instagram, Twitter } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { ContactForm } from '@/components/shared/contact-form';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">d3 creation studio</span>
          </Link>
          <p className="text-sm text-muted-foreground font-body">
            Capturing life's most precious moments with creativity and passion. Our team of photographers and videographers is dedicated to delivering stunning visual stories.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="font-headline text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 font-body">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6">
           <h3 className="font-headline text-lg font-semibold mb-4">Get in Touch</h3>
           <ContactForm />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t pt-8 text-center text-sm text-muted-foreground font-body">
        <p>&copy; {new Date().getFullYear()} d3 creation studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
