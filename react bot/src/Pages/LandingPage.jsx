import React, { useState, useEffect } from 'react'
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/slides/Slider1.jpg",
      title: "Build Better Life With Our Education",
      subtitle: "Empowering minds, advancing technology, shaping futures"
    },
    {
      image: "/slides/Slider2.jpg",
      title: "Excellence in Science and Technology",
      subtitle: "Leading the way in innovation and research"
    },
    {
      image: "/slides/Slider3.jpg"
    },
    {
      image: "/slides/Slider4.jpg"
    },
    {
        image: "/slides/Slider6.jpg",
    },
    {
      image: "/slides/Slider7.jpg"
    }
  ]

  // Add auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(c => (c < slides.length - 1 ? c + 1 : 0));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Add touch event handling with passive listeners
  useEffect(() => {
    const slider = document.querySelector('.slider-container');
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e) => {
      touchStart = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEnd = e.changedTouches[0].screenX;
      if (touchStart - touchEnd > 50) {
        // Swipe left
        setCurrentSlide(c => (c < slides.length - 1 ? c + 1 : 0));
      } else if (touchStart - touchEnd < -50) {
        // Swipe right
        setCurrentSlide(c => (c > 0 ? c - 1 : slides.length - 1));
      }
    };

    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden slider-container">
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{ left: `${index * 100}%` }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {slide.title && slide.subtitle && (
                <div className="absolute inset-0 bg-black/40">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-3xl text-white">
                      <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
                        {slide.title}
                      </h1>
                      <p className="text-xl mb-8 animate-fade-up animation-delay-200">
                        {slide.subtitle}
                      </p>
                      <Button className="bg-transparent hover:bg-[#008741] text-[#00A651] border-[#00A651] border-2 animate-fade-up animation-delay-400">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={() => setCurrentSlide(c => (c > 0 ? c - 1 : slides.length - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide(c => (c < slides.length - 1 ? c + 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Stats Section */}
      <div className="relative bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "👨‍🏫", number: "100+", label: "Teachers" },
              { icon: "📚", number: "8", label: "Departments" },
              { icon: "🏛️", number: "80+", label: "Class Rooms" },
              { icon: "👨‍🎓", number: "4,000+", label: "Students" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-[#00A651] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Featured Programs */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Computer Science & Engineering",
              "Electrical & Electronic Engineering",
              "Business Administration",
            ].map((program, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={program}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{program}</h3>
                  <p className="text-gray-600 mb-4">
                    Discover our cutting-edge curriculum and world-class faculty.
                  </p>
                  <Button variant="outline" className="text-[#00A651] border-[#00A651] hover:bg-[#00A651] hover:text-white">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}