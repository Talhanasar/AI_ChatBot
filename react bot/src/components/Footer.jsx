import { Facebook, Youtube, Instagram, Linkedin } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full bg-[#00A651] text-white flex items-center justify-center hover:bg-[#008741] transition-colors"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </a>
)

export default function Footer() {
  return (
      <footer className="relative pt-16">
        {/* Wave Separator */}
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-white"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Contact Us */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6 text-[#00A651]">Contact Us</h3>
              <img 
                src="ustc_logo.png" 
                alt="USTC Logo" 
                className="h-16 mb-4"
              />
              <p className="text-gray-600 mb-2">Foy's Lake, Zakir Hossain Road</p>
              <p className="text-gray-600 mb-4">Chattogram 4202.</p>
              <p className="text-gray-600">Email: registrar@ustc.ac.bd</p>
              <div className="flex space-x-3 mt-6">
                <SocialIcon href="#" icon={Facebook} label="Facebook" />
                <SocialIcon href="#" icon={Youtube} label="YouTube" />
                <SocialIcon href="#" icon={Instagram} label="Instagram" />
                <SocialIcon href="#" icon={Linkedin} label="LinkedIn" />
              </div>
            </div>

            {/* Student */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[#00A651]">Student</h3>
              <nav className="space-y-2">
                <NavLink to="/events" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Events & News</NavLink>
                <NavLink to="/financial-assistance" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Financial Assistance</NavLink>
                <NavLink to="/notice" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Notice</NavLink>
              </nav>
            </div>

            {/* University */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[#00A651]">University</h3>
              <nav className="space-y-2">
                <NavLink to="/academic-council" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Academic Council</NavLink>
                <NavLink to="/board-of-trustee" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Board of Trustee</NavLink>
                <NavLink to="/collaboration" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Collaboration</NavLink>
                <NavLink to="/disciplinary-committee" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Disciplinary Committee</NavLink>
                <NavLink to="/faculty-recruitment" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Faculty Recruitment Committee</NavLink>
                <NavLink to="/finance-committee" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Finance Committee</NavLink>
                <NavLink to="/history" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">History</NavLink>
              </nav>
            </div>

            {/* Related Link */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[#00A651]">Related Link</h3>
              <nav className="space-y-2">
                <NavLink to="/iqac" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">IQAC</NavLink>
                <NavLink to="/ic4ir" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">IC4IR</NavLink>
                <NavLink to="/convocation" className="block text-gray-600 hover:text-[#00A651] transition-colors py-1">Convocation</NavLink>
              </nav>
            </div>

            {/* Find Us */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[#00A651]">Find Us</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7998221985317!2d91.8013!3d22.3613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIxJzQwLjciTiA5McKwNDgnMDQuNyJF!5e0!3m2!1sen!2sbd!4v1635774243221!5m2!1sen!2sbd"
                width="100%"
                height="200"
                className="border-0 rounded-lg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="USTC Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 py-4 bg-[#00A651] text-white text-center">
          <div className="container mx-auto px-4">
            <p>Copyright © 2024 USTC All Rights Reserved</p>
          </div>
        </div>
      </footer>
  )
}