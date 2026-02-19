// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Shadow on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Navigation Link on Scroll =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to observe
document.querySelectorAll('.skill-card, .project-card, .about-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Add Animation Keyframes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Tab Filtering (Optional) =====
const tabBtns = document.querySelectorAll('.tab-btn');
const postCards = document.querySelectorAll('.post-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-tab');
        
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter posts
        postCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});
// Prevent body scroll when mobile menu is open
const toggleBodyScroll = () => {
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
};

hamburger.addEventListener('click', toggleBodyScroll);
navLinks.forEach(link => {
    link.addEventListener('click', toggleBodyScroll);
});

// Form submission (if contact form is added later)
const handleFormSubmit = (e) => {
    if (e && e.preventDefault) {
        e.preventDefault();
        // Add form handling logic here
    }
};

// Posts Tab Filter
const tabButtons = document.querySelectorAll('.tab-btn');
const postCards = document.querySelectorAll('.post-card');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter posts
            postCards.forEach(card => {
                if (selectedTab === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else if (card.getAttribute('data-category') === selectedTab) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add transition styles to post cards
    const style = document.createElement('style');
    style.textContent = `
        .post-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Log portfolio loaded
console.log('Portfolio loaded successfully!');
console.log('Welcome to Saddala Jayachandra\'s Portfolio');

// ===== API Configuration =====
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://localhost:5000`
    : window.location.origin;

// ===== Project File Upload Handler =====
document.addEventListener('DOMContentLoaded', () => {
    // Handle file uploads for projects
    const fileInputs = document.querySelectorAll('.file-input');
    const uploadModal = document.getElementById('upload-modal');
    const closeBtn = document.getElementById('close-upload-modal');
    const confirmBtn = document.getElementById('confirm-upload');
    
    // Close modal when X button clicked
    closeBtn.addEventListener('click', () => {
        uploadModal.classList.remove('active');
    });
    
    // Close modal when Got It button clicked
    confirmBtn.addEventListener('click', () => {
        uploadModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            uploadModal.classList.remove('active');
        }
    });
    
    fileInputs.forEach((input) => {
        input.addEventListener('change', async (e) => {
            const files = e.target.files;
            
            if (files && files.length > 0) {
                let totalSize = 0;
                let fileCount = files.length;
                const projectName = 'Student Result Management System';
                const timestamp = new Date().toLocaleString();
                
                // Calculate total size
                for (let i = 0; i < files.length; i++) {
                    totalSize += files[i].size;
                }
                
                // Convert to MB
                const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
                
                // Log to console
                console.log(`✅ Uploading Project...`);
                console.log(`📂 Project: ${projectName}`);
                console.log(`📁 Files: ${fileCount}`);
                console.log(`💾 Size: ${totalSizeMB} MB`);
                
                // Show upload in progress
                document.getElementById('upload-project-name').textContent = `${projectName} (Uploading...)`;
                document.getElementById('upload-file-count').textContent = `${fileCount} file${fileCount !== 1 ? 's' : ''}`;
                document.getElementById('upload-file-size').textContent = `${totalSizeMB} MB`;
                document.getElementById('upload-timestamp').textContent = 'Processing...';
                uploadModal.classList.add('active');
                
                // Send files to backend API
                try {
                    const formData = new FormData();
                    
                    // Add all files to formData
                    for (let i = 0; i < files.length; i++) {
                        formData.append('files', files[i]);
                    }
                    
                    // Add project metadata
                    formData.append('projectName', projectName);
                    formData.append('uploadedBy', 'jaya@gmail.com');
                    
                    // Send to backend
                    const response = await fetch(`${API_BASE_URL}/api/upload-project`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            // Don't set Content-Type, let browser set it with boundary
                        }
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        console.log('✅ Upload successful!', data);
                        
                        // Update modal with success details
                        document.getElementById('upload-project-name').textContent = data.data.projectName;
                        document.getElementById('upload-file-count').textContent = `${data.data.fileCount} files`;
                        document.getElementById('upload-file-size').textContent = data.data.totalSize;
                        document.getElementById('upload-timestamp').textContent = new Date().toLocaleString();
                        
                        // Show success message
                        alert(`✅ ${data.message}\n\nUpload ID: ${data.data.uploadId}`);
                    } else {
                        console.error('Upload failed:', data.message);
                        alert(`❌ Upload failed: ${data.message}`);
                        uploadModal.classList.remove('active');
                    }
                    
                } catch (error) {
                    console.error('Upload error:', error);
                    
                    // Check if backend is down, use local processing
                    console.log('⚠️ Backend not available, showing local confirmation...');
                    
                    // Update modal with local details (fallback)
                    document.getElementById('upload-project-name').textContent = projectName;
                    document.getElementById('upload-file-count').textContent = `${fileCount} file${fileCount !== 1 ? 's' : ''}`;
                    document.getElementById('upload-file-size').textContent = `${totalSizeMB} MB`;
                    document.getElementById('upload-timestamp').textContent = timestamp;
                    
                    alert(`⚠️ Backend server not responding.\n\nLocal upload recorded:\n• ${projectName}\n• ${fileCount} files\n• ${totalSizeMB} MB\n\nPlease ensure backend (npm run dev) is running.`);
                }
            }
        });
    });
    
    // ===== Contact Form Handler =====
    const contactForm = document.querySelector('form[name="contact"]') || document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.querySelector('input[name="name"]')?.value || 'Anonymous',
                email: document.querySelector('input[name="email"]')?.value || '',
                subject: document.querySelector('input[name="subject"]')?.value || 'Portfolio Inquiry',
                message: document.querySelector('textarea[name="message"]')?.value || ''
            };
            
            // Validate
            if (!formData.email || !formData.message) {
                alert('❌ Please fill in email and message fields');
                return;
            }
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert(`✅ ${data.message}`);
                    contactForm.reset();
                    console.log('Contact message sent:', data);
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
                
            } catch (error) {
                console.error('Contact form error:', error);
                alert('⚠️ Backend not responding. Message not sent. Please try again later.');
            }
        });
    }
});

// ===== Update GitHub Links for Projects =====
document.addEventListener('DOMContentLoaded', () => {
    const githubButtons = document.querySelectorAll('.proj-btn.github, .btn.sm');
    githubButtons.forEach(btn => {
        if (btn.textContent.trim() === 'GitHub' && btn.getAttribute('href') === '#') {
            btn.setAttribute('href', 'https://github.com/Saddalajayachandra123');
            btn.setAttribute('target', '_blank');
        }
    });
});
