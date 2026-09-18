/* =========================================================
   MERIDIAN — tokens
   ========================================================= */
:root{
  --ink:        #14140F;
  --panel:      #1B1A14;
  --panel-2:    #221F17;
  --brass:      #B08D57;
  --brass-light:#E4C793;
  --parchment:  #ECE6D6;
  --parchment-dim:#B9B2A0;
  --graphite:   #6B6A5F;
  --steel:      #9AA0A6;

  --serif:  "Fraunces", "Iowan Old Style", Georgia, serif;
  --sans:   "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --container: 1180px;
  --ease: cubic-bezier(.16,.8,.24,1);
}

*,*::before,*::after{ box-sizing: border-box; }
html{ scroll-behavior: smooth; }
body{
  margin:0;
  background: var(--ink);
  color: var(--parchment);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3{ font-family: var(--serif); font-weight: 600; margin: 0; letter-spacing: -0.01em; }
p{ margin: 0; color: var(--parchment-dim); }
a{ color: inherit; text-decoration: none; }
img,svg{ display:block; max-width:100%; }
.sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }

@media (prefers-reduced-motion: reduce){
  *{ animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior:auto !important; }
}

/* =========================================================
   Progress rail
   ========================================================= */
.progress-rail{
  position: fixed; top:0; left:0; width:100%; height:2px;
  background: rgba(176,141,87,0.12); z-index: 60;
}
.progress-fill{
  height:100%; width:0%; background: var(--brass);
  transition: width 80ms linear;
}

/* =========================================================
   Nav
   ========================================================= */
.nav{
  position: fixed; top:0; left:0; right:0; z-index: 50;
  display:flex; align-items:center; justify-content: space-between;
  padding: 22px 5vw 20px;
  background: linear-gradient(to bottom, rgba(20,20,15,0.85), transparent);
  transition: background 300ms var(--ease), padding 300ms var(--ease), border-color 300ms;
  border-bottom: 1px solid transparent;
}
.nav.is-scrolled{
  background: rgba(20,20,15,0.92);
  backdrop-filter: blur(10px);
  padding: 14px 5vw;
  border-bottom-color: rgba(176,141,87,0.15);
}
.nav__mark{
  font-family: var(--serif); font-weight: 600; font-size: 1.05rem;
  letter-spacing: 0.08em; color: var(--parchment);
}
.nav__links{ display:flex; gap: 36px; }
.nav__links a{
  font-size: 0.88rem; color: var(--parchment-dim);
  transition: color 200ms;
}
.nav__links a:hover{ color: var(--brass-light); }
.nav__cta{
  border: 1px solid var(--brass); border-radius: 999px;
  padding: 8px 20px; font-size: 0.85rem; color: var(--brass-light);
  transition: background 200ms, color 200ms;
}
.nav__cta:hover{ background: var(--brass); color: var(--ink); }
.nav__toggle{
  display:none; flex-direction:column; justify-content:center; gap:5px;
  width:34px; height:34px; background:none; border:none; cursor:pointer;
}
.nav__toggle span{ height:1px; background: var(--parchment); width:100%; }

/* =========================================================
   Watch component (shared by hero + assembly)
   ========================================================= */
.watch-stage{
  width: 320px; height: 320px;
  perspective: 1400px;
  margin: 0 auto;
}
.watch-stage--assembly{ width: 380px; height: 380px; }

