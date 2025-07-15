import { HeroSection } from '@/components/shared/hero-section';
import { ContactForm } from '@/components/shared/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const contactDetails = [
    { icon: Mail, title: 'Email Us', content: 'contact@aperturevisions.com', href: 'mailto:contact@aperturevisions.com' },
    { icon: Phone, title: 'Call Us', content: '(555) 123-4567', href: 'tel:555-123-4567' },
    { icon: MapPin, title: 'Our Studio', content: '123 Visionary Lane, Creativity City, 10101', href: '#' },
  ];

  return (
    <>
      <HeroSection
        title="Get In Touch"
        subtitle="Have a project in mind or a question for us? We'd love to hear from you."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="telephone desk"
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-headline text-primary mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Reach out directly through our channels below. We are available Monday to Friday, 9am - 6pm.
                </p>
              </div>
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                      <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                        {item.content}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
