// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Form submission
if (document.querySelector('.contact-form')) {
    const form = document.querySelector('.contact-form');
    // Create a feedback message element
    let feedback = document.createElement('div');
    feedback.style.marginTop = '15px';
    feedback.style.fontSize = '1rem';
    feedback.style.textAlign = 'center';
    form.appendChild(feedback);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            feedback.textContent = 'Please fill in all fields.';
            feedback.style.color = '#ef4444';
            return;
        }
        // Simple email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.style.color = '#ef4444';
            return;
        }

        button.textContent = 'Sending...';
        button.style.background = 'var(--gradient-2)';
        feedback.textContent = '';

        setTimeout(() => {
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            feedback.textContent = 'Thank you for your message!';
            feedback.style.color = '#10b981';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'var(--gradient-1)';
                form.reset();
                feedback.textContent = '';
            }, 2000);
        }, 1500);
    });
}

// Skill progress animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
            progressBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('#skills')) {
    document.querySelector('#skills').addEventListener('load', () => {
        skillObserver.observe(document.querySelector('#skills'));
    });
    skillObserver.observe(document.querySelector('#skills'));
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Dynamic typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.98) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--primary-color)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.zIndex = '999';
    particle.style.animation = 'particleFade 1s ease-out forwards';
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Navigation active state
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
