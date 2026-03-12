/* =========================================
   INAM KHAN PORTFOLIO — ADVANCED JS
   ========================================= */

/* ---- SVG gradient defs for preloader ---- */
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.pre-logo');
  if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
    defs.innerHTML = `
      <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d4ff"/>
        <stop offset="50%" stop-color="#00ff9d"/>
        <stop offset="100%" stop-color="#14b8a6"/>
      </linearGradient>
      <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d4ff"/>
        <stop offset="100%" stop-color="#00ff9d"/>
      </linearGradient>`;
    svg.prepend(defs);
  }
});

/* ---- PRELOADER ---- */
const preloader = document.getElementById('preloader');
const preBar    = document.getElementById('preBarFill');
const prePct    = document.getElementById('prePercent');
let pct = 0;
const pTimer = setInterval(() => {
  pct += Math.random() * 12 + 4;
  if (pct >= 100) { pct = 100; clearInterval(pTimer); }
  preBar.style.width = pct + '%';
  prePct.textContent = Math.round(pct) + '%';
}, 80);
window.addEventListener('load', () => {
  setTimeout(() => preloader.classList.add('out'), 1800);
});

/* ---- CURSOR ---- */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});
(function loopRing(){
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(loopRing);
})();
document.querySelectorAll('a,button,.proj-card,.glass,.stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

/* ---- CANVAS PARTICLES ---- */
const cvs = document.getElementById('bg-canvas');
const cx  = cvs.getContext('2d');
function resizeCvs(){ cvs.width = window.innerWidth; cvs.height = window.innerHeight; }
resizeCvs(); window.addEventListener('resize', resizeCvs);

const COLS = ['0,212,255','0,255,157','124,58,237','56,232,255'];
class Dot {
  reset(){
    this.x = Math.random() * cvs.width;
    this.y = Math.random() * cvs.height;
    this.r = Math.random() * 1.8 + .4;
    this.vx = (Math.random()-.5) * .25;
    this.vy = (Math.random()-.5) * .25;
    this.a  = Math.random() * .45 + .1;
    this.c  = COLS[Math.floor(Math.random()*COLS.length)];
  }
  constructor(){ this.reset(); }
  step(){
    this.x += this.vx; this.y += this.vy;
    if(this.x<0||this.x>cvs.width||this.y<0||this.y>cvs.height) this.reset();
  }
  draw(){
    cx.beginPath(); cx.arc(this.x,this.y,this.r,0,Math.PI*2);
    cx.fillStyle=`rgba(${this.c},${this.a})`; cx.fill();
  }
}
const dots = Array.from({length:130}, () => new Dot());

function drawLines(){
  for(let i=0;i<dots.length;i++){
    for(let j=i+1;j<dots.length;j++){
      const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
      const d=Math.hypot(dx,dy);
      if(d<110){
        cx.beginPath();
        cx.moveTo(dots[i].x,dots[i].y);
        cx.lineTo(dots[j].x,dots[j].y);
        cx.strokeStyle=`rgba(0,212,255,${.055*(1-d/110)})`;
        cx.lineWidth=.6; cx.stroke();
      }
    }
  }
}
(function frame(){
  cx.clearRect(0,0,cvs.width,cvs.height);
  dots.forEach(d=>{d.step();d.draw();});
  drawLines();
  requestAnimationFrame(frame);
})();

/* ---- TYPEWRITER ---- */
const phrases = ['web applications.','ML pipelines.','secure backends.','data solutions.','scalable systems.','clean APIs.'];
let pi=0,ci=0,del=false;
const tw = document.getElementById('twWord');
function type(){
  const cur = phrases[pi];
  tw.textContent = del ? cur.slice(0,ci--) : cur.slice(0,ci++);
  if(!del && ci>cur.length){ del=true; setTimeout(type,1600); return; }
  if(del && ci<0){ del=false; pi=(pi+1)%phrases.length; setTimeout(type,350); return; }
  setTimeout(type, del?42:80);
}
setTimeout(type,2400);

/* ---- NAVBAR ---- */
const nav  = document.getElementById('nav');
const burg = document.getElementById('burger');
const navi = document.getElementById('navCenter');
window.addEventListener('scroll', () => {
  nav.classList.toggle('glassy', scrollY > 30);
  document.getElementById('backTop').classList.toggle('show', scrollY > 450);
  highlightNav();
  updateProgress();
});

burg.addEventListener('click', () => {
  const open = navi.classList.toggle('open');
  const sp = burg.querySelectorAll('span');
  if(open){
    sp[0].style.transform='rotate(45deg) translate(5px,5px)';
    sp[1].style.opacity='0';
    sp[2].style.transform='rotate(-45deg) translate(5px,-5px)';
  } else {
    sp.forEach(s=>{s.style.transform='';s.style.opacity='';});
  }
});
document.querySelectorAll('.nl').forEach(l=>l.addEventListener('click',()=>{
  navi.classList.remove('open');
  burg.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
}));

function highlightNav(){
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(scrollY>=s.offsetTop-220) cur=s.id;
  });
  document.querySelectorAll('.nl').forEach(l=>{
    l.classList.toggle('on', l.getAttribute('href')==='#'+cur);
  });
}

