import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturedProperties from './FeaturedProperties';
import StatsSection from './StatsSection';
import ServicesSection from './ServicesSection';
import BookingSection from './BookingSection';
import Footer from './Footer';

const NewHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="stats">
          <StatsSection />
        </section>
        <section id="properties">
          <FeaturedProperties />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="booking">
          <BookingSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewHomePage;