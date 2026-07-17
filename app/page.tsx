"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const ICON = "/assets/images/hhgc-icon-cream.png";

const Logo = ({ compact = false }: { compact?: boolean }) => (
  <img
    className={compact ? "brand-logo brand-logo--compact" : "brand-logo"}
    src="/assets/images/hhgc-logo-transparent.webp"
    alt="Hacker’s House Golf Club"
  />
);

const Arrow = () => <span aria-hidden="true">↗</span>;

function ImpactLab() {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const range = Math.max(1, section.current.offsetHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / range)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const rotation = -28 + progress * 58;
  const tilt = 8 - progress * 16;
  return (
    <section className="impact-lab" ref={section} id="impact">
      <div className="impact-sticky">
        <div className="impact-copy">
          <p className="eyebrow"><span /> The impact lab</p>
          <h2>Every strike<br /><em>tells a story.</em></h2>
          <p>From face contact to launch and carry, the simulator turns every swing into information you can actually use.</p>
          <div className="impact-progress"><i style={{ width: `${Math.max(6, progress * 100)}%` }} /><span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span></div>
        </div>
        <div className="club-stage" style={{ "--club-rotate": `${rotation}deg`, "--club-tilt": `${tilt}deg`, "--club-lift": `${Math.sin(progress * Math.PI) * -24}px` } as CSSProperties}>
          <span className="club-orbit orbit-a" /><span className="club-orbit orbit-b" />
          <img className="clubface" src="/images/clubface.webp" alt="Rendered forged iron face showing an impact mark" />
          <div className="impact-point"><span /><b>Impact</b><small>High center</small></div>
        </div>
        <div className="impact-data">
          <article style={{ opacity: Math.min(1, progress * 4) }}><span>01 / Face angle</span><strong>−1.2°</strong><small>Closed</small></article>
          <article style={{ opacity: Math.max(0, Math.min(1, (progress - .28) * 4)) }}><span>02 / Ball speed</span><strong>148.6</strong><small>MPH</small></article>
          <article style={{ opacity: Math.max(0, Math.min(1, (progress - .56) * 4)) }}><span>03 / Carry</span><strong>248</strong><small>Yards</small></article>
        </div>
        <img className="impact-hh" src={ICON} alt="" aria-hidden="true" />
      </div>
    </section>
  );
}

