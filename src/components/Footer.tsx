import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-bold mb-4">
            <i className="ri-briefcase-line text-indigo-400"></i>
            JobStack
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            JobStack helps fresh graduates and professionals find the right
            opportunities faster with a modern hiring experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/jobs" className="hover:text-indigo-400 transition">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link to="/internships" className="hover:text-indigo-400 transition">
                Internships
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-indigo-400 transition">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-indigo-400 transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-indigo-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-400 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-indigo-400 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="ri-github-fill"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="ri-twitter-x-line"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="ri-facebook-circle-fill"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobStack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
