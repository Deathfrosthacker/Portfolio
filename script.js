// Mobile menu
function toggleMenu() {
    let menu = document.querySelector('.mobile-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.className = 'mobile-menu';
        menu.innerHTML = `
            <a href="#home" onclick="closeMenu()">Home</a>
            <a href="#about" onclick="closeMenu()">About</a>
            <a href="#projects" onclick="closeMenu()">Projects</a>
            <a href="#skills" onclick="closeMenu()">Skills</a>
            <a href="#contact" onclick="closeMenu()">Contact</a>
        `;
        document.body.appendChild(menu);
    }
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.remove('active');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active section highlighting
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section) {
                        link.classList.add('active');
                    }
                });
                break;
            }
        }
    }
});

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Skill bars data
const skills = [
    { name: 'Web Accessibility', level: 95, color: '#34d399' },
    { name: 'Cybersecurity', level: 90, color: '#22d3ee' },
    { name: 'Software Development', level: 92, color: '#a78bfa' },
    { name: 'Ethical Hacking', level: 88, color: '#f87171' },
    { name: 'Problem Solving', level: 94, color: '#fbbf24' },
    { name: 'Web Development', level: 90, color: '#60a5fa' }
];

// Render skill bars
const skillBarsContainer = document.getElementById('skillBars');
skills.forEach(skill => {
    const div = document.createElement('div');
    div.className = 'skill-item';
    div.innerHTML = `
        <div class="skill-header">
            <span>${skill.name}</span>
            <span>${skill.level}%</span>
        </div>
        <div class="skill-bar">
            <div class="skill-fill" style="background: ${skill.color}; width: 0%" data-width="${skill.level}%"></div>
        </div>
    `;
    skillBarsContainer.appendChild(div);
});

// Animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
}, { threshold: 0.5 });

if (skillBarsContainer) observer.observe(skillBarsContainer);

// Tech stack data
const technologies = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML/CSS'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Django', 'REST APIs', 'GraphQL'] },
    { category: 'Security', items: ['Penetration Testing', 'OWASP', 'Kali Linux', 'Wireshark'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Linux', 'VS Code', 'Figma'] },
    { category: 'Accessibility', items: ['WCAG 2.1', 'ARIA', 'Screen Readers', 'axe-core'] }
];

// Render tech stack
const skillsGrid = document.getElementById('skillsGrid');
technologies.forEach(tech => {
    const div = document.createElement('div');
    div.className = 'card skill-card';
    div.innerHTML = `
        <h3>${tech.category}</h3>
        <div class="skill-tags">
            ${tech.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
        </div>
    `;
    skillsGrid.appendChild(div);
});

// Fetch GitHub repos
async function fetchRepos() {
    const grid = document.getElementById('projectsGrid');
    try {
        const response = await fetch('https://api.github.com/users/Deathfrosthacker/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        grid.innerHTML = repos.map(repo => `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-title">
                        <span style="color: #34d399;">⚡</span>
                        ${repo.name}
                    </div>
                    <div class="project-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </div>
                <p class="project-desc">${repo.description || 'No description available'}</p>
                <div class="project-tags">
                    ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                    ${(repo.topics || []).slice(0, 3).map(topic => `<span class="tag tag-gray">${topic}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="link-code">Code</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="link-live">Live</a>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        grid.innerHTML = '<div class="loading">Failed to load projects. Please check your connection.</div>';
    }
}

fetchRepos();

// Contact form
