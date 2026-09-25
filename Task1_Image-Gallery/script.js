// Get Elements
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.getElementById("searchInput");

const noResults = document.getElementById("noResults");

const themeBtn = document.getElementById("themeBtn");

// Variables
let currentIndex = 0;

let currentCategory = "all";

// Favorites
let favorites = [];

// Get Visible Items
function getVisibleItems() {
  return Array.from(galleryItems).filter((item) => {
    return item.style.display !== "none";
  });
}

// Update Lightbox
function updateLightbox() {
  const visibleItems = getVisibleItems();

  if (visibleItems.length === 0) {
    return;
  }

  const item = visibleItems[currentIndex];

  const image = item.querySelector("img");

  const caption = item.querySelector(".caption");

  lightboxImage.src = image.src;

  lightboxImage.alt = image.alt;

  lightboxCaption.textContent = caption.textContent;

  imageCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
}

// Open Lightbox
function openLightbox(index) {
  const visibleItems = getVisibleItems();

  if (visibleItems.length === 0) {
    return;
  }

  currentIndex = index;

  updateLightbox();

  lightbox.classList.add("show");

  document.body.style.overflow = "hidden";
}

// Close Lightbox
function closeLightbox() {
  lightbox.classList.remove("show");

  document.body.style.overflow = "auto";
}

//  Next Image
function showNextImage() {
  const visibleItems = getVisibleItems();

  if (visibleItems.length === 0) {
    return;
  }

  currentIndex++;

  if (currentIndex >= visibleItems.length) {
    currentIndex = 0;
  }

  updateLightbox();
}

// Previous Image
function showPreviousImage() {
  const visibleItems = getVisibleItems();

  if (visibleItems.length === 0) {
    return;
  }

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = visibleItems.length - 1;
  }

  updateLightbox();
}

// Image Click
galleryItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    // Don't open lightbox
    // when favorite button is clicked

    if (event.target.classList.contains("favorite-btn")) {
      return;
    }

    const visibleItems = getVisibleItems();

    const index = visibleItems.indexOf(item);

    openLightbox(index);
  });
});

// Button Listener
closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNextImage);

prevBtn.addEventListener("click", showPreviousImage);

// background Click
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard Controls
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});

// Favourite Buttons
const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const item = galleryItems[index];

    const title = item.dataset.title;

    if (favorites.includes(title)) {
      favorites = favorites.filter((favorite) => favorite !== title);

      button.textContent = "♡";

      button.classList.remove("favorited");
    } else {
      favorites.push(title);

      button.textContent = "♥";

      button.classList.add("favorited");
    }

    if (currentCategory === "favorites") {
      applyFilters();
    }
  });
});

// Filter Buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentCategory = button.dataset.category;

    applyFilters();
  });
});

// Search
searchInput.addEventListener("input", applyFilters);

// Apply Filters
function applyFilters() {
  const searchText = searchInput.value.toLowerCase().trim();

  let visibleCount = 0;

  galleryItems.forEach((item) => {
    const category = item.dataset.category;

    const title = item.dataset.title.toLowerCase();

    let categoryMatch = true;

    // Category filter

    if (currentCategory === "favorites") {
      categoryMatch = favorites.includes(item.dataset.title);
    } else if (currentCategory !== "all") {
      categoryMatch = category === currentCategory;
    }

    // Search filter

    const searchMatch = title.includes(searchText);

    // Final result

    if (categoryMatch && searchMatch) {
      item.style.display = "block";

      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  // No results message

  if (visibleCount === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

// Dark Mode
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
});
