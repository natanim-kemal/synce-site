'use client';

import { useState, useEffect } from 'react';
import { Download, Zap, Shield, Smartphone, ChevronDown } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'features', label: 'FEATURES' },
  { id: 'how-it-works', label: 'HOW IT WORKS', hasDropdown: false }, // Removed dropdown since there's no nested content
  { id: 'download', label: 'DOWNLOAD' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return;

      const sections = TABS.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveTab(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroSection = () => (
    <section id="home" className="min-h-[100svh] flex items-center justify-center px-6 snap-start pt-16 md:pt-0">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          PDF Sync Made Simple
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-sm md:max-w-2xl mx-auto">
          Seamless PDF synchronization across all your devices.
          Built with maximum performance and reliability.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              setActiveTab('download');
              if (window.innerWidth < 768) {
                const el = document.getElementById('download');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/20"
          >
            <Download className="w-5 h-5" />
            Download Now
          </button>
          <button
            onClick={() => {
              setActiveTab('features');
              if (window.innerWidth < 768) {
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section id="features" className="min-h-[100svh] flex items-center justify-center py-20 px-6 snap-start pt-16 md:pt-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-neutral-300 leading-relaxed">
              Optimized synchronization protocol for maximum transfer speeds.
              Your PDFs sync instantly across all devices.
            </p>
          </div>

          <div className="group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
            <p className="text-neutral-300 leading-relaxed">
              End-to-end encryption ensures your documents stay private.
              Your data is secure with enterprise-grade protection.
            </p>
          </div>

          <div className="group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cross-Platform</h3>
            <p className="text-neutral-300 leading-relaxed">
              Native apps for Android and Windows.
              Access your PDFs on mobile and desktop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const HowItWorksSection = () => (
    <section id="how-it-works" className="min-h-[100svh] flex items-center justify-center py-20 px-6 snap-start pt-16 md:pt-0">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Download & Install</h3>
              <p className="text-neutral-300 leading-relaxed">
                Download Synce for your platform and install it. Create an account
                or sign in to get started.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Add Your PDFs</h3>
              <p className="text-neutral-300 leading-relaxed">
                Drag and drop your PDF files into Synce. They'll be automatically
                uploaded and synced to the cloud.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
              <p className="text-neutral-300 leading-relaxed">
                Open Synce on any of your devices. Your PDFs are always up-to-date
                and available offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const DownloadSection = () => (
    <section id="download" className="min-h-[100svh] flex items-center justify-center py-20 px-6 snap-start pt-16 md:pt-0 pb-24 md:pb-0">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Download Synce
        </h2>
        <p className="text-neutral-300 mb-12">
          Available for Android and Windows. Choose your platform below.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <a
            href="#"
            className="flex items-center justify-center gap-3 p-6 rounded-xl border border-white/20 hover:bg-white/5 transition-all backdrop-blur-sm group"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Windows</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-center gap-3 p-6 rounded-xl border border-white/20 hover:bg-white/5 transition-all backdrop-blur-sm group"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Android</span>
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <main className="h-screen md:overflow-hidden bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#333] bg-black/80 md:h-20 transition-all">
        <div className="md:hidden flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src="/synce.png" alt="Synce Logo" className="w-8 h-8 rounded-lg" />
            Synce
          </h1>
          <a
            href="https://github.com/natanim-kemal/synce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Desktop View - New Tab Structure */}
        <div className="hidden md:flex flex-row items-center justify-between h-full max-w-[1400px] mx-auto w-full">
          <div className="px-8 h-full shrink-0 flex items-center justify-between border-b border-[#333] md:border-b-0">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <img src="/synce.png" alt="Synce Logo" className="w-10 h-10 rounded-lg" />
              Synce
            </h2>
          </div>

          <div className="flex overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:border-l border-[#333] h-full">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`relative flex items-center whitespace-nowrap px-10 h-full text-xs font-bold tracking-widest border-r border-[#333] transition-colors ${activeTab === tab.id
                  ? 'text-blue-500'
                  : 'text-neutral-500 hover:text-neutral-300'
                  }`}
              >
                {tab.label}
                {tab.hasDropdown && <ChevronDown className="inline w-4 h-4 ml-2 opacity-70" />}

                {/* Active Tab Underline */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="hidden md:block h-full pt-[53px] pb-[60px] relative">
        <div className="absolute inset-x-0 inset-y-[53px] bottom-[60px] overflow-hidden">
          {activeTab === 'home' && <HeroSection />}
          {activeTab === 'features' && <FeaturesSection />}
          {activeTab === 'how-it-works' && <HowItWorksSection />}
          {activeTab === 'download' && <DownloadSection />}
        </div>
      </div>

      <div className="block md:hidden h-full overflow-y-auto snap-y snap-mandatory scroll-smooth pt-[53px]">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DownloadSection />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 border-t border-[#333] bg-black/80 backdrop-blur-xl z-50 text-center text-neutral-500 text-xs tracking-wider">
        <div className="max-w-6xl mx-auto">
          © 2025 SYNCE. BUILT WITH FLUTTER & NESTJS.
        </div>
      </footer>
    </main>
  );
}
