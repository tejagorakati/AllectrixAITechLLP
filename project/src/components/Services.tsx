import React from 'react';
import { Activity, Smartphone, Brain, BarChart, Shield, Heart, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'Machine Learning Solutions',
      description: 'Custom ML models and algorithms that learn from your data to provide intelligent insights and predictions.',
      features: ['Predictive Analytics', 'Pattern Recognition', 'Custom Model Development', 'Real-time Processing'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Mobile Apps',
      description: 'Intelligent mobile applications with built-in AI capabilities for enhanced user experiences and automation.',
      features: ['iOS & Android Apps', 'AI Integration', 'Smart Recommendations', 'Voice Recognition'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Activity,
      title: 'Patient Monitoring using Wearable Tech',
      description: 'Advanced wearable devices powered by AI for continuous patient monitoring and health insights.',
      features: ['Real-time Monitoring', 'Health Analytics', 'Alert Systems', 'Data Integration'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart,
      title: 'Process Automation',
      description: 'Intelligent automation solutions that streamline workflows and reduce manual tasks across your organization.',
      features: ['Workflow Automation', 'Document Processing', 'Task Scheduling', 'Integration APIs'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Custom AI Development',
      description: 'Tailored AI solutions built specifically for your unique business requirements and industry challenges.',
      features: ['Custom Development', 'Industry Expertise', 'Scalable Architecture', 'Ongoing Support'],
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Data Security & Privacy',
      description: 'Secure AI solutions with enterprise-grade data protection and privacy compliance.',
      features: ['Data Encryption', 'Privacy Compliance', 'Secure Processing', 'Access Control'],
      color: 'from-red-500 to-orange-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 animate-fade-in-up">
            Our AI Solutions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delayed">
            Comprehensive AI-powered solutions designed to transform businesses across industries with 
            intelligent automation, predictive analytics, and cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 animate-fade-in-up" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 text-emerald-600 font-medium hover:text-emerald-700 transition-all duration-300 group-hover:translate-x-2 transform inline-flex items-center">
                Learn More
                <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;