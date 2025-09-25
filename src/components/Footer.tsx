'use client'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>W</span>
              </div>
              <span className='font-bold text-xl'>WorkHub</span>
            </div>
            <p className='text-gray-400 mb-4 text-sm'>
              Connecting skilled workers with people who need their services.
              Quality work, fair prices, reliable professionals.
            </p>
            <div className='flex items-center space-x-4'>
              <a
                href='https://github.com/solve-ease/frontend_dev_assignment'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1'
              >
                <ExternalLink size={16} />
                <span className='text-sm'>View on GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className='font-semibold text-lg mb-4'>Services</h3>
            <ul className='space-y-2 text-sm'>
              {['Construction', 'Home Services', 'Maintenance', 'Cleaning', 'Electrical', 'Plumbing'].map((service) => (
                <li key={service}>
                  <span className='text-gray-400'>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className='font-semibold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              {['About Us', 'How it Works', 'Contact', 'Help Center'].map((item) => (
                <li key={item}>
                  <span className='text-gray-400'>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className='font-semibold text-lg mb-4'>Contact</h3>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center space-x-3'>
                <Mail size={16} className='text-gray-400' />
                <span className='text-gray-400'>contact@workhub.com</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone size={16} className='text-gray-400' />
                <span className='text-gray-400'>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center space-x-3'>
                <MapPin size={16} className='text-gray-400' />
                <span className='text-gray-400'>123 Work Street, NY 10001</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className='border-t border-gray-800 mt-8 pt-8 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className='text-gray-400 text-sm'>
            © 2025 WorkHub. All rights reserved. |
            <a href='#' className='hover:text-white transition-colors ml-1'>Privacy Policy</a> |
            <a href='#' className='hover:text-white transition-colors ml-1'>Terms of Service</a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
