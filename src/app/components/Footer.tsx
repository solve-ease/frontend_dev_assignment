import {
  FaFacebook,
  FaTwitter,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2">
            <FaPeopleGroup className="w-7 h-7 text-white" />
            <h2 className="text-xl font-bold text-white">WorkersHub</h2>
          </div>

          <p className="mt-3 text-sm">
            Connecting you with skilled professionals for all your work needs.
            Trusted, reliable, and affordable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/workers" className="hover:text-white">
                Workers
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Construction
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Repairs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Housekeeping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Electrical
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagramSquare size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6">
        <p className="text-center py-4 text-sm text-gray-400">
          © {new Date().getFullYear()} WorkersHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
