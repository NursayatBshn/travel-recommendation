// TravelBloom - Travel Recommendation Web Application

const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const searchResults = document.getElementById("searchResults");

// Timezone mapping for destination locations (Task 10 optional/bonus)
const timeZoneMap = {
  "Sydney, Australia": "Australia/Sydney",
  "Melbourne, Australia": "Australia/Melbourne",
  "Tokyo, Japan": "Asia/Tokyo",
  "Kyoto, Japan": "Asia/Tokyo",
  "Rio de Janeiro, Brazil": "America/Sao_Paulo",
  "São Paulo, Brazil": "America/Sao_Paulo",
  "Angkor Wat, Cambodia": "Asia/Phnom_Penh",
  "Taj Mahal, India": "Asia/Kolkata",
  "Bora Bora, French Polynesia": "Pacific/Tahiti",
  "Copacabana Beach, Brazil": "America/Sao_Paulo"
};

function getLocalTime(locationName) {
  const tz = timeZoneMap[locationName];
  if (!tz) return "";
  try {
    const options = {
      timeZone: tz,
      hour12: true,
      hour: "numeric",
      minute: "numeric"
    };
    return new Date().toLocaleTimeString("en-US", options);
  } catch (e) {
    return "";
  }
}

// Clear / Reset search form and results
function clearSearch() {
  if (searchInput) {
    searchInput.value = "";
  }
  if (searchResults) {
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
  }
}

// Build card HTML for recommendation items
function buildCard(item) {
  const localTime = getLocalTime(item.name);
  const timeBadge = localTime
    ? `<div class="time-badge">🕒 Local: ${localTime}</div>`
    : "";

  return `
    <div class="destination-card">
      <div class="card-img-wrap">
        <img src="${item.imageUrl}" alt="${item.name}">
        ${timeBadge}
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        <button class="btn-visit" onclick="handleVisit('${item.name.replace(/'/g, "\\'")}')">Visit</button>
      </div>
    </div>
  `;
}

// User action handler for Visit button
function handleVisit(name) {
  alert(`Thank you for your interest in visiting ${name}! Booking services will open soon.`);
}

// Execute Search
function executeSearch() {
  if (!searchInput || !searchResults) return;

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    clearSearch();
    return;
  }

  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      let results = [];
      let categoryTitle = "";

      // Check keywords: beach / beaches
      if (query === "beach" || query === "beaches" || query.includes("beach")) {
        results = data.beaches || [];
        categoryTitle = "Beach Recommendations";
      }
      // Check keywords: temple / temples
      else if (query === "temple" || query === "temples" || query.includes("temple")) {
        results = data.temples || [];
        categoryTitle = "Temple Recommendations";
      }
      // Check keywords: country / countries
      else if (query === "country" || query === "countries") {
        if (data.countries) {
          data.countries.forEach((country) => {
            if (country.cities) {
              results = results.concat(country.cities);
            }
          });
        }
        categoryTitle = "Country Recommendations";
      }
      // Check specific country names (australia, japan, brazil)
      else {
        const matchedCountry = (data.countries || []).find((c) =>
          c.name.toLowerCase().includes(query)
        );
        if (matchedCountry) {
          results = matchedCountry.cities || [];
          categoryTitle = `${matchedCountry.name} Recommendations`;
        } else {
          // Check specific city/temple/beach matching names
          (data.countries || []).forEach((c) => {
            (c.cities || []).forEach((city) => {
              if (city.name.toLowerCase().includes(query)) {
                results.push(city);
              }
            });
          });
          (data.temples || []).forEach((t) => {
            if (t.name.toLowerCase().includes(query)) results.push(t);
          });
          (data.beaches || []).forEach((b) => {
            if (b.name.toLowerCase().includes(query)) results.push(b);
          });
          if (results.length > 0) {
            categoryTitle = `Results for "${query}"`;
          }
        }
      }

      // Render results
      searchResults.style.display = "flex";

      if (results.length === 0) {
        searchResults.innerHTML = `
          <div class="no-results">
            <h3>No results found</h3>
            <p>We couldn't find recommendations for "${query}". Try searching for <strong>beach</strong>, <strong>temple</strong>, or <strong>country</strong>.</p>
          </div>
        `;
        return;
      }

      let html = `<div class="results-header">Showing <span>${results.length}</span> recommendations for <span>${categoryTitle}</span></div>`;
      results.forEach((item) => {
        html += buildCard(item);
      });

      searchResults.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
      searchResults.style.display = "flex";
      searchResults.innerHTML = `
        <div class="no-results">
          <h3>Error loading recommendations</h3>
          <p>Please check your connection and try again.</p>
        </div>
      `;
    });
}

// Event Listeners
if (btnSearch) {
  btnSearch.addEventListener("click", executeSearch);
}

if (btnReset) {
  btnReset.addEventListener("click", clearSearch);
}

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
  });
}

// Check for query parameter search on page load
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  if (searchParam && searchInput) {
    searchInput.value = searchParam;
    setTimeout(() => {
      executeSearch();
    }, 200);
  }
});
