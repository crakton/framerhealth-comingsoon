import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About Us", href: "#" },
    { name: "Who We Help", href: "#" },
    { name: "Fees & Funding", href: "#" },
    { name: "Referrals", href: "#" },
    { name: "Service Areas", href: "#" },
    { name: "Blogs", href: "#" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white">
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-healthcare-teal rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L10 8L16 8L16 10L10 10L10 16L8 16L8 10L2 10L2 8L8 8L8 2L10 2Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-healthcare-text">
              Framer<span className="text-healthcare-teal">Health</span>
            </span> */}
            <img className="w-18" src="/logo.svg" alt="FramerHealth Logo" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="font-sans hidden md:flex items-center space-x-8 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-md font-semibold transition-colors hover:text-healthcare-teal ${
                  location.pathname === item.href
                    ? "text-healthcare-teal"
                    : "text-healthcare-text"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-healthcare-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-healthcare-border">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-healthcare-teal ${
                    location.pathname === item.href
                      ? "text-healthcare-teal"
                      : "text-healthcare-text"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;