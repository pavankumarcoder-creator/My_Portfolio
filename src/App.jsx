import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Menu, X, Sun, Moon, Github, Linkedin, Twitter, Facebook, Download, Mail, Phone, Code, GraduationCap, Briefcase, Zap, Star, LayoutList, ArrowRight
} from 'lucide-react';
import Shop from "./assets/Images/shopy.png";
import Budget from "./assets/Images/Budget.png";
import Resume from "./assets/Images/resume.jpg";
import Hero from "./assets/Images/pavan.jpg";

// --- MOCK DATA ---
const PORTFOLIO_DATA = {
  designation: "Frontend Developer",
  name: "Naga Venkata Pavan Kumar",
  photoUrl: Hero,
  resumeLink: "./assets/pavan_kumar.pdf",
  socials: [
    { name: "GitHub", icon: Github, link: "https://github.com/pavankumarcoder-creator" },
    { name: "LinkedIn", icon: Linkedin, link: "https://www.linkedin.com/in/pavankumarcoder569/" },
  ],
  about: {
    intro: "I am Naga Venkata Pavan Kumar, a passionate Frontend Developer. I approach my work with a detail-oriented mindset and am committed to building robust and functional applications. I pride myself on being a good listener, which helps me understand project requirements deeply, and I highly value continuous learning in the frontendend development field.",
    journey: "My development journey started with DevGnan. I began by working on projects using simple HTML and CSS. As my knowledge grew, I eagerly explored and mastered the Frontend (JavaScript, React.JS, Redux) development. While I identify as a slow learner, I utilize my inherent patience to systematically overcome this challenge, ensuring I fully grasp every concept and deliver quality work."
  },
  skills: [
    { category: "Frontend", icon: LayoutList, list: ["React", "Redux", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap"] },
    { category: "Tools", icon: Zap, list: ["Git/GitHub", "VS Code", "Vercel", "Nelify","Render"] },
  ],
  education: [
    {
      institution: "Chalapathi Institute of Engineering and Technology",
      degree: "B.Tech. in Computer Science & Engineering",
      period: "2020-2024",
    },
    {
      institution: "Sri Chaitanya Junior College",
      degree: "Intermediate",
      period: "2018-2020",
    },
    {
      institution: "GOVT. Boys High School",
      degree: "SSC",
      period: "2017-2018",
      
    },
  ],
  experience: [
    {
      title: "Self-learning",
      company: "Currently Seeking Opportunities",
      period: "2024-present",
      description: "Focusing on building production-ready projects and continuously learning new technologies to start a professional journey .",
    },
  ],
  projects: [
    {
      id: 1,
      name: "ShopEasy",
      image:Shop,
      techStack: ["React", "Redux", "JavaScript", "CSS3", "JWT", "Razorpay API",],
      description: "shopEasy is a full-fledged e-commerce web app I built end-to-end, covering both the customer-facing store and the admin dashboard.",
      liveLink: "https://shopeasy-a8h6.onrender.com/",
      githubLink: "https://github.com/pavankumarcoder-creator/ShopEasy",
      challenges: "Overcame challenges in implementing a cart functionality, user athentication, payment integration, and deploying the project successfully.",
      futurePlans: "Planning to add a more products and performance optimization for speed loading.",
    },
    {
      id: 2,
      name: "Budget Expense Tracker",
      image:Budget,
      techStack: ["React", "React-router", "JavaScript", "CSS3", "HTML5"],
      description: "A personal finance tracker built with React.js to manage income and expenses, visualize spending, and monitor financial health.",
      liveLink: " https://budget-expense-tracker-ypgu.onrender.com/",
      githubLink: "https://github.com/pavankumarcoder-creator/Budget-Expense-Tracker",
      challenges: "Faced challenges while implementing allocate monthly budgets when income varies,and ensuring smooth user interactions across the platform.",
      futurePlans: "Plan to add user authentication, real-time pi-charts, and improving tracking system.",
    },
    {
      id: 3,
      image:Resume,
      name: "AI Resume Builder",
      techStack: ["React", "Bootstrap", "JavaScript", "Gemini API"],
      description: "I recently built an AI-integrated tool using Gemini API — designed to help graduates and job seekers craft personalized cover letters and optimize their resumes to perfectly align with company job descriptions.",
      liveLink: "https://resume-builder-d2ho.onrender.com/",
      githubLink: "https://github.com/pavankumarcoder-creator/Resume-Builder",
      challenges: "Faced challenges while exploring Gemini API and implementing its features effectively.",
      futurePlans: "Plan to  add user authentication, push notifications, and advanced workout filtering/search.",
    },
  ],
};

// --- UTILITY HOOKS & COMPONENTS ---

// Custom Hook to detect if an element is in view (for AOS simulation)
const useInViewAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Only trigger once after element is visible
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  return { ref, isInView };
};

// Utility function to generate AOS classes (Reworked for more variety)
const getAOSClass = (isInView, index, type = 'slide-up') => {
  const baseClasses = "transition-all duration-1000 ease-out transform";
  const delay = isInView ? `${300 + index * 150}ms` : '0ms'; // Staggered delay for child items
  let animationClasses = '';

  if (isInView) {
    animationClasses = 'opacity-100 translate-y-0 scale-100 rotate-0';
  } else {
    switch (type) {
      case 'slide-left':
        animationClasses = 'opacity-0 -translate-x-full';
        break;
      case 'slide-right':
        animationClasses = 'opacity-0 translate-x-full';
        break;
      case 'scale-in':
        animationClasses = 'opacity-0 scale-50';
        break;
      case 'rotate-in':
      case 'slide-up': // Default
      default:
        animationClasses = 'opacity-0 translate-y-12';
        break;
    }
  }

  return `${baseClasses} ${animationClasses}`;
};

// Utility function to get Google Docs direct download URL
const getGoogleDocsDownloadUrl = (url) => {
  // Extract document ID from Google Docs URL
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const docId = match[1];
    // Return direct download URL in PDF format
    return `https://docs.google.com/document/d/${docId}/export?format=pdf`;
  }
  // If not a Google Docs URL, return original URL
  return url;
};



