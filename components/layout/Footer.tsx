import Link from "next/link";
import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-4">Renan Lavirotte</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Full-Stack Developer & Collaborative Leader
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:renan.lavirotte@gmail.com"
                  className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  renan.lavirotte@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:07729446958"
                  className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  07729 446958
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; {currentYear} Renan Lavirotte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

