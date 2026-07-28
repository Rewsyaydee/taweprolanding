import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  BellRing,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MapPin,
  Menu,
  Navigation,
  Radio,
  Send,
  ShieldCheck,
  Users,
  X
} from "lucide-react";
import "./App.css";

const TELEGRAM_URL = "https://t.me/iiumtaweprobot";
const GITHUB_URL = "https://github.com/Rewsyaydee/taweprolanding";
const ASSET_BASE = import.meta.env.BASE_URL;

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function RouteMark({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span className={`lr-route-mark${active ? " is-active" : ""}`}>
      <span className="lr-route-dot" />
      {label}
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const routeProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.25 });

  useEffect(() => {
    document.documentElement.classList.add("landing-page-active");
    return () => document.documentElement.classList.remove("landing-page-active");
  }, []);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const viewport = { once: true, amount: 0.2 };

  return (
    <div className="lr-site">
      <a className="lr-skip" href="#main">Skip to content</a>

      <motion.div className="lr-scroll-route" aria-hidden="true">
        <span className="lr-scroll-track" />
        <motion.span className="lr-scroll-fill" style={{ scaleY: routeProgress }} />
      </motion.div>

      <header className="lr-nav">
        <a className="lr-brand" href="#top" aria-label="IIUMTawePro home">
          <span className="lr-brand-mark"><img src="https://raw.githubusercontent.com/Rewsyaydee/IIUMTawePro/main/public/assets/iium-logo.png" alt="" /></span>
          <span>
            <strong>IIUMTawePro</strong>
            <small>Your first week, clearly mapped.</small>
          </span>
        </a>

        <nav className="lr-nav-links" aria-label="Landing page">
          <a href="#journey">Journey</a>
          <a href="#navigate">Navigate</a>
          <a href="#operations">Operations</a>
        </nav>

        <a className="lr-nav-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          Open in Telegram <ArrowUpRight size={15} />
        </a>

        <button
          className="lr-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        {menuOpen && (
          <div className="lr-mobile-menu">
            <a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a>
            <a href="#navigate" onClick={() => setMenuOpen(false)}>Navigate</a>
            <a href="#operations" onClick={() => setMenuOpen(false)}>Operations</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Open in Telegram</a>
          </div>
        )}
      </header>

      <main id="main">
        <section className="lr-hero" id="top">
          <div className="lr-hero-grid" aria-hidden="true" />
          <div className="lr-topography lr-topography-one" aria-hidden="true" />
          <div className="lr-topography lr-topography-two" aria-hidden="true" />

          <div className="lr-hero-copy">
            <motion.div
              className="lr-kicker"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
            >
              <span className="lr-live-pulse" /> Telegram-native orientation
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.18 }}
            >
              Your first week
              <span>at IIUM.</span>
              <em>One clear way through it.</em>
            </motion.h1>

            <motion.p
              className="lr-hero-lede"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.32 }}
            >
              Live schedules, campus routes, verified attendance, important updates and help—
              thoughtfully connected inside Telegram.
            </motion.p>

            <motion.div
              className="lr-hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.42 }}
            >
              <a className="lr-button lr-button-primary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                <Send size={17} /> Open in Telegram <ArrowUpRight size={15} />
              </a>
              <a className="lr-button lr-button-ghost" href="#journey">
                Follow the journey <span aria-hidden="true">↓</span>
              </a>
            </motion.div>

            <motion.p
              className="lr-friction-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              No new app. No separate sign-up. Just tap and go.
            </motion.p>
          </div>

          <motion.div
            className="lr-hero-map"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.25 }}
            aria-label="A live route from ICC Main Hall to SHAS Mosque"
          >
            <svg className="lr-route-svg" viewBox="0 0 720 720" role="img" aria-label="Animated campus route">
              <defs>
                <filter id="routeGlow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path className="lr-contour" d="M-30 160C111 65 191 231 335 143s262-73 411 15" />
              <path className="lr-contour" d="M-27 230C118 134 224 302 374 211s244-59 383 8" />
              <path className="lr-contour" d="M-10 531C144 425 237 603 394 497s241-42 362 8" />
              <path className="lr-route-shadow" d="M104 584C157 501 148 406 246 384c120-27 100-149 211-168 58-10 94-48 151-100" />
              <motion.path
                className="lr-route-path"
                d="M104 584C157 501 148 406 246 384c120-27 100-149 211-168 58-10 94-48 151-100"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0 : 2.4, delay: 0.55, ease: "easeInOut" }}
              />
              <circle className="lr-map-point" cx="104" cy="584" r="10" />
              <circle className="lr-map-ring" cx="608" cy="116" r="18" />
              <circle className="lr-map-point lr-map-point-end" cx="608" cy="116" r="8" />
            </svg>

            <div className="lr-location lr-location-start">
              <span>START</span><strong>ICC Main Hall</strong>
            </div>
            <div className="lr-location lr-location-end">
              <span>NEXT</span><strong>SHAS Mosque</strong>
            </div>
            <div className="lr-now-card">
              <div><Radio size={14} /><span>HAPPENING NOW</span></div>
              <strong>Campus Discovery</strong>
              <p><Clock3 size={14} /> 10:00 — 11:30</p>
              <p><MapPin size={14} /> ICC Main Hall</p>
            </div>
            <div className="lr-distance">3 min · 280 m</div>
          </motion.div>

          <div className="lr-hero-route-labels" aria-hidden="true">
            <RouteMark label="Arrive" active />
            <RouteMark label="Discover" />
            <RouteMark label="Belong" />
          </div>
        </section>

        <section className="lr-proof" aria-label="IIUMTawePro at a glance">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <strong>2,000+</strong><span>new journeys supported</span>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={{ ...transition, delay: 0.08 }}>
            <strong>53</strong><span>programme moments</span>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={{ ...transition, delay: 0.16 }}>
            <strong>12</strong><span>campus destinations</span>
          </motion.div>
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={{ ...transition, delay: 0.24 }}>
            One calm source of truth for students and the people guiding them.
          </motion.p>
        </section>

        <section className="lr-chapter lr-schedule-chapter" id="journey">
          <div className="lr-chapter-copy">
            <motion.span className="lr-chapter-number" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>01 / THE WEEK WAKES UP</motion.span>
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              Never wonder<br /><em>what comes next.</em>
            </motion.h2>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              The programme changes with the moment. IIUMTawePro finds today, moves to what is
              live, and keeps the next destination within reach.
            </motion.p>
            <motion.ul className="lr-clean-list" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              <li><Check size={15} /> Live, upcoming and completed states</li>
              <li><Check size={15} /> Main and concurrent sessions</li>
              <li><Check size={15} /> One-tap check-in and navigation</li>
            </motion.ul>
          </div>

          <motion.div className="lr-time-stage" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <div className="lr-time-rail">
              <span>08:30</span><span>10:00</span><span className="is-now">NOW</span><span>14:30</span><span>17:00</span>
            </div>
            <article className="lr-event lr-event-past">
              <div><span>08:30 — 10:00</span><small>COMPLETED</small></div>
              <h3>Welcome &amp; Campus Briefing</h3>
              <p><MapPin size={14} /> Main Auditorium</p>
            </article>
            <article className="lr-event lr-event-now">
              <div><span>10:00 — 11:30</span><small><i /> HAPPENING NOW</small></div>
              <h3>Campus Discovery</h3>
              <p><MapPin size={14} /> ICC Main Hall</p>
              <div className="lr-event-actions">
                <button type="button">Check in <CheckCircle2 size={15} /></button>
                <button type="button">Navigate <Navigation size={15} /></button>
              </div>
            </article>
            <article className="lr-event lr-event-next">
              <div><span>12:30 — 14:00</span><small>NEXT</small></div>
              <h3>Prayer &amp; Self-Management</h3>
              <p><MapPin size={14} /> SHAS Mosque</p>
            </article>
          </motion.div>
        </section>

        <section className="lr-map-chapter" id="navigate">
          <motion.div className="lr-map-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <span className="lr-chapter-number">02 / THE CAMPUS OPENS</span>
            <h2>From unfamiliar<br /><em>to unmistakable.</em></h2>
            <p>Every venue change becomes a route with time, distance and landmarks—not another place to get lost.</p>
          </motion.div>

          <motion.div className="lr-campus-frame" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <img src="https://raw.githubusercontent.com/Rewsyaydee/IIUMTawePro/main/public/assets/maps/campus-overview.webp" alt="Illustrated overview map of the IIUM campus" loading="lazy" />
            <div className="lr-campus-shade" />
            <svg viewBox="0 0 1000 610" className="lr-campus-route" aria-hidden="true">
              <motion.path
                d="M180 430C300 350 356 448 454 329c105-127 204-41 367-174"
                initial={reduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 2, ease: "easeInOut" }}
              />
            </svg>
            <span className="lr-pin lr-pin-one"><i /> ICC Main Hall</span>
            <span className="lr-pin lr-pin-two"><i /> SHAS Mosque</span>
            <div className="lr-route-ticket">
              <span>YOUR NEXT ROUTE</span>
              <div><strong>ICC Main Hall</strong><ArrowUpRight size={18} /><strong>SHAS Mosque</strong></div>
              <p>3 min walk <i /> 280 metres <i /> Indoor connector</p>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Start navigating <Navigation size={16} /></a>
            </div>
          </motion.div>
        </section>

        <section className="lr-chapter lr-attendance-chapter">
          <motion.div className="lr-arrival-stage" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <div className="lr-arrival-rings" aria-hidden="true"><i /><i /><i /></div>
            <div className="lr-arrival-core">
              <CheckCircle2 size={34} />
              <span>LOCATION VERIFIED</span>
              <strong>You made it.</strong>
              <small>Within 200m of venue</small>
            </div>
            <div className="lr-stamp lr-stamp-one">01<br /><span>ARRIVED</span></div>
            <div className="lr-stamp lr-stamp-two">02<br /><span>DISCOVERED</span></div>
            <div className="lr-stamp lr-stamp-three">03<br /><span>BELONG</span></div>
          </motion.div>

          <div className="lr-chapter-copy">
            <motion.span className="lr-chapter-number" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>03 / ARRIVAL BECOMES PARTICIPATION</motion.span>
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              Every arrival<br /><em>becomes part of your story.</em>
            </motion.h2>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              GPS-verified attendance turns each destination into progress. Students see the
              journey they have completed—not another form they had to fill.
            </motion.p>
            <motion.div className="lr-progress" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              <div><span>Ta’aruf journey</span><strong>5 / 8 moments</strong></div>
              <i><span /></i>
              <small>Three more arrivals to complete the route.</small>
            </motion.div>
          </div>
        </section>

        <section className="lr-care-chapter">
          <motion.div className="lr-care-intro" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <span className="lr-chapter-number">04 / THE ROUTE ADAPTS</span>
            <h2>When plans change,<br /><em>you are not left behind.</em></h2>
          </motion.div>

          <div className="lr-care-grid">
            <motion.article className="lr-care-card lr-alert-card" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
              <div className="lr-card-icon"><BellRing size={22} /></div>
              <span>IMPORTANT UPDATE · JUST NOW</span>
              <h3>Venue changed to Main Auditorium</h3>
              <p>Your schedule and route update together, so the next step remains clear.</p>
              <div className="lr-redirect">
                <span className="is-old">ICC Main Hall</span><ArrowUpRight size={16} /><strong>Main Auditorium</strong>
              </div>
            </motion.article>

            <motion.article className="lr-care-card lr-help-card" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={{ ...transition, delay: 0.1 }}>
              <div className="lr-card-icon"><HeartHandshake size={22} /></div>
              <span>HELP IS PART OF THE ROUTE</span>
              <h3>A quiet way to ask for support.</h3>
              <p>Wellbeing reports and emergency contacts stay close without overwhelming the journey.</p>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Find support <ArrowUpRight size={15} /></a>
            </motion.article>
          </div>
        </section>

        <section className="lr-operations" id="operations">
          <motion.div className="lr-operations-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <span className="lr-chapter-number">05 / BEHIND EVERY CLEAR JOURNEY</span>
            <h2>One student sees a route.<br /><em>A whole team keeps it clear.</em></h2>
            <p>
              Committee members, bureau heads and mainboard coordinate tasks, attendance,
              readiness and urgent broadcasts through the same living system.
            </p>
          </motion.div>

          <motion.div className="lr-ops-system" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <svg viewBox="0 0 900 560" aria-hidden="true">
              <path d="M450 280L178 118M450 280L722 118M450 280L150 410M450 280L750 410M450 280L450 66M450 280L450 500" />
              <circle cx="450" cy="280" r="74" />
              <circle cx="178" cy="118" r="42" />
              <circle cx="722" cy="118" r="42" />
              <circle cx="150" cy="410" r="42" />
              <circle cx="750" cy="410" r="42" />
              <circle cx="450" cy="66" r="35" />
              <circle cx="450" cy="500" r="35" />
            </svg>
            <div className="lr-ops-core"><ShieldCheck size={28} /><strong>Mainboard</strong><span>clear overview</span></div>
            <span className="lr-ops-node lr-node-one">Programme</span>
            <span className="lr-ops-node lr-node-two">Welfare</span>
            <span className="lr-ops-node lr-node-three">Catering</span>
            <span className="lr-ops-node lr-node-four">Special Task</span>
            <span className="lr-ops-node lr-node-five">Multimedia</span>
            <span className="lr-ops-node lr-node-six">Discipline</span>
          </motion.div>

          <div className="lr-role-strip">
            <span><Users size={18} /> Student</span>
            <i />
            <span>Committee</span>
            <i />
            <span>Head of Bureau</span>
            <i />
            <span><ShieldCheck size={18} /> Mainboard</span>
          </div>
        </section>

        <section className="lr-final">
          <div className="lr-final-lines" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <motion.div className="lr-final-content" variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} transition={transition}>
            <div className="lr-final-plane"><Send size={34} /></div>
            <span className="lr-chapter-number">YOUR ROUTE IS READY</span>
            <h2>Start where you already are.<br /><em>Inside Telegram.</em></h2>
            <p>Your schedule, next destination, attendance, updates and help—one tap away.</p>
            <a className="lr-button lr-button-primary lr-final-button" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              <Send size={18} /> Open IIUMTawePro <ArrowUpRight size={16} />
            </a>
            <small>No download · No separate login · Built for every new beginning</small>
          </motion.div>
        </section>
      </main>

      <footer className="lr-footer">
        <a className="lr-brand" href="#top">
          <span className="lr-brand-mark"><img src="https://raw.githubusercontent.com/Rewsyaydee/IIUMTawePro/main/public/assets/iium-logo.png" alt="" /></span>
          <span><strong>IIUMTawePro</strong><small>Garden of Knowledge and Virtue</small></span>
        </a>
        <p>An independent Telegram-native companion created for the IIUM student journey.</p>
        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;