import Link from 'next/link';
import { Camera, Facebook, Instagram } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { ContactForm } from '@/components/shared/contact-form';

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
        <title>WhatsApp</title>
        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-1.123c-.244-.306-.487-.261-.67-.261-.182 0-.381.025-.58.025-.198 0-.52.074-.792.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-12 lg:col-span-4">
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
            <Link href="https://www.instagram.com/d3_creation_studio/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
             <Link href="https://wa.me/917708548764" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <WhatsAppIcon />
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-6 lg:col-span-2">
          <h3 className="font-headline text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 font-body">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
             <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
          </ul>
        </div>

        <div className="md:col-span-6 lg:col-span-6">
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