/* ---- SCROLL PROGRESS ---- */
function updateProgress(){
  const el=document.getElementById('scrollProgress');
  const h=document.documentElement.scrollHeight-innerHeight;
  el.style.width=(scrollY/h*100)+'%';
}

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-65,behavior:'smooth'});}
  });
});

/* ---- BACK TOP ---- */
document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ---- REVEAL ON SCROLL ---- */
const ro = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'), i*70); ro.unobserve(e.target); } });
},{threshold:.08, rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ---- SKILL BARS ---- */
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.bar-row').forEach(row=>{
        const fill = row.querySelector('.br-fill');
        const color = row.dataset.color || '#00d4ff';
        fill.style.setProperty('--bar-color', color);
        setTimeout(()=>{ fill.style.width = row.dataset.pct + '%'; }, 150);
      });
      barObs.unobserve(entry.target);
    }
  });
},{threshold:.25});
document.querySelectorAll('.skill-panel').forEach(p=>barObs.observe(p));

/* ---- COUNTERS ---- */
const cntObs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.sc-num').forEach(el=>{
        const target=parseInt(el.dataset.target);
        let n=0; const step=Math.ceil(target/55);
        const t=setInterval(()=>{
          n=Math.min(n+step,target);
          el.textContent=n;
          if(n>=target) clearInterval(t);
        },22);
      });
      cntObs.unobserve(entry.target);
    }
  });
},{threshold:.4});
document.querySelectorAll('.stats-wrap').forEach(w=>cntObs.observe(w));

/* ---- 3D TILT ---- */
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*16;
    const y=((e.clientY-r.top)/r.height-.5)*-16;
    card.style.transform=`translateY(-10px) perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

/* ---- MAGNETIC ---- */
document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.22;
    const y=(e.clientY-r.top-r.height/2)*0.22;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

/* ---- CONTACT FORM ---- */
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name    = document.getElementById('cfName').value.trim();
  const email   = document.getElementById('cfEmail').value.trim();
  const message = document.getElementById('cfMessage').value.trim();
  const status  = document.getElementById('cfStatus');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  status.className='cf-status';
  if(!name||!email||!message){
    status.textContent='Please fill in all required fields.';
    status.className='cf-status err'; return;
  }
  if(!re.test(email)){
    status.textContent='Please enter a valid email address.';
    status.className='cf-status err'; return;
  }
  const btn=e.target.querySelector('.cf-submit');
  btn.innerHTML='<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  btn.disabled=true;
  setTimeout(()=>{
    status.textContent='Thanks '+name+'! I\'ll be in touch soon.';
    status.className='cf-status ok';
    e.target.reset();
    btn.innerHTML='<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled=false;
  },1500);
});