# Personal Brand Website

A modern, sleek website inspired by Apple's design philosophy, featuring a tri-color theme (red, black, white).

## Features

- **Landing Page** - Hero section with compelling messaging
- **About Section** - Information about the brand with statistics
- **Newsletter Signup** - Email collection (ready for Airtable integration)
- **Careers Page** - Job listings and company culture
- **Blog** - Business tips and insights
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Engaging user interactions

## Quick Start

### Option 1: Python Server (Recommended)
```bash
python3 server.py
```
Then open http://localhost:8000 in your browser.

### Option 2: Python Module
```bash
python3 -m http.server 8000
```

### Option 3: Node.js (if you have Node installed)
```bash
npx http-server -p 8000
```

## Project Structure

```
website/
├── index.html          # Main landing page
├── careers.html        # Careers page
├── blog.html          # Blog page
├── css/
│   ├── styles.css     # Main styles
│   ├── careers.css    # Careers page styles
│   └── blog.css       # Blog page styles
├── js/
│   └── main.js        # JavaScript for interactions
├── server.py          # Local development server
└── README.md          # This file
```

## Newsletter Integration

The newsletter form is ready for Airtable integration. To connect it:
1. Create an Airtable base with an email field
2. Get your Airtable API key
3. Update the form submission handler in `js/main.js`

## Customization

- Update "Brand" with your actual brand name throughout the HTML files
- Replace placeholder content with your actual content
- Add real social media links in the footer
- Customize colors in `css/styles.css` (see CSS variables at the top)