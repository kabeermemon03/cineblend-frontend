import { Link } from 'react-router-dom'
import { Play, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/cineblend-studios.appspot.com/o/assets%2Flogo.png?alt=media";

  const sections = [
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Services', path: '/services' },
        { name: 'Request a CineBit', path: '/request-cinebit' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Video Editing', path: '/services#video' },
        { name: 'Graphic Design', path: '/services#graphic' },
        { name: 'Web Development', path: '/services#web' },
        { name: 'Logo Design', path: '/services#logo' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Instagram', path: 'https://instagram.com/cineblend' },
        { name: 'Twitter', path: 'https://twitter.com/cineblend' },
        { name: 'LinkedIn', path: 'https://linkedin.com/company/cineblend' },
      ],
    },
  ]

  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-mocha/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="CineBlend Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <Play className="fallback-icon hidden w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              CINE<span className="text-mocha">BLEND</span>
            </span>
          </Link>
          <p className="text-white/60 max-w-sm leading-relaxed">
            Blending cinematic creativity with modern technology to craft stunning visuals, 
            powerful brands, and immersive digital experiences.
          </p>
          <div className="flex items-center space-x-4">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-mocha hover:border-mocha transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/90">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-mocha transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-mocha transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-white/40 text-sm">
          © {currentYear} CineBlend Studios. All rights reserved.
        </p>
        <div className="flex items-center space-x-8 text-white/40 text-sm">
          <a href="#" className="hover:text-mocha transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-mocha transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
