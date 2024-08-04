import React from 'react';
import herobg from "../assets/herobgevent.jpg";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import Events from './Events';
import About from './About';
import ContactForm from './ContactForm';

const HeroSection = () => {
  return (
    <div className="container mx-auto py-4">
      
      <section
        className="hero bg-cover bg-center py-24 relative"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold text-white">Plan Your Dream Event</h1>
          <p className="text-lg text-white mt-4">Find the perfect event for you and your loved ones.</p>
          <button className="bg-FF3366 text-white px-6 py-3 rounded-md mt-6 hover:bg-FFD166">Explore Events</button>
        </div>
      </section>
      <section className="event py-2 bg-gray-100">
      <div className="container mx-auto">
        <Events/>
      </div>
      </section>
      <section className="services py-2 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src={service1} alt="Service 1" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Service Name 1</h3>
              <p className="text-gray-600 mb-4">Service Description 1</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src={service2} alt="Service 2" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Service Name 2</h3>
              <p className="text-gray-600 mb-4">Service Description 2</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src={service3} alt="Service 3" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Service Name 3</h3>
              <p className="text-gray-600 mb-4">Service Description 3</p>
            </div>
          </div>
        </div>
      </section>
      <section className="event py-2 bg-gray-100">
      <div className="container mx-auto">
        <About/>
      </div>
      </section>
      <section className="event py-2 bg-gray-100">
      <div className="container mx-auto">
        <ContactForm/>
      </div>
      </section>
    </div>
  );
};

export default HeroSection;
