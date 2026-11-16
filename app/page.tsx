'use client';

import { useState, useEffect } from 'react';
import { Download, Zap, Shield, Smartphone, ChevronDown, Github, Sun, Moon } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'features', label: 'FEATURES' },
  { id: 'how-it-works', label: 'HOW IT WORKS', hasDropdown: false },
  { id: 'download', label: 'DOWNLOAD' }
];

const RELEASES_URL = 'https://github.com/natanim-kemal/synce/releases/latest';

type Downloads = { windows: string; android: string; version: string | null };

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('synce-theme', next);
}

function ThemeToggle() {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="inline-flex items-center justify-center p-1 text-ink hover:text-brand transition-colors"
    >
      <Moon className="w-4 h-4 dark:hidden" />
      <Sun className="w-4 h-4 hidden dark:block" />
    </button>
  );
}

function HeroSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section id="home" className="min-h-[100svh] flex items-center justify-center px-6 pt-16 md:pt-0">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-heading-from to-heading-to bg-clip-text text-transparent">
          PDF Sync Made Simple
        </h1>
        <p className="text-lg md:text-xl text-muted mb-12 max-w-sm md:max-w-2xl mx-auto">
          Seamless PDF synchronization across all your devices.
          Built with maximum performance and reliability.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('download')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-btn-bg text-btn-fg font-semibold rounded-full hover:scale-105 transition-transform shadow-lg shadow-btn-shadow"
          >
            <Download className="w-5 h-5" />
            Download Now
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="inline-flex items-center gap-2 px-8 py-4 border border-line text-ink font-semibold rounded-full hover:bg-fill-hover transition-all backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="min-h-[100svh] flex items-center justify-center py-20 px-6 pt-16 md:pt-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl border border-line-soft hover:border-line transition-all hover:bg-fill-hover backdrop-blur-sm shadow-[var(--card-shadow)]">
            <div className="w-12 h-12 mb-6 rounded-full bg-fill flex items-center justify-center">
              <Zap className="w-6 h-6 text-ink" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-muted leading-relaxed">
              Optimized synchronization protocol for maximum transfer speeds.
              Your PDFs sync instantly across all devices.
            </p>
          </div>

          <div className="group p-8 rounded-2xl border border-line-soft hover:border-line transition-all hover:bg-fill-hover backdrop-blur-sm shadow-[var(--card-shadow)]">
            <div className="w-12 h-12 mb-6 rounded-full bg-fill flex items-center justify-center">
              <Shield className="w-6 h-6 text-ink" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure &amp; Private</h3>
            <p className="text-muted leading-relaxed">
              Encrypted in transit over TLS and at rest in AWS S3.
              Only devices signed into your account can fetch your documents.
            </p>
          </div>

          <div className="group p-8 rounded-2xl border border-line-soft hover:border-line transition-all hover:bg-fill-hover backdrop-blur-sm shadow-[var(--card-shadow)]">
            <div className="w-12 h-12 mb-6 rounded-full bg-fill flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-ink" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cross-Platform</h3>
            <p className="text-muted leading-relaxed">
              Native apps for Android and Windows.
              Access your PDFs on mobile and desktop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="min-h-[100svh] flex items-center justify-center py-20 px-6 pt-16 md:pt-0">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-fill flex items-center justify-center shrink-0 font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Download &amp; Install</h3>
              <p className="text-muted leading-relaxed">
                Download Synce for your platform and install it. Create an account
                or sign in to get started.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-fill flex items-center justify-center shrink-0 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Add Your PDFs</h3>
              <p className="text-muted leading-relaxed">
                Drag and drop your PDF files into Synce. They&apos;ll be automatically
                uploaded and synced to the cloud.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-fill flex items-center justify-center shrink-0 font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
              <p className="text-muted leading-relaxed">
                Open Synce on any of your devices. Your PDFs are always up-to-date
                and available offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadSection({ downloads }: { downloads: Downloads }) {
  return (
    <section id="download" className="min-h-[100svh] flex items-center justify-center py-20 px-6 pt-16 md:pt-0 pb-24 md:pb-0">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Download Synce
        </h2>
        <p className="text-muted mb-12">
          Available for Android and Windows. Choose your platform below.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <a
            href={downloads.windows || RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-6 rounded-xl border border-line hover:bg-fill-hover transition-all backdrop-blur-sm shadow-[var(--card-shadow)] group"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Windows</span>
          </a>

          <a
            href={downloads.android || RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-6 rounded-xl border border-line hover:bg-fill-hover transition-all backdrop-blur-sm shadow-[var(--card-shadow)] group"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Android</span>
          </a>
        </div>

        <p className="mt-6 text-sm text-faint">
          {downloads.version ? `Latest release ${downloads.version}` : 'Releases are published on GitHub'}
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [downloads, setDownloads] = useState<Downloads>({ windows: '', android: '', version: null });

  useEffect(() => {
    fetch('https://api.github.com/repos/natanim-kemal/synce/releases/latest')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('no release'))))
      .then((release) => {
        const assets: { name: string; browser_download_url: string }[] = release.assets ?? [];
        const find = (pattern: RegExp) => assets.find((asset) => pattern.test(asset.name))?.browser_download_url ?? '';
        setDownloads({
          windows: find(/windows.*\.(exe|zip)$/i),
          android: find(/android.*arm64.*\.apk$/i) || find(/android.*\.apk$/i),
          version: release.tag_name ?? null,
        });
      })
      .catch(() => setDownloads({ windows: '', android: '', version: null }));
  }, []);

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

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 768) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="h-screen md:overflow-hidden bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-line bg-chrome md:h-20 transition-all">
        <div className="md:hidden flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src="/synce.png" alt="Synce Logo" className="w-8 h-8 rounded-lg" />
            Synce
          </h1>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/natanim-kemal/synce"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Synce on GitHub"
              title="Synce on GitHub"
              className="text-subtle hover:text-ink transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="hidden md:flex flex-row items-center justify-between h-full max-w-[1400px] mx-auto w-full">
          <div className="px-8 h-full shrink-0 flex items-center justify-between gap-8 border-b border-line md:border-b-0">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <img src="/synce.png" alt="Synce Logo" className="w-10 h-10 rounded-lg" />
              Synce
            </h2>
            <ThemeToggle />
          </div>

          <div className="flex overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:border-l border-line h-full">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center whitespace-nowrap px-10 h-full text-xs font-bold tracking-widest border-r border-line transition-colors ${activeTab === tab.id
                  ? 'text-brand'
                  : 'text-faint hover:text-muted'
                  }`}
              >
                {tab.label}
                {tab.hasDropdown && <ChevronDown className="inline w-4 h-4 ml-2 opacity-70" />}

                {activeTab === tab.id && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-ink" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="hidden md:block h-full pt-[53px] pb-[60px] relative">
        <div className="absolute inset-x-0 inset-y-[53px] bottom-[60px] overflow-hidden">
          {activeTab === 'home' && <HeroSection onNavigate={handleNavigate} />}
          {activeTab === 'features' && <FeaturesSection />}
          {activeTab === 'how-it-works' && <HowItWorksSection />}
          {activeTab === 'download' && <DownloadSection downloads={downloads} />}
        </div>
      </div>

      <div className="block md:hidden h-full overflow-y-auto scroll-smooth pt-[53px]">
        <HeroSection onNavigate={handleNavigate} />
        <FeaturesSection />
        <HowItWorksSection />
        <DownloadSection downloads={downloads} />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 border-t border-line bg-chrome backdrop-blur-xl z-50 text-center text-faint text-xs tracking-wider">
        <div className="max-w-6xl mx-auto">
          © 2026 SYNCE. BUILT WITH FLUTTER &amp; NESTJS.
        </div>
      </footer>
    </main>
  );
}
