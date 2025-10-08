"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSun, FaMoon, FaGithub, FaExternalLinkAlt, FaCode, 
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload,
  FaLinkedin, FaTwitter, FaHeart, FaRocket, FaStar,
  FaArrowRight, FaCalendarAlt, FaGlobe
} from "react-icons/fa";

// Projects data
const PROJECTS = [
  {
    id: "blog",
    title: "Blog App",
    thumbnail: "/images/placeholder.png",
    description:
      "A full-featured blog application with posts, rich-text editing, comments, and a clean responsive UI.",
    demo: "https://blog-app-indol-theta.vercel.app/",
    repo: "https://github.com/ezrani-a/blog-appp",
    tech: ["Next.js", "Tailwind CSS", "Markdown", "Vercel"],
  },
  {
    id: "saas",
    title: "SaaS Landing",
    thumbnail: "/images/Screenshot1.png",
    description:
      "Marketing-focused SaaS landing page with animated hero, pricing, and lead capture. Built for performance and accessibility.",
    demo: "https://saas-landing-c1kc.vercel.app/",
    repo: "https://github.com/ezrani-a/saas-landing",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "dashboard",
    title: "E-commerce Dashboard",
    thumbnail: "/images/Screenshot.png",
    description:
      "Admin dashboard with charts, filters, and user management — focuses on clarity and data visualization.",
    demo: "https://my-ecommerce-dashboard1.vercel.app/",
    repo: "https://github.com/ezrani-a/ecommerce-dashboard",
    tech: ["Next.js", "Chart.js", "Tailwind CSS"],
  },
];

// Skills data
const SKILLS = [
  { name: "Next.js", level: 90, icon: "⚡" },
  { name: "React", level: 85, icon: "🔧" },
  { name: "TypeScript", level: 80, icon: "📘" },
  { name: "Tailwind CSS", level: 95, icon: "🎨" },
  { name: "Node.js", level: 75, icon: "🚀" },
  { name: "Flutter", level: 70, icon: "📱" },
  { name: "MongoDB", level: 65, icon: "🗄️" },
  { name: "Firebase", level: 75, icon: "🔥" },
];

