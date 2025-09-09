import React from 'react';
import { Target, Users, Lightbulb, Award, Heart, Brain, Shield, Zap, Activity } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Streamline operations with intelligent automation that reduces costs and increases efficiency.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability for mission-critical business applications.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Target,
      title: 'Industry-Focused Solutions',
      description: 'Tailored AI solutions designed specifically for your industry and business needs.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'Intelligent Analytics',
      description: 'Advanced AI algorithms that analyze data patterns to provide actionable business insights.',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 animate-fade-in-up">
            About Allectrix AI
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delayed">
            We develop innovative solutions at the intersection of AI and Electronics to tackle real-world challenges.
Our core focus areas include athlete performance monitoring, healthcare, and automation.
From smart wearables that boost athletic potential to AI-driven healthcare tools and intelligent industrial systems, we build impactful, data-driven products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-in-up-delayed">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Who We Are</h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Our Vision:</strong> 
            </p>Our vision is to become a global leader in products that transform everyday life through the seamless integration of AI and Electronics.
We aim to create intelligent, adaptive, and sustainable solutions that enhance human potential.
By redefining performance, healthcare, and automation, we strive to shape a smarter, connected future.
            <p className="text-gray-600 leading-relaxed">
              <strong>Our Mission:</strong> Our mission is to build innovative data-driven solutions at the intersection of AI and Electronics.
We are developing a smart healthcare band that uses sweat-based sensing to track key health parameters.
It is designed to boost athletic performance and enable continuous patient monitoring.
By combining AI algorithms, biosensing, and user-centered design, we create intelligent and accessible systems.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>What Drives Us:</strong> We believe AI should be accessible and practical. By combining advanced 
              machine learning, intuitive design, and industry expertise, we deliver solutions that truly transform businesses.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center mt-8">
              <div>
                <div className="text-3xl font-bold text-emerald-600 animate-pulse">Smart</div>
                <div className="text-gray-600">Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 animate-pulse">AI</div>
                <div className="text-gray-600">Powered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 animate-pulse">∞</div>
                <div className="text-gray-600">Scalable</div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl p-8 text-white transform group-hover:scale-105 transition-transform duration-300 shadow-xl">
              <h4 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="mr-3 h-8 w-8 animate-pulse" />
                AI Revolution
              </h4>
              <p className="leading-relaxed mb-4">
                We're not just building software – we're creating intelligent systems that learn, adapt, and 
                evolve to meet the unique needs of every business and industry.
              </p>
              <div className="flex items-center text-emerald-200">
                <Zap className="mr-2 h-5 w-5" />
                <span className="text-sm">Smart automation for enhanced productivity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group hover-lift hover-glow animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
