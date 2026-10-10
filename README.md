# Responsive Portfolio Layout with Dark/Light Mode

Responsive single-page portfolio built mobile-first with CSS Grid and Flexbox, with a dark/light theme toggle. Built with HTML, CSS, JavaScript and Bootstrap 5 as Week 1 tasks of a web development internship.

**Live demo:** https://bespoke-narwhal-5f8f6a.netlify.app/

## Features

**Layout**
- Seven sections: navbar, hero, services, about, portfolio, contact and footer
- Mobile-first CSS with media queries for tablet and desktop
- CSS Grid columns that grow from 1 (mobile) to 2 (tablet) to 3-4 (desktop)
- Flexbox for the navbar, hero buttons, contact info and footer
- Hamburger menu with a slide-in overlay (Escape closes it)
- Sticky navbar, active link highlighting on scroll and smooth scrolling
- Portfolio filter tabs, skill bars animated on scroll (IntersectionObserver)
- Contact form with validation and a back-to-top button

**Dark/light mode**
- Full theme built with CSS custom properties
- Animated toggle switch
- Preference saved in localStorage
- Falls back to the system `prefers-color-scheme` setting
- Smooth transitions across navbar, cards, buttons, inputs and footer

## Tech Stack

| Technology | Use |
|---|---|
| HTML5 | Semantic structure (`header`, `section`, `article`, `footer`) |
| CSS3 | Grid, Flexbox, custom properties, media queries |
| JavaScript (vanilla) | Theme toggle, menu, filtering, form validation |
| Bootstrap 5.3 | Container grid and utilities |
| AOS | Scroll animations |

## Project Structure

```
responsive-portfolio-dark-mode/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Run Locally

```bash
git clone https://github.com/ash-1212/responsive-portfolio-dark-mode.git
cd responsive-portfolio-dark-mode
```

Open `index.html` in your browser, or use the VS Code Live Server extension. Bootstrap, AOS and fonts load from CDNs, so an internet connection is required.

## Author

**Ayesha Nazish**
[GitHub](https://github.com/ash-1212) · [LinkedIn](https://www.linkedin.com/in/ayeshanazish-452048274)