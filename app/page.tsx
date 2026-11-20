import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Layers3,
  Monitor,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from 'lucide-react';

const RELEASES_URL = 'https://github.com/natanim-kemal/synce/releases/latest';

type Asset = { name: string; size: number; url: string };
type Downloads = { windows: Asset[]; android: Asset[]; version: string | null };

const BOOKS = [
  { title: 'Design Patterns', cover: 'design-patterns' },
  { title: 'Clean Code', cover: 'clean-code' },
  { title: 'The Pragmatic Programmer', cover: 'pragmatic-programmer' },
  { title: 'Introduction to Algorithms', cover: 'introduction-to-algorithms' },
  { title: 'Computer Networks', cover: 'computer-networks' },
  { title: 'The Mythical Man Month', cover: 'mythical-man-month' },
  { title: 'The Art of Computer Programming', cover: 'art-of-computer-programming' },
  { title: 'Compilers', cover: 'compilers' },
  { title: 'Database Systems', cover: 'database-systems' },
  { title: 'Deep Work', cover: 'deep-work' },
  { title: 'Atomic Habits', cover: 'atomic-habits' },
  { title: 'Thinking Fast and Slow', cover: 'thinking-fast-and-slow' },
];

function formatSize(bytes: number) {
  if (!bytes) return 'portable build';
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function BookCovers() {
  return (
    <div className="book-bg" aria-hidden="true">
      {BOOKS.map((book) => (
        <span
          key={book.title}
          style={{ '--cover': `url(/books/${book.cover}.jpg)` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function DeviceStage() {
  return (
    <div className="stage" aria-label="A PDF moving from a desktop computer to a phone">
      <span className="ghost ghost-a" />
      <span className="ghost ghost-b" />
      <span className="ghost ghost-c" />
      <span className="ghost ghost-d" />

      <svg className="lines" viewBox="0 0 540 560" preserveAspectRatio="none" aria-hidden="true">
        <path className="guide" d="M295 196C378 188 438 268 430 402" />
        <path className="comet tail" d="M295 196C378 188 438 268 430 402" />
        <path className="comet" d="M295 196C378 188 438 268 430 402" />
      </svg>

      <div className="pc">
        <div className="pc-screen">
          <div className="pc-chrome">
            <i /><i /><i />
            <span>Synce</span>
          </div>
          <div className="pc-body">
            <p className="pc-title">My PDFs</p>
            <div className="file-row is-active">
              <span className="pdf-dot">PDF</span>
              <b>systems-design.pdf</b>
              <em>2.4 MB</em>
            </div>
            <div className="file-row">
              <span className="pdf-dot">PDF</span>
              <span>readings-2026.pdf</span>
              <em>1.1 MB</em>
            </div>
            <div className="file-row">
              <span className="pdf-dot">PDF</span>
              <span>architecture-notes.pdf</span>
              <em>860 KB</em>
            </div>
          </div>
        </div>
      </div>

      <div className="phone">
        <div className="phone-screen">
          <div className="phone-status"><span>9:41</span><span>synced</span></div>
          <div className="phone-app">
            <img src="/synce.png" alt="" />
            <span>Synce</span>
            <span className="phone-sync-arrow"><RefreshCw size={12} strokeWidth={2} /></span>
            <span className="tap-cursor"><MousePointer2 size={12} fill="currentColor" /></span>
          </div>
          <div className="phone-files">
            <p className="pc-title">Library</p>
            <div className="file-row is-active">
              <span className="pdf-dot">PDF</span>
              <b>systems-design.pdf</b>
            </div>
            <div className="file-row">
              <span className="pdf-dot">PDF</span>
              <span>readings-2026.pdf</span>
            </div>
            <div className="file-row">
              <span className="pdf-dot">PDF</span>
              <span>architecture-notes.pdf</span>
            </div>
          </div>
          <div className="sync-control">
            <span className="synced-tick"><Check size={12} strokeWidth={2.6} /></span>
          </div>
          <span className="sync-note">Synced just now</span>
        </div>
      </div>

    </div>
  );
}

function DownloadCard({
  title,
  caption,
  icon,
  assets,
  variants,
}: {
  title: string;
  caption: string;
  icon: React.ReactNode;
  assets: Asset[];
  variants: { label: string; detail: string; pattern: RegExp }[];
}) {
  return (
    <div className="dl-card">
      <div className="dl-top">
        <span className="dl-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <span>{caption}</span>
        </div>
      </div>
      {variants.map((variant, index) => {
        const asset = assets.find((item) => variant.pattern.test(item.name));
        return (
          <div className="asset" key={index}>
            <span className="dl-badge"><Download size={13} strokeWidth={2} /></span>
            <span className="asset-name">
              <b>{variant.label}</b>
              <small>
                {asset ? `${formatSize(asset.size)} · ${asset.name}` : variant.detail}
              </small>
            </span>
            <a href={asset?.url || RELEASES_URL} target="_blank" rel="noopener noreferrer">
              Download <ArrowUpRight size={12} style={{ verticalAlign: -2 }} />
            </a>
          </div>
        );
      })}
    </div>
  );
}

async function getDownloads(): Promise<Downloads> {
  try {
    const response = await fetch('https://api.github.com/repos/natanim-kemal/synce/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('no release');
    const release = await response.json();
    const assets: Asset[] = (release.assets ?? []).map((asset: { name: string; size: number; browser_download_url: string }) => ({
      name: asset.name,
      size: asset.size,
      url: asset.browser_download_url,
    }));
    return {
      windows: assets.filter((asset) => /\.(exe|zip)$/i.test(asset.name)),
      android: assets.filter((asset) => /\.apk$/i.test(asset.name)),
      version: release.tag_name ?? null,
    };
  } catch {
    return { windows: [], android: [], version: null };
  }
}

export default async function Home() {
  const downloads = await getDownloads();

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="page-rules" aria-hidden="true"><i /><i /></div>

      <nav className="nav" aria-label="Main navigation">
        <a className="nav-brand" href="#home">
          <img src="/synce.png" alt="" />
          Synce
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#download">Download</a>
        </div>
        <a className="nav-cta" href="#download">Get Synce</a>
      </nav>

      <section className="hero" id="home">
        <BookCovers />
        <div className="wrap hero-grid">
          <div className="reveal">
            <h1>Every PDF,<br /><span>on every device.</span></h1>
            <p className="hero-lede">
              Save a document once and read it anywhere. Synce keeps your PDFs in step across
              phone and desktop, <strong>online or completely offline.</strong>
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#download">Get Synce <ArrowRight size={15} /></a>
              <a className="btn btn-quiet" href="#how-it-works">See how it works</a>
            </div>
          </div>
          <div className="reveal delay-1">
            <DeviceStage />
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="wrap">
          <h2 className="statement reveal">
            I did the hard work of <em>keeping your PDFs in sync</em>,
            <span className="grey"> so you never have to think about it again.</span>
          </h2>
          <div className="feature-grid">
            <article className="feature reveal">
              <Layers3 size={22} strokeWidth={1.5} />
              <h3>Sync that stays quiet</h3>
              <p>Add a PDF on one device and it shows up on the others. No folders to babysit, no manual uploads.</p>
              <div className="feature-visual">
                <span className="mini-row"><i />systems-design.pdf<span>just now</span></span>
                <span className="mini-row"><i />readings-2026.pdf<span>synced</span></span>
                <span className="mini-row"><i />architecture-notes.pdf<span>synced</span></span>
              </div>
            </article>
            <article className="feature reveal delay-1">
              <WifiOff size={22} strokeWidth={1.5} />
              <h3>Offline stays useful</h3>
              <p>Everything you have synced stays on device. Open a paper on a flight, in a basement, or anywhere else.</p>
              <div className="feature-visual">
                <span className="mini-row"><i />Available offline<span>12 files</span></span>
                <span className="mini-row"><i />Last full sync<span>today</span></span>
                <span className="mini-row"><i />Storage used<span>183 MB</span></span>
              </div>
            </article>
            <article className="feature reveal delay-2">
              <ShieldCheck size={22} strokeWidth={1.5} />
              <h3>Built for real work</h3>
              <p>Native apps for Android and Windows, a private account, and conflict handling that never loses a page.</p>
              <div className="feature-visual">
                <span className="mini-row"><i />Android<span>arm64</span></span>
                <span className="mini-row"><i />Windows<span>x64</span></span>
                <span className="mini-row"><i />Account<span>private</span></span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="steps" id="how-it-works">
        <div className="wrap">
          <h2 className="reveal">Three steps. <em>Then it just works.</em></h2>
          <div className="step-grid">
            <article className="step reveal">
              <b>01</b>
              <h3>Install Synce</h3>
              <p>Pick the build for your device. Android and Windows are ready to go, no account setup maze.</p>
            </article>
            <article className="step reveal delay-1">
              <b>02</b>
              <h3>Add your PDFs</h3>
              <p>Drop documents in once. Synce uploads them in the background and keeps a local copy for offline reading.</p>
            </article>
            <article className="step reveal delay-2">
              <b>03</b>
              <h3>Read anywhere</h3>
              <p>Open the same library on every device. New pages arrive quietly, and edits never overwrite each other.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="download" id="download">
        <div className="wrap">
          <div className="download-head reveal">
            <h2>Download Synce</h2>
            <p>
              Choose your platform. Every build is published from the same release, so your devices
              stay in sync from the first open.
              {downloads.version ? ` Latest release ${downloads.version}.` : ''}
            </p>
          </div>
          <div className="download-grid">
            <DownloadCard
              title="Windows"
              caption="Desktop app for Windows 10 and 11"
              icon={<Monitor size={20} strokeWidth={1.5} />}
              assets={downloads.windows}
              variants={[
                { label: 'Installer (.exe)', detail: 'Guided setup, starts on first launch', pattern: /\.exe$/i },
                { label: 'Portable (.zip)', detail: 'Unzip and run, no install needed', pattern: /\.zip$/i },
              ]}
            />
            <DownloadCard
              title="Android"
              caption="Mobile app for Android 10 and above"
              icon={<Smartphone size={20} strokeWidth={1.5} />}
              assets={downloads.android}
              variants={[
                { label: 'ARM64 (.apk)', detail: 'For modern 64 bit Android phones', pattern: /arm64.*\.apk$/i },
                { label: 'ARMv7 (.apk)', detail: 'For older 32 bit Android phones', pattern: /armv7.*\.apk$/i },
                { label: 'Universal (.apk)', detail: 'One build that fits every Android device', pattern: /universal.*\.apk$/i },
              ]}
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <BookCovers />
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/synce.png" alt="" />
              <p>A small, private way to keep every PDF you care about in step across your devices.</p>
            </div>
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#download">Download</a>
            </div>
            <div>
              <h4>Downloads</h4>
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Windows</a>
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Android</a>
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">All releases</a>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <a href="https://github.com/natanim-kemal/synce" target="_blank" rel="noopener noreferrer">Source</a>
              <a href="https://github.com/natanim-kemal/synce/issues" target="_blank" rel="noopener noreferrer">Issues</a>
              <a href="https://github.com/natanim-kemal/synce/releases" target="_blank" rel="noopener noreferrer">Changelog</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>2026 Synce. Built with Flutter and NestJS.</span>
            <span>Made for people who actually read the PDFs they save.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
