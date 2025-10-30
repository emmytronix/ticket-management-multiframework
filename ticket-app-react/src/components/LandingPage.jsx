import { useState } from 'react';
import { Menu, Check } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    { title: 'Easy Tracking', desc: 'Monitor all tickets in one place with status updates' },
    { title: 'Quick Resolution', desc: 'Streamline your workflow and resolve issues faster' },
    { title: 'Team Collaboration', desc: 'Work together efficiently on customer issues' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">TicketFlow</h1>
          <nav className="hidden md:flex gap-4">
            <button onClick={() => onNavigate('/login')} className="px-4 py-2 text-purple-600 hover:text-purple-700">
              Login
            </button>
            <button onClick={() => onNavigate('/signup')} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Get Started
            </button>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3">
            <button onClick={() => onNavigate('/login')} className="block w-full text-left py-2">Login</button>
            <button onClick={() => onNavigate('/signup')} className="block w-full text-left py-2">Get Started</button>
          </div>
        )}
      </header>

      {/* Hero Section with Wave */}
      <section className="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Manage Your Tickets Effortlessly</h2>
            <p className="text-xl mb-8 text-purple-100">
              Track, organize, and resolve customer support tickets with ease using our intuitive platform
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => onNavigate('/signup')} 
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
              >
                Get Started
              </button>
              <button 
                onClick={() => onNavigate('/login')} 
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-purple-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z" fill="#F9FAFB"/>
        </svg>
      </section>

      {/* Features Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose TicketFlow?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;