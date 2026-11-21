import React from 'react'
import HeroSection from '../components/home/hero-section';
import SelectedWork from '../components/home/selected-work';
import ContactCTA from '../components/home/contact-cta';
import AboutPreview from '../components/home/about-preview';

const page = () => {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <SelectedWork />
      <ContactCTA />
    </div>
  );
}

export default page