// Animated text variants
const textVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerText = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Typewriter effect component
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Custom Particles Component
const CustomParticles = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const createParticles = () => {
      const particles = [];
      const count = 60;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: darkMode ? '#c4b5fd' : '#4f46e5',
          opacity: Math.random() * 0.2 + 0.1
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
        
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = darkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)';
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// CV Download Function
const downloadCV = () => {
  const cvContent = `
EZRA ATSIKELEWI
Full Stack Developer

CONTACT INFORMATION
Email: atsikelewie@gmail.com
Phone: +251 96 865 0365
Location: Jimma, Ethiopia
GitHub: github.com/ezrani-a
LinkedIn: linkedin.com/in/ezra-atsikelewi

PROFESSIONAL SUMMARY
Experienced Full Stack Developer specializing in modern web technologies including Next.js, React, TypeScript, and Flutter. Passionate about creating responsive, performant web applications with excellent user experiences. Strong background in both frontend and backend development with a focus on clean code and best practices.

TECHNICAL SKILLS
• Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
• Backend: Node.js, Express, MongoDB, Firebase
• Mobile: Flutter, Dart
• Tools: Git, Vercel, Chart.js, Markdown
• Languages: JavaScript, TypeScript, Dart, HTML5, CSS3

PROJECT EXPERIENCE

Blog Application
• Developed a full-featured blog with rich-text editing and comments
• Technologies: Next.js, Tailwind CSS, Markdown, Vercel
• Features: Responsive design, SEO optimized, modern UI

SaaS Landing Page
• Created a marketing-focused landing page with animations
• Technologies: Next.js, Framer Motion, Tailwind CSS
• Features: Animated hero section, pricing tables, lead capture

E-commerce Dashboard
• Built an admin dashboard with data visualization
• Technologies: Next.js, Chart.js, Tailwind CSS
• Features: Charts, filters, user management system

EDUCATION
[Your Degree/Education Information]
[University/School Name]
[Year of Graduation]

CERTIFICATIONS
[Any relevant certifications]

LANGUAGES
• English: Fluent
• Amharic: Native

AVAILABILITY
Available for full-time positions, freelance projects, and collaborations.

REFERENCES
Available upon request.
  `;

  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Ezra_Atsikelewi_CV.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const containerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "contact"];
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const projects = useMemo(() => PROJECTS, []);

  return (
    <div className={darkMode ? "dark" : ""} ref={containerRef}>
      {/* Enhanced 3D Background - Fixed CSS Error */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Separate background and animation layers */}
        <div 
          className="absolute inset-0"
          style={{
            background: darkMode
              ? "linear-gradient(45deg, #0f172a, #1e1b4b, #2e1065, #831843, #0f172a)"
              : "linear-gradient(45deg, #e0e7ff, #faf5ff, #e0f2fe, #fce7f3, #e0e7ff)",
            backgroundSize: "400% 400%",
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "linear"
          }}
          style={{
            background: darkMode
              ? "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent)"
              : "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent)",
            backgroundSize: "400% 400%",
          }}
        />
        
        {/* Floating 3D Shapes */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-soft-light"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 2,
              }}
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                background: darkMode 
                  ? `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`
                  : `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                filter: "blur(20px)",
              }}
            />
          ))}
        </div>

        <CustomParticles darkMode={darkMode} />
      </div>

      <main className={`min-h-screen relative z-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
        {/* Enhanced Header with Navigation */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
                Ezra Atsikelewi
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Full Stack Developer</p>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-8">
              {["home", "projects", "skills", "contact"].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize font-medium transition-all duration-300 ${
                    activeSection === section
                      ? "text-purple-500 scale-110"
                      : "text-gray-600 dark:text-gray-300 hover:text-purple-400"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://github.com/ezrani-a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://linkedin.com/in/ezra-atsikelewi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaLinkedin />
                </motion.a>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode((s) => !s)}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Enhanced Hero Section with Animated Text */}
        <section id="home" className="max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerText}
            className="flex flex-col items-center"
          >
            {/* Profile Photo */}
            <motion.div
              variants={textVariants}
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-purple-400 to-pink-500">
                <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                  EA
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow" 
                   style={{ margin: '-4px' }} />
            </motion.div>

            {/* Animated Main Heading */}
            <motion.div
              variants={textVariants}
              className="mb-6"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-black leading-tight mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I&apos;m{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-gradient">
                  <TypewriterText text="Ezra Atsikelewi" delay={1000} />
                </span>
              </motion.h1>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.div
              variants={textVariants}
              className="mb-8"
            >
              <motion.p
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                I{" "}
                <motion.span
                  animate={{ 
                    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="font-bold"
                >
                  create
                </motion.span>{" "}
                digital experiences using{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                  Next.js
                </span>{" "}
                and{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Flutter
                </span>
              </motion.p>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              variants={textVariants}
              className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto"
            >
              {[
                { number: "2+", label: "Years Experience", icon: <FaCalendarAlt /> },
                { number: "15+", label: "Projects Done", icon: <FaRocket /> },
                { number: "5+", label: "Happy Clients", icon: <FaHeart /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <motion.div
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1.2 + index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    {stat.icon}
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated CTA Buttons */}
            <motion.div
              variants={textVariants}
              className="flex gap-4 justify-center flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:shadow-3xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 group"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                <FaCode />
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl font-bold bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
                onClick={downloadCV}
              >
                <FaDownload />
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-16 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                My Skills
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-purple-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Featured Projects
            </motion.span>
          </motion.h2>
          
          <motion.div
            variants={staggerText}
            initial="hidden"
            whileInView="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((p, index) => (
              <motion.article
                key={p.id}
                variants={textVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8, 
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-white/20 cursor-pointer transform-style-preserve-3d"
                onClick={() => setSelectedProject(p)}
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x / 20}deg) rotateX(${-mousePosition.y / 20}deg)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500">
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                    <FaGlobe />
                  </div>
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <FaStar className="text-yellow-400" />
                  </motion.div>
                </div>
                
                <div className="p-6 relative">
                  <motion.h3
                    className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {p.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {p.description}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {p.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + techIndex * 0.1 + 0.4 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-4 py-2 text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Demo
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaGithub />
                      Code
                    </motion.a>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(192, 132, 252, 0.5)",
                  "0 0 30px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(192, 132, 252, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Let&apos;s Connect
            </motion.span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h3
                className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Get in Touch
              </motion.h3>
              
              <div className="space-y-4">
                {[
                  { icon: FaEnvelope, text: "atsikelewie@gmail.com", label: "Email" },
                  { icon: FaMapMarkerAlt, text: "Jimma, Ethiopia", label: "Location" },
                  { icon: FaPhone, text: "+251 96 865 0365", label: "Phone" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/30 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div 
                      className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                      <p className="text-gray-800 dark:text-white font-semibold">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Why work with me?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  I specialize in creating modern, performant web applications with great user experiences. 
                  Let&apos;s bring your ideas to life!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const data = {
                  name: form.name.value,
                  email: form.email.value,
                  message: form.message.value,
                };
                alert("Message sent! I&apos;ll get back to you soon.");
                form.reset();
              }}
              className="space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(192, 132, 252, 0.3)" }}
                    name="name"
                    placeholder="Tedy Smith"
                    required
                    className="w-full p-4 rounded-2xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg focus:shadow-2xl focus:border-purple-400 transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}
                    name="email"
                    type="email"
                    placeholder="tedy@example.com"
                    required
                    className="w-full p-4 rounded-2xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg focus:shadow-2xl focus:border-purple-400 transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message *
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="w-full p-4 rounded-2xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg focus:shadow-2xl focus:border-purple-400 transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:shadow-3xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 text-lg relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>

        {/* Enhanced Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-12 text-center"
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Ezra Atsikelewi
              </span>
              <motion.p
                className="text-gray-600 dark:text-gray-400 mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Crafting digital experiences with modern technologies
              </motion.p>
            </motion.div>
            <motion.div
              className="text-sm text-gray-500 dark:text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()} Ezra Atsikelewi — Built with Next.js & Tailwind CSS
            </motion.div>
          </div>
        </motion.footer>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform-style-preserve-3d"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x / 50}deg) rotateX(${-mousePosition.y / 50}deg)`
              }}
            >
              <div className="relative h-72 w-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-6xl">
                <FaRocket />
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.tech.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-700 dark:text-purple-300 border border-purple-500/50 font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-8 py-4 text-center text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl hover:shadow-3xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedProject.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-8 py-4 text-center text-gray-700 dark:text-gray-300 font-bold bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaGithub />
                    Source Code
                  </motion.a>
                </div>
              </div>
              
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-3 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <FaArrowRight className="rotate-[-90deg]" />
      </motion.button>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