function LoungeRender() {
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = figure.current;
    if (!node) return;
    let frame = 0;
    let listening = false;
    const smoothstep = (start: number, end: number, value: number) => {
      const amount = Math.max(0, Math.min(1, (value - start) / (end - start)));
      return amount * amount * (3 - 2 * amount);
    };
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / travel));
      const screenPower = smoothstep(.05, .35, progress) * (1 - smoothstep(.7, .96, progress));
      const logoPower = smoothstep(.18, .46, progress) * (1 - smoothstep(.64, .88, progress));
      node.style.setProperty("--screen-power", screenPower.toFixed(3));
      node.style.setProperty("--screen-scale", (.015 + screenPower * .985).toFixed(3));
      node.style.setProperty("--screen-brightness", (.2 + screenPower * .8).toFixed(3));
      node.style.setProperty("--logo-power", logoPower.toFixed(3));
      node.style.setProperty("--logo-scale", (.9 + logoPower * .1).toFixed(3));
      node.style.setProperty("--logo-blur", `${((1 - logoPower) * 10).toFixed(2)}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
    };
    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      update();
    };
    if (!("IntersectionObserver" in window)) start();
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    }, { rootMargin: "30% 0px" }) : null;
    if (observer) observer.observe(node);
    update();
    return () => {
      observer?.disconnect();
      stop();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure ref={figure} className="visual-story__render lounge-render">
      <img src="/images/hh-lounge-render.webp" alt="Concept rendering of the Hacker’s House lounge and simulator bay" />
      <span className="sim-screen-display" aria-hidden="true">
        <img className="sim-screen-logo" src={ICON} alt="" />
      </span>
      <figcaption>Concept rendering • Lounge &amp; simulator bay</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="logo-link" href="#top" aria-label="Hacker’s House home">
          <Logo compact />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#membership">Membership</a>
          <a href="#events">Events</a>
          <a href="#location">Location</a>
        </nav>
        <a className="nav-cta" href="#updates">Opening updates <Arrow /></a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span></span><span></span></summary>
          <nav aria-label="Mobile navigation">
            <a href="#experience">Experience</a>
            <a href="#membership">Membership</a>
            <a href="#events">Events</a>
            <a href="#location">Location</a>
            <a href="#updates">Opening updates</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-render" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <img className="hero-hh" src={ICON} alt="" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Planned for western Lake Norman</p>
          <h1>Serious golf.<br /><em>Questionable</em> swings.</h1>
          <p className="hero-lead">
            A modern indoor golf clubhouse for focused practice, easygoing competition,
            and the kind of hospitality that turns one round into an entire evening.
          </p>
          <div className="hero-actions">
            <a className="button button--gold" href="#experience">Explore the club <Arrow /></a>
            <a className="text-link" href="#events">Events &amp; groups <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-index"><span>01</span><i /><span>06</span></div>
      </section>

      <section className="proof-strip" aria-label="Club highlights">
        <div><strong>03</strong><span>Premium launch bays</span></div>
        <div><strong>05</strong><span>Planned membership paths</span></div>
        <div><strong>04</strong><span>Ways to play</span></div>
        <div><strong>01</strong><span>Modern community clubhouse</span></div>
      </section>

      <section className="space-reveal" aria-label="Concept rendering of the Hacker’s House interior">
        <div className="space-reveal__image" />
        <div className="space-reveal__panel">
          <img src={ICON} alt="" aria-hidden="true" />
          <p className="eyebrow"><span /> Designed to feel different</p>
          <h2>Walk into<br />the House.</h2>
          <p>Three launch bays, layered lounge seating, warm hospitality, and a charcoal-led interior built to feel unmistakably local.</p>
          <a className="text-link" href="#impact">See the technology <span>↓</span></a>
        </div>
      </section>

      <section className="section intro" id="experience">
        <div className="section-label"><span>01</span> Inside the House</div>
        <div className="intro-copy">
          <p className="kicker">Golf is the reason.</p>
          <h2>The clubhouse is<br />why you stay.</h2>
          <p>Hacker’s House is designed as a year-round home for better golf and better company—premium enough to impress, approachable enough to become your regular spot.</p>
        </div>
        <div className="principles" aria-label="Ways to experience the club">
          <span>Practice</span><span>Social play</span><span>League nights</span><span>Events</span>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature feature--dark">
          <span className="feature-number">01</span>
          <div className="feature-icon">⌁</div>
          <h3>Premium simulator golf</h3>
          <p>Three bays planned for serious practice, casual rounds, competitive formats, and social play—without waiting on daylight or weather.</p>
          <ul><li>Year-round repetition</li><li>Shot data and feedback</li><li>Individual and group play</li></ul>
        </article>
        <article className="feature feature--green">
          <span className="feature-number">02</span>
          <div className="feature-icon">◉</div>
          <h3>Clubhouse hospitality</h3>
          <p>Comfortable seating, sports viewing, and a thoughtful beverage program built around the round—not added as an afterthought.</p>
          <ul><li>Beer, wine &amp; zero-proof</li><li>Warm, personal service</li><li>Room to settle in</li></ul>
        </article>
        <article className="feature feature--cream">
          <span className="feature-number">03</span>
          <div className="feature-icon">✦</div>
          <h3>Community programming</h3>
          <p>Leagues, challenges, tournaments, member gatherings, and local partnerships that create a reason to return.</p>
          <ul><li>Beginner-friendly formats</li><li>Competitive league nights</li><li>Local partnerships</li></ul>
        </article>
      </section>

      <ImpactLab />

      <section className="visual-story">
        <div className="visual-story__copy">
          <div className="section-label section-label--light"><span>02</span> Practice becomes a ritual</div>
          <h2>Real reps.<br /><em>Zero rain checks.</em></h2>
          <p>Come in for an hour of focused feedback or bring the crew for a full round. The experience shifts with the reason you walked in.</p>
        </div>
        <LoungeRender />
        <figure className="visual-story__stock visual-card--one visual-story__hospitality">
          <img src="/images/hh-hospitality-detail.webp" alt="Unbranded beer, wine, and zero-proof hospitality concept" />
          <figcaption>Hospitality concept • Beer, wine &amp; zero-proof</figcaption>
        </figure>
        <div className="visual-story__league visual-card--two" aria-label="Conceptual digital league standings">
          <div className="league-head"><img src={ICON} alt="" /><span>House League</span><small>Week 04 / Live</small></div>
          <div className="league-course"><span>Front nine</span><strong>−7</strong><small>Team low</small></div>
          <div className="league-table">
            <div><b>01</b><span>Fairway Social</span><strong>−7</strong></div>
            <div><b>02</b><span>Lake Effect</span><strong>−5</strong></div>
            <div><b>03</b><span>Westport Loop</span><strong>−3</strong></div>
          </div>
          <div className="league-foot"><span>Next match</span><b>Thursday / 7:00 PM</b></div>
        </div>
        <img className="visual-story__hh" src={ICON} alt="" aria-hidden="true" />
      </section>

      <section className="section membership" id="membership">
        <div className="section-label section-label--light"><span>02</span> Membership preview</div>
        <div className="membership-heading">
          <h2>Your game.<br />Your kind of club.</h2>
          <p>Five planned paths are being shaped around how often you play, how you want to improve, and how connected you want to be. Final benefits and pricing will be released before enrollment.</p>
        </div>
        <div className="membership-list">
          {[
            ["S", "Social", "Clubhouse connection"],
            ["P", "Practice", "Regular improvement"],
            ["C", "Club", "Frequent play"],
            ["F", "Founding", "Early access & recognition"],
            ["B", "Corporate", "Business & team use"],
          ].map(([letter, name, desc]) => (
            <div className="membership-row" key={name}>
              <span className="membership-letter">{letter}</span>
              <h3>{name}</h3><p>{desc}</p><span className="membership-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section events" id="events">
        <div className="section-label"><span>03</span> Events &amp; groups</div>
        <div className="events-heading">
          <h2>Bring the group.<br /><em>We’ll supply the fairways.</em></h2>
          <p>Designed for team outings, client entertainment, birthdays, fundraisers, celebrations, and private group play. No awkward icebreakers required.</p>
        </div>
        <div className="event-cards">
          {["Corporate outings", "Private parties", "Leagues & tournaments", "Community fundraisers"].map((title, i) => (
            <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{[
              "Team building, client entertainment, and company celebrations.",
              "Birthdays, neighborhood groups, and milestone gatherings.",
              "Recurring competition, seasonal formats, and member challenges.",
              "Schools, teams, nonprofits, and local causes in a polished setting."
            ][i]}</p></article>
          ))}
        </div>
      </section>

      <section className="location" id="location">
        <div className="location-copy">
          <div className="section-label section-label--light"><span>04</span> Built for western Lake Norman</div>
          <h2>Close to the lake.<br />Built for the community.</h2>
          <p>The first clubhouse is planned for the Denver / Westport area near NC 16 and NC 73, with convenient access for surrounding Lake Norman communities.</p>
          <p className="fine-print">Exact address to be announced after site selection, lease review, and required approvals.</p>
        </div>
        <div className="location-orbit" aria-hidden="true">
          <span className="orbit orbit-1" /><span className="orbit orbit-2" /><span className="orbit orbit-3" />
          <div className="location-marker"><img src={ICON} alt="" /><span>Denver / Westport</span></div>
          <span className="town town-1">Huntersville</span><span className="town town-2">Cornelius</span><span className="town town-3">Stanley</span><span className="town town-4">Iron Station</span>
        </div>
      </section>

      <section className="updates" id="updates">
        <p className="eyebrow"><span /> Opening updates</p>
        <h2>Get in before<br />the first tee time.</h2>
        <p>The Founding List will open after registration, confirmations, and owner notifications are fully tested.</p>
        <a className="button button--cream" href="#updates">Registration opens soon <Arrow /></a>
        <div className="update-notes"><span>Membership releases</span><span>League announcements</span><span>Founding access</span></div>
      </section>

      <section className="faq section">
        <div className="section-label"><span>05</span> Frequently asked</div>
        <h2>What we can say now.</h2>
        <div className="faq-list">
          {[
            ["Where will Hacker’s House be located?", "The first clubhouse is planned for the Denver / Westport area near NC 16 and NC 73. The exact address will be announced after the location and lease are finalized."],
            ["How many simulator bays are planned?", "The opening plan includes three premium simulator bays, with the facility designed to support future growth."],
            ["Will memberships be available?", "Yes. Social, Practice, Club, Founding, and Corporate paths are planned. Pricing and final benefits will be released before enrollment."],
            ["Can groups and businesses host events?", "Private events, corporate outings, fundraisers, celebrations, and group play are part of the planned experience."],
          ].map(([q, a], i) => <details key={q}><summary><span>0{i + 1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}
        </div>
      </section>

      <footer>
        <Logo />
        <p>Serious Golf. Questionable Swings.</p>
        <div className="footer-meta"><span>Denver / Westport &amp; western Lake Norman, NC</span><span>Concept site • Owner-only review</span></div>
      </footer>
    </main>
  );
}
