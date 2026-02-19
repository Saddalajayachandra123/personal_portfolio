# Image Setup Guide

## Directory Structure

Create an `images` folder in your portfolio directory like this:

```
Portfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── profile.jpg          (Your profile picture - 300x300px recommended)
    ├── cert-1.jpg           (First certification image)
    ├── cert-2.jpg           (Second certification image)
    └── cert-3.jpg           (Third certification image)
```

## Image Details

### Profile Picture
- **File:** `images/profile.jpg`
- **Size:** 300x300px (square format)
- **Format:** JPG, PNG, or WebP
- **Used in:** Profile section at the top of the page

### Certification Images
- **Files:** `images/cert-1.jpg`, `images/cert-2.jpg`, `images/cert-3.jpg`
- **Size:** 400x250px (landscape format)
- **Format:** JPG, PNG, or WebP
- **Used in:** Certifications section

## How to Add Your Images

1. Create a folder named `images` in your Portfolio directory
2. Add your profile picture as `profile.jpg`
3. Add your certification screenshot images as `cert-1.jpg`, `cert-2.jpg`, `cert-3.jpg`
4. The portfolio will automatically display them

## To Update Certification & Post Content

### Certifications Section
Edit the HTML in `index.html` to replace placeholder text:

```html
<h3>Add Your Certification Title</h3>
<p class="cert-issuer">Issued by: Organization Name</p>
<p class="cert-date">Date: Month, Year</p>
<p class="cert-description">Add certification description here</p>
```

### Posts Section
You can add as many posts as you want. Follow the template:

```html
<div class="post-card blog" data-category="blog">
    <div class="post-header">
        <span class="post-category">Blog Post</span>
        <span class="post-date">Date: Your Date</span>
    </div>
    <h3>Your Post Title</h3>
    <p class="post-excerpt">Your post summary here...</p>
    <div class="post-tags">
        <span class="tag">Tag1</span>
        <span class="tag">Tag2</span>
    </div>
    <a href="#" class="read-more">Read Full Post →</a>
</div>
```

**Post Categories:** Use `data-category="blog"`, `data-category="linkedin"`, or `data-category="technical"`

## PDF Extraction

From your LinkedIn-generated PDF:
1. Take a screenshot of your profile picture for `profile.jpg`
2. Take screenshots of any certificates and save as `cert-1.jpg`, `cert-2.jpg`, etc.
3. Update the certification text with details from the PDF

## Tips

- Compress images to optimize page load speed
- Use consistent image sizing for better visuals
- Update post content regularly to keep your portfolio current
- Add more certification and post cards by duplicating and modifying the existing code
