// Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 dark:from-gray-900 dark:to-black text-white dark:text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">HavenHunt</h2>
          <p className="text-gray-200 dark:text-gray-400 text-sm leading-relaxed">
            Building dreams, creating homes. Explore properties, manage your wishlist, 
            and find the perfect place to live or invest.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 dark:text-gray-400">
            <li><Link to="/about" className="hover:text-black dark:hover:text-white no-underline text-white transition">About Us</Link></li>
            <li><Link to="/viewproperties" className="hover:text-black dark:hover:text-white no-underline text-white transition">Properties</Link></li>
            <li><Link to="/wishlist" className="hover:text-black dark:hover:text-white no-underline text-white transition">Wishlist</Link></li>
            <li><Link to="/contact" className="hover:text-black dark:hover:text-white no-underline text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-200 dark:text-gray-400 text-sm">📍 Gujrat, India</p>
          <p className="text-gray-200 dark:text-gray-400 text-sm">📧 rudrapatel6808@gmail.com</p>
          <p className="text-gray-200 dark:text-gray-400 text-sm">📞 +91 8511380300</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-500 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-gray-300 dark:text-gray-500">
        © {new Date().getFullYear()} HavenHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
