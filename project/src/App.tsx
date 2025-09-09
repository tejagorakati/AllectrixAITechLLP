import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/" element={
        <div className="min-h-screen bg-white">
          <Header />
          <Hero />
          <About />
          <Services />
          <Team />
          <Blog />
          <Contact />
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;