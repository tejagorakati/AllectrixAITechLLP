import React from 'react';
import { Linkedin } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr . V J K Kishore Sonti',
      role: 'Designated Partner',
      image: '/WhatsApp Image 2025-09-08 at 10.01.24_fa2b3d04.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/dr-kishore-sonti-347b23133?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    },
    {
      name: 'Dr. A Sivasangari',
      role: 'Designated Partner',
      image: '/WhatsApp Image 2025-09-08 at 10.01.31_3a6db295.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/dr-sivasangari-a-02bb93126?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    },
    {
      name: 'C. Sai Varun',
      role: 'Designated Partner',
      image: '/WhatsApp Image 2025-09-08 at 10.00.20_d839d2e4.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/sai-varun-chandrashekar-93b8bb273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    },
    {
      name: 'Yogeswaran S',
      role: 'Designated Partner',
      image: '/WhatsApp Image 2025-09-08 at 10.00.37_cca9b624.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/yogeswaran-s-a21169256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    },
    {
      name: 'G Teja',
      role: 'SDE Intern',
      image: '/WhatsApp Image 2025-09-08 at 17.29.32_a0ad45cb.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/gorakati-teja?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    },
    {
      name: 'Nisha DR',
      role: 'Bio Sensor Engineer Intern',
      image: '/WhatsApp Image 2025-09-08 at 17.21.58_e0859be7.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/nishabme?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center h-64 md:h-72">
                <img
                  src={member.image}
                  alt={member.name}
                  className="max-h-full object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <div className="flex justify-center">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#0A66C2] text-white rounded-full flex items-center justify-center 
                               shadow hover:shadow-md hover:shadow-[#0A66C2]/40 
                               transform hover:scale-110 transition-all duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
