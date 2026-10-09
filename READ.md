# Trimex Connect – Landing Page Redesign

A redesigned landing page for **trimexconnect.com**, created as a class activity. The goal is a cleaner layout, clear navigation and friendly interactions, built with plain **HTML, CSS and JavaScript** (no frameworks or build tools).

## Project Structure

```
trimex-redesign/
├── index.html            # Page structure and content
├── style.css             # Layout, colors, animations, responsive and dark mode
├── script.js             # Interactions (menu, scroll effects, filters, form)
├── chatbot.js            # Chatbot feature
├── css/
│   ├── trimex_styles.css # Additional styles
│   └── chatbot.css       # Chatbot styles
├── assets/               # Logo, college logo and GIF
└── README.md             # This file
```

## How to Run (Using a Web Browser from the IDE)

### Option 1: Live Server (recommended)
1. Open the project folder in the IDE (**File > Open Folder**).
2. Install the **Live Server** extension if it isn't installed yet (Extensions icon in the left sidebar, search "Live Server").
3. Right-click `index.html` in the Explorer and choose **Open with Live Server**,
   or click **Go Live** in the bottom-right status bar.
4. The website opens in your default web browser (for example, Microsoft Edge)
   at an address like `http://127.0.0.1:5500`.
5. Edit and save any file. The page refreshes automatically.
6. To stop the server, click the **Port: 5500** button in the status bar.

### Option 2: Open the file directly
1. Right-click `index.html` in the Explorer and choose **Reveal in File Explorer**.
2. Double-click `index.html`, or right-click it and choose **Open with > Microsoft Edge**.

> Keep the project folder structure unchanged (`index.html`, `script.js`, `chatbot.js`, and the `css/` and `assets/` folders). If you move `index.html` out of the folder, the styles and images won't load.

## Main Menu

| Menu | Section |
|------|---------|
| HOME | Hero section with call-to-action buttons and animated stats |
| GAZETTE | Stories with category filter tabs (All, News, Events, Tech) |
| CCS-MS | Overview of the management system features |
| ABOUT | Front-End Designer details and info about the website |
| ENROLL NOW! | Enrollment form with live validation |
| CCS-Chatbot | AI-powered chatbot assistant |


## Features

- Sticky navigation bar that highlights the section you are viewing
- Responsive design with a hamburger menu on phones
- Scroll-reveal animations and animated counters
- Filterable Gazette cards
- Enrollment form with error messages and a success message (demo only; no data is sent)
- Automatic dark mode based on the device setting
- Accessibility: skip link, keyboard focus styles, ARIA labels, reduced-motion support

## AI Tools That Can Be Used

The activity allows any AI agent or AI-assisted development tool to convert the design into a working webpage. Some options:

| Tool | Made by | Good for |
|------|---------|----------|
| **Claude** | Anthropic | Writing and explaining HTML, CSS and JavaScript; building full pages |
| **Gemini** | Google | Code generation and quick questions.

## Student Information

- **Name:** Sanchez, Mark Cyruss L.
- **Course:** BSIT-Mobile and Web Development
- **Subject:** USERDSGN_LAB
- **Professor:** Dr. Louie Agustin
