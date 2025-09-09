import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    title: 'New Contact Message',
    name: '',
    email: '',
    message: '',
    time: new Date().toLocaleString()
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      time: new Date().toLocaleString() // update time each time
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        'service_j017zdk',     // 🔁 Replace with your actual service ID
        'template_r4015lx',    // 🔁 Replace with your actual template ID
        formData,
        '6fvmHHOQtk8gBzOew'      // 🔁 Replace with your public key
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              title: 'New Contact Message',
              name: '',
              email: '',
              message: '',
              time: new Date().toLocaleString()
            });
          }, 3000);
        },
        (error) => {
          console.error('Email sending failed:', error.text);
        }
      );
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'director@allectrix.in',
      link: 'mailto:director@allectrix.in'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 7799350212',
      link: 'tel:+917799350212'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Startup cell, Sathyabama Institute of Science and Technology, Jeppiar Nagar, 600119',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Let's Start a Conversation</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <info.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{info.title}</h4>
                    <a
                      href={info.link}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {info.content}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Why Choose Allectrix?</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  Expert team with proven track record
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  Tailored solutions for your business
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  Ongoing support and maintenance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  Transparent communication throughout
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group transform hover:scale-105"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
