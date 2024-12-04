import { useState, useEffect } from 'react';
import { Phone, Mail, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#00A651] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+8801810097025" className="flex items-center gap-2 text-sm hover:text-green-100">
              <Phone className="h-4 w-4" />
              +880 1810 097025
            </a>
            <a href="tel:+8801810097026" className="flex items-center gap-2 text-sm hover:text-green-100">
              <Phone className="h-4 w-4" />
              +880 1810 097026
            </a>
            <a href="mailto:registrar@ustc.ac.bd" className="flex items-center gap-2 text-sm hover:text-green-100">
              <Mail className="h-4 w-4" />
              registrar@ustc.ac.bd
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-30 bg-white transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center">
              <img 
                src="ustc_logo.png" 
                alt="USTC Logo" 
                className="h-16"
              />
            </NavLink>
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/about"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                About USTC
              </NavLink>
              <NavLink 
                to="/administration"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Administration
              </NavLink>
              <NavLink 
                to="/academic"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Academic
              </NavLink>
              <NavLink 
                to="/apply"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Apply Online
              </NavLink>
              <NavLink 
                to="/admission"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Admission
              </NavLink>
              <NavLink 
                to="/library"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Library
              </NavLink>
              <NavLink 
                to="/notice"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Notice & Events
              </NavLink>
              <NavLink 
                to="/contact"
                className={({ isActive }) => 
                  `flex items-center gap-1 px-4 py-2 w-max transition-colors ${
                    isActive ? 'text-[#00A651]' : 'text-gray-700 hover:text-[#00A651]'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>
          </div>
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;