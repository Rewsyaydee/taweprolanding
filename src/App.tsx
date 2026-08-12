import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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
  CalendarRange,
  Check,
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
  Timer,
  Users,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import "./landing.css";

const TELEGRAM_URL = "https://t.me/iiumtaweprobot";
const APP_URL = "https://iium-tawe-pro.vercel.app";
const SITE_URL = "https://tawepro.rewsyaydee.tech";

type Lang = "en" | "ms";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

const fallbackReviews = [
  ["Senang kerja kita man, tolak satu jobscope 🖐🏽... sorry do syedi demand macam2 😅 sebab gempak wehhh", "Aliya Maisarah Tawe", "Efficiency & quality"],
  ["STYLEEE GILAAA WEIHHHH! I is amazeeeeddddd! AKU DAA EXCITED DARI TADI", "Ilyanie Tawe", "The wow factor"],
  ["OKEH BAPAK STYLEEEEEEEEEEE 😂", "Ilyanie Tawe", "Design & UI"],
  ["GEMPAK GILA SYEDI. WOW. Style do budak KICT 😝", "Tuah Cameraman Tawe", "Overall excellence"],
  ["Ushhh, mantap do syedi 😆👍🏼👍🏼", "Muih Welwel Tawe", "Short & impactful"],
  ["Waaaaa hebat gilaaa", "Iman Tawe", "Pure excitement"],
  ["Hebat la syedii", "Irdhina GDGOC", "Impressive tech"],
  ["WOWWW, STYLE GILA WEI", "Haziq Catering", "Mind-blowing design"],
  ["Perghhh, Niceee doo. Ni kau buat kee", "Eggy Careg", "Genuine amazement"],
  ["wahwahwah, ok hebat menarik", "Nurin Welwel Tawe", "Clean functionality"],
  ["Weah syedii sgt membantu wei 🥹🥹🥹 Dia cam tersusun gak skit kerja ii", "Arep PC Tawe", "Organization & practicality"],
  ["anjaiii style gilaa, ada miniapp bhaii, pehhh semat do, bawak masuk ni dlaam resume", "Elyas Server Mod", "Portfolio-worthy quality"],
  ["bagi aku kalau utk app tu, yg paling menarik perhatian is the fact that yg kitorang tak perlu download but kat tele je... tele kan is the app semua org ada, so much easier to access", "Harizah Careg", "No app download needed"],
  ["kalau utk student, bagi aku schedule ngan map tu paling function — since schedule tu dah specific kan ke hari... bila tengok app ni, aku rasa new students dah senang nak tahu jalan mana ke mana gituu", "Harizah Careg", "Value for new students"],
  ["kalau utk committee tu, punch card ngan task tu paling tip top — since kadang2 en bila dah group tu rancak, so susah nak cari task2 yg head bureau bagi... tapi yg ni dah ada specific place utk tengok, so it's much more easier ahh", "Harizah Careg", "Value for the committee"],
  ["YANG NIII 😭😭😭 WEYH, KENAPA KAU TAKDE TIME AKU TAWEEEE. PALING FUNCTION TERUK AH MAP TUUU", "Harizah Careg", "Regret it came late"],
  ["cool siaaa ❤️ Aku suka part schedule tu, cantik. And aku rasa kalau betul2 diorg nak pakai, yang clock in clock out features tu pon best", "@tinanananananananana", "Design & core features"],
  ["menarik... nk code utk committee acess... Mcm nk involve gak", "Hannan Ex Program Manager Tawe", "High demand & interest"],
];


type ReviewTuple = [string, string, string];

type LiveReview = {
  id: string;
  quote: string;
  author: string;
  tag: string;
  rating: number | null;
};

const SUPABASE_URL = "https://uyvmuvsvvclyntaprxrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5dm11dnN2dmNseW50YXByeHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMjE0NjMsImV4cCI6MjA5ODg5NzQ2M30.NLIDxmtZBnm4RShKWkuj6aOcErkERUMtrVrAgNDKlm4";

function getSupabaseConfig() {
  const env = ((import.meta as ImportMeta & {
    env?: Record<string, string | undefined>;
  }).env ?? {});

  return {
    url: env.VITE_SUPABASE_URL || SUPABASE_URL,
    key: env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY,
  };
}

function normalizeLiveReview(row: Record<string, unknown>): LiveReview | null {
  if (!row.id || typeof row.content !== "string" || !row.content.trim()) return null;

  const rating = typeof row.rating === "number"
    ? row.rating
    : typeof row.rating === "string" && row.rating.trim()
      ? Number(row.rating)
      : null;

  return {
    id: String(row.id),
    quote: row.content.trim(),
    author: typeof row.display_name === "string" && row.display_name.trim()
      ? row.display_name.trim()
      : "Anonymous",
    tag: "Community review",
    rating: Number.isFinite(rating) ? rating : null,
  };
}

