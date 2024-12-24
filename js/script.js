// JavaScript code to highlight the active section in navigation

// Select all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navlist li a');

// Options for IntersectionObserver to define when callback should trigger
const observerOptions = {
  root: null, // use the viewport
  rootMargin: '0px', // no margin
  threshold: 0.3 // Trigger when 30% of the section is visible (reduced from 0.6)
};

// Callback function for IntersectionObserver
// Adds 'active' class to the link corresponding to the visible section
const observerCallback = (entries) => {
  entries.forEach(entry => {
    // Check if the section is intersecting
    if (entry.isIntersecting) {
      // Remove 'active' class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Find and add 'active' class to the corresponding link
      const correspondingLink = document.querySelector(`.navlist li a[href="#${entry.target.id}"]`);
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
};

// Create a new IntersectionObserver with the callback and options
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe each section to track visibility
sections.forEach(section => observer.observe(section));

// Sticky header logic
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
  header.classList.toggle("sticky", window.scrollY > 120); // Add 'sticky' class when scrolled down
});

// Mobile menu toggle logic
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menu.onclick = () => {
  menu.classList.toggle('bx-x'); // Toggle 'bx-x' icon class for menu icon
  navlist.classList.toggle('active'); // Toggle 'active' class for nav list
};

// Remove mobile menu on scroll
window.onscroll = () => {
  menu.classList.remove('bx-x');
  navlist.classList.remove('active');
};

// Add click listener to navigation links for manual selection
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Remove 'active' class from all links
    navLinks.forEach(el => el.classList.remove('active'));
    
    // Add 'active' class to the clicked link
    this.classList.add('active');
    
    // Get the target section id
    const targetId = this.getAttribute('href').substring(1);
    
    // Scroll smoothly to the target section
    document.getElementById(targetId).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
  });
});

// Close the mobile navigation menu when clicking anywhere outside of the menu or navlist
document.addEventListener('click', function(event) {
    // Check if the click happened outside of the menu icon or the navigation list
    if (!menu.contains(event.target) && !navlist.contains(event.target)) {
        // Remove 'bx-x' class from the menu icon to reset it to its default appearance
        menu.classList.remove('bx-x');
        // Remove 'active' class from the navigation list to hide it
        navlist.classList.remove('active');
    }
});