// Custom Hook for Trailing LINE Cursor Effect (Multi-dot implementation)
const useTrailingCursor = (isDarkMode) => {
  const trailRefs = useRef([]);
  const TRAIL_LENGTH = 15; // Number of dots in the trail
  const trailElements = useMemo(() => Array.from({ length: TRAIL_LENGTH }), []);

  useEffect(() => {
    // Array to store target and current positions for each trail element
    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    }));

    // The smoothing factor for the primary element (index 0)
    const primarySpeed = 0.15;
    // The smoothing factor for trailing elements (creates the lag effect)
    const lagFactor = 0.7;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    let animationFrameId;

    const updateCursor = () => {
      if (trailRefs.current.length !== TRAIL_LENGTH) {
        animationFrameId = requestAnimationFrame(updateCursor);
        return;
      }

      // 1. Update the position of the first dot (the fastest one)
      positions[0].targetX = mouseX;
      positions[0].targetY = mouseY;

      positions[0].currentX += (positions[0].targetX - positions[0].currentX) * primarySpeed;
      positions[0].currentY += (positions[0].targetY - positions[0].currentY) * primarySpeed;

      trailRefs.current[0].style.transform =
        `translate3d(${positions[0].currentX - 5}px, ${positions[0].currentY - 5}px, 0)`;

      // 2. Update the position of the trailing dots
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        // Target of dot 'i' is the current position of dot 'i-1'
        positions[i].targetX = positions[i - 1].currentX;
        positions[i].targetY = positions[i - 1].currentY;

        // Smoothly move dot 'i' towards its target (dot i-1)
        positions[i].currentX += (positions[i].targetX - positions[i].currentX) * lagFactor;
        positions[i].currentY += (positions[i].targetY - positions[i].currentY) * lagFactor;

        // Apply transformation to the DOM element
        trailRefs.current[i].style.transform =
          `translate3d(${positions[i].currentX - 5}px, ${positions[i].currentY - 5}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updateCursor(); // Start the loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const baseColor = isDarkMode ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'; // Purple
  const trailColor = isDarkMode ? 'rgba(216, 180, 254, 0.7)' : 'rgba(167, 139, 250, 0.8)'; // Lighter Purple/Pink

  // Render the trail elements
  return (
    <>
      {trailElements.map((_, index) => {
        // Calculate size and opacity gradient for the trail effect
        const size = 10 - (index * 0.5); // Dots get smaller towards the tail
        const opacity = 1 - (index / TRAIL_LENGTH); // Dots fade out towards the tail
        const color = index === 0 ? baseColor : trailColor;

        return (
          <div
            key={index}
            ref={el => trailRefs.current[index] = el}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 9999,
              opacity: opacity,
              filter: `blur(${Math.min(index * 0.8, 3)}px)`, // Add subtle blur to tail
              willChange: 'transform',
              top: 0,
              left: 0,
            }}
          />
        );
      })}
    </>
  );
};


// --- MAIN COMPONENTS ---

const Section = ({ id, title, children }) => {
  const { ref, isInView } = useInViewAnimation(0.2);

  return (
    <section id={id} ref={ref} className="py-24 px-4 sm:px-8 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Animated Section Title (Slide-Right effect on title) */}
        <h2
          className={`text-4xl sm:text-5xl font-extrabold mb-12 text-center text-purple-600 dark:text-purple-400 border-b-4 border-purple-200 dark:border-purple-700 pb-3 inline-block mx-auto 
            ${getAOSClass(isInView, 0, 'slide-right')}`}
        >
          {title}
        </h2>

        {/* Children content will use isInView for individual item animation */}
        {children(isInView)}
      </div>
    </section>
  );
};

// Project Detail Modal (No changes, kept for completeness)
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-full transition-colors"
          aria-label="Close Project Details"
        >
          <X size={24} />
        </button>

        <img
          src={project.image}
          alt={project.name}
          className="w-full h-64 object-cover rounded-t-2xl"
        />

        <div className="p-8">
          <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">{project.name}</h3>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            {/* Tech Stack */}
            <div>
              <p className="font-semibold text-lg text-pink-500 dark:text-pink-300 flex items-center mb-2"><Code className="w-5 h-5 mr-2" /> Main Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-100 text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-semibold text-lg text-pink-500 dark:text-pink-300 flex items-center mb-2"><LayoutList className="w-5 h-5 mr-2" /> Brief Description</p>
              <p>{project.description}</p>
            </div>

            {/* Challenges */}
            <div>
              <p className="font-semibold text-lg text-pink-500 dark:text-pink-300 flex items-center mb-2"><Zap className="w-5 h-5 mr-2" /> Challenges Faced</p>
              <p>{project.challenges}</p>
            </div>

            {/* Future Plans */}
            <div>
              <p className="font-semibold text-lg text-pink-500 dark:text-pink-300 flex items-center mb-2"><Star className="w-5 h-5 mr-2" /> Potential Improvements & Future Plans</p>
              <p>{project.futurePlans}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md shadow-purple-500/50"
            >
              Live Project Link
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- APP COMPONENT ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Trailing Cursor
  const CursorTrail = useTrailingCursor(isDarkMode);

  

  // Set dark class on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to section and close menu (for mobile)
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // --- RENDER SECTIONS ---

  // Navbar 
  const Navbar = () => {
    const navItems = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About Me' },
      { id: 'skills', label: 'Skills' },
      { id: 'education', label: 'Education' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ];

    const NavLink = ({ id, label }) => (
      <button
        onClick={() => scrollToSection(id)}
        className="px-3 py-2 rounded-lg font-medium transition-colors duration-300  dark:hover:bg-blue-700  dark:hover:text-purple-400"
      >
        {label}
      </button>
    );

    return (
      <header className="fixed top-0  z-40 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              PAVAN.DEV
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-2">
              {navItems.map(item => <NavLink key={item.id} {...item} />)}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute w-full bg-white dark:bg-gray-800 border-t border-purple-200 dark:border-purple-800 shadow-xl">
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${activeSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    );
  };

  const HeroSection = () => {
    // Uses CSS keyframes for initial mount animation (similar to previous version)
    return (
      <section id="home" className="py-24 px-4 sm:px-8 lg:px-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">

            <div className="lg:w-1/2 space-y-6 order-2 lg:order-1">
              {/* Animation 1: Name */}
              <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight transition-all duration-700 ease-out transform delay-100 opacity-0 translate-y-4 animate-on-mount">
                Hi, I'm <br /> <span className="text-purple-600 dark:text-purple-400">{PORTFOLIO_DATA.name}</span>
              </h1>
              {/* Animation 2: Designation */}
              <p className="text-2xl sm:text-3xl font-medium text-pink-500 dark:text-pink-300 tracking-wide transition-all duration-700 ease-out transform delay-200 opacity-0 translate-y-4 animate-on-mount">
                {PORTFOLIO_DATA.designation}
              </p>
              {/* Animation 3: Description */}
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg lg:max-w-none mx-auto lg:mx-0 transition-all duration-700 ease-out transform delay-300 opacity-0 translate-y-4 animate-on-mount">
                I turn creative ideas into robust, high-performance web applications. Let's build something amazing together.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                {/* 3. Resume Download Button - Animation 4 */}
                <a
                  href={getGoogleDocsDownloadUrl(PORTFOLIO_DATA.resumeLink)}
                  download="Homayra_Binte_Harun_Heme_Resume.pdf"
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-xl shadow-purple-500/50 transform hover:scale-105 delay-400 opacity-0 animate-on-mount"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>

                {/* 4. Social Links - Grouped for mobile alignment */}
                <div className="flex items-center gap-4">
                  {PORTFOLIO_DATA.socials.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-full transition duration-300 dark:text-purple-400 dark:border-purple-400 opacity-0 animate-on-mount`}
                      style={{ animationDelay: `${450 + index * 100}ms` }} // Use animation-delay
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Professional Photo - Animation 6 (Scale-in effect) */}
            <div className="lg:w-1/3 mt-12 lg:mt-0 order-1 lg:order-2 transition-all duration-700 ease-out transform delay-700 opacity-0 scale-75 animate-on-mount-scale">
              <div className="relative p-4 bg-purple-200 dark:bg-purple-900 rounded-full shadow-2xl shadow-purple-500/50">
                <img
                  src={PORTFOLIO_DATA.photoUrl}
                  alt="Professional Profile"
                  className="w-full h-auto rounded-full object-cover border-8 border-white dark:border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Hero Mount  CSS */}
        <style>{`
          /* Custom CSS for Hero Mount Animation */
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.75);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-on-mount {
            animation-name: slideInUp;
            animation-fill-mode: forwards;
            animation-duration: 0.7s;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* ease-out-quad */
            opacity: 0; /* Ensure initial state is hidden */
          }

          .animate-on-mount-scale {
            animation-name: scaleIn;
            animation-fill-mode: forwards;
            animation-duration: 0.9s;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            animation-delay: 0.7s;
            opacity: 0; /* Ensure initial state is hidden */
          }

          /* Assigning delay via style prop */
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
        `}</style>
      </section>
    );
  };

  const AboutMeSection = () => (
    <Section id="about" title="About My Journey">
      {(isInView) => (
        <div
          className={`bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900 
            ${getAOSClass(isInView, 0, 'slide-left')}`}
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
            {PORTFOLIO_DATA.about.intro}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed border-l-4 border-purple-600 pl-4 italic">
            <span className="font-semibold text-purple-600 dark:text-purple-400">My Programming Journey:</span> {PORTFOLIO_DATA.about.journey}
          </p>
          <p className="mt-6 text-xl font-bold text-pink-500 dark:text-pink-300 flex items-center">
            Ready to collaborate! <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 hover:translate-x-1" />
          </p>
        </div>
      )}
    </Section>
  );

  const SkillsSection = () => (
    <Section id="skills" title="Technical Skills">
      {(isInView) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-t-4 border-purple-600 dark:border-purple-400 transform hover:scale-[1.02] transition-all duration-700 ease-out 
                ${getAOSClass(isInView, index, 'rotate-in')}`}
              style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
            >
              <div className="flex items-center mb-4">
                <skillGroup.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {skillGroup.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {skillGroup.list.map((skill) => (
                  <li key={skill} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  );

  const EducationSection = () => (
    <Section id="education" title="Educational Qualification">
      {(isInView) => (
        <div className="relative space-y-8 md:space-y-12">
          {PORTFOLIO_DATA.education.map((edu, index) => (
            <div key={index} className="flex flex-col md:flex-row relative">
              {/* Timeline Connector (Visible on desktop) */}
              <div className={`hidden md:block absolute left-0 top-0 w-1 h-full bg-purple-300 dark:bg-purple-700 ${index === PORTFOLIO_DATA.education.length - 1 ? 'h-1/2' : ''}`}></div>

              <div
                className={`md:w-1/12 flex justify-center relative z-10 
                  ${getAOSClass(isInView, index, 'scale-in')}`}
                style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
              >
                <div className="w-8 h-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center shadow-md">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
              </div>

              <div
                className={`md:w-11/12 pl-0 md:pl-12 pt-4 md:pt-0 
                  ${getAOSClass(isInView, index, 'slide-up')}`}
                style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900">
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{edu.degree}</h3>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">{edu.institution}</p>
                  <p className="text-sm font-semibold text-pink-500 dark:text-pink-300 mb-1">{edu.period}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );

  const ExperienceSection = () => (
    <Section id="experience" title="Professional Experience">
      {(isInView) => (
        <div className="relative space-y-8 md:space-y-12">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row relative">
              {/* Timeline Connector (Visible on desktop) */}
              <div className={`hidden md:block absolute left-0 top-0 w-1 h-full bg-purple-300 dark:bg-purple-700 ${index === PORTFOLIO_DATA.experience.length - 1 ? 'h-1/2' : ''}`}></div>

              <div
                className={`md:w-1/12 flex justify-center relative z-10 
                  ${getAOSClass(isInView, index, 'slide-left')}`}
                style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
              >
                <div className="w-8 h-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center shadow-md">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
              </div>

              <div
                className={`md:w-11/12 pl-0 md:pl-12 pt-4 md:pt-0 
                  ${getAOSClass(isInView, index, 'slide-right')}`}
                style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900">
                  <p className="text-sm font-semibold text-pink-500 dark:text-pink-300 mb-1">{exp.period}</p>
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{exp.title}</h3>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">{exp.company}</p>
                  <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );

  const ProjectsSection = () => (
    <Section id="projects" title="Featured Projects">
      {(isInView) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group border border-purple-100 dark:border-purple-900 transform hover:scale-[1.03] transition-all duration-700 ease-out 
                ${getAOSClass(isInView, index, 'slide-up')}`}
              style={{ transitionDelay: isInView ? `${300 + index * 200}ms` : '0ms' }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg transition duration-300 shadow-md shadow-pink-500/50"
                >
                  View More / Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );

 const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
    };

    return (
      <Section id="contact" title="Get In Touch">
        {(isInView) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div
              className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900 
              ${getAOSClass(isInView, 0, 'slide-left')}`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">Contact Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Have a project in mind or just want to say hello? Feel free to reach out to me! I'm always open to new opportunities and collaborations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <a href="heme5674@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    pavankumarcoder@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <a href="tel:+8801878654211" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    +91 7013458509
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Connect with me:</h4>
                <div className="flex space-x-4">
                  {PORTFOLIO_DATA.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-full transition duration-300 dark:text-pink-300 dark:border-pink-300 transform hover:scale-110"
                      aria-label={`Connect on ${social.name}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900 
              ${getAOSClass(isInView, 1, 'slide-right')}`}
              style={{ transitionDelay: '500ms' }}
            >
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">Send Me a Message</h3>

              <form  onSubmit={handleSubmit}  className="space-y-4" action="https://submit-form.com/YnF5LE1Oh">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg shadow-purple-500/50"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </Section>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-8 lg:px-16 border-t border-purple-200 dark:border-purple-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Naga Venkata Pavan Kumar. All rights reserved. | Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans`}>

      {/* Custom Cursor Trail (Always rendered) */}
      {CursorTrail}

      <Navbar />

      <main>
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default App;
