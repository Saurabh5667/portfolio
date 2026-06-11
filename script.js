// Typing Animation
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["BCA Graduate", "MCA Student", "MERN Stack Developer", "Software Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Simulate loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Success state
        btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        btn.style.backgroundColor = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 3000);
    }, 1500);
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // Close mobile menu if open
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - headerHeight - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
    
    // Add box shadow to header on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        header.style.padding = '10px 5%';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
        header.style.padding = '15px 5%';
    }
});

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

let statsAnimated = false;

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
            return;
        }
        
        // Add a slight stagger delay if multiple items enter at once (like grid items)
        setTimeout(() => {
            entry.target.classList.add('show');
            
            // Trigger counter animation if about section is reached
            if(!statsAnimated && (entry.target.id === 'about' || entry.target.classList.contains('about-content'))) {
                animateCounters();
                statsAnimated = true;
            }
        }, index * 100);
        
        observer.unobserve(entry.target);
    });
}, observerOptions);

// Observe all elements with hidden classes
document.querySelectorAll('.hidden, .hidden-left, .hidden-right, .hidden-up').forEach(el => {
    observer.observe(el);
});

// Trigger animation for home section immediately if in view on load
window.addEventListener('load', () => {
    const homeElements = document.querySelectorAll('#home .hidden-left, #home .hidden-right');
    homeElements.forEach(el => el.classList.add('show'));
});