function parsePublicCount(value: unknown): number | null {
  const row = Array.isArray(value) ? value[0] : value;
  const candidate = row && typeof row === "object" && "count" in row
    ? (row as { count?: unknown }).count
    : row;

  const number = typeof candidate === "number" ? candidate : Number(candidate);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function countOnlinePresence(state: Record<string, unknown>) {
  return Object.values(state).filter((entries) => {
    if (!Array.isArray(entries)) return false;
    return entries.some((entry) => (
      entry &&
      typeof entry === "object" &&
      (entry as { online?: unknown }).online === true
    ));
  }).length;
}

function useSupabaseSocialProof() {
  const [onlineUsers, setOnlineUsers] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [liveReviews, setLiveReviews] = useState<LiveReview[]>([]);
  const [reviewStatus, setReviewStatus] = useState<"loading" | "live" | "offline">("loading");

  useEffect(() => {
    let mounted = true;
    const config = getSupabaseConfig();
    const client = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const updatePresence = (channel: ReturnType<typeof client.channel>) => {
      if (mounted) {
        setOnlineUsers(countOnlinePresence(
          channel.presenceState() as Record<string, unknown>
        ));
      }
    };

    const reviewsChannel = client
      .channel("landing-approved-reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        (payload) => {
          if (!mounted) return;

          const eventType = payload.eventType;
          if (eventType === "DELETE") {
            const deletedId = String((payload.old as { id?: unknown }).id ?? "");
            if (deletedId) {
              setLiveReviews((current) => current.filter((review) => review.id !== deletedId));
            }
            return;
          }

          const row = payload.new as Record<string, unknown>;
          const next = normalizeLiveReview(row);

          setLiveReviews((current) => {
            const existingIndex = current.findIndex((review) => review.id === String(row.id));
            if (!next) {
              return current.filter((review) => review.id !== String(row.id));
            }
            if (existingIndex < 0) return [...current, next];

            const updated = [...current];
            updated[existingIndex] = next;
            return updated;
          });
        },
      )
      .subscribe((status) => {
        if (!mounted) return;
        if (status === "SUBSCRIBED") setReviewStatus("live");
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          setReviewStatus("offline");
        }
      });

    const presenceChannel = client
      .channel("online-users", { config: { presence: { key: "landing-observer" } } })
      .on("presence", { event: "sync" }, () => updatePresence(presenceChannel))
      .on("presence", { event: "join" }, () => updatePresence(presenceChannel))
      .on("presence", { event: "leave" }, () => updatePresence(presenceChannel))
      .subscribe((status) => {
        if (status === "SUBSCRIBED") updatePresence(presenceChannel);
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          if (mounted) setOnlineUsers(null);
        }
      });

    const loadPublicData = async () => {
      const [reviewsResult, countResult] = await Promise.all([
        client
          .from("reviews")
          .select("id, display_name, content, rating, is_approved, created_at")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(50),
        client.rpc("get_public_user_count"),
      ]);

      if (!mounted) return;

      if (!reviewsResult.error) {
        const normalized = (reviewsResult.data ?? [])
          .map((row) => normalizeLiveReview(row as Record<string, unknown>))
          .filter((review): review is LiveReview => Boolean(review));
        setLiveReviews(normalized);
        setReviewStatus("live");
      } else {
        setReviewStatus("offline");
      }

      if (!countResult.error) {
        setTotalUsers(parsePublicCount(countResult.data));
      } else {
        setTotalUsers(null);
      }
    };

    void loadPublicData();

    return () => {
      mounted = false;
      void client.removeChannel(reviewsChannel);
      void client.removeChannel(presenceChannel);
    };
  }, []);

  return { onlineUsers, totalUsers, liveReviews, reviewStatus };
}

function formatMetric(value: number | null) {
  return value === null ? "—" : value.toLocaleString();
}

function LiveProofBand({
  lang,
  onlineUsers,
  totalUsers,
  reviewStatus,
}: {
  lang: Lang;
  onlineUsers: number | null;
  totalUsers: number | null;
  reviewStatus: "loading" | "live" | "offline";
}) {
  const isMs = lang === "ms";
  const isConnected = reviewStatus === "live";

  return (
    <div className="live-proof-band" aria-label={isMs ? "Bukti langsung TawePro" : "Live TawePro proof"}>
      <div className="live-proof-intro">
        <span className={`live-signal${isConnected ? " is-live" : ""}`} aria-hidden="true" />
        <div>
          <strong>{isMs ? "LIVE DARI TAWEPRO" : "LIVE FROM TAWEPRO"}</strong>
          <small>
            {isConnected
              ? (isMs ? "Disambungkan ke Supabase" : "Connected to Supabase")
              : (isMs ? "Menggunakan data terakhir yang tersedia" : "Using the latest available data")}
          </small>
        </div>
      </div>
      <div className="live-proof-metric">
        <strong>{formatMetric(onlineUsers)}</strong>
        <span>{isMs ? "pelajar sedang online" : "students online now"}</span>
      </div>
      <div className="live-proof-metric">
        <strong>{formatMetric(totalUsers)}</strong>
        <span>{isMs ? "jumlah pelajar" : "all-time students"}</span>
      </div>
    </div>
  );
}


