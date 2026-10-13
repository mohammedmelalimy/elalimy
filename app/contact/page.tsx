import type { Metadata } from 'next';
import ContactSection from '../../components/contact/contact-section';

export const metadata: Metadata = {
  title: 'Contact | Mohammed Elalimy',
  description:
    'Get in touch with Mohammed Elalimy for full-stack development, Shopify projects, and collaborations.'
};

export default function ContactPage() {
  return <ContactSection />;
}
