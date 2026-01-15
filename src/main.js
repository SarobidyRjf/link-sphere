import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// 🔹 Données des liens
const links = [
  { name: "GitHub", url: "https://github.com/tonpseudo", category: "social", color: "bg-blue-500" },
  { name: "Portfolio", url: "https://tonportfolio.com", category: "projet", color: "bg-purple-500" },
  { name: "LinkedIn", url: "https://linkedin.com/in/tonpseudo", category: "social", color: "bg-blue-700" },
  { name: "Twitter", url: "https://twitter.com/tonpseudo", category: "social", color: "bg-cyan-500" },
  { name: "Projet 1", url: "#", category: "projet", color: "bg-pink-500" },
  { name: "Projet 2", url: "#", category: "projet", color: "bg-green-500" },
];

// 🔹 Containers
const container = document.getElementById("links-container");
const filtersContainer = document.getElementById("filters");

// 🔹 Création des catégories
const categories = ["all", ...new Set(links.map(link => link.category))];

// 🔹 Création des boutons filtres
categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  btn.className = "filter-btn px-4 py-2 rounded bg-white/10 hover:bg-white/20 cursor-pointer";
  btn.dataset.category = cat;
  filtersContainer.appendChild(btn);
});

// 🔹 Fonction pour afficher les liens
const displayLinks = (category = "all") => {
  container.innerHTML = "";
  links
    .filter(link => category === "all" || link.category === category)
    .forEach(link => {
      const card = document.createElement("a");
      card.href = link.url;
      card.target = "_blank";
      card.className = `link-card ${link.color}`;
      card.textContent = link.name;
      container.appendChild(card);
    });
};

// 🔹 Affichage initial
displayLinks();

// 🔹 Filtrage par catégorie
filtersContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    displayLinks(e.target.dataset.category);
  }
});

