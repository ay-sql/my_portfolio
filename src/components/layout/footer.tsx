import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#portfolio" className="text-sm text-muted-foreground hover:text-primary">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/#blog" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    contact@example.com
                  </a>
                </li>
                <li className="text-sm text-muted-foreground">
                  Location: City, Country
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2 mt-8">
            <p className="text-sm text-muted-foreground text-center">
              {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Built with Next.js and TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