const copy = {
  en: {
    brandSub: "IIUM Ta'aruf Week app",
    nav: { problem: "Problem", solution: "Solution", proof: "Proof", reviews: "Voices", faq: "FAQ", launch: "Open app" },
    skip: "Skip to content",
    kicker: "IIUM Ta'aruf Week app · Telegram Mini App",
    h1a: "IIUM Ta'aruf Week app",
    h1b: "inside Telegram.",
    heroP: "TawePro helps new IIUM students through orientation and TAWE with live schedules, campus routes, GPS check-in, and updates — no install, no separate signup.",
    ctaExplore: "See how it works",
    ctaTelegram: "Open in Telegram",
    heroFoot: ["Orientation-ready", "Built by students", "For the IIUM community"],
    scroll: "Scroll to explore",
    demoEyebrow: "01 — Experience the app",
    demoTitle: "Not a concept.",
    demoAccent: "A living IIUM orientation app.",
    demoBody: "Your Ta'aruf Week journey runs where IIUM students already are: inside Telegram.",
    demoLeftTag: "HAPPENING NOW",
    demoLeftTitle: "One calm source of truth.",
    demoLeftBody: "Schedule, destination, check-in and support move with the student—moment by moment.",
    demoRightTag: "ZERO FRICTION",
    demoRightTitle: "Tap. Arrive. Belong.",
    demoRightBody: "No store search, installation, account form or forgotten password between arrival and action.",
    labels: ["Instant entry", "Offline-aware", "Verified identity"],
    problemEyebrow: "02 — Orientation without a compass",
    problemTitle: "50+ sessions. 12 venues.",
    problemAccent: "Zero coordination tools.",
    problemBody: "Old IIUM orientation workflows ask thousands of new students—and the teams serving them—to assemble the truth from fragments.",
    pains: [
      ["Scattered campus", "ICC, mosque, clinics and halls—with no digital path between them."],
      ["Updates disappear", "Emergency Ta'aruf Week changes get buried inside noisy Telegram channels."],
      ["Paper attendance", "Punch cards create queues, delays and an easy path to fraud."],
      ["Eight siloed bureaus", "No shared command layer for task ownership or live readiness."],
    ],
    problemFooter: ["Confusion", "Delay", "Risk", "There had to be a better route."],
    originEyebrow: "03 — The origin",
    originTitle: "Why a Telegram",
    originAccent: "Mini App?",
    originBody: "The dream was to digitise Ta'aruf Week and IIUM orientation. The first obstacle was not technology—it was access.",
    originSteps: [
      ["01 / THE BARRIER", "RM500 before the first student.", "App Store and Play Store deployment fees create a needless barrier for a student-built community tool."],
      ["02 / THE PIVOT", "The super app was already installed.", "Telegram already held the audience, identity and daily communication layer. No forced download required."],
      ["03 / THE REALITY", "Passion became production.", "A student idea matured into a fast, secure and deployed IIUM Ta'aruf Week app."],
    ],
    solutionEyebrow: "04 — The solution",
    solutionTitle: "No install. No sign-up.",
    solutionAccent: "No friction.",
    solutionBody: "TawePro is a Telegram Mini App for student orientation — a direct path from announcement to action.",
    solFeatures: [
      ["53", "Real events", "An interactive Ta'aruf Week timeline understands past, now and next."],
      ["200m", "GPS verification", "Presence is confirmed at the venue—not on a paper card."],
      ["Live", "Emergency broadcasts", "Critical IIUM orientation changes reach the right people fast."],
    ],
    walkEyebrow: "05 — Student walkthrough",
    walkTitle: "From first arrival",
    walkAccent: "to the final ceremony.",
    walkBody: "One continuous IIUM orientation journey. Every screen knows what the student needs next.",
    walkSteps: ["Open instantly", "Find the route", "Verify arrival"],
    audEyebrow: "06 — Four views, one system",
    audTitle: "One platform serving",
    audAccent: "four audiences.",
    audBody: "Each role sees a focused surface. Together, they create one reliable operational picture for TAWE.",
    roles: [
      { tag: "01", title: "Students", copy: "Navigate Ta'aruf Week, find every session, verify attendance and get help without leaving Telegram." },
      { tag: "02", title: "Committee", copy: "Manage assigned work, submit evidence and keep field operations moving in real time." },
      { tag: "03", title: "Bureau Heads", copy: "See readiness, coordinate people and issue alerts before small problems become large ones." },
      { tag: "04", title: "Mainboard", copy: "Control users, broadcasts and the complete operational picture from one command layer." },
    ],
    archEyebrow: "07 — Under the surface",
    archTitle: "Production-ready",
    archAccent: "architecture.",
    archBody: "Enterprise-grade foundations, composed for performance, security and scale.",
    cmdEyebrow: "08 — Committee command center",
    cmdTitle: "Eight bureaus.",
    cmdAccent: "One pulse.",
    cmdBody: "Every operational team keeps its own focus while sharing the same live system.",
    tools: "operational tools",
    impactEyebrow: "09 — Impact & scalability",
    impactTitle: "Proven in production.",
    impactAccent: "Ready for what’s next.",
    impactBody: "The IIUM Ta'aruf Week app has already crossed the line between prototype and dependable infrastructure.",
    metrics: [
      ["50+", "concurrent sessions", "with GPS verification"],
      ["8", "active bureaus", "sharing 19 operational tools"],
      ["≈0", "installation friction", "inside Telegram"],
      ["≈0", "starting infra cost", "built to prove value first"],
    ],
    testEyebrow: "10 — Tested for the real world",
    testTitle: "Load tested.",
    testAccent: "Security hardened.",
    testBody: "Not just designed to look ready—engineered to stay ready under real pressure.",
    upgradeEyebrow: "11 — The upgrade path",
    upgradeTitle: "Scaling for",
    upgradeAccent: "4,500+ students.",
    upgradeBody: "Success raises the ceiling. The next deployment has two practical routes.",
    careEyebrow: "12 — Technology with care",
    careTitle: "Operations are human.",
    careAccent: "Support should be too.",
    careBody: "TawePro keeps wellbeing reporting and assistance close to the student journey—not hidden in another system.",
    careNote: "A protected route to help.",
    careNoteBody: "Clear reporting, emergency contacts and trackable follow-through.",
    revEyebrow: "13 — Frontline feedback",
    revTitle: "Built with the community.",
    revAccent: "Loved by the community.",
    revBody: "Unfiltered reactions from the people closest to Ta'aruf Week and IIUM orientation.",
    faqEyebrow: "14 — Student FAQ",
    faqTitle: "Questions new IIUM",
    faqAccent: "students ask.",
    faqBody: "Straight answers about the IIUM Ta'aruf Week app, Telegram access, and orientation support.",
    faqs: [
      ["What is the IIUM Ta'aruf Week app?", "TawePro is the IIUM Ta'aruf Week app built as a Telegram Mini App for student orientation. It helps new students follow live schedules, campus routes, GPS check-in, announcements, and support."],
      ["How do I open TawePro?", "Open TawePro in Telegram at t.me/iiumtaweprobot. No App Store or Play Store install. No separate signup."],
      ["Is this for international IIUM students too?", "Yes. TawePro is for all IIUM new-intake students, including Malaysian and international students joining orientation and Ta'aruf Week."],
      ["What can I do during IIUM orientation?", "View the Ta'aruf Week schedule, navigate campus venues, complete GPS-verified attendance, receive TAWE updates, track progress, and access wellbeing support."],
    ],
    finalEyebrow: "15 — Start here",
    finalTitle: "Your IIUM orientation",
    finalAccent: "route is ready.",
    finalBody: "Open the IIUM Ta'aruf Week app in Telegram and move through TAWE with a clearer path.",
    pillars: ["Free for students", "No install needed", "Built by students"],
    finalTg: "Open Telegram bot",
    finalApp: "View live app",
    footer: ["TAWEPRO · IIUM TA'ARUF WEEK APP", "BUILT AT IIUM, FOR IIUM", "Back to top ↑"],
  },
  ms: {
    brandSub: "Aplikasi Ta'aruf Week IIUM",
    nav: { problem: "Masalah", solution: "Penyelesaian", proof: "Bukti", reviews: "Suara", faq: "Soalan", launch: "Buka app" },
    skip: "Langkau ke kandungan",
    kicker: "Aplikasi Ta'aruf Week IIUM · Telegram Mini App",
    h1a: "Aplikasi Ta'aruf Week IIUM",
    h1b: "dalam Telegram.",
    heroP: "TawePro membantu pelajar baharu IIUM sepanjang orientasi dan TAWE dengan jadual langsung, laluan kampus, daftar kehadiran GPS, dan makluman — tanpa muat turun atau daftar masuk berasingan.",
    ctaExplore: "Lihat cara ia berfungsi",
    ctaTelegram: "Buka dalam Telegram",
    heroFoot: ["Sedia untuk orientasi", "Dibina oleh pelajar", "Untuk komuniti IIUM"],
    scroll: "Tatal untuk teroka",
    demoEyebrow: "01 — Alami aplikasinya",
    demoTitle: "Bukan konsep.",
    demoAccent: "Aplikasi orientasi IIUM yang hidup.",
    demoBody: "Perjalanan Ta'aruf Week anda berjalan di tempat pelajar IIUM sudah berada: dalam Telegram.",
    demoLeftTag: "SEDANG BERLAKU",
    demoLeftTitle: "Satu sumber maklumat yang tenang.",
    demoLeftBody: "Jadual, destinasi, daftar masuk dan sokongan bergerak bersama pelajar—saat demi saat.",
    demoRightTag: "TANPA GESERAN",
    demoRightTitle: "Ketik. Tiba. Rasa milik.",
    demoRightBody: "Tiada carian store, pemasangan, borang akaun atau kata laluan terlupa antara ketibaan dan tindakan.",
    labels: ["Akses serta-merta", "Sedia luar talian", "Identiti disahkan"],
    problemEyebrow: "02 — Orientasi tanpa kompas",
    problemTitle: "50+ sesi. 12 lokasi.",
    problemAccent: "Tiada alat koordinasi.",
    problemBody: "Aliran lama orientasi IIUM meminta ribuan pelajar baharu—dan pasukan yang melayani mereka—menyusun kebenaran daripada serpihan maklumat.",
    pains: [
      ["Kampus tersebar", "ICC, masjid, klinik dan dewan—tanpa laluan digital di antaranya."],
      ["Makluman hilang", "Perubahan kecemasan Ta'aruf Week tertimbus dalam saluran Telegram yang bising."],
      ["Kehadiran kertas", "Kad tumbuk wujudkan barisan, kelewatan dan penipuan mudah."],
      ["Lapan biro berasingan", "Tiada lapisan perintah bersama untuk tugasan atau kesediaan langsung."],
    ],
    problemFooter: ["Kekeliruan", "Kelewatan", "Risiko", "Mesti ada laluan yang lebih baik."],
    originEyebrow: "03 — Asal usul",
    originTitle: "Mengapa Telegram",
    originAccent: "Mini App?",
    originBody: "Impiannya ialah mendigitalkan Ta'aruf Week dan orientasi IIUM. Halangan pertama bukan teknologi—tetapi akses.",
    originSteps: [
      ["01 / HALANGAN", "RM500 sebelum pelajar pertama.", "Yuran App Store dan Play Store menjadi halangan sia-sia untuk alat komuniti binaan pelajar."],
      ["02 / PIVOT", "Super app sudah dipasang.", "Telegram sudah memegang audiens, identiti dan komunikasi harian. Tiada muat turun paksa."],
      ["03 / REALITI", "Minat jadi produk sebenar.", "Idea pelajar matang menjadi aplikasi Ta'aruf Week IIUM yang pantas, selamat dan sudah dilancarkan."],
    ],
    solutionEyebrow: "04 — Penyelesaian",
    solutionTitle: "Tiada pasang. Tiada daftar.",
    solutionAccent: "Tiada geseran.",
    solutionBody: "TawePro ialah Telegram Mini App untuk orientasi pelajar — laluan terus daripada pengumuman ke tindakan.",
    solFeatures: [
      ["53", "Acara sebenar", "Garis masa Ta'aruf Week memahami lepas, sekarang dan seterusnya."],
      ["200m", "Pengesahan GPS", "Kehadiran disahkan di lokasi—bukan pada kad kertas."],
      ["Langsung", "Siaran kecemasan", "Perubahan penting orientasi IIUM sampai pantas kepada orang yang betul."],
    ],
    walkEyebrow: "05 — Panduan pelajar",
    walkTitle: "Dari ketibaan pertama",
    walkAccent: "ke majlis penutup.",
    walkBody: "Satu perjalanan orientasi IIUM yang berterusan. Setiap skrin tahu apa yang pelajar perlukan seterusnya.",
    walkSteps: ["Buka serta-merta", "Cari laluan", "Sahkan ketibaan"],
    audEyebrow: "06 — Empat pandangan, satu sistem",
    audTitle: "Satu platform melayani",
    audAccent: "empat audiens.",
    audBody: "Setiap peranan nampak permukaan fokus. Bersama, mereka cipta gambaran operasi TAWE yang boleh dipercayai.",
    roles: [
      { tag: "01", title: "Pelajar", copy: "Navigasi Ta'aruf Week, cari setiap sesi, sahkan kehadiran dan dapat bantuan tanpa tinggalkan Telegram." },
      { tag: "02", title: "Jawatankuasa", copy: "Urus tugasan, hantar bukti dan pastikan operasi lapangan bergerak secara masa nyata." },
      { tag: "03", title: "Ketua Biro", copy: "Lihat kesediaan, selaras orang dan keluarkan amaran sebelum masalah kecil jadi besar." },
      { tag: "04", title: "Mainboard", copy: "Kawal pengguna, siaran dan gambaran operasi penuh dari satu lapisan perintah." },
    ],
    archEyebrow: "07 — Di sebalik permukaan",
    archTitle: "Sedia produksi.",
    archAccent: "senibina mantap.",
    archBody: "Asas gred enterprise, disusun untuk prestasi, keselamatan dan skala.",
    cmdEyebrow: "08 — Pusat perintah jawatankuasa",
    cmdTitle: "Lapan biro.",
    cmdAccent: "Satu denyutan.",
    cmdBody: "Setiap pasukan operasi kekal fokus sambil berkongsi sistem langsung yang sama.",
    tools: "alat operasi",
    impactEyebrow: "09 — Impak & skalabiliti",
    impactTitle: "Terbukti dalam produksi.",
    impactAccent: "Sedia untuk langkah seterusnya.",
    impactBody: "Aplikasi Ta'aruf Week IIUM sudah melintasi garisan antara prototaip dan infrastruktur yang boleh dipercayai.",
    metrics: [
      ["50+", "sesi serentak", "dengan pengesahan GPS"],
      ["8", "biro aktif", "berkongsi 19 alat operasi"],
      ["≈0", "geseran pemasangan", "dalam Telegram"],
      ["≈0", "kos infra awal", "dibina untuk buktikan nilai dulu"],
    ],
    testEyebrow: "10 — Diuji untuk dunia sebenar",
    testTitle: "Ujian beban.",
    testAccent: "Keselamatan diperkukuh.",
    testBody: "Bukan sekadar nampak sedia—direka untuk kekal sedia di bawah tekanan sebenar.",
    upgradeEyebrow: "11 — Laluan naik taraf",
    upgradeTitle: "Berskala untuk",
    upgradeAccent: "4,500+ pelajar.",
    upgradeBody: "Kejayaan menaikkan had. Penerapan seterusnya ada dua laluan praktikal.",
    careEyebrow: "12 — Teknologi dengan keprihatinan",
    careTitle: "Operasi itu manusiawi.",
    careAccent: "Sokongan mesti begitu juga.",
    careBody: "TawePro pastikan laporan kesejahteraan dan bantuan dekat dengan perjalanan pelajar—bukan tersembunyi dalam sistem lain.",
    careNote: "Laluan terlindung untuk minta bantuan.",
    careNoteBody: "Laporan jelas, kenalan kecemasan dan susulan yang boleh dijejak.",
    revEyebrow: "13 — Maklum balas barisan hadapan",
    revTitle: "Dibina bersama komuniti.",
    revAccent: "Disukai komuniti.",
    revBody: "Reaksi tanpa tapis daripada orang terdekat dengan Ta'aruf Week dan orientasi IIUM.",
    faqEyebrow: "14 — Soalan lazim pelajar",
    faqTitle: "Soalan pelajar baharu",
    faqAccent: "IIUM.",
    faqBody: "Jawapan terus tentang aplikasi Ta'aruf Week IIUM, akses Telegram, dan sokongan orientasi.",
    faqs: [
      ["Apa itu aplikasi Ta'aruf Week IIUM?", "TawePro ialah aplikasi Ta'aruf Week IIUM dibina sebagai Telegram Mini App untuk orientasi pelajar. Ia bantu pelajar baharu ikut jadual langsung, laluan kampus, daftar GPS, makluman dan sokongan."],
      ["Bagaimana nak buka TawePro?", "Buka TawePro dalam Telegram di t.me/iiumtaweprobot. Tiada pasang dari App Store atau Play Store. Tiada daftar masuk berasingan."],
      ["Adakah ini untuk pelajar antarabangsa IIUM juga?", "Ya. TawePro untuk semua pelajar ambilan baharu IIUM, termasuk pelajar Malaysia dan antarabangsa yang menyertai orientasi dan Ta'aruf Week."],
      ["Apa yang boleh saya buat semasa orientasi IIUM?", "Lihat jadual Ta'aruf Week, navigasi lokasi kampus, lengkapkan kehadiran GPS, terima makluman TAWE, jejak kemajuan, dan akses sokongan kesejahteraan."],
    ],
    finalEyebrow: "15 — Mulakan di sini",
    finalTitle: "Laluan orientasi IIUM",
    finalAccent: "anda sudah sedia.",
    finalBody: "Buka aplikasi Ta'aruf Week IIUM dalam Telegram dan lalui TAWE dengan laluan yang lebih jelas.",
    pillars: ["Percuma untuk pelajar", "Tanpa pasang app", "Dibina oleh pelajar"],
    finalTg: "Buka bot Telegram",
    finalApp: "Lihat app langsung",
    footer: ["TAWEPRO · APLIKASI TA'ARUF WEEK IIUM", "DIBINA DI IIUM, UNTUK IIUM", "Kembali ke atas ↑"],
  },
} as const;

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

