import React from 'react';
import aboutus from '../assets/aboutus.jpg'

const About = () => {
  return (
    <section className="about py-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae dictum laoreet, odio lectus ultrices odio, id aliquet lectus lectus eu lectus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src={aboutus} alt="About Us" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;
