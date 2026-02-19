import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Features', path: '/features' },
    { name: 'BMI Calculator', path: '/bmi-calculator' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-fitness-green to-fitness-blue bg-clip-text text-transparent">
                FitTrack
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  activeProps={{ className: 'text-foreground bg-accent' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex md:items-center md:space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate({ to: '/login' })} variant="ghost" size="sm">
                    Login
                  </Button>
                  <Button onClick={() => navigate({ to: '/register' })} size="sm" className="fitness-gradient">
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  activeProps={{ className: 'text-foreground bg-accent' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => { navigate({ to: '/login' }); setMobileMenuOpen(false); }} variant="ghost" className="w-full">
                      Login
                    </Button>
                    <Button onClick={() => { navigate({ to: '/register' }); setMobileMenuOpen(false); }} className="w-full fitness-gradient">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
