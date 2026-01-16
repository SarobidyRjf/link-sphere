import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Import JS et CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';


import $ from "jquery";
import "slick-carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const links = [
  { name: "GitHub", url: "https://github.com/tonpseudo" },
  { name: "Portfolio", url: "#" },
  { name: "LinkedIn", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "Contact", url: "#" }
];

const container = $("#links-container");

links.forEach(link => {
  container.append(`
    <a href="${link.url}" target="_blank" class="link-card">
      ${link.name}
    </a>
  `);
});

/* 🎠 Slick init */
container.slick({
  slidesToShow: 3,
  centerMode: true,
  centerPadding: "0",
  infinite: true,
  speed: 800,
  arrows: false,
  dots: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 }},
    { breakpoint: 640, settings: { slidesToShow: 1 }}
  ]
});
