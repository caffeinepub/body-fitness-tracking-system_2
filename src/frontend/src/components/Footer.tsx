import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'fitness-tracker';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-fitness-green to-fitness-blue bg-clip-text text-transparent">
              Body Fitness Tracking System
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your fitness journey with precision and ease.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">College Information</h3>
            <p className="text-sm text-muted-foreground">BYK College of Commerce</p>
            <p className="text-sm text-muted-foreground">Academic Year: 2025-26</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Team Members</h3>
            <p className="text-sm text-muted-foreground">Rajeshwar Chaudhari</p>
            <p className="text-sm text-muted-foreground">Project Lead & Developer</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2">© {currentYear} Body Fitness Tracking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