const roleIcons = [Navigation, Users, Gauge, ShieldCheck];

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

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "ms" || q === "bm") return "ms";
  if (q === "en") return "en";
  const saved = window.localStorage.getItem("tawepro-lang");
  if (saved === "ms" || saved === "en") return saved;
  const nav = navigator.language?.toLowerCase() || "";
  if (nav.startsWith("ms") || nav.startsWith("id")) return "ms";
  return "en";
}

function App() {
  const reduceMotion = useReducedMotion();
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [activeRole, setActiveRole] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.25 });
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, reduceMotion ? 0 : 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const socialProof = useSupabaseSocialProof();
  const activeReviews = useMemo<ReviewTuple[]>(
    () => socialProof.liveReviews.length
      ? socialProof.liveReviews.map((review) => [review.quote, review.author, review.tag])
      : fallbackReviews,
    [socialProof.liveReviews],
  );
  const reviewRows = useMemo(() => {
    const rows: ReviewTuple[][] = [[], [], []];
    activeReviews.forEach((review, index) => rows[index % 3].push(review));
    return rows.map((row) => [...row, ...row]);
  }, [activeReviews]);
  const t = copy[lang];

  useMotionValueEvent(scrollYProgress, "change", (value) => setScrollPercent(Math.round(value * 100)));

  useEffect(() => {
    document.documentElement.classList.add("pitch-active");
    setLang(detectLang());
    return () => document.documentElement.classList.remove("pitch-active");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ms" ? "ms" : "en";
    window.localStorage.setItem("tawepro-lang", lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [lang]);

  const switchLang = (next: Lang) => {
    setLang(next);
    setMenu(false);
  };

  return (
    <div className="pitch" data-lang={lang}>
      <a className="skip-link" href="#content">{t.skip}</a>

      {/* SEO-visible static shell for crawlers and accessibility */}
      <div className="seo-shell" aria-hidden={false}>
        <h1>TawePro — IIUM Ta'aruf Week App in Telegram</h1>
        <p>
          TawePro is the IIUM Ta'aruf Week app and a Telegram Mini App for student orientation.
          New IIUM students use it for live schedules, campus routes, GPS attendance, TAWE updates, and support — with no install and no separate login.
        </p>
        <p>
          TawePro ialah aplikasi Ta'aruf Week IIUM dan Telegram Mini App untuk orientasi pelajar.
          Pelajar baharu IIUM menggunakannya untuk jadual langsung, laluan kampus, kehadiran GPS, makluman TAWE, dan sokongan — tanpa muat turun aplikasi berasingan.
        </p>
        <p>
          Official site: <a href={SITE_URL}>{SITE_URL}</a>. Open app: <a href={TELEGRAM_URL}>{TELEGRAM_URL}</a>.
        </p>
      </div>

      <motion.div className="progress-line" style={{ scaleX: smoothProgress }} />
      <div className="progress-count" aria-hidden="true">{String(scrollPercent).padStart(2, "0")}%</div>

      <header className="deck-nav">
        <a href="#top" className="brand" aria-label="TawePro home">
          <span className="brand-orbit"><img src="/assets/iium-logo.png" alt="IIUM" /></span>
          <span><b>TawePro</b><small>{t.brandSub}</small></span>
        </a>
        <nav aria-label="Primary">
          <a href="#problem">{t.nav.problem}</a>
          <a href="#solution">{t.nav.solution}</a>
          <a href="#proof">{t.nav.proof}</a>
          <a href="#reviews">{t.nav.reviews}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <div className="nav-tools">
          <div className="lang-switch" role="group" aria-label="Language">
            <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => switchLang("en")}>EN</button>
            <button type="button" className={lang === "ms" ? "active" : ""} aria-pressed={lang === "ms"} onClick={() => switchLang("ms")}>BM</button>
          </div>
          <a className="nav-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            {t.nav.launch} <ExternalLink size={14} />
          </a>
        </div>
        <button className="menu-btn" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
        {menu && (
          <div className="mobile-nav">
            {(["problem", "solution", "proof", "reviews", "faq"] as const).map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{t.nav[id === "faq" ? "faq" : id]}</a>
            ))}
            <div className="lang-switch mobile">
              <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</button>
              <button type="button" className={lang === "ms" ? "active" : ""} onClick={() => switchLang("ms")}>BM</button>
            </div>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">{t.nav.launch}</a>
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
              <Radio size={15} /> {t.kicker}
            </motion.div>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.12, ease }}>
              {t.h1a}
              <span>{t.h1b}</span>
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
              {t.heroP}
            </motion.p>
            <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <a className="button primary" href="#demo"><Play size={17} fill="currentColor" /> {t.ctaExplore}</a>
              <a className="button ghost" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><Send size={17} /> {t.ctaTelegram}</a>
            </motion.div>
            <motion.div className="hero-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <span>{t.heroFoot[0]}</span><i /><span>{t.heroFoot[1]}</span><i /><span>{t.heroFoot[2]}</span>
            </motion.div>
          </motion.div>

          <motion.div className="hero-route" aria-hidden="true">
            <svg viewBox="0 0 1600 400">
              <motion.path d="M-60 310C250 80 410 390 690 190S1110 70 1660 250" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5, ease }} />
            </svg>
            <span className="route-node n1" /><span className="route-node n2" /><span className="route-node n3" />
          </motion.div>
          <a className="scroll-cue" href="#demo"><span>{t.scroll}</span><ArrowDown size={18} /></a>
        </section>

        <section className="demo scene" id="demo">
          <SceneHeading eyebrow={t.demoEyebrow} title={t.demoTitle} accent={t.demoAccent} body={t.demoBody} center />
          <div className="demo-stage">
            <motion.div className="demo-copy left" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>{t.demoLeftTag}</span>
              <h3>{t.demoLeftTitle}</h3>
              <p>{t.demoLeftBody}</p>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.8, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.2, ease }}>
              <PhoneVisual src="/assets/showcase/dashboard.png" alt="TawePro IIUM Ta'aruf Week app student dashboard" className="hero-phone" />
            </motion.div>
            <motion.div className="demo-copy right" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span>{t.demoRightTag}</span>
              <h3>{t.demoRightTitle}</h3>
              <p>{t.demoRightBody}</p>
            </motion.div>
          </div>
          <div className="demo-labels">
            <span><Zap /> {t.labels[0]}</span>
            <span><WifiOff /> {t.labels[1]}</span>
            <span><ShieldCheck /> {t.labels[2]}</span>
          </div>
        </section>

        <section className="problem scene" id="problem">
          <div className="problem-number">50+</div>
          <SceneHeading eyebrow={t.problemEyebrow} title={t.problemTitle} accent={t.problemAccent} body={t.problemBody} />
          <div className="pain-grid">
            {t.pains.map(([title, body], i) => {
              const Icon = [MapPinned, BellRing, Check, Users][i];
              return (
                <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.7, ease }}>
                  <span className="pain-index">0{i + 1}</span><Icon /><h3>{title}</h3><p>{body}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="problem-footer">
            <span>{t.problemFooter[0]}</span><ArrowRight /><span>{t.problemFooter[1]}</span><ArrowRight /><span>{t.problemFooter[2]}</span><ArrowRight /><strong>{t.problemFooter[3]}</strong>
          </div>
        </section>

        <section className="origin scene">
          <div className="origin-sticky">
            <SceneHeading eyebrow={t.originEyebrow} title={t.originTitle} accent={t.originAccent} body={t.originBody} />
          </div>
          <div className="origin-story">
            {t.originSteps.map(([step, title, body], i) => {
              const Icon = [CircleDollarSign, MessageCircleMore, Rocket][i];
              return (
                <motion.article key={step} className={i === 2 ? "story-final" : undefined} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="story-step">{step}</span>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="solution scene" id="solution">
          <div className="solution-wash" />
          <SceneHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} accent={t.solutionAccent} body={t.solutionBody} center />
          <div className="solution-layout">
            <motion.div className="solution-feature one" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <CalendarRange /><strong>{t.solFeatures[0][0]}</strong><h3>{t.solFeatures[0][1]}</h3><p>{t.solFeatures[0][2]}</p>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
              <PhoneVisual src="/assets/showcase/schedule.png" alt="TawePro IIUM Ta'aruf Week schedule" className="solution-phone" />
            </motion.div>
            <motion.div className="solution-feature two" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LocateFixed /><strong>{t.solFeatures[1][0]}</strong><h3>{t.solFeatures[1][1]}</h3><p>{t.solFeatures[1][2]}</p>
            </motion.div>
            <motion.div className="solution-feature three" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <BellRing /><strong>{t.solFeatures[2][0]}</strong><h3>{t.solFeatures[2][1]}</h3><p>{t.solFeatures[2][2]}</p>
            </motion.div>
          </div>
        </section>

        <section className="walkthrough scene">
          <SceneHeading eyebrow={t.walkEyebrow} title={t.walkTitle} accent={t.walkAccent} body={t.walkBody} />
          <div className="walk-track">
            <motion.div className="walk-phone p1" initial={reduceMotion ? false : { opacity: 0, x: -100, rotate: -8 }} whileInView={{ opacity: 1, x: 0, rotate: -5 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
              <PhoneVisual src="/assets/showcase/dashboard.png" alt="Student dashboard" />
              <span><b>01</b> {t.walkSteps[0]}</span>
            </motion.div>
            <motion.div className="walk-phone p2" initial={reduceMotion ? false : { opacity: 0, y: 120 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease }}>
              <PhoneVisual src="/assets/showcase/map.png" alt="Campus route navigation" />
              <span><b>02</b> {t.walkSteps[1]}</span>
            </motion.div>
            <motion.div className="walk-phone p3" initial={reduceMotion ? false : { opacity: 0, x: 100, rotate: 8 }} whileInView={{ opacity: 1, x: 0, rotate: 5 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease }}>
              <PhoneVisual src="/assets/showcase/checkin.png" alt="GPS attendance and reward tracking" />
              <span><b>03</b> {t.walkSteps[2]}</span>
            </motion.div>
          </div>
          <div className="walk-route"><i /><i /><i /></div>
        </section>

        <section className="audiences scene">
          <SceneHeading eyebrow={t.audEyebrow} title={t.audTitle} accent={t.audAccent} body={t.audBody} />
          <div className="role-shell">
            <div className="role-tabs" role="tablist" aria-label="TawePro audiences">
              {t.roles.map((role, i) => (
                <button key={role.title} role="tab" aria-selected={activeRole === i} onClick={() => setActiveRole(i)}>
                  <span>{role.tag}</span>{role.title}
                </button>
              ))}
            </div>
            <motion.div className={`role-detail ${["cyan", "gold", "coral", "lime"][activeRole]}`} key={`${lang}-${activeRole}`} initial={reduceMotion ? false : { opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, ease }}>
              {(() => { const Icon = roleIcons[activeRole]; return <Icon />; })()}
              <span>{t.roles[activeRole].tag} / AUDIENCE</span>
              <h3>{t.roles[activeRole].title}</h3>
              <p>{t.roles[activeRole].copy}</p>
              <div><Check /> Role-aware access <Check /> One shared truth</div>
            </motion.div>
          </div>
        </section>

        <section className="architecture scene">
          <SceneHeading eyebrow={t.archEyebrow} title={t.archTitle} accent={t.archAccent} body={t.archBody} center />
          <div className="stack-grid">
            {stack.map(({ icon: Icon, label, title, copy: stackCopy }, i) => (
              <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.7, ease }}>
                <div><Icon /><span>{label}</span></div><h3>{title}</h3><p>{stackCopy}</p><small>0{i + 1}</small>
              </motion.article>
            ))}
          </div>
          <div className="architecture-flow">
            <span><Smartphone /> Telegram</span><i /><span><Code2 /> React</span><i /><span><Server /> API</span><i /><span><Database /> Supabase</span>
          </div>
        </section>

        <section className="command scene">
          <div className="command-copy">
            <SceneHeading eyebrow={t.cmdEyebrow} title={t.cmdTitle} accent={t.cmdAccent} body={t.cmdBody} />
            <div className="tool-count"><strong>19</strong><span>{t.tools}</span></div>
          </div>
          <motion.div className="bureau-orbit" initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <div className="orbit-center"><img src="/assets/iium-logo.png" alt="" /><strong>MAINBOARD</strong><span>command layer</span></div>
            {bureaus.map((bureau, i) => <span key={bureau} className={`bureau b${i + 1}`}><i>{String(i + 1).padStart(2, "0")}</i>{bureau}</span>)}
            <svg viewBox="0 0 700 700" aria-hidden="true"><circle cx="350" cy="350" r="238" /><circle cx="350" cy="350" r="145" /></svg>
          </motion.div>
        </section>

        <section className="impact scene" id="proof">
          <SceneHeading eyebrow={t.impactEyebrow} title={t.impactTitle} accent={t.impactAccent} body={t.impactBody} />
          <motion.div className="metrics-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ staggerChildren: 0.12 }}>
            {t.metrics.map(([value, label, detail]) => (
              <Metric key={label} value={value} label={label} detail={detail} />
            ))}
          </motion.div>
        </section>

        <section className="testing scene">
          <SceneHeading eyebrow={t.testEyebrow} title={t.testTitle} accent={t.testAccent} body={t.testBody} center />
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
          <SceneHeading eyebrow={t.upgradeEyebrow} title={t.upgradeTitle} accent={t.upgradeAccent} body={t.upgradeBody} />
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
            <SceneHeading eyebrow={t.careEyebrow} title={t.careTitle} accent={t.careAccent} body={t.careBody} />
            <div className="care-note"><HeartHandshake /><span><strong>{t.careNote}</strong> {t.careNoteBody}</span></div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, rotate: 5, y: 80 }} whileInView={{ opacity: 1, rotate: 2, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <PhoneVisual src="/assets/showcase/wellbeing.png" alt="TawePro wellbeing concern form" />
          </motion.div>
        </section>

        <section className="reviews scene" id="reviews">
          <SceneHeading eyebrow={t.revEyebrow} title={t.revTitle} accent={t.revAccent} body={t.revBody} center />
          <LiveProofBand
            lang={lang}
            onlineUsers={socialProof.onlineUsers}
            totalUsers={socialProof.totalUsers}
            reviewStatus={socialProof.reviewStatus}
          />
          <div className="marquee-shell">
            <div className={`marquee-wall${reduceMotion ? " reduced" : ""}`}>
              {reviewRows.map((row, rowIndex) => (
                <div className={`marquee-row row-${rowIndex + 1}`} key={`row-${rowIndex}`}>
                  {row.map(([quote, author, tag], i) => (
                    <article className={`review${rowIndex === 1 && i === 2 ? " review-featured" : ""}`} key={`${author}-${rowIndex}-${i}`} aria-hidden={i >= row.length / 2}>
                      <div className="review-stars">★★★★★</div>
                      <span>{tag}</span>
                      <blockquote>“{quote}”</blockquote>
                      <footer><i>{author.charAt(0)}</i><div><strong>{author}</strong><small>TawePro testing phase</small></div></footer>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="review-summary"><span><strong>{activeReviews.length}</strong> {socialProof.liveReviews.length ? (lang === "ms" ? "suara langsung" : "live voices") : (lang === "ms" ? "suara ujian" : "testing voices")}</span><i /><span><strong>1</strong> shared reaction</span><i /><span className="review-shout">GEMPAK.</span></div>
        </section>

        <section className="faq scene" id="faq">
          <SceneHeading eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} body={t.faqBody} />
          <div className="faq-grid">
            {t.faqs.map(([q, a], i) => (
              <motion.article key={q} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7, ease }}>
                <h3>{q}</h3>
                <p>{a}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="final-cta scene">
          <div className="final-grid" />
          <motion.div className="final-mark" initial={reduceMotion ? false : { scale: 0.5, opacity: 0, rotate: -20 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <img src="/assets/iium-logo.png" alt="" />
          </motion.div>
          <motion.div className="final-content" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="eyebrow"><i />{t.finalEyebrow}</span>
            <h2>{t.finalTitle}<br /><em>{t.finalAccent}</em></h2>
            <p>{t.finalBody}</p>
            <div className="value-pillars">
              <span><CircleDollarSign /> {t.pillars[0]}</span>
              <span><Zap /> {t.pillars[1]}</span>
              <span><GraduationCap /> {t.pillars[2]}</span>
            </div>
            <div className="final-actions">
              <a className="button light" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><Send /> {t.finalTg} <ExternalLink /></a>
              <a className="button outline" href={APP_URL} target="_blank" rel="noreferrer"><Rocket /> {t.finalApp} <ExternalLink /></a>
            </div>
          </motion.div>
          <div className="final-route" aria-hidden="true"><Route /><span /><span /><span /></div>
          <footer className="deck-footer"><span>{t.footer[0]}</span><span>{t.footer[1]}</span><a href="#top">{t.footer[2]}</a></footer>
        </section>
      </main>
    </div>
  );
}

export default App;