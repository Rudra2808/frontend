import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const About = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const foundationItems = [
    {
      title: "Values",
      items: [
        "Integrity in all our business dealings",
        "Unwavering commitment to quality",
        "Embracing innovation in our practices",
        "Customer satisfaction as our priority"
      ]
    },
    {
      title: "Mission",
      items: [
        "Transform landscapes into vibrant communities",
        "Deliver exceptional value through design",
        "Commit to sustainable development practices",
        "Contribute to economic growth in our region"
      ]
    },
    {
      title: "Vision",
      items: [
        "Become the premier developer in the region",
        "Create landmark properties of excellence",
        "Expand while maintaining quality",
        "Build a legacy of trust for generations"
      ]
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Section 1 - Enhanced Hero with Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-700/80 z-0"></div>
        <div className="container mx-auto px-6 py-32 md:py-40 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building Dreams, <span className="text-teal-300">Creating Homes</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              For over a decade, Prime Property Dealers has been transforming India's real estate landscape with innovation and trust.
            </p>
            <button className="bg-teal-400 hover:bg-teal-300 text-teal-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Explore Our Projects
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Luxury Property"
                className="w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-teal-700">12+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Our Foundation with Animated Accordion */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Foundation</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              The pillars that define our commitment to excellence in real estate development
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {foundationItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`flex justify-between items-center w-full text-left p-8 hover:bg-gray-50 transition-all ${activeAccordion === index ? 'bg-gray-50' : ''}`}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    {item.title}
                  </h3>
                  {activeAccordion === index ? (
                    <FiChevronUp className="w-6 h-6 text-teal-600" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 text-teal-600" />
                  )}
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-8 pb-8 pt-2">
                    <ul className="space-y-3 pl-6">
                      {item.items.map((point, i) => (
                        <li key={i} className="text-lg text-gray-600 relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-teal-500">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - What Drives Us Forward */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">What Drives Us Forward</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Our core principles that fuel our success and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Innovation",
                desc: "We embrace cutting-edge technology and creative solutions to stay ahead in the real estate industry.",
                icon: "💡",
                bg: "bg-blue-50",
                color: "text-blue-600"
              },
              {
                title: "Integrity",
                desc: "Honesty and transparency form the core of every transaction and relationship we build.",
                icon: "🤝",
                bg: "bg-teal-50",
                color: "text-teal-600"
              },
              {
                title: "Excellence",
                desc: "We strive for perfection in every project, ensuring quality that stands the test of time.",
                icon: "⭐",
                bg: "bg-amber-50",
                color: "text-amber-600"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`${item.bg} p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`text-5xl mb-6 ${item.color}`}>{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Our Impact */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Impact</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              The numbers that showcase our journey and achievements
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: "2000+", label: "Properties Sold", icon: "🏠" },
              { value: "12+", label: "Years Experience", icon: "📅" },
              { value: "150+", label: "Expert Agents", icon: "👨‍💼" },
              { value: "30+", label: "Cities Served", icon: "🌆" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md text-center hover:bg-teal-50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:text-teal-600">{item.icon}</div>
                <h3 className="text-5xl font-bold text-teal-600 mb-2">{item.value}</h3>
                <p className="text-lg text-gray-700 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80')] bg-cover bg-center z-0"></div>
        <div className="absolute inset-0 bg-teal-900/90 z-0"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Property Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to guide you through every step of your real estate experience
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-teal-400 hover:bg-teal-300 text-teal-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              Schedule a Consultation
            </button>
            <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;