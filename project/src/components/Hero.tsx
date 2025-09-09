import React from 'react';
import { ArrowRight, Play, Heart, Activity, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Floating Health Icons */}
      <div className="absolute top-20 right-20 animate-float animate-pulse-glow">
        <Heart className="w-12 h-12 text-emerald-400 opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float-delayed animate-rotate">
        <Activity className="w-10 h-10 text-blue-400 opacity-50" />
      </div>
      <div className="absolute top-1/2 right-40 animate-heartbeat">
        <Shield className="w-8 h-8 text-emerald-300 opacity-40" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <div className="mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium rounded-full animate-pulse">
              🤖 AI-Powered Solutions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Transforming
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 animate-gradient"> Industries </span>
            with AI
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed animate-fade-in-up-delayed">
            At Allectrix AI Tech LLP, we're building the future with cutting-edge AI solutions. 
            From intelligent automation to predictive analytics, we transform businesses across industries with innovative technology.
          </p>
          
          {/* AI Stats Animation */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-2xl animate-fade-in-up-delayed-2">
            <div className="text-center group">
              <div className="text-3xl font-bold text-emerald-400 mb-1 group-hover:scale-110 transition-transform duration-300">Real-time</div>
              <div className="text-gray-300 text-sm">Monitoring</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">AI</div>
              <div className="text-gray-300 text-sm">Powered Insights</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-emerald-400 mb-1 group-hover:scale-110 transition-transform duration-300">∞</div>
              <div className="text-gray-300 text-sm">Scalable Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;