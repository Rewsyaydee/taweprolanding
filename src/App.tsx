import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Building2,
  CalendarRange,
  Check,
  ChevronDown,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  GraduationCap,
  HeartHandshake,
  LocateFixed,
  LockKeyhole,
  MapPinned,
  Menu,
  MessageCircleMore,
  Navigation,
  Play,
  Radio,
  Rocket,
  Route,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  Users,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import "./landing.css";

const TELEGRAM_URL = "https://t.me/iiumtaweprobot";
const APP_URL = "https://iium-tawe-pro.vercel.app";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

const reviews = [
  ["Senang kerja kita man, tolak satu jobscope 🖐🏽... sorry do syedi demand macam2 😅 sebab gempak wehhh", "Aliya Maisarah Tawe", "Efficiency & quality"],
  ["STYLEEE GILAAA WEIHHHH! I is amazeeeeddddd! AKU DAA EXCITED DARI TADI", "Ilyanie Tawe", "The wow factor"],
  ["OKEH BAPAK STYLEEEEEEEEEEE 😂", "Ilyanie Tawe", "Design & UI"],
  ["GEMPAK GILA SYEDI. WOW. Style do budak KICT 😝", "Tuah Cameraman Tawe", "Overall excellence"],
  ["Ushhh, mantap do syedi 😆👍🏼👍🏼", "Muih Welwel Tawe", "Short & impactful"],
  ["Waaaaa hebat gilaaa", "Iman Tawe", "Pure excitement"],
  ["Hebat la syedii", "Nik Irdhina Syahira", "Impressive tech"],
  ["FAKKK, STYLE GILA WEI", "Haziq Catering", "Mind-blowing design"],
  ["Perghhh, Niceee doo. Ni kau buat kee", "Eggy Careg", "Genuine amazement"],
  ["wahwahwah, ok hebat menarik", "Nurin Welwel Tawe", "Clean functionality"],
  ["Weah syedii sgt membantu wei 🥹🥹🥹 Dia cam tersusun gak skit kerja ii", "Arep PC Tawe", "Organization & practicality"],
];

const roles = [
  { tag: "01", title: "Students", copy: "Navigate the week, find every session, verify attendance and get help without leaving Telegram.", icon: Navigation, color: "cyan" },
  { tag: "02", title: "Committee", copy: "Manage assigned work, submit evidence and keep field operations moving in real time.", icon: Users, color: "gold" },
  { tag: "03", title: "Bureau Heads", copy: "See readiness, coordinate people and issue alerts before small problems become large ones.", icon: Gauge, color: "coral" },
  { tag: "04", title: "Mainboard", copy: "Control users, broadcasts and the complete operational picture from one command layer.", icon: ShieldCheck, color: "lime" },
];

const bureaus = [
  "Catering",
  "Special Task",
  "Preparation & Technical",
  "Welcoming & Welfare",
  "Multimedia",
  "Programme Coordinator",
  "Registration",
  "Discipline & Ibadah",
];

const stack = [
  { icon: Code2, label: "EXPERIENCE", title: "React 18 + TypeScript", copy: "Vite-powered interface with high-performance, component-led delivery." },
  { icon: Database, label: "DATA", title: "Supabase PostgreSQL", copy: "Row Level Security protects role-specific data at the database boundary." },
  { icon: Cloud, label: "DELIVERY", title: "Vercel Serverless", copy: "18 API actions distributed through production-ready serverless infrastructure." },
  { icon: LockKeyhole, label: "IDENTITY", title: "Telegram + JWT", copy: "initData validation, Supabase JWT and offline service-worker caching." },
];

function SceneHeading({ eyebrow, title, accent, body, center = false }: {
  eyebrow: string; title: string; accent?: string; body?: string; center?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`scene-heading${center ? " center" : ""}`}
      variants={reveal}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease }}
    >
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}{accent && <em>{accent}</em>}</h2>
      {body && <p>{body}</p>}
    </motion.div>
  );
}

