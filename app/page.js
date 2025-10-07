"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

// 3D Spinning Logo
function SpinningLogo() {
  return (
    <mesh rotation={[0.6, 0.8, 0.2]}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshStandardMaterial roughness={0.2} metalness={0.6} />
    </mesh>
  );
}

function Hero3D({ className = "h-72 w-full" }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Suspense fallback={null}>
          <SpinningLogo />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [selected, setSelected] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactMsg, setContactMsg] = useState("");

  // Dark mode persistence
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const allProjects = [
    {
      id: "blog",
      title: "Blog App",
      category: "Web App",
      thumbnail: "/images/placeholder.png",
      description: "A full-featured blog application with posts, comments, and rich-text editing.",
      demo: "https://blog-app-indol-theta.vercel.app/",
      repo: "https://github.com/ezrani-a/blog-app",
      lottie: "/animations/blog.json",
    },
    {
      id: "saas",
      title: "SaaS Landing",
      category: "Landing",
      thumbnail: "/images/Screenshot 1.png",
      description: "Marketing landing page with animations, pricing, and lead capture.",
      demo: "https://saas-landing-c1kc.vercel.app/",
      repo: "https://github.com/ezrani-a/saas-landing",
      lottie: "/animations/saas.json",
    },
    {
      id: "dashboard",
      title: "E‑commerce Dashboard",
      category: "Dashboard",
      thumbnail: "/images/Screenshot.png",
      description: "Admin dashboard with charts, tables, and user management.",
      demo: "https://my-ecommerce-dashboard1.vercel.app/",
      repo: "https://github.com/ezrani-a/ecommerce-dashboard",
      lottie: "/animations/dashboard.json",
    },
  ];

  const categories = useMemo(() => ["All", ...new Set(allProjects.map((p) => p.category))], []);
  const [filter, setFilter] = useState("All");
  const filtered = allProjects.filter((p) => filter === "All" || p.category === filter);

  // Contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      setContactMsg(data.message || data.error);
      setContactForm({ name: "", email: "", message: "" });
    } catch (err) {
      setContactMsg("Something went wrong!");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Background Gradient + Floating Blobs */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-pink-500 dark:bg-pink-700 rounded-full opacity-40 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-72 h-72 bg-purple-500 dark:bg-purple-700 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-32 left-1/3 w-60 h-60 bg-blue-400 dark:bg-blue-700 rounded-full opacity-35 blur-3xl"
        animate={{ y: [0, 25, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="min-h-screen text-slate-900 dark:text-white antialiased bg-white dark:bg-slate-900 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Ezra Atsikelewi</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Full‑stack developer — Next.js & interactive experiences
              </p>
            </div>
            <nav className="flex items-center gap-4">
              {["Work", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.2, color: "#f0f" }}
                  className="text-sm hover:underline transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/ezrani-a"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-sm underline"
              >
                GitHub
              </motion.a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-2 text-sm border px-2 py-1 rounded"
              >
                {darkMode ? "Light" : "Dark"}
              </button>
            </nav>
</header>
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold leading-tight"
              >
                Hi — I’m Ezra.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-4 text-lg text-gray-700 dark:text-gray-300"
              >
                I build fast web apps, love UI animations, and experiment with 3D visuals.
              </motion.p>
            </div>
            <div className="order-first md:order-last">
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-lg">
                <Hero3D className="h-64 w-full rounded-lg overflow-hidden" />
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold">Selected Projects</h3>
            <div className="mt-4 flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1 rounded-full border ${filter === c ? "bg-slate-900 text-white" : "bg-white dark:bg-slate-700 dark:text-gray-200"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <motion.div
              className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ translateY: -6, scale: 1.02 }}
                  className="relative rounded-lg overflow-hidden border bg-white dark:bg-slate-800 p-0 shadow-sm cursor-pointer"
                  onClick={() => setSelected(p)}
                >
                  <div className="h-44 flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-700">
                    {p.lottie ? (
                      <Lottie animationData={require(`../public${p.lottie}`)} loop={true} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={p.thumbnail} alt={p.title} width={500} height={300} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Project Modal */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden max-w-3xl w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{selected.title}</h3>
                    <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">×</button>
                  </div>
                  <div className="mt-4">
                    <iframe src={selected.demo} className="w-full h-64 rounded-lg border" title="Project Demo"></iframe>
                    <p className="mt-4">{selected.description}</p>
                    <div className="mt-4 flex gap-2">
                      <a href={selected.demo} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded text-sm hover:scale-105 transition">Live Demo</a>
                      <a href={selected.repo} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded text-sm hover:scale-105 transition">Source</a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* About Section */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 grid md:grid-cols-3 gap-8 items-center"
          >
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <Image src="/images/ai.jpg" alt="Ezra Atsikelewi" width={200} height={200} className="rounded-full shadow-lg" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold">About Me</h3>
              <p className="text-gray-700 dark:text-gray-300">
                I am a full-stack developer specializing in Next.js, interactive UI, and 3D visualizations. I enjoy creating web applications that are fast, visually appealing, and engaging.
              </p>
              <a href="/resume.pdf" className="inline-block px-4 py-2 bg-slate-900 text-white rounded shadow hover:scale-105 transition">Download Resume</a>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold">Contact Me</h3>
            <form className="mt-4 space-y-3 max-w-md" onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700"
              />
              <textarea
                placeholder="Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700"
              />
              <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded hover:scale-105 transition">Send Message</button>
            </form>
            {contactMsg && <p className="mt-2 text-sm text-green-500">{contactMsg}</p>}
            <div className="mt-4 flex gap-4">
              <a href="https://github.com/ezrani-a" target="_blank" rel="noreferrer" className="hover:scale-110 transition">GitHub</a>
              <a href="https://web.facebook.com/profile.php?id=100090773921541" target="_blank" rel="noreferrer" className="hover:scale-110 transition">Facebook</a>
              <a href="mailto:atsikelawie@gmail.com" className="hover:scale-110 transition">Email</a>
            </div>
          </motion.section>

          {/* Back-to-top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
