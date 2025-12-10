import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, CheckCircle, Globe, Server, BookOpen, 
  Code, Smartphone, Shield, Zap, Users, ArrowRight,
  Mail, Phone, MapPin, Star, ChevronDown, Linkedin, Facebook, Youtube, ShoppingBag, MessageCircle, Calendar, Clock, Search, PenTool, Rocket
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

// --- Components ---

const AnimatedCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 90 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return rounded.onChange((latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return (
    <div ref={ref} className="text-center lg:text-left group">
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 flex items-baseline justify-center lg:justify-start tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
        {displayValue}+
      </div>
      <p className="text-teal-100/80 text-lg font-medium tracking-wide uppercase">{label}</p>
    </div>
  );
};

const WhatsAppWidget = () => (
  <motion.a
    href="https://wa.me/923000000000"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:shadow-green-500/40 hover:shadow-2xl transition-all duration-300 group border-2 border-white/20"
  >
    <MessageCircle size={26} strokeWidth={2.5} />
    <span className="absolute right-full mr-3 sm:mr-4 bg-white text-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none flex items-center gap-2">
      Chat with us! <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
    </span>
  </motion.a>
);

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-teal-800 to-blue-900 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:-translate-y-1 focus:ring-blue-900/30 border border-blue-800",
    secondary: "bg-slate-800 text-white shadow-lg shadow-slate-800/30 hover:shadow-slate-800/50 hover:-translate-y-1 focus:ring-slate-800/30",
    accent: "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 focus:ring-teal-500/30 border border-teal-500",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-600 focus:ring-teal-500/20",
    white: "bg-white text-slate-900 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-white/50"
  };

  return (
    <motion.button 
      onClick={onClick} 
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Section = ({ className = '', children, id = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-50px" });

  return (
    <section id={id} ref={ref} className={`py-24 md:py-32 ${className} overflow-hidden relative`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Heading = ({ children, level = 2, className = '', align = 'center' }) => {
  const styles = {
    1: "text-3xl sm:text-5xl md:text-7xl font-black tracking-tight",
    2: "text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6",
    3: "text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4"
  };
  const alignment = align === 'left' ? 'text-left' : 'text-center';
   
  return (
    <motion.div variants={fadeInUp} className={level === 2 ? `mb-16 ${alignment}` : alignment}>
      <h2 className={`${styles[level]} ${className} text-slate-900 leading-tight`}>
        {children}
      </h2>
      {level === 2 && (
        <div className={`w-24 h-1.5 bg-gradient-to-r from-teal-500 to-teal-300 mt-6 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
      )}
    </motion.div>
  );
};

const Card = ({ title, children, icon: Icon, className = '' }) => (
  <motion.div 
    variants={fadeInUp}
    className={`group bg-white p-8 sm:p-10 rounded-3xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 border border-slate-100 h-full flex flex-col relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    
    {Icon && (
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-slate-700 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
        <Icon size={30} strokeWidth={1.5} />
      </div>
    )}
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">{title}</h3>
    <div className="text-slate-600 leading-relaxed flex-grow font-medium">
      {children}
    </div>
  </motion.div>
);

// --- Blog Data ---

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Digital Transformation in Education",
    snippet: "How schools can leverage AI and LMS to create personalized learning experiences for students worldwide.",
    content: "In the rapidly evolving landscape of global education, Digital Transformation is no longer an option but a necessity. Schools today are moving beyond simple digitized textbooks to fully immersive Learning Management Systems (LMS). AI plays a pivotal role here, analyzing student performance data to create personalized learning paths. \n\nAt IVS, we believe that the future belongs to institutions that embrace these changes early. By integrating smart analytics and automated grading, teachers can focus more on mentorship rather than administration. The result is a more engaged student body and a more efficient academic administration.",
    date: "October 15, 2024",
    category: "EdTech",
    readTime: "5 min read",
    image: "/images/blog/blog1.jpg.png"
  },
  {
    id: 2,
    title: "Cybersecurity Best Practices for Remote Learning",
    snippet: "Protecting student data and institutional integrity in an increasingly connected digital world.",
    content: "With the rise of remote learning comes the increased risk of cyber threats. Educational institutions are now prime targets for ransomware and data breaches. Ensuring the safety of student records, financial data, and research IP is paramount.\n\nKey best practices include: enforcing Multi-Factor Authentication (MFA) for all staff and student portals, regular data backups to encrypted cloud storage, and conducting routine vulnerability assessments. IVS specializes in securing educational infrastructure, ensuring that learning continues without interruption or fear of data compromise.",
    date: "November 02, 2024",
    category: "Security",
    readTime: "7 min read",
    image: "/images/blog/blog2.jpg.png"
  },
  {
    id: 3,
    title: "Scaling Your E-Commerce Business with Shopify",
    snippet: "Key strategies for moving from a local store to a global marketplace using modern e-commerce tools.",
    content: "Transitioning from a brick-and-mortar store to a global e-commerce brand requires more than just a website; it requires a strategy. Shopify offers a robust ecosystem for scalability, but success depends on how you utilize it.\n\nOptimizing your store for mobile users, integrating seamless payment gateways relevant to your target region, and utilizing data-driven marketing tools are essential steps. Furthermore, automating inventory management can save countless hours. At IVS, we help businesses set up and scale their digital storefronts to reach customers across borders effectively.",
    date: "December 10, 2024",
    category: "E-Commerce",
    readTime: "6 min read",
    image: "/images/blog/blog3.jpg.png"
  },
  {
    id: 4,
    title: "AI in the Classroom: Beyond the Hype",
    snippet: "Practical applications of Artificial Intelligence that are changing how teachers teach and students learn.",
    content: "Artificial Intelligence in education often sounds like science fiction, but the practical applications are already here. From chatbots that answer student queries 24/7 to algorithms that detect learning gaps in real-time, AI is a force multiplier for educators.\n\nFor example, AI-driven tools can now automatically transcribe lectures, translate content for international students, and even predict at-risk students before they fall behind. Implementing these tools doesn't replace teachers; it empowers them to be more effective. IVS is at the forefront of integrating these smart technologies into our custom LMS solutions.",
    date: "January 05, 2025",
    category: "AI & EdTech",
    readTime: "6 min read",
    image: "/images/blog/blog1.jpg.png"
  },
  {
    id: 5,
    title: "Cloud Infrastructure: The Backbone of Modern Business",
    snippet: "Why migrating to the cloud is essential for cost reduction, scalability, and operational agility.",
    content: "In today's digital economy, on-premise servers are becoming a liability. Cloud infrastructure offers unparalleled flexibility, allowing businesses to scale resources up or down based on demand instantly.\n\nWhether it is AWS, Azure, or DigitalOcean, the cloud provides better disaster recovery, lower upfront capital expenditure, and access to enterprise-grade security tools. For educational institutes and growing businesses, the cloud ensures that your services are always online, regardless of traffic spikes. IVS helps clients navigate this migration smoothly and securely.",
    date: "January 22, 2025",
    category: "Cloud",
    readTime: "8 min read",
    image: "/images/blog/blog2.jpg.png"
  },
  {
    id: 6,
    title: "Automation: Doing More with Less",
    snippet: "Streamlining business workflows to reduce manual error and increase team productivity.",
    content: "Efficiency is the currency of modern business. Automation tools like Zapier, Make, and custom scripts can handle repetitive tasks—like data entry, email follow-ups, and report generation—without human intervention.\n\nBy automating these mundane processes, your team is free to focus on strategic, creative, and high-value tasks. Small businesses, in particular, benefit immensely from automation, appearing larger and more responsive than they actually are. IVS specializes in identifying bottlenecks in your workflow and deploying smart automation solutions to fix them.",
    date: "February 14, 2025",
    category: "Automation",
    readTime: "5 min read",
    image: "/images/blog/blog3.jpg.png"
  }
];

// --- Navbar & Footer ---

const Navbar = ({ activePage, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
      <Container className="flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('home')}
        >
          <div
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            <img
              src="/images/logo/ivs-logo.png.png"
              alt="Iqra Virtual Solutions logo"
              className="w-10 h-10 object-contain p-1"
            />
          </div>

          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-800' : 'text-white'}`}>
            Iqra Virtual <span className={`transition-colors ${scrolled ? 'text-teal-600' : 'text-teal-400'}`}>Solutions</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className={`relative font-semibold text-sm uppercase tracking-wider transition-colors duration-300 hover:text-teal-500 ${
                activePage === link.id 
                  ? 'text-teal-500' 
                  : scrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <motion.div layoutId="navIndicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal-500" />
              )}
            </button>
          ))}
          <Button 
            variant={scrolled ? "primary" : "accent"} 
            className={`!py-3 !px-6 !text-xs !uppercase !tracking-widest ${!scrolled && 'shadow-none border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-teal-900'}`}
            onClick={() => navigate('contact')}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigate(link.id);
                    setIsOpen(false);
                  }}
                  className={`text-left py-4 px-6 rounded-xl font-bold text-lg transition-colors ${
                    activePage === link.id ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-4 px-2">
                <Button onClick={() => { navigate('contact'); setIsOpen(false); }} className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white pt-24 pb-12 border-t border-slate-700 relative overflow-hidden">
    {/* Decoration */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
    
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <img
                src="/images/logo/ivs-logo.png.png"
                alt="Iqra Virtual Solutions logo"
                className="w-10 h-10 object-contain p-1"
              />
            </div>

            <span className="font-bold text-xl tracking-tight">Iqra Virtual Solutions</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            Empowering education and businesses with cutting-edge technology. From Peshawar to the world, we build the digital future.
          </p>
          <div className="flex gap-3 sm:gap-4 pt-2">
            {[Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 text-slate-400 border border-slate-600 hover:border-teal-500 hover:-translate-y-1"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white">Quick Links</h4>
          <ul className="space-y-3 sm:space-y-4">
            {['Home', 'About Us', 'Services', 'Blog', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => navigate(item.toLowerCase().split(' ')[0])}
                  className="text-slate-400 hover:text-teal-400 hover:translate-x-2 transition-all flex items-center gap-3 group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white">Services</h4>
          <ul className="space-y-3 sm:space-y-4">
            {['LMS Development', 'Web Development', 'Mobile Apps', 'Cloud Hosting', 'Cybersecurity'].map((item) => (
              <li key={item}>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors block text-sm sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 text-slate-400 group">
              <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <MapPin size={18} />
              </div>
              <span className="mt-2 leading-relaxed text-sm sm:text-base">
                Gulbahar, Peshawar, Pakistan
              </span>
            </li>
            <li className="flex items-center gap-4 text-slate-400 group">
              <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>
              <span className="font-medium text-white text-sm sm:text-base">
                +92 300 000 0000
              </span>
            </li>
            <li className="flex items-center gap-4 text-slate-400 group">
              <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <span className="font-medium text-white text-sm sm:text-base">
                info@iqravirtual.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row md:flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6 text-slate-500 text-xs sm:text-sm">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Iqra Virtual Solutions. All rights reserved.
        </p>
        <div className="flex gap-4 sm:gap-8 flex-wrap justify-center md:justify-end">
          <a href="#" className="hover:text-teal-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-teal-400 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

// --- Pages ---

const HomePage = ({ navigate }) => (
  <>
    {/* Hero Section */}
    <div className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/90 z-0"></div>

      <Container className="relative z-10 text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-teal-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Innovation Meets Education
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-heading mb-6 md:mb-8 leading-tight drop-shadow-2xl tracking-tight"
        >
          Iqra Virtual Solutions <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-300 to-teal-200">
            Powering Your Digital Journey
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light"
        >
          We provide smart IT, LMS, automation, cloud, and software solutions for businesses, educational institutes, and global clients.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-xl mx-auto md:max-w-none"
        >
          <Button
            variant="accent"
            onClick={() => navigate('services')}
            className="min-w-[200px] w-full md:w-auto !text-base shadow-teal-500/25"
          >
            Explore Services
          </Button>
          <Button
            variant="outline"
            className="min-w-[200px] w-full md:w-auto !border-white/30 !text-white hover:!bg-white hover:!text-slate-900 !text-base backdrop-blur-sm"
            onClick={() => navigate('contact')}
          >
            <Phone size={18} /> Contact Us
          </Button>
        </motion.div>
      </Container>
    </div>

    {/* Trust Badges */}
    <div className="relative z-20 -mt-16 mx-4 lg:mx-8">
      <Container className="bg-white/80 backdrop-blur-md border border-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 divide-x-0 md:divide-x divide-slate-100"
        >
          {[
            { label: "Since 2013", sub: "Years of Excellence", icon: CheckCircle },
            { label: "PSEB Registered", sub: "Certified Company", icon: Shield },
            { label: "Global Clients", sub: "USA, UAE, UK, KSA", icon: Globe },
            { label: "End-to-End", sub: "IT & LMS Solutions", icon: Server }
          ].map((badge, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-center gap-4 sm:gap-5 justify-center md:justify-start md:pl-8 first:pl-0 text-center md:text-left"
            >
              <div className="text-teal-600 bg-teal-50 p-3 sm:p-4 rounded-2xl shrink-0 shadow-sm">
                <badge.icon size={24} className="sm:w-[26px] sm:h-[26px]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-slate-900 leading-none mb-1">{badge.label}</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>

    {/* Core Services Preview */}
    <Section className="bg-slate-50/50">
      <Container className="px-4 sm:px-6">
        <Heading>Our Expertise</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card title="LMS & Online Classroom" icon={BookOpen}>
            Custom Learning Management Systems designed for schools, universities, and global academies.
          </Card>
          <Card title="Web & Software Dev" icon={Code}>
            Scalable websites, mobile apps, and custom software tailored to your business workflows.
          </Card>
          <Card title="AI, Automation & Cloud" icon={Zap}>
            Hosting infrastructure, cybersecurity, and AI-driven automation to streamline operations.
          </Card>
          <Card title="Mobile App Development" icon={Smartphone}>
            Native and cross-platform mobile applications (iOS & Android) for seamless user experiences.
          </Card>
          <Card title="Shopify & eCommerce" icon={ShoppingBag}>
            Complete e-commerce solutions to launch, manage, and scale your online store globally.
          </Card>
          <Card title="Cybersecurity & IT Support" icon={Shield}>
            Protecting your digital assets with advanced security protocols and 24/7 IT infrastructure support.
          </Card>
        </div>
        <motion.div variants={fadeInUp} className="flex justify-center mt-12 md:mt-20">
          <Button variant="outline" onClick={() => navigate('services')} className="!px-10 !py-4">
            View All Services
          </Button>
        </motion.div>
      </Container>
    </Section>

    {/* Why Choose Us - With Animated Counters */}
    <Section className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>

      <Container className="relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <Heading
              className="!text-white text-center lg:text-left"
              align={window.innerWidth >= 1024 ? 'left' : 'center'}
            >
              Why Partner With IVS?
            </Heading>
            <motion.div variants={staggerContainer} className="space-y-6 sm:space-y-8 mt-8 sm:mt-10 text-left inline-block w-full">
              {[
                "Over a decade of experience bridging Education and Technology.",
                "Scalable solutions used by clients in USA, UAE, KSA, and Pakistan.",
                "Strong focus on data security and cloud infrastructure.",
                "Comprehensive support from concept to deployment.",
                "Expertise in both secular and religious educational tech needs."
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-4 sm:gap-5 group">
                  <div className="bg-teal-500/10 border border-teal-500/30 p-2 rounded-full shrink-0 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">{item}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mt-12 lg:mt-16">
              <Button variant="accent" onClick={() => navigate('about')} className="!px-10">
                Learn More About Us
              </Button>
            </motion.div>
          </div>

          {/* Animated Stats Section */}
          <motion.div variants={scaleIn} className="relative hidden lg:block perspective-1000">
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-slate-900 p-16 rounded-[2.5rem] shadow-2xl shadow-red-900/40 relative z-10 transform hover:rotate-y-2 transition-transform duration-500 border border-white/10">
              <AnimatedCounter value={10} label="Years of Innovation" />
              <div className="h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent w-full my-10"></div>
              <AnimatedCounter value={100} label="Successful Projects" />
              <div className="h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent w-full my-10"></div>
              <AnimatedCounter value={50} label="Global Clients" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-full h-full border-2 border-teal-500/30 rounded-[3rem] z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </Container>
    </Section>

    {/* Our Values Section */}
    <Section className="bg-white">
      <Container className="px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            variants={fadeInUp}
            className="text-teal-600 font-bold tracking-widest uppercase text-xs block mb-4 bg-teal-50 inline-block px-4 py-1 rounded-full"
          >
            OUR VALUES
          </motion.span>
          <Heading className="mb-6">Guiding Principles That Define Us</Heading>
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light"
          >
            Our talented professionals combine technical expertise with creative problem-solving to deliver exceptional results.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            {
              title: "Expertise",
              desc: "Continuously pushing boundaries to deliver cutting-edge digital solutions that drive real business value.",
              icon: Zap,
              color: "text-amber-500 bg-amber-50"
            },
            {
              title: "Excellence",
              desc: "Maintaining the highest standards in every project and service we deliver to our clients.",
              icon: Star,
              color: "text-purple-500 bg-purple-50"
            },
            {
              title: "Integrity",
              desc: "Building trust through transparent communication and ethical business practices in all our endeavors.",
              icon: Shield,
              color: "text-blue-500 bg-blue-50"
            },
            {
              title: "Collaboration",
              desc: "Fostering strong partnerships with clients to achieve shared goals and sustainable success.",
              icon: Users,
              color: "text-pink-500 bg-pink-50"
            },
            {
              title: "Technical Depth",
              desc: "Leveraging deep technical knowledge and industry experience to deliver optimal solutions.",
              icon: Code,
              color: "text-teal-500 bg-teal-50"
            }
          ].map((value, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-slate-50/50 p-8 sm:p-10 lg:p-12 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] group"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 ${value.color}`}>
                <value.icon size={32} className="sm:w-9 sm:h-9" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>

    {/* Testimonials */}
    <Section className="bg-slate-50/80 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 px-4 sm:px-6">
        <Heading>Client Success Stories</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { text: "IVS transformed our traditional institute into a fully digital campus. Their LMS is intuitive and powerful.", author: "Sheikh Abdullah", role: "Director, Educational Institute (UAE)" },
            { text: "Reliable, secure, and professional. They handled our cloud migration and cybersecurity perfectly.", author: "James Carter", role: "CEO, Tech Startups (USA)" },
            { text: "The best team for educational technology in Pakistan. Dr. Ahmad's vision shines through their work.", author: "Fatima Hayat", role: "Principal, Online School (UK)" }
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg shadow-slate-200/50 border border-white flex flex-col h-full relative"
            >
              <div className="absolute top-8 right-8 text-slate-100">
                <MessageCircle size={60} fill="currentColor" className="opacity-20" />
              </div>
              <div className="flex gap-1 mb-6 sm:mb-8">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} className="sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="italic text-slate-600 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed flex-grow font-medium">
                "{t.text}"
              </p>
              <div className="border-t border-slate-100 pt-4 sm:pt-6">
                <p className="font-bold text-slate-900 text-lg sm:text-xl mb-1">{t.author}</p>
                <p className="text-xs sm:text-sm text-teal-600 uppercase tracking-wider font-bold">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>

    {/* CTA */}
    <Section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white text-center relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <Container className="relative z-10 px-4 sm:px-6">
        <Heading className="!text-white !mb-6">Ready to Start Your Project?</Heading>
        <motion.p
          variants={fadeInUp}
          className="mb-10 sm:mb-12 text-teal-100 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed font-light"
        >
          Whether you need a robust LMS, a custom app, or digital marketing, our team is ready to help you succeed.
        </motion.p>
        <motion.div variants={fadeInUp} className="flex justify-center">
          <Button
            variant="white"
            onClick={() => navigate('contact')}
            className="w-full sm:w-auto !px-8 sm:!px-12 !py-4 sm:!py-5 !text-lg sm:!text-xl text-teal-700 hover:text-teal-800 shadow-2xl shadow-teal-900/20"
          >
            Book a Call Today
          </Button>
        </motion.div>
      </Container>
    </Section>
  </>
);

const AboutPage = ({ navigate }) => (
  <>
    <div className="bg-gradient-to-b from-slate-800 via-blue-900 to-slate-800 py-28 md:py-40 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <Container className="relative z-10 text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 md:mb-8"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Bridging the gap between Education and Technology since 2013.
        </motion.p>
      </Container>
    </div>

    {/* Who We Are */}
    <Section>
      <Container className="px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Heading>Who We Are</Heading>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 font-light"
          >
            Iqra Virtual Solutions (IVS) is a premier IT and EdTech company based in Peshawar, Pakistan. Established in 2013 and registered with the Pakistan Software Export Board (PSEB), we specialize in delivering high-quality digital solutions to clients across the globe, including the USA, UAE, KSA, and UK.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-light"
          >
            Our mission is to provide affordable, cutting-edge technology that empowers educational institutions and businesses. From custom Learning Management Systems (LMS) to complex cloud infrastructure and automation, we are dedicated to bridging the gap between traditional methods and the digital future.
          </motion.p>
        </div>
      </Container>
    </Section>

    {/* Founder Section */}
    <Section className="bg-slate-50">
      <Container className="px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div variants={scaleIn} className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-300 aspect-[3/4] flex items-end justify-center relative group border-8 border-white transform hover:rotate-2 transition-transform duration-500">
              <img
                src="/images/team/founder.jpg.jpg"
                alt="Dr. Ahmad Ali"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent w-full relative z-10">
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">Dr. Ahmad Ali</h3>
                <p className="text-teal-400 font-medium tracking-wider uppercase text-xs sm:text-sm">
                  Founder & CEO
                </p>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-7">
            <Heading align="left">Meet Our Founder</Heading>
            <motion.h3
              variants={fadeInUp}
              className="text-xl sm:text-2xl font-bold text-red-800 mb-6 sm:mb-8"
            >
              Dr. Ahmad Ali
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-slate-600 mb-8 md:mb-12 text-base sm:text-lg leading-relaxed"
            >
              Dr. Ahmad Ali is a visionary entrepreneur, respected educator, and IT professional who has dedicated his career to modernizing education through technology. He is the founder of Iqra Virtual Solutions, Iqra Virtual School, QuranHomeTutor.com, and Darul Qurra Global Classroom.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10">
              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100"
              >
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3 text-base sm:text-lg">
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-500">
                    <BookOpen size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  Academic Excellence
                </h4>
                <ul className="text-sm text-slate-600 space-y-3 sm:space-y-4">
                  <li>• Ph.D. in Qir’aat </li>
                  <li>• M.Phil in Tafsir & Hadith </li>
                  <li>• B.A (Hons.) in Usuluddeen </li>
                  <li>• Memorized Quran with advanced Tajweed training</li>
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100"
              >
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3 text-base sm:text-lg">
                  <div className="p-2 bg-red-50 rounded-lg text-red-800">
                    <Globe size={22} className="sm:w-6 sm:h-6" />
                  </div>
                  Global Impact
                </h4>
                <ul className="text-sm text-slate-600 space-y-3 sm:space-y-4">
                  <li>• Pioneer of multiple online education platforms helping thousands of students.</li>
                  <li>• Established Darulqurra Institute & Abida Sweet Home orphanage.</li>
                  <li>• Served as Mohtamim of Madrassa Markazi Darulqurra.</li>
                </ul>
              </motion.div>
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-slate-600 italic mt-10 md:mt-12 border-l-4 border-teal-500 pl-6 sm:pl-8 text-lg sm:text-xl leading-relaxed py-2"
            >
              "My vision is to combine strong religious and academic foundations with modern IT, AI, and digital learning to build a future where quality education is accessible and affordable for everyone."
            </motion.p>
          </div>
        </div>
      </Container>
    </Section>

    {/* Team Section */}
    <Section>
      <Container className="px-4 sm:px-6">
        <Heading>Our Team</Heading>
        <motion.p
          variants={fadeInUp}
          className="text-center text-slate-500 max-w-2xl mx-auto mb-12 md:mb-20 text-base sm:text-lg"
        >
          IVS boasts a multidisciplinary team of IT engineers, designers, and educational strategists working together to support our global clients.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              name: "Muhammad Mustafa Ahmad",
              role: "PROJECT LEAD & AI AUTOMATION SPECIALIST",
              desc: "Leads major projects, AI automation workflows, and chatbot solutions for clients.",
              image: "/images/team/mustafa.jpg.jpg"
            },
            {
              name: "Zulqarnain Haider",
              role: "LEAD SOFTWARE ENGINEER (LMS & WEB)",
              desc: "Develops custom LMS platforms and scalable web applications with secure architecture.",
              image: "/images/team/zulqarnain.jpg.jpg"
            },
            {
              name: "Habibullah",
              role: "E-COMMERCE & GROWTH SPECIALIST",
              desc: "Works on Shopify, WordPress, social media marketing, and AI integrations for business automation.",
              image: "/images/team/habibullah.jpg.jpg"
            },
            {
              name: "Muhammad Aamir",
              role: "JUNIOR WEB DEVELOPER",
              desc: "Supports web development tasks, including custom software modules and lead-management systems.",
              image: "/images/team/aamir.jpg.jpg"
            },
            {
              name: "Mian Abdul Hameed",
              role: "CYBER SECURITY EXPERT",
              desc: "Ensures system security, infrastructure hardening, and data protection for client projects.",
              image: "/images/team/hameed.jpg.jpg"
            },
            {
              name: "Abdullah Wasim",
              role: "JUNIOR SOFTWARE ENGINEER",
              desc: "Contributes to custom software development and assists in building advanced system modules.",
              image: "/images/team/abdullah.jpg.png"
            }
          ].map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-2xl transition-all duration-300 group border border-slate-100"
            >
              <div className="bg-slate-100 w-full flex items-center justify-center text-slate-300 group-hover:bg-teal-50 transition-colors relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto max-h-[320px] sm:max-h-[340px] object-contain rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="p-8 sm:p-10 text-center relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-1 bg-teal-500 rounded-full"></div>
                <h4 className="font-bold text-xl sm:text-2xl text-slate-900 mb-2">{member.name}</h4>
                <p className="text-teal-600 font-bold text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">
                  {member.role}
                </p>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>

    <Section className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white text-center py-20 md:py-32">
      <Container className="px-4 sm:px-6">
        <Heading className="!text-white !mb-6 sm:!mb-8" level={2}>
          Work with a team that understands both technology and education.
        </Heading>
        <motion.div variants={fadeInUp} className="flex justify-center mt-8 sm:mt-12">
          <Button
            variant="accent"
            onClick={() => navigate('contact')}
            className="w-full sm:w-auto !px-8 sm:!px-10 !py-4 sm:!py-5 !text-base sm:!text-lg"
          >
            Contact us to discuss your project
          </Button>
        </motion.div>
      </Container>
    </Section>
  </>
);

const ServicesPage = ({ navigate }) => (
  <>
    <div className="bg-gradient-to-b from-slate-800 via-blue-900 to-slate-800 py-24 md:py-40 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <Container className="relative z-10 text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-tight"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light"
        >
          Complete IT solutions from concept to deployment and long-term support.
        </motion.p>
      </Container>
    </div>

    <Section>
      <Container className="px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {[
            { 
              title: "LMS Development & Online Classroom Systems",
              desc: "We build robust Learning Management Systems tailored for schools, madrassas, and universities.",
              points: ["Custom Student/Teacher Portals", "Video Conferencing Integration", "Assignment & Grading Modules"]
            },
            { 
              title: "Web & Software Development",
              desc: "End-to-end development services creating responsive websites and complex enterprise software.",
              points: ["Custom React/Node.js Solutions", "Progressive Web Apps (PWA)", "Database Design & Management"]
            },
            { 
              title: "Shopify & eCommerce Websites",
              desc: "Launch your online store with optimized Shopify setups or custom WooCommerce builds.",
              points: ["Payment Gateway Integration", "Inventory Management", "Conversion Rate Optimization"]
            },
            { 
              title: "Web Hosting & Cloud Infrastructure",
              desc: "Secure and scalable hosting solutions ensuring your digital assets are always online.",
              points: ["AWS/Azure/DigitalOcean Setup", "Daily Backups & SSL", "Server Management"]
            },
            { 
              title: "Cybersecurity & IT Support",
              desc: "Protect your business from digital threats with our comprehensive security audits and support.",
              points: ["Vulnerability Assessments", "Data Encryption", "24/7 Technical Support"]
            },
            { 
              title: "Tele-Education & Virtual School Tech",
              desc: "Specialized tools for remote schooling, including virtual whiteboards and attendance tracking.",
              points: ["Interactive Classroom Tools", "Parent Communication Apps", "Live Streaming Setup"]
            },
            { 
              title: "AI & Automation Solutions",
              desc: "Streamline repetitive tasks and gain insights using Artificial Intelligence and workflow automation.",
              points: ["Chatbots for Support", "Workflow Automation (Zapier/Make)", "Data Analytics"]
            },
            { 
              title: "Digital Marketing Services",
              desc: "Grow your brand visibility and reach the right audience through targeted campaigns.",
              points: ["SEO & Content Strategy", "Social Media Management", "PPC Advertising"]
            },
            { 
              title: "Mobile Application Development",
              desc: "Native and cross-platform mobile apps for iOS and Android.",
              points: ["React Native & Flutter", "User-Centric UI/UX", "App Store Optimization"]
            },
            { 
              title: "IT Consultancy & Strategy",
              desc: "Expert advice to align your technology stack with your business goals.",
              points: ["Digital Transformation Strategy", "Tech Stack Audits", "Cost Optimization"]
            }
          ].map((service, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp} 
              className="flex flex-col h-full p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-teal-500 transition-colors duration-500"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-slate-700 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <CheckCircle size={24} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 sm:mb-10 leading-relaxed flex-grow text-sm sm:text-base">
                {service.desc}
              </p>
              <ul className="space-y-3 sm:space-y-4 mt-auto">
                {service.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    <div className="mt-0.5 text-teal-500">
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>

    <Section className="bg-white relative overflow-hidden">
      <Container className="px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <Heading>Our Approach</Heading>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg font-light">
            A clear, secure and collaborative process from first call to long-term support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

          {[
            { 
              title: "Protect your IP", 
              text: "We begin with NDAs and confidential handling of your idea so your intellectual property stays fully protected.",
              icon: Shield,
              color: "text-blue-600 bg-blue-50"
            },
            { 
              title: "Discover & Define", 
              text: "Through consultation and project discovery, we understand your goals, users, and challenges, then define a clear project scope and roadmap.",
              icon: Search,
              color: "text-amber-500 bg-amber-50"
            },
            { 
              title: "Design & Prototype", 
              text: "Our team creates intuitive UI/UX designs and interactive prototypes so you can see and refine the experience before development starts.",
              icon: PenTool,
              color: "text-purple-500 bg-purple-50"
            },
            { 
              title: "Build & Assure Quality", 
              text: "Using agile development, we build your solution in increments with continuous QA and testing to ensure performance, security, and reliability.",
              icon: Code,
              color: "text-teal-500 bg-teal-50"
            },
            { 
              title: "Launch, Support & Evolve", 
              text: "We handle deployment, monitoring, and ongoing maintenance, and help you improve the product over time based on real-world feedback.",
              icon: Rocket,
              color: "text-red-500 bg-red-50"
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="flex flex-col items-center text-center group px-2"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 z-10 border-4 border-white ${step.color}`}>
                <step.icon size={26} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>

    {/* Technologies Section */}
    <Section className="bg-white">
      <Container className="px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <Heading>Technologies We Use</Heading>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Cutting-edge tools and frameworks to build robust, scalable solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { 
              name: "React", 
              icon: (
                <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 text-current fill-current">
                  <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              )
            }, 
            { 
              name: "Node.js", 
              icon: (
                <svg viewBox="0 0 32 32" className="w-6 h-6 text-current fill-current">
                  <path d="M16 0l14 8v16l-14 8L2 24V8L16 0zm0 2l-12 7v14l12 7 12-7V9L16 2z" fill="currentColor"/>
                  <path d="M14 12h4v8h-4z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Python", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M12 0c-3.3 0-6 2.7-6 6v2h6v2H6v6h2v-6h6V8h2V6c0-3.3-2.7-6-6-6zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-2 10H4v6c0 3.3 2.7 6 6 6s6-2.7 6-6v-2h-6v-2zm2 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "AWS", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M16.5 12.5c0-1.5-1-2.5-2.5-2.5s-2.5 1-2.5 2.5c0 1.5.5 2 1.5 2h2c.5 0 1-.2 1-.5v-1.5h.5zm-4 0c0-.5.2-1 .8-1 .5 0 .8.5.8 1v.5h-1c-.5 0-.6-.2-.6-.5zm8.5 5c-2.5 2.5-6 3.5-9 3.5s-6.5-1-9-3.5l1-1c2 2 5 3 8 3s5.5-1 8-3l1 1zm-3.5-9.5l-1 5h-1.5l-1-3.5-1 3.5h-1.5l-1-5h1.5l.8 3.5.8-3.5h1.5l.8 3.5.8-3.5h1.3z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Docker", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M2 12h3v3H2v-3zm4-4h3v3H6V8zm0 4h3v3H6v-3zm4-4h3v3h-3V8zm0 4h3v3h-3v-3zm4-4h3v3h-3V4zm0 4h3v3h-3V8z" fill="currentColor"/>
                  <path d="M22 14c0-3-2-5-5-5h-1v2h1c1.5 0 3 1 3 3s-2 3-4 3H3c-1 0-1-1-1-1v-2H0v2c0 2 2 3 4 3h14c4 0 4-5 4-5z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "MongoDB", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M12 0C8 6 4 10 4 15c0 4 3.6 7 8 7s8-3 8-7c0-5-4-9-8-15z" fill="currentColor"/>
                  <path d="M12 22c-.5 0-1-.5-1-1V10c0-.5.5-1 1-1s1 .5 1 1v11c0 .5-.5 1-1 1z" fill="white"/>
                </svg>
              )
            },
            { 
              name: "PostgreSQL", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16c-2 0-3.5-1-3.5-3s1.5-3.5 3.5-3.5 3.5 1.5 3.5 3.5-1.5 3-3.5 3zm4-7c-1 0-2 .5-2 1.5v3c0 1-1 1.5-2 1.5s-2-.5-2-1.5v-3c0-1-1-1.5-2-1.5s-2 .5-2 1.5v2c0 2 2 3.5 4 3.5s3.5-1.5 3.5-3.5v-1c0-.5.5-1 1-1s1 .5 1 1v1c0 1-1 1.5-2 1.5" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Flutter", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M14 2L5 11l3 3 9-9H14zm-3 12l-3 3 3 3 3-3-3-3z" fill="currentColor"/>
                  <path d="M14 22l9-9h-4l-5 5-2 2 2 2h4z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Next.js", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm4.8 18L8 6h2l6 8V6h2v12h-1.2z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "TypeScript", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M2 2h20v20H2V2zm14 14h-2v-2h-1c-1 0-1.5.5-1.5 1s.5 1 1.5 1h3v2h-3c-2.5 0-3.5-1.5-3.5-3s1-3 3.5-3h1v-1h-2v-2h6v6zm-7-4H7v6H5v-6H3v-2h6v2z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Kubernetes", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M12 2L3 7v9l9 5 9-5V7l-9-5zm0 2.3l6 3.3v6.4l-6 3.3-6-3.3V7.6l6-3.3z" fill="currentColor"/>
                  <path d="M12 7l-4 2.3v4.4l4 2.3 4-2.3V9.3L12 7z" fill="currentColor"/>
                </svg>
              )
            },
            { 
              name: "Firebase", 
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-current fill-current">
                  <path d="M4 16l2.5-8 2.5 4.5L12 4l2 2 2-6 3.5 16H4z" fill="currentColor"/>
                </svg>
              )
            }
          ].map((tech, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shadow-sm">
                {tech.icon}
              </div>
              <span className="font-bold text-slate-700 text-sm sm:text-base">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
    
    <Section className="bg-slate-50">
      <Container className="px-4 sm:px-6">
        <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-red-900/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')] opacity-20"></div>
          <div className="relative z-10">
            <Heading level={2} className="!text-white !mb-6 sm:!mb-8">
              Unsure which solution fits your needs?
            </Heading>
            <p className="text-sm sm:text-lg text-red-100 mb-8 sm:mb-12 max-w-2xl mx-auto font-light">
              Our consultants are available to audit your current infrastructure and suggest the best path forward.
            </p>
            <Button
              variant="white"
              onClick={() => navigate('contact')}
              className="w-full sm:w-auto mx-auto !text-red-900 !px-8 sm:!px-10 !py-4 sm:!py-5 !text-base sm:!text-lg"
            >
              Schedule a Free Discovery Call
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  </>
);
const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <div className="bg-gradient-to-b from-slate-800 via-blue-900 to-slate-800 py-28 md:py-40 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <Container className="relative z-10 text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 md:mb-8"
          >
            Insights & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Latest trends in EdTech, Digital Marketing, and Software Development.
          </motion.p>
        </Container>
      </div>

      <Section>
        <Container className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {BLOG_POSTS.map((post) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col group"
              >
                <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/90 backdrop-blur-sm text-teal-700 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest shadow-lg z-20">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} /> {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} /> {post.readTime}
                    </div>
                  </div>
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 leading-snug group-hover:text-teal-600 transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8 line-clamp-3 flex-grow leading-relaxed">
                    {post.snippet}
                  </p>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-red-800 font-bold text-xs sm:text-sm flex items-center gap-2 hover:gap-4 transition-all mt-auto uppercase tracking-widest"
                  >
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-20"
              >
                <X size={24} />
              </button>
              <div className="h-56 sm:h-72 md:h-80 w-full relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/80 text-xs sm:text-sm font-bold mb-2">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full uppercase text-[10px] sm:text-xs tracking-widest">
                      {selectedPost.category}
                    </span>
                    <span>{selectedPost.date}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>
              <div className="p-6 sm:p-8 md:p-12">
                <div className="prose prose-sm sm:prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">
                    Share this article:
                  </p>
                  <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-blue-600">
                      <Facebook size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-blue-500">
                      <Linkedin size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-sky-500">
                      <Globe size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const text = `*New Inquiry from Website*
    
*Name:* ${fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/923000000000?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-slate-800 via-blue-900 to-slate-800 py-28 md:py-40 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <Container className="relative z-10 text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 md:mb-8"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Let's build something amazing together.
          </motion.p>
        </Container>
      </div>

      <Section>
        <Container className="px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-6 sm:p-8 lg:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
            >
              <Heading align="left" level={2}>Send us a Message</Heading>
              <p className="text-slate-500 mb-6 sm:mb-10 text-base sm:text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium" 
                      placeholder="John" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium" 
                    placeholder="john@example.com" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium" 
                    placeholder="+92 300 0000000" 
                  />
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                    Please include country code (e.g. +92 300 0000000).
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                    Subject
                  </label>
                  <input 
                    type="text"
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium resize-none" 
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full !py-4 sm:!py-5 !text-base sm:!text-lg shadow-xl shadow-blue-900/20"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={staggerContainer} className="flex flex-col justify-center mt-10 lg:mt-0">
              <Heading align="left" level={3}>Contact Information</Heading>
              <div className="space-y-8 sm:space-y-10 mt-8 sm:mt-10">
                <motion.div variants={fadeInUp} className="flex items-start gap-5 sm:gap-8 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                    <Phone size={26} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-1">
                      Phone Number
                    </h4>
                    <p className="text-slate-600 text-base sm:text-lg">+92 300 000 0000</p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">Mon-Fri 10am-6pm</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-5 sm:gap-8 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                    <Mail size={26} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-1">
                      Email Address
                    </h4>
                    <p className="text-slate-600 text-base sm:text-lg">info@iqravirtual.com</p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      For support and inquiries
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-5 sm:gap-8 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={26} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-1">
                      Head Office
                    </h4>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      Gulbahar, Peshawar, Pakistan
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map Embed */}
              <motion.div
                variants={scaleIn}
                className="mt-12 sm:mt-16 bg-slate-100 rounded-[2rem] h-64 sm:h-72 lg:h-80 w-full overflow-hidden relative border-4 border-white shadow-xl shadow-slate-200/50"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13229.0!2d71.56!3d34.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9170d37213597%3A0x205a0722835b530!2sGulbahar%2C%20Peshawar!5e0!3m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
};

// --- Main App Component ---

const App = () => {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const navigate = (pageId) => {
    setPage(pageId);
  };

  return (
    <div className="font-sans bg-slate-50/30 min-h-screen flex flex-col text-slate-900 selection:bg-teal-100 selection:text-teal-900 antialiased">
      <Navbar activePage={page} navigate={navigate} />
      
      <main className="flex-grow">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'about' && <AboutPage navigate={navigate} />}
        {page === 'services' && <ServicesPage navigate={navigate} />}
        {page === 'blog' && <BlogPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer navigate={navigate} />
      <WhatsAppWidget />
    </div>
  );
};

export default App;