.watch{
  position: relative; width:100%; height:100%;
  transform-style: preserve-3d;
  transform: rotateX(8deg) rotateY(-18deg);
  will-change: transform;
}
.watch__case{
  position:absolute; inset:0; border-radius:50%;
  background:
    radial-gradient(circle at 32% 28%, #E7D2A0 0%, #B08D57 32%, #6E4F2A 72%, #4A3620 100%);
  box-shadow:
    0 30px 60px -20px rgba(0,0,0,0.65),
    inset 0 2px 4px rgba(255,255,255,0.25),
    inset 0 -6px 14px rgba(0,0,0,0.5);
  transition: box-shadow 500ms;
}
.watch__case.is-focused{
  box-shadow:
    0 30px 60px -20px rgba(0,0,0,0.65),
    inset 0 2px 4px rgba(255,255,255,0.4),
    inset 0 -6px 14px rgba(0,0,0,0.4),
    0 0 0 3px rgba(228,199,147,0.55);
}
.watch__bezel{
  position:absolute; inset: 9%; border-radius:50%;
  background: radial-gradient(circle at 35% 30%, #2A2A24, #14140F 70%);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,0.5), inset 0 6px 18px rgba(0,0,0,0.7);
  transform: translateZ(8px);
}
.watch__dial{
  position:absolute; inset: 15%; border-radius:50%;
  background: radial-gradient(circle at 38% 30%, #232019, #14140F 75%);
  transform: translateZ(16px);
  display:flex; align-items:center; justify-content:center;
}
.watch__indices{ position:absolute; inset:0; }
.tick{
  position:absolute; left:50%; top:6%; width:2px; height:9%;
  background: var(--brass-light); transform-origin: 50% 650%;
  border-radius: 2px; opacity: .85;
}
.tick--major{ width:3px; background: var(--parchment); }
.watch__brand{
  position:absolute; top:30%; font-family: var(--serif); font-size:0.62rem;
  letter-spacing: 0.14em; color: var(--parchment-dim);
}
.watch__date{
  position:absolute; right:20%; top:48%; transform: translateY(-50%);
  font-size: 0.55rem; color: var(--ink); background: var(--parchment-dim);
  padding: 1px 4px; border-radius: 2px; font-family: var(--sans);
}
.watch__hand{
  position:absolute; left:50%; bottom:50%; transform-origin: 50% 100%;
  border-radius: 3px 3px 0 0; background: var(--parchment);
  transition: transform 180ms cubic-bezier(.4,1.8,.6,1);
}
.watch__hand--hour{ width:5px; height:22%; margin-left:-2.5px; background: var(--brass-light); }
.watch__hand--minute{ width:3.5px; height:32%; margin-left:-1.75px; }
.watch__hand--second{ width:1.5px; height:34%; margin-left:-0.75px; background:#C0473C; }
.watch__pin{
  position:absolute; width:8px; height:8px; border-radius:50%;
  background: var(--brass-light); box-shadow: 0 0 0 2px var(--ink);
}
.watch__crystal{
  position:absolute; inset: 9%; border-radius:50%;
  background: linear-gradient(115deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.04) 30%, transparent 55%);
  transform: translateZ(24px);
  pointer-events:none;
  transition: opacity 500ms;
}
.watch__grooves{
  position:absolute; inset:8%; border-radius:50%; opacity:0;
  background: repeating-radial-gradient(circle, rgba(176,141,87,0.5) 0 1px, transparent 1px 6px);
  transition: opacity 600ms, transform 600ms;
  transform: scale(0.7);
}
.watch__grooves.is-active{ opacity:0.55; transform: scale(1); }
.watch__movement-overlay{
  position:absolute; inset:15%; border-radius:50%; overflow:hidden;
  opacity:0; transition: opacity 500ms; transform: translateZ(15px);
}
.watch__movement-overlay.is-active{ opacity:0.9; }
.gear{
  position:absolute; border-radius:50%;
  background: conic-gradient(var(--brass) 0 10deg, transparent 10deg 24deg);
  background-size: 100% 100%;
}
.gear::before{
  content:""; position:absolute; inset: 30%; border-radius:50%; background: var(--ink);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,0.6);
}
.gear--a{ width:46%; height:46%; top:8%; left:10%; animation: spin 9s linear infinite; }
.gear--b{ width:30%; height:30%; bottom:12%; right:14%; animation: spin 6s linear infinite reverse; }

@keyframes spin{ to{ transform: rotate(360deg); } }

/* =========================================================
   Hero
   ========================================================= */
.hero{
  min-height: 100vh; display:flex; flex-direction:column; align-items:center;
  justify-content:center; padding: 140px 6vw 80px; text-align:center;
  gap: 56px;
}
.hero__watch-wrap{ filter: drop-shadow(0 40px 60px rgba(0,0,0,0.55)); }
.hero__copy{ max-width: 620px; display:flex; flex-direction:column; align-items:center; gap:22px; }
.hero__title{ font-size: clamp(2.6rem, 6vw, 4.6rem); line-height: 1.02; color: var(--parchment); }
.hero__sub{ font-size: 1.05rem; max-width: 480px; }
.hero__scroll{
  display:flex; flex-direction:column; align-items:center; gap:10px;
  color: var(--brass-light); font-size: 0.82rem; margin-top: 18px;
}
.hero__scroll svg{ animation: bob 1.8s ease-in-out infinite; }
@keyframes bob{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(6px); } }

/* =========================================================
   Assembly (pinned scroll story)
   ========================================================= */
.assembly{ position: relative; height: 420vh; }
.assembly__pin{
  position: sticky; top:0; height:100vh; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
}
.assembly__callouts{
  position:absolute; inset:0; pointer-events:none;
}
.callout{
  position:absolute; left: 8vw; top:50%; transform: translateY(-50%) translateX(-16px);
  max-width: 340px; opacity:0; transition: opacity 500ms var(--ease), transform 500ms var(--ease);
}
.callout.is-active{ opacity:1; transform: translateY(-50%) translateX(0); }
.callout:nth-child(even){ left:auto; right:8vw; }
.callout__num{
  display:block; font-size: 0.78rem; color: var(--brass-light); margin-bottom: 10px;
  font-family: var(--sans); letter-spacing: 0.02em;
}
.callout h3{ font-size: 1.6rem; color: var(--parchment); margin-bottom: 12px; }
.callout p{ font-size: 0.95rem; }

/* =========================================================
   Movement
   ========================================================= */
.movement{
  display:grid; grid-template-columns: 1fr 1fr; align-items:center; gap: 6vw;
  padding: 140px 6vw; max-width: var(--container); margin: 0 auto;
}
.movement__ring{
  position:relative; width: 340px; height:340px; margin:0 auto;
  border-radius:50%; background: radial-gradient(circle at 35% 30%, var(--panel-2), var(--ink) 75%);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,0.25), inset 0 10px 30px rgba(0,0,0,0.6);
}
.gear--large{ width:60%; height:60%; top:20%; left:20%; animation: spin 24s linear infinite; }
.gear--small{ width:22%; height:22%; }
.gear--small-1{ top:12%; right:14%; animation: spin 8s linear infinite reverse; }
.gear--small-2{ bottom:14%; left:16%; animation: spin 11s linear infinite; }
.jewel{ position:absolute; width:14px; height:14px; border-radius:50%; background: #B23B2E; box-shadow: inset 0 2px 3px rgba(255,255,255,0.4), 0 0 6px rgba(178,59,46,0.6); }
.jewel--1{ top:18%; left:44%; }
.jewel--2{ bottom:22%; right:22%; }
.jewel--3{ bottom:30%; left:24%; }

.movement__specs h2{ font-size: clamp(1.8rem,3vw,2.4rem); color: var(--parchment); margin-bottom: 16px; }
.movement__intro{ font-size: 1rem; max-width: 420px; margin-bottom: 32px; }
.spec-list{ display:flex; flex-direction:column; gap:0; margin:0; }
.spec-list > div{
  display:flex; justify-content:space-between; padding: 14px 0;
  border-top: 1px solid rgba(176,141,87,0.18);
}
.spec-list dt{ color: var(--parchment-dim); font-size:0.92rem; }
.spec-list dd{ margin:0; color: var(--parchment); font-weight:500; font-size:0.92rem; }

/* =========================================================
   Materials
   ========================================================= */
.materials{ padding: 120px 0 140px; }
.materials__head{ max-width: var(--container); margin: 0 auto 50px; padding: 0 6vw; }
.materials__head h2{ font-size: clamp(1.8rem,3vw,2.4rem); color: var(--parchment); margin-bottom:14px; }
.materials__head p{ max-width: 420px; }
.materials__rail{
  display:flex; gap: 26px; overflow-x:auto; padding: 10px 6vw 30px;
  scroll-snap-type: x proximity; perspective: 1000px;
}
.materials__rail::-webkit-scrollbar{ height:4px; }
.materials__rail::-webkit-scrollbar-thumb{ background: rgba(176,141,87,0.4); border-radius:4px; }
.material-card{
  flex: 0 0 280px; scroll-snap-align: start; padding: 26px;
  background: var(--panel); border-radius: 4px; border: 1px solid rgba(176,141,87,0.14);
  transform-style: preserve-3d; transition: transform 120ms ease-out, border-color 300ms;
}
.material-card:hover{ border-color: rgba(176,141,87,0.4); }
.material-card__swatch{
  width:100%; height: 150px; border-radius: 3px; margin-bottom: 20px;
}
.swatch--steel{ background: linear-gradient(135deg,#dfe3e6,#9aa0a6 45%,#6c7075); }
.swatch--titanium{ background: linear-gradient(135deg,#c9c6c0,#8a877f 50%,#565349); }
.swatch--rosegold{ background: linear-gradient(135deg,#f3cfc2,#c98a70 50%,#8a5340); }
.swatch--dlc{ background: linear-gradient(135deg,#3a3a3a,#101010 60%,#000); }
.material-card h3{ font-size: 1.15rem; color: var(--parchment); margin-bottom:8px; }
.material-card p{ font-size: 0.88rem; }

/* =========================================================
   Editions
   ========================================================= */
.editions{ padding: 60px 6vw 140px; max-width: var(--container); margin: 0 auto; }
.editions__title{ font-size: clamp(2rem,4vw,3rem); color: var(--parchment); margin-bottom: 90px; }
.edition{
  display:grid; grid-template-columns: 0.9fr 1.1fr; align-items:center; gap:6vw;
  padding: 60px 0; border-top: 1px solid rgba(176,141,87,0.16);
}
.edition--reverse{ direction: rtl; }
.edition--reverse .edition__text{ direction: ltr; }
.edition__mini{ display:flex; justify-content:center; }
.mini-watch{
  width: 200px; height:200px; border-radius:50%; position:relative;
  box-shadow: 0 30px 50px -20px rgba(0,0,0,0.6), inset 0 0 0 10px var(--panel-2);
}
.mini-watch::before, .mini-watch::after{
  content:""; position:absolute; left:50%; bottom:50%; transform-origin:50% 100%;
  background: var(--parchment); border-radius:2px;
}
.mini-watch::before{ width:4px; height:26%; margin-left:-2px; transform: rotate(35deg); }
.mini-watch::after{ width:3px; height:34%; margin-left:-1.5px; transform: rotate(160deg); }
.mini-watch--blue{ background: radial-gradient(circle at 35% 30%, #3c5a78, #14202c 75%); }
.mini-watch--gold{ background: radial-gradient(circle at 35% 30%, #d8b581, #6e4f2a 75%); }
.mini-watch--black{ background: radial-gradient(circle at 35% 30%, #34322c, #0c0b09 75%); }
.edition__eyebrow{ font-size:0.85rem; color: var(--brass-light); }
.edition__text h3{ font-size: 1.7rem; color: var(--parchment); margin: 10px 0 14px; max-width: 420px; }
.edition__text p{ max-width: 420px; margin-bottom: 20px; }
.edition__price{ font-family: var(--serif); font-size: 1.2rem; color: var(--parchment); }

/* =========================================================
   CTA
   ========================================================= */
.cta{ padding: 100px 6vw 140px; }
.cta__inner{
  max-width: 640px; margin: 0 auto; text-align:center;
  background: var(--panel); border: 1px solid rgba(176,141,87,0.22);
  padding: 70px 6vw; border-radius: 6px;
}
.cta__inner h2{ font-size: clamp(1.7rem,3vw,2.2rem); color: var(--parchment); margin-bottom:16px; }
.cta__inner p{ margin-bottom: 32px; }
.cta__form{ display:flex; gap:12px; max-width: 420px; margin: 0 auto; }
.cta__form input{
  flex:1; padding: 14px 16px; background: var(--ink); border: 1px solid rgba(176,141,87,0.3);
  border-radius: 4px; color: var(--parchment); font-family: var(--sans); font-size:0.95rem;
}
.cta__form input:focus{ outline: 2px solid var(--brass); outline-offset:1px; }
.cta__form button{
  padding: 14px 22px; background: var(--brass); color: var(--ink); border:none;
  border-radius: 4px; font-family: var(--sans); font-weight:600; font-size:0.9rem;
  cursor:pointer; transition: background 200ms, transform 150ms;
}
.cta__form button:hover{ background: var(--brass-light); }
.cta__form button:active{ transform: scale(0.97); }
.cta__note{ margin-top:16px; font-size:0.88rem; min-height: 1.2em; color: var(--brass-light); }

/* =========================================================
   Footer
   ========================================================= */
.footer{ padding: 40px 6vw 50px; border-top: 1px solid rgba(176,141,87,0.14); }
.footer__top{ display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; flex-wrap:wrap; gap:20px; }
.footer__mark{ font-family: var(--serif); letter-spacing:0.08em; color: var(--parchment); }
.footer__links{ display:flex; gap:26px; }
.footer__links a{ font-size:0.85rem; color: var(--parchment-dim); }
.footer__links a:hover{ color: var(--brass-light); }
.footer__fine{ font-size:0.78rem; color: var(--graphite); }

/* =========================================================
   Reveal-on-scroll (single orchestrated fade/slide, once)
   ========================================================= */
.reveal{ opacity:0; transform: translateY(26px); transition: opacity 700ms var(--ease), transform 700ms var(--ease); }
.reveal.is-visible{ opacity:1; transform: translateY(0); }

/* =========================================================
   Responsive
   ========================================================= */
@media (max-width: 900px){
  .nav__links{ display:none; }
  .nav__toggle{ display:flex; }
  .nav.is-open .nav__links{
    display:flex; flex-direction:column; position:absolute; top:100%; left:0; right:0;
    background: rgba(20,20,15,0.98); padding: 24px 6vw; gap:18px;
  }
  .movement{ grid-template-columns: 1fr; text-align:center; }
  .movement__intro{ margin-left:auto; margin-right:auto; }
  .edition, .edition--reverse{ grid-template-columns: 1fr; direction:ltr; text-align:center; }
  .edition__text p, .edition__text h3{ margin-left:auto; margin-right:auto; }
  .callout{ max-width: 78vw; left:6vw !important; right:auto !important; }
  .assembly{ height: 500vh; }
}
@media (max-width: 560px){
  .watch-stage{ width:240px; height:240px; }
  .watch-stage--assembly{ width:260px; height:260px; }
  .cta__form{ flex-direction:column; }
}
