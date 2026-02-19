# Portfolio Customization Guide

## Quick Start

Your portfolio is now ready with the following features:

1. **Profile Section** - Display your professional profile with picture
2. **Education Section** - Shows your B.Tech degree
3. **Certifications Section** - Showcase your certificates
4. **Posts Section** - Share blog posts, LinkedIn posts, and technical articles
5. **Contact Section** - Easy access to your contact information

---

## Steps to Customize

### Step 1: Add Profile Picture
1. Extract your profile picture from the `Profile.pdf`
2. Save it as `images/profile.jpg` (300x300px recommended)
3. The picture will automatically appear in the Profile section

### Step 2: Add Certification Images
1. Extract certification images from `Profile.pdf`
2. Save them in the `images/` folder as:
   - `cert-1.jpg` (first certificate)
   - `cert-2.jpg` (second certificate)
   - `cert-3.jpg` (third certificate)
   - Add more as needed (cert-4.jpg, cert-5.jpg, etc.)

### Step 3: Update Certification Details
Open `index.html` and find the Certifications section:

Change this:
```html
<h3>Add Your Certification Title</h3>
<p class="cert-issuer">Issued by: Organization Name</p>
<p class="cert-date">Date: Month, Year</p>
<p class="cert-description">Add certification description here</p>
```

To add your certification from the PDF. Example:
```html
<h3>AWS Cloud Practitioner</h3>
<p class="cert-issuer">Issued by: Amazon Web Services</p>
<p class="cert-date">Date: January 2024</p>
<p class="cert-description">Cloud fundamentals and AWS core services knowledge</p>
```

### Step 4: Add Your Posts
You can add blog posts, LinkedIn articles, and technical writeups:

Find the **Posts & Articles** section in `index.html` and add new posts:

**For Blog Posts:**
```html
<div class="post-card blog" data-category="blog">
    <div class="post-header">
        <span class="post-category">Blog Post</span>
        <span class="post-date">Date: February 2026</span>
    </div>
    <h3>My Learning Journey with React</h3>
    <p class="post-excerpt">In this post, I share my experience learning React and building interactive web applications...</p>
    <div class="post-tags">
        <span class="tag">React</span>
        <span class="tag">JavaScript</span>
    </div>
    <a href="https://yourblog.com/post-url" class="read-more">Read Full Post →</a>
</div>
```

**For LinkedIn Posts:**
```html
<div class="post-card linkedin" data-category="linkedin">
    <div class="post-header">
        <span class="post-category">LinkedIn Post</span>
        <span class="post-date">Date: February 2026</span>
    </div>
    <h3>I Just Completed My B.Tech Degree!</h3>
    <p class="post-excerpt">Excited to share that I've successfully completed my B.Tech in Computer Science...</p>
    <div class="post-tags">
        <span class="tag">Achievement</span>
        <span class="tag">Graduation</span>
    </div>
    <a href="https://linkedin.com/feed" class="read-more">View on LinkedIn →</a>
</div>
```

**For Technical Articles:**
```html
<div class="post-card technical" data-category="technical">
    <div class="post-header">
        <span class="post-category">Technical Article</span>
        <span class="post-date">Date: February 2026</span>
    </div>
    <h3>Complete Guide to Python List Comprehensions</h3>
    <p class="post-excerpt">Learn how to use Python list comprehensions to write more concise and efficient code...</p>
    <div class="post-tags">
        <span class="tag">Python</span>
        <span class="tag">Tutorial</span>
    </div>
    <a href="https://dev.to/yourprofile/article" class="read-more">Read Article →</a>
</div>
```

---

## Section Details

### Profile Section
- **Location:** At the top after the hero section
- **Contents:** Profile picture, name, title, bio, location, graduation year
- **Edit:** Modify text in the profile-info div

### Certifications Section
- **Location:** Below education section
- **Max visible:** 3 cards per row (adjusts for mobile)
- **Add more:** Duplicate `.cert-card` block and change image path and text

### Posts Section
- **Location:** After certifications
- **Filters:** Toggle between All, Blog, LinkedIn, and Technical posts
- **Add more:** Duplicate `.post-card` block with correct data-category

---

## File Structure After Customization

```
Portfolio/
├── index.html                 (Main portfolio page)
├── styles.css                (All styling)
├── script.js                 (Interactive features)
├── README.md                 (Overview)
├── IMAGE_SETUP.md            (Image guide)
├── CUSTOMIZATION_GUIDE.md    (This file)
├── Profile.pdf               (Your original PDF)
└── images/
    ├── profile.jpg
    ├── cert-1.jpg
    ├── cert-2.jpg
    ├── cert-3.jpg
    └── (add more as needed)
```

---

## Viewing Your Portfolio

### Option 1: Local Preview
1. Right-click `index.html`
2. Open with your default browser
3. Bookmark the file path for quick access

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Your portfolio opens in browser with auto-refresh

### Option 3: Host Online
- Upload to GitHub Pages (free)
- Use Netlify (free)
- Use Vercel (free)
- Use any web hosting service

---

## Contact Information
Your contact details are already set up:
- **Email:** saddalachandra92@gmail.com
- **LinkedIn:** linkedin.com/in/saddala-jayachandra-4459212ba

These are automatically linked in the Contact section and social icons.

---

## Tips for Success

✅ Update profile picture with a professional headshot
✅ Add high-quality certification screenshots
✅ Write meaningful post descriptions
✅ Keep content updated regularly
✅ Use relevant tags for posts
✅ Add links to full posts and content
✅ Test on mobile to ensure responsiveness
✅ Share your portfolio URL on LinkedIn and resume

---

## Need Help?

Refer to:
- `IMAGE_SETUP.md` - Image file setup details
- `README.md` - Feature overview
- `index.html` - HTML structure (comments in code)
- `styles.css` - CSS classes for styling
- `script.js` - JavaScript functions

Good luck with your portfolio! 🚀
