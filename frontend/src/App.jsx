import { useEffect, useState } from "react";
import "./App.css";
import { checkBackendHealth } from "./services/api";

const LANGUAGES = [
  { name: "Kannada", native: "ಕನ್ನಡ", script: "ಕ" },
  { name: "Hindi", native: "हिन्दी", script: "अ" },
  { name: "English", native: "English", script: "A" },
  { name: "Tamil", native: "தமிழ்", script: "த" },
  { name: "Telugu", native: "తెలుగు", script: "త" },
  { name: "Malayalam", native: "മലയാളം", script: "മ" },
  { name: "Marathi", native: "मराठी", script: "म" },
  { name: "Bengali", native: "বাংলা", script: "অ" },
  { name: "Gujarati", native: "ગુજરાતી", script: "ગ" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ", script: "ਪ" },
  { name: "Urdu", native: "اردو", script: "ا" },
];

const ROUTES = [
  { label: "Home", path: "/" },
  { label: "How it works", path: "/how-it-works" },
  { label: "Languages", path: "/languages" },
  { label: "About", path: "/about" },
];

function getPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

function Header({ path, navigate }) {
  return (
    <header className="bb-header">
      <a
        className="bb-brand"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          navigate("/");
        }}
      >
        <span className="bb-brand-mark" aria-hidden="true">
          <span className="bubble bubble-orange">••</span>
          <span className="bubble bubble-green">•</span>
        </span>

        <span className="bb-brand-copy">
          <strong>BhashaBridge</strong>
          <small>People · Languages · Closer Together</small>
        </span>
      </a>

      <nav className="bb-nav" aria-label="Main navigation">
        {ROUTES.map((route) => (
          <a
            key={route.path}
            href={route.path}
            className={path === route.path ? "active" : ""}
            aria-current={path === route.path ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              navigate(route.path);
            }}
          >
            {route.label === "Home" && (
              <span className="nav-home-icon">⌂</span>
            )}
            {route.label}
          </a>
        ))}
      </nav>

      <div className="bb-connection">
        <span className="connection-dot" />
        <span>
          <strong>Connected</strong>
          <small>Ready for conversation</small>
        </span>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  const links = [
    { label: "Privacy", path: "/about" },
    { label: "Terms", path: "/about" },
    { label: "Support", path: "/how-it-works" },
    { label: "Contact", path: "/about" },
  ];

  return (
    <footer className="bb-footer">
      <div className="footer-silhouette" aria-hidden="true">
        ⌂　♜　⌂　♜　⌂　♜　⌂　♜　⌂　♜　⌂
      </div>

      <div className="footer-content">
        <span>© 2026 BhashaBridge</span>
        <span className="footer-divider">|</span>
        <span>Communication, without barriers.</span>

        <div className="footer-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(event) => {
                event.preventDefault();
                navigate(link.path);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function LanguageSelect({
  id,
  value,
  onChange,
  label,
  hint,
}) {
  const selected =
    LANGUAGES.find((language) => language.name === value) ||
    LANGUAGES[0];

  return (
    <div className="language-control">
      <label htmlFor={id}>{label}</label>

      <div
        className={`select-shell ${
          id === "source-language"
            ? "select-source"
            : "select-target"
        }`}
      >
        <span className="language-symbol" aria-hidden="true">
          {selected.script}
        </span>

        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {LANGUAGES.map((language) => (
            <option key={language.name} value={language.name}>
              {language.name} · {language.native}
            </option>
          ))}
        </select>

        <span className="select-chevron" aria-hidden="true">
          ⌄
        </span>
      </div>

      <small>{hint}</small>
    </div>
  );
}

function HomePage({ navigate }) {
  const [sourceLanguage, setSourceLanguage] = useState("Kannada");
  const [targetLanguage, setTargetLanguage] = useState("Hindi");
  const [demoActive, setDemoActive] = useState(false);

  function swapLanguages() {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  }

  return (
    <main>
      <section className="bb-hero">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span />
            LANGUAGE IS A BRIDGE
            <span />
          </span>

          <h1>
            Different Languages.
            <br />
            <em>Same Understanding.</em>
          </h1>

          <p>
            Real-time voice translation to help people communicate
            naturally,
            <br className="desktop-break" />
            across languages, anywhere in India and beyond.
          </p>
        </div>

        <section
          className="language-card"
          aria-label="Conversation language setup"
        >
          <div className="language-card-heading">
            <div>
              <span className="card-eyebrow">
                YOUR CONVERSATION
              </span>
              <h2>Select your conversation languages</h2>
            </div>

            <button
              className="swap-top"
              type="button"
              onClick={swapLanguages}
            >
              <span aria-hidden="true">⇄</span>
              Swap
            </button>
          </div>

          <div className="language-selectors">
            <LanguageSelect
              id="source-language"
              value={sourceLanguage}
              onChange={setSourceLanguage}
              label="You speak"
              hint="Your preferred language"
            />

            <button
              className="swap-middle"
              type="button"
              onClick={swapLanguages}
              aria-label="Swap languages"
            >
              ⇄
            </button>

            <LanguageSelect
              id="target-language"
              value={targetLanguage}
              onChange={setTargetLanguage}
              label="They speak"
              hint="Language you want to understand"
            />
          </div>

          <div className="translation-direction">
            <span className="direction-chip">
              {sourceLanguage}
            </span>
            <span className="direction-line">⟷</span>
            <span className="direction-chip">
              {targetLanguage}
            </span>
            <span className="direction-note">
              Two-way conversation
            </span>
          </div>

          <button
            className={`start-conversation ${
              demoActive ? "is-active" : ""
            }`}
            onClick={() => setDemoActive((active) => !active)}
            type="button"
          >
            <span className="mic-icon" aria-hidden="true">
              {demoActive ? "Ⅱ" : "♩"}
            </span>

            <span className="start-copy">
              <strong>
                {demoActive
                  ? "End demo session"
                  : "Start Conversation"}
              </strong>
              <small>
                {demoActive
                  ? "Demo mode is active"
                  : "Click to begin real-time translation"}
              </small>
            </span>

            <span className="start-arrow">→</span>
          </button>

          {demoActive && (
            <div className="demo-message" role="status">
              <span className="demo-pulse" />
              Demo mode is active. Live audio and translation are
              not connected yet.
            </div>
          )}

          <div className="feature-strip">
            <div className="feature-item">
              <span className="feature-icon voice-icon">≋</span>
              <span>
                <strong>Real-time</strong>
                <small>Voice translation</small>
              </span>
            </div>

            <div className="feature-item">
              <span className="feature-icon people-icon">♧</span>
              <span>
                <strong>Multiple</strong>
                <small>Indian languages</small>
              </span>
            </div>

            <div className="feature-item">
              <span className="feature-icon shield-icon">♢</span>
              <span>
                <strong>Privacy-first</strong>
                <small>Designed with care</small>
              </span>
            </div>
          </div>
        </section>

        <div className="home-more">
          <span>Curious how it works?</span>
          <button
            type="button"
            onClick={() => navigate("/how-it-works")}
          >
            Explore the experience →
          </button>
        </div>
      </section>

      <section className="benefits">
        <article className="benefit-card">
          <span className="benefit-icon benefit-blue">☏</span>
          <div>
            <h3>Talk Naturally</h3>
            <p>Speak in your language.<br />No need to type.</p>
          </div>
        </article>

        <article className="benefit-card">
          <span className="benefit-icon benefit-purple">♧</span>
          <div>
            <h3>Understand Clearly</h3>
            <p>Designed for translated<br />conversations.</p>
          </div>
        </article>

        <article className="benefit-card">
          <span className="benefit-icon benefit-orange">✦</span>
          <div>
            <h3>Connect Anywhere</h3>
            <p>Bringing people closer<br />across regions.</p>
          </div>
        </article>

        <article className="benefit-card">
          <span className="benefit-icon benefit-red">♡</span>
          <div>
            <h3>For a United India</h3>
            <p>Breaking language barriers<br />for better opportunities.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

function HowItWorksPage({ navigate }) {
  const steps = [
    {
      number: "01",
      title: "Choose your languages",
      text: "Choose the language you speak and the language you want to understand. Each participant will be able to use their own language preference.",
    },
    {
      number: "02",
      title: "Speak naturally",
      text: "The planned live experience will capture speech through the microphone and send it through the speech-processing pipeline.",
    },
    {
      number: "03",
      title: "Translate the conversation",
      text: "Speech recognition, machine translation, and speech synthesis will work together to deliver translated speech.",
    },
    {
      number: "04",
      title: "Continue both ways",
      text: "The goal is a two-way conversation where both participants can speak naturally without typing.",
    },
  ];

  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="page-kicker">A SIMPLE WAY TO CONNECT</span>
        <h1>How BhashaBridge works</h1>
        <p>
          Four steps toward conversations that feel natural,
          even when you speak different languages.
        </p>
      </section>

      <section className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>

      <div className="status-note">
        <span className="status-note-icon">i</span>
        <p>
          <strong>Current development stage</strong>
          <br />
          The frontend and API health check are working.
          Live microphone streaming, speech recognition,
          translation, and translated voice playback still
          need to be integrated.
        </p>
      </div>

      <div className="page-cta">
        <button type="button" onClick={() => navigate("/")}>
          Set up a conversation →
        </button>
      </div>
    </main>
  );
}

function LanguagesPage({ navigate }) {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="page-kicker">
          MANY VOICES, ONE CONNECTION
        </span>
        <h1>Languages that bring us closer</h1>
        <p>
          BhashaBridge is being designed with India's
          linguistic diversity in mind.
        </p>
      </section>

      <section className="languages-grid">
        {LANGUAGES.map((language, index) => (
          <article className="language-tile" key={language.name}>
            <span className={`language-tile-mark tone-${index % 5}`}>
              {language.script}
            </span>

            <div>
              <h2>{language.name}</h2>
              <p>{language.native}</p>
            </div>

            <span className="language-tile-arrow">↗</span>
          </article>
        ))}
      </section>

      <p className="language-disclaimer">
        These languages are available in the interface selector.
        Actual speech translation support depends on the models
        and services integrated into the application.
      </p>

      <div className="page-cta">
        <button type="button" onClick={() => navigate("/")}>
          Choose languages →
        </button>
      </div>
    </main>
  );
}

function AboutPage({ navigate }) {
  return (
    <main className="inner-page about-page">
      <section className="page-hero">
        <span className="page-kicker">
          PEOPLE · LANGUAGES · CLOSER TOGETHER
        </span>
        <h1>Every conversation matters.</h1>
        <p>
          BhashaBridge aims to help people understand one another
          without making language a barrier.
        </p>
      </section>

      <section className="about-feature">
        <div className="about-art" aria-hidden="true">
          <span className="about-bubble">ನಮಸ್ಕಾರ</span>
          <span className="about-bridge">↔</span>
          <span className="about-bubble about-bubble-two">नमस्ते</span>
        </div>

        <div className="about-copy">
          <span className="card-eyebrow">OUR PURPOSE</span>
          <h2>Technology should bring people closer.</h2>
          <p>
            From family calls to everyday conversations,
            language can create distance where there should be
            connection. BhashaBridge aims to make multilingual
            conversations more direct, comfortable, and human.
          </p>
          <p>
            We are building in stages, starting with the
            interface and API foundation before adding live
            speech capabilities.
          </p>
          <button
            type="button"
            onClick={() => navigate("/how-it-works")}
          >
            See how it works →
          </button>
        </div>
      </section>

      <section className="values-row">
        <article>
          <span>01</span>
          <h3>Human first</h3>
          <p>Keep the conversation at the center.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Built for diversity</h3>
          <p>Respect regional languages and voices.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Honest by design</h3>
          <p>Be clear about what works today and what is in development.</p>
        </article>
      </section>
    </main>
  );
}

function NotFoundPage({ navigate }) {
  return (
    <main className="inner-page not-found">
      <span className="page-kicker">404 · PAGE NOT FOUND</span>
      <h1>This path isn't part of the conversation.</h1>
      <button type="button" onClick={() => navigate("/")}>
        Return home
      </button>
    </main>
  );
}

export default function App() {
  const [path, setPath] = useState(getPath);
  const [backendStatus, setBackendStatus] = useState("checking");

useEffect(() => {
  checkBackendHealth()
    .then(() => setBackendStatus("connected"))
    .catch(() => setBackendStatus("disconnected"));
}, []);

  useEffect(() => {
    function handlePopState() {
      setPath(getPath());
      window.scrollTo(0, 0);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextPath) {
    if (nextPath !== getPath()) {
      window.history.pushState({}, "", nextPath);
    }

    setPath(nextPath);
    window.scrollTo(0, 0);
  }

  let page;

  switch (path) {
    case "/":
      page = <HomePage navigate={navigate} />;
      break;
    case "/how-it-works":
      page = <HowItWorksPage navigate={navigate} />;
      break;
    case "/languages":
      page = <LanguagesPage navigate={navigate} />;
      break;
    case "/about":
      page = <AboutPage navigate={navigate} />;
      break;
    default:
      page = <NotFoundPage navigate={navigate} />;
  }

return (
  <div className="bb-page">
    <Header path={path} navigate={navigate} />

    <div
      className={`backend-indicator ${backendStatus}`}
      role="status"
      aria-live="polite"
    >
      <span className="backend-indicator-dot" />
      Backend: {backendStatus}
    </div>

    {page}

    <Footer navigate={navigate} />
  </div>
);
}
