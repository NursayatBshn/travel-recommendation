# TravelBloom — Travel Recommendation Web Application

A modern, responsive travel recommendation web application built with HTML5, CSS3, and Vanilla JavaScript for the Coursera / IBM Web Development Capstone Project.

## 🚀 Live Demo & Deployment
- **GitHub Pages:** Deploy from `main` branch root (`/`)
- **Live URL Example:** `https://<username>.github.io/<repository-name>/`

## 🌟 Key Features
1. **Interactive Navigation Bar:**
   - Brand logo & title (`TravelBloom`)
   - Direct navigation to **Home**, **About Us**, and **Contact Us** pages
   - Search input bar with immediate keyword matching
   - **Search** and **Clear / Reset** buttons

2. **Smart Travel Recommendations:**
   - **Beaches:** Searching `beach` or `beaches` displays world-class destinations (e.g., *Bora Bora* and *Copacabana Beach*) with rich imagery, descriptions, and Visit buttons.
   - **Temples:** Searching `temple` or `temples` displays iconic heritage sites (e.g., *Angkor Wat* and *Taj Mahal*).
   - **Countries:** Searching `country` or `countries` (or specific countries like *Australia*, *Japan*, *Brazil*) displays multiple cities per country with high-resolution photos and details.
   - **Local Time Calculation:** Dynamically detects time zones for each destination and displays live local time.

3. **About Us Page:**
   - Company background, mission statement, and core values (*Integrity, Innovation, Customer Satisfaction, Teamwork*).
   - Team member spotlight (*John Doe - CEO*, *Celina Thomas - Team Lead*, *Mike Tyson - Delivery Head*).

4. **Contact Us Page:**
   - Comprehensive contact form with validation (*Name, Email, Message*).
   - Instant visual confirmation alert upon message submission.
   - Company contact info and support channels.

## 📂 Project Structure
```
├── index.html                   # Main landing page (GitHub Pages root)
├── travel_recommendation.html   # Capstone assignment home page mirror
├── about_us.html                # About Us page
├── contact_us.html              # Contact Us page with contact form
├── travel_recommendation.js     # Search engine, JSON fetch & DOM rendering
├── travel_recommendation_api.json # Mock API database with destinations
├── style.css                    # Responsive styling & modern glassmorphism UI
├── images/                      # Destination photos, avatars & SVG icons
└── README.md                    # Project documentation
```

## 🛠️ How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/travel-recommendation.git
   cd travel-recommendation
   ```
2. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

## 🌐 Deploying to GitHub Pages
1. Go to your repository settings on GitHub (**Settings** > **Pages**).
2. Under **Build and deployment**, set the source to **Deploy from a branch**.
3. Select branch: `main` and folder: `/ (root)`.
4. Click **Save**. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<repository-name>/`
