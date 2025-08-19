import React, { useEffect, useState, useRef } from "react";
import { FiChevronRight, FiChevronLeft, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import emailjs from "@emailjs/browser";

// Testimonials data
const testimonials = [
  {
    text: "Prime Property Dealers helped me find the perfect home. The process was smooth and hassle-free!",
    author: "Ayesha R.",
    role: "Home Buyer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "Amazing service and professional team. I highly recommend them to anyone looking to buy or sell property.",
    author: "Raj S.",
    role: "Investor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "They truly understand the market. Got my house sold above the asking price!",
    author: "Neha P.",
    role: "Home Seller",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
];

// Counter Hook with smoother animation
const useInViewCounter = (targetValue) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          
          const animateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            const currentCount = Math.floor(easeProgress * targetValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };
          
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return [count, ref];
};

const heroImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
];

const Contact = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false);
  const testimonialTimeoutRef = useRef(null);

  const [deals, refDeals] = useInViewCounter(1500);
  const [years, refYears] = useInViewCounter(10);
  const [cities, refCities] = useInViewCounter(25);
  const [clients, refClients] = useInViewCounter(500);

  // Hero slider with transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHeroTransitioning(true);
      setTimeout(() => {
        setCurrentHero((prev) => (prev + 1) % heroImages.length);
        setIsHeroTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial slider with manual controls
  const nextTestimonial = () => {
    clearTimeout(testimonialTimeoutRef.current);
    setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    resetTestimonialTimer();
  };

  const prevTestimonial = () => {
    clearTimeout(testimonialTimeoutRef.current);
    setTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetTestimonialTimer();
  };

  const resetTestimonialTimer = () => {
    testimonialTimeoutRef.current = setTimeout(() => {
      setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    resetTestimonialTimer();
    return () => clearTimeout(testimonialTimeoutRef.current);
  }, []);

  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    document.getElementById("form-time").value = new Date().toLocaleString();

    setIsSending(true);
    setMessageStatus("");

    emailjs
      .sendForm(
        "service_y6b1atr",     // e.g. "service_123abc"
        "template_o7thw4g",    // e.g. "template_xyz"
        formRef.current,
        "zT-IEm6VJdsqYk9rx"      // e.g. "Fg7hT9kLmNO123"
      )
      .then(
        () => {
          setMessageStatus("✅ Message sent successfully!");
          setIsSending(false);
          formRef.current.reset();
        },
        (error) => {
          setMessageStatus("❌ Failed to send. Please try again.");
          setIsSending(false);
          console.error(error);
        }
      );
  };
  return (
    <div className="font-sans text-gray-900 scroll-smooth bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroImages.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${isHeroTransitioning ? 'opacity-0' : ''} ${
              currentHero === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt={`hero-${idx}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70">
          <div className="container mx-auto h-full flex flex-col justify-center px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                <span className="text-teal-300">HavenHunt</span> Dealers
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Your trusted partner in finding the perfect home, office, or investment opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center no-underline justify-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get in Touch
                </a>
                <a
                  href="#achievements"
                  className="inline-flex items-center no-underline justify-center px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-700 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${testimonialSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{testimonial.author}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className="w-6 h-6 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-teal-100 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-teal-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-teal-100 transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-teal-600" />
            </button>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTestimonialSlide(index);
                    resetTestimonialTimer();
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${testimonialSlide === index ? 'bg-teal-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-teal-700 to-teal-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
            <p className="text-xl mt-6 max-w-2xl mx-auto">
              Have questions or want to get started? Reach out to us today!
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-teal-500 p-3 rounded-full mr-4">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <a 
                    href="tel:3454343434" 
                    className="text-lg hover:text-teal-300 transition-colors"
                  >
                    +91 3454343434
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-teal-500 p-3 rounded-full mr-4">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <a 
                    href="mailto:hello123@gmail.com" 
                    className="text-lg hover:text-teal-300 transition-colors"
                  >
                    rudrapatel6808@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-teal-500 p-3 rounded-full mr-4">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-lg">xyz</p>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between max-w-xs">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8 text-gray-800">
  <h3 className="text-2xl font-bold mb-6 text-teal-700">Send Us a Message</h3>
  <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
    <div>
      <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
      <input 
        type="text" 
        name="user_name"
        id="name" 
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Enter your name"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
      <input 
        type="email" 
        name="user_email"
        id="email" 
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Enter your email"
      />
    </div>
      <input type="hidden" name="time" id="form-time" />


    <div>
      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
      <input 
        type="tel" 
        name="user_phone"
        id="phone" 
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Enter your phone number"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
      <textarea 
        id="message"
        name="message"
        rows="4"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="How can we help you?"
      ></textarea>
    </div>

    <button 
      type="submit"
      disabled={isSending}
      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
    >
      {isSending ? "Sending..." : "Send Message"}
    </button>
  </form>

  {messageStatus && (
    <p className="mt-4 text-center font-semibold">
      {messageStatus}
    </p>
  )}
</div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;