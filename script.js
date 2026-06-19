// script.js - Interactivity for the portfolio

// Smooth mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle && navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Close mobile nav when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animate skill progress bars when visible
const skillCards = document.querySelectorAll('.skill-card');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const bar = entry.target.querySelector('.progress-bar');
      const level = entry.target.getAttribute('data-level') || 0;
      bar.style.width = level + '%';
      entry.target.classList.add('in-view');
    }
  });
},{threshold:0.25});
skillCards.forEach(c => obs.observe(c));

// Reveal sections with fade-up
const faders = document.querySelectorAll('section, .project-card');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('in-view');
  });
},{threshold:0.15});
faders.forEach(f => revealObs.observe(f));

// Active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
},{threshold:0.5});
sections.forEach(s => navObserver.observe(s));

// Contact form handler - opens mail client with prefilled content
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      alert('Please complete all fields before sending.');
      return;
    }
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    // Configure your email address below or the mailto will use default
    const to = 'your.email@example.com'; // <-- Replace with your email address
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}

// Small accessibility: focus visible styles on keyboard navigation
document.body.addEventListener('keyup', (e) => {
  if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
});
