import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log("message sent")
  };

  return (
      <section className="contact py-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="eg.john doe"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="eg.john@gmail.com"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your message"
                  name="message"
                  value={message}
                  onChange={onChange}
                  required></textarea>
                </div>
                <button className="bg-pink-500 text-white font-bold px-6 py-3 rounded-full hover:bg-black"
                type="submit" value="Submit">Send Message</button>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-2">Address: 123 Main Street, City, State, Zip</p>
              <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-600 mb-2">Email: info@eventplanner.com</p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ContactForm;