function PhoneVisual({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`phone-visual ${className}`}>
      <span className="phone-glow" />
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function Metric({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <motion.div className="metric" variants={reveal}>
      <strong>{value}</strong>
      <span>{label}</span>
      {detail && <small>{detail}</small>}
    </motion.div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [activeRole, setActiveRole] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.25 });
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, reduceMotion ? 0 : 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const reviewsLoop = useMemo(() => [...reviews, ...reviews], []);

  useMotionValueEvent(scrollYProgress, "change", (value) => setScrollPercent(Math.round(value * 100)));

  useEffect(() => {
    document.documentElement.classList.add("pitch-active");
    return () => document.documentElement.classList.remove("pitch-active");
  }, []);

  return (
    <div className="pitch">
      <a className="skip-link" href="#content">Skip to presentation</a>

      <motion.div className="progress-line" style={{ scaleX: smoothProgress }} />
      <div className="progress-count" aria-hidden="true">{String(scrollPercent).padStart(2, "0")}%</div>

      <header className="deck-nav">
        <a href="#top" className="brand" aria-label="TawePro home">
          <span className="brand-orbit"><img src="/assets/iium-logo.png" alt="" /></span>
          <span><b>TawePro</b><small>Ta’aruf Week, reimagined</small></span>
        </a>
        <nav aria-label="Pitch deck navigation">
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#proof">Proof</a>
          <a href="#reviews">Voices</a>
        </nav>
        <a className="nav-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          Launch app <ExternalLink size={14} />
        </a>
        <button className="menu-btn" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
        {menu && (
          <div className="mobile-nav">
            {["problem", "solution", "proof", "reviews"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{id}</a>)}
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Launch app</a>
          </div>
        )}
      </header>

      <main id="content">
        <section className="hero scene" id="top">
          <div className="noise" />
          <div className="hero-grid" />
          <motion.div className="hero-orb orb-one" animate={reduceMotion ? {} : { x: [0, 42, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
          <motion.div className="hero-orb orb-two" animate={reduceMotion ? {} : { x: [0, -35, 0], y: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity }} />

          <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div className="hero-kicker" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Radio size={15} /> A production-ready Telegram Mini App
            </motion.div>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.12, ease }}>
              Ta’aruf Week
              <span>Reimagined.</span>
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
              A zero-friction operating system transforming orientation for <strong>3,000+ students</strong> at IIUM.
            </motion.p>
            <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <a className="button primary" href="#demo"><Play size={17} fill="currentColor" /> Enter the experience</a>
              <a className="button ghost" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><Send size={17} /> Open in Telegram</a>
            </motion.div>
            <motion.div className="hero-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <span>July 2026</span><i /><span>Built by students</span><i /><span>For the IIUM community</span>
            </motion.div>
          </motion.div>

          <motion.div className="hero-route" aria-hidden="true" initial={reduceMotion ? false : { pathLength: 0 }}>
            <svg viewBox="0 0 1600 400">
              <motion.path d="M-60 310C250 80 410 390 690 190S1110 70 1660 250" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5, ease }} />
            </svg>
            <span className="route-node n1" /><span className="route-node n2" /><span className="route-node n3" />
          </motion.div>
          <a className="scroll-cue" href="#demo"><span>Scroll to explore</span><ArrowDown size={18} /></a>
        </section>

        <section className="demo scene" id="demo">
          <SceneHeading eyebrow="01 — Experience the app" title="Not a concept." accent="A living product." body="A student’s entire orientation journey, running where they already are: inside Telegram." center />
          <div className="demo-stage">
            <motion.div className="demo-copy left" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>HAPPENING NOW</span>
              <h3>One calm source of truth.</h3>
              <p>Schedule, destination, check-in and support move with the student—moment by moment.</p>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.8, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.2, ease }}>
              <PhoneVisual src="/assets/showcase/dashboard.png" alt="TawePro student dashboard shown inside a phone" className="hero-phone" />
            </motion.div>
            <motion.div className="demo-copy right" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>ZERO FRICTION</span>
              <h3>Tap. Arrive. Belong.</h3>
              <p>No store search, installation, account form or forgotten password between arrival and action.</p>
            </motion.div>
          </div>
          <div className="demo-labels"><span><Zap /> Instant entry</span><span><WifiOff /> Offline-aware</span><span><ShieldCheck /> Verified identity</span></div>
        </section>

        <section className="problem scene" id="problem">
          <div className="problem-number">50+</div>
          <SceneHeading eyebrow="02 — Orientation without a compass" title="50+ sessions. 12 venues." accent="Zero coordination tools." body="The old system asks thousands of new students—and the teams serving them—to assemble the truth from fragments." />
          <div className="pain-grid">
            {[
              [MapPinned, "Scattered campus", "ICC, mosque, clinics and halls—with no digital path between them."],
              [BellRing, "Updates disappear", "Emergency changes are buried inside noisy Telegram channels."],
              [Check, "Paper attendance", "Punch cards create queues, delays and an easy path to fraud."],
              [Users, "Eight siloed bureaus", "No shared command layer for task ownership or live readiness."],
            ].map(([Icon, title, copy], i) => {
              const I = Icon as typeof MapPinned;
              return (
                <motion.article key={title as string} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.7, ease }}>
                  <span className="pain-index">0{i + 1}</span><I /><h3>{title as string}</h3><p>{copy as string}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="problem-footer"><span>Confusion</span><ArrowRight /><span>Delay</span><ArrowRight /><span>Risk</span><ArrowRight /><strong>There had to be a better route.</strong></div>
        </section>

        <section className="origin scene">
          <div className="origin-sticky">
            <SceneHeading eyebrow="03 — The origin" title="Why a Telegram" accent="Mini App?" body="The dream was to digitise Ta’aruf Week. The first obstacle was not technology—it was access." />
          </div>
          <div className="origin-story">
            <motion.article variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="story-step">01 / THE BARRIER</span>
              <CircleDollarSign />
              <h3>RM500 before the first student.</h3>
              <p>App Store and Play Store deployment fees create a needless barrier for a student-built community tool.</p>
            </motion.article>
            <motion.article variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="story-step">02 / THE PIVOT</span>
              <MessageCircleMore />
              <h3>The super app was already installed.</h3>
              <p>Telegram already held the audience, identity and daily communication layer. No forced download required.</p>
            </motion.article>
            <motion.article className="story-final" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="story-step">03 / THE REALITY</span>
              <Rocket />
              <h3>Passion became production.</h3>
              <p>A student idea matured into a fast, secure and deployed operational platform.</p>
            </motion.article>
          </div>
        </section>

        <section className="solution scene" id="solution">
          <div className="solution-wash" />
          <SceneHeading eyebrow="04 — The solution" title="No install. No sign-up." accent="No friction." body="Runs entirely inside Telegram—a direct path from announcement to action." center />
          <div className="solution-layout">
            <motion.div className="solution-feature one" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <CalendarRange /><strong>53</strong><h3>Real events</h3><p>An interactive timeline understands past, now and next.</p>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
              <PhoneVisual src="/assets/showcase/schedule.png" alt="TawePro interactive event schedule" className="solution-phone" />
            </motion.div>
            <motion.div className="solution-feature two" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LocateFixed /><strong>200m</strong><h3>GPS verification</h3><p>Presence is confirmed at the venue—not on a paper card.</p>
            </motion.div>
            <motion.div className="solution-feature three" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <BellRing /><strong>Live</strong><h3>Emergency broadcasts</h3><p>Critical changes reach the right people at the right moment.</p>
            </motion.div>
          </div>
        </section>

        <section className="walkthrough scene">
          <SceneHeading eyebrow="05 — Student walkthrough" title="From first arrival" accent="to the final ceremony." body="One continuous journey. Every screen knows what the student needs next." />
          <div className="walk-track">
            <motion.div className="walk-phone p1" initial={reduceMotion ? false : { opacity: 0, x: -100, rotate: -8 }} whileInView={{ opacity: 1, x: 0, rotate: -5 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
              <PhoneVisual src="/assets/showcase/dashboard.png" alt="Student dashboard" />
              <span><b>01</b> Open instantly</span>
            </motion.div>
            <motion.div className="walk-phone p2" initial={reduceMotion ? false : { opacity: 0, y: 120 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease }}>
              <PhoneVisual src="/assets/showcase/map.png" alt="Campus route navigation" />
              <span><b>02</b> Find the route</span>
            </motion.div>
            <motion.div className="walk-phone p3" initial={reduceMotion ? false : { opacity: 0, x: 100, rotate: 8 }} whileInView={{ opacity: 1, x: 0, rotate: 5 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease }}>
              <PhoneVisual src="/assets/showcase/checkin.png" alt="GPS attendance and reward tracking" />
              <span><b>03</b> Verify arrival</span>
            </motion.div>
          </div>
          <div className="walk-route"><i /><i /><i /></div>
        </section>

        <section className="audiences scene">
          <SceneHeading eyebrow="06 — Four views, one system" title="One platform serving" accent="four audiences." body="Each role sees a focused surface. Together, they create one reliable operational picture." />
          <div className="role-shell">
            <div className="role-tabs" role="tablist" aria-label="TawePro audiences">
              {roles.map((role, i) => <button key={role.title} role="tab" aria-selected={activeRole === i} onClick={() => setActiveRole(i)}><span>{role.tag}</span>{role.title}</button>)}
            </div>
            <motion.div className={`role-detail ${roles[activeRole].color}`} key={activeRole} initial={reduceMotion ? false : { opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, ease }}>
              {(() => { const Icon = roles[activeRole].icon; return <Icon />; })()}
              <span>{roles[activeRole].tag} / AUDIENCE</span>
              <h3>{roles[activeRole].title}</h3>
              <p>{roles[activeRole].copy}</p>
              <div><Check /> Role-aware access <Check /> One shared truth</div>
            </motion.div>
          </div>
        </section>

        <section className="architecture scene">
          <SceneHeading eyebrow="07 — Under the surface" title="Production-ready" accent="architecture." body="Enterprise-grade foundations, composed for performance, security and scale." center />
          <div className="stack-grid">
            {stack.map(({ icon: Icon, label, title, copy }, i) => (
              <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.7, ease }}>
                <div><Icon /><span>{label}</span></div><h3>{title}</h3><p>{copy}</p><small>0{i + 1}</small>
              </motion.article>
            ))}
          </div>
          <div className="architecture-flow">
            <span><Smartphone /> Telegram</span><i /><span><Code2 /> React</span><i /><span><Server /> API</span><i /><span><Database /> Supabase</span>
          </div>
        </section>

        <section className="command scene">
          <div className="command-copy">
            <SceneHeading eyebrow="08 — Committee command center" title="Eight bureaus." accent="One pulse." body="Every operational team keeps its own focus while sharing the same live system." />
            <div className="tool-count"><strong>19</strong><span>operational tools</span></div>
          </div>
          <motion.div className="bureau-orbit" initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <div className="orbit-center"><img src="/assets/iium-logo.png" alt="" /><strong>MAINBOARD</strong><span>command layer</span></div>
            {bureaus.map((bureau, i) => <span key={bureau} className={`bureau b${i + 1}`}><i>{String(i + 1).padStart(2, "0")}</i>{bureau}</span>)}
            <svg viewBox="0 0 700 700" aria-hidden="true"><circle cx="350" cy="350" r="238" /><circle cx="350" cy="350" r="145" /></svg>
          </motion.div>
        </section>

        <section className="impact scene" id="proof">
          <SceneHeading eyebrow="09 — Impact & scalability" title="Proven in production." accent="Ready for what’s next." body="The platform has already crossed the line between prototype and dependable infrastructure." />
          <motion.div className="metrics-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ staggerChildren: 0.12 }}>
            <Metric value="50+" label="concurrent sessions" detail="with GPS verification" />
            <Metric value="8" label="active bureaus" detail="sharing 19 operational tools" />
            <Metric value="≈0" label="installation friction" detail="inside Telegram" />
            <Metric value="≈0" label="starting infra cost" detail="built to prove value first" />
          </motion.div>
        </section>

        <section className="testing scene">
          <SceneHeading eyebrow="10 — Tested for the real world" title="Load tested." accent="Security hardened." body="Not just designed to look ready—engineered to stay ready under real pressure." center />
          <div className="test-dashboard">
            <motion.div className="test-primary" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="test-ring"><strong>1,000</strong><span>concurrent users</span></div>
              <div className="test-facts">
                <span><b>51,524</b> requests</span>
                <span><b>3.5 min</b> test window</span>
                <span><b>0.00%</b> error rate</span>
                <span><b>&lt;600ms</b> latency</span>
              </div>
            </motion.div>
            <motion.div className="test-card sustained" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Timer /><span>SUSTAINED LOAD</span><strong>250 users</strong><p>60 minutes of perfect stability.</p>
              <div className="signal-bars">{[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <i key={n} style={{ height: `${28 + (n % 4) * 13}%` }} />)}</div>
            </motion.div>
            <motion.div className="test-card security" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ShieldCheck /><span>SECURITY AUDIT</span><strong>11 patched</strong><p>Including critical auth bypass and IP spoofing fixes.</p>
              <div><Check /> Pre-launch remediation complete</div>
            </motion.div>
          </div>
        </section>

        <section className="upgrade scene">
          <SceneHeading eyebrow="11 — The upgrade path" title="Scaling for" accent="4,500+ students." body="Success raises the ceiling. The next deployment has two practical routes." />
          <div className="ceiling">
            <span>FREE-TIER CEILING</span><strong>2.7M</strong><p>projected requests against a 1M limit</p><div><i /></div>
          </div>
          <div className="options">
            <motion.article variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>OPTION A</span><Cloud /><h3>Vercel Pro</h3><strong>$20<small>/month</small></strong><ul><li><Check /> 2M invocations</li><li><Check /> No broadcast timeouts</li><li><Check /> Fastest migration path</li></ul>
            </motion.article>
            <div className="option-or">OR</div>
            <motion.article className="recommended" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>OPTION B · HIGH CAPACITY</span><Server /><h3>Virtual Private Server</h3><strong>Flat<small>-rate</small></strong><ul><li><Check /> Predictable cost</li><li><Check /> High traffic capacity</li><li><Check /> Full infrastructure control</li></ul>
            </motion.article>
          </div>
        </section>

        <section className="wellbeing scene">
          <div className="wellbeing-copy">
            <SceneHeading eyebrow="12 — Technology with care" title="Operations are human." accent="Support should be too." body="TawePro keeps wellbeing reporting and assistance close to the student journey—not hidden in another system." />
            <div className="care-note"><HeartHandshake /><span><strong>A protected route to help.</strong> Clear reporting, emergency contacts and trackable follow-through.</span></div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, rotate: 5, y: 80 }} whileInView={{ opacity: 1, rotate: 2, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <PhoneVisual src="/assets/showcase/wellbeing.png" alt="TawePro wellbeing concern form" />
          </motion.div>
        </section>

        <section className="reviews scene" id="reviews">
          <SceneHeading eyebrow="13 — Frontline feedback" title="Built with the community." accent="Loved by the community." body="Unfiltered reactions from the people closest to Ta’aruf Week." center />
          <div className="marquee-shell">
            <div className={`review-track${reduceMotion ? " reduced" : ""}`}>
              {reviewsLoop.map(([quote, author, tag], i) => (
                <article className="review" key={`${author}-${i}`}>
                  <div className="review-stars">★★★★★</div>
                  <span>{tag}</span>
                  <blockquote>“{quote}”</blockquote>
                  <footer><i>{author.charAt(0)}</i><div><strong>{author}</strong><small>TawePro testing phase</small></div></footer>
                </article>
              ))}
            </div>
          </div>
          <div className="review-summary"><span><strong>11</strong> real voices</span><i /><span><strong>1</strong> shared reaction</span><i /><span className="review-shout">GEMPAK.</span></div>
        </section>

        <section className="final-cta scene">
          <div className="final-grid" />
          <motion.div className="final-mark" initial={reduceMotion ? false : { scale: 0.5, opacity: 0, rotate: -20 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <img src="/assets/iium-logo.png" alt="" />
          </motion.div>
          <motion.div className="final-content" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="eyebrow"><i />14 — The invitation</span>
            <h2>Let’s transform<br /><em>orientation together.</em></h2>
            <p>We request IIUM’s endorsement to deploy Ta’aruf Week Pro for the 3,000 incoming students.</p>
            <div className="value-pillars">
              <span><CircleDollarSign /> Zero cost to deploy</span>
              <span><Zap /> Zero training needed</span>
              <span><GraduationCap /> Built by students</span>
            </div>
            <div className="final-actions">
              <a className="button light" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><Send /> Open Telegram bot <ExternalLink /></a>
              <a className="button outline" href={APP_URL} target="_blank" rel="noreferrer"><Rocket /> View live app <ExternalLink /></a>
            </div>
          </motion.div>
          <div className="final-route" aria-hidden="true"><Route /><span /><span /><span /></div>
          <footer className="deck-footer"><span>TAWEPRO · JULY 2026</span><span>BUILT AT IIUM, FOR IIUM</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>
    </div>
  );
}

export default App;