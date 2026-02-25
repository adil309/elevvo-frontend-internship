// Blog Posts Data - WITH WORKING IMAGES
const blogPosts = [
    // Travel Posts
    {
        id: 1,
        title: "Sunset in Siwa Oasis",
        excerpt: "Experience the magic of Siwa's golden sunset and natural springs. A journey through Egypt's hidden paradise.",
        image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "travel",
        date: "Feb 24, 2024",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Alexandria's Mediterranean Magic",
        excerpt: "Walking through the historic streets of Alexandria, where the Mediterranean meets ancient history.",
        image: "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "travel",
        date: "Feb 22, 2024",
        readTime: "6 min read"
    },
    {
        id: 3,
        title: "Luxor Temple at Night",
        excerpt: "Discover the magical atmosphere of Luxor Temple when it's lit up at night. An unforgettable experience.",
        image: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "travel",
        date: "Feb 20, 2024",
        readTime: "4 min read"
    },
    {
        id: 4,
        title: "Dahab's Blue Hole",
        excerpt: "Diving into the famous Blue Hole in Dahab - a paradise for adventure seekers and divers.",
        image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "travel",
        date: "Feb 18, 2024",
        readTime: "7 min read"
    },
    
    // Food Posts
    {
        id: 5,
        title: "Best Koshary in Cairo",
        excerpt: "Finding the perfect Koshary in Cairo's busy streets. A taste of authentic Egyptian street food.",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "food",
        date: "Feb 23, 2024",
        readTime: "4 min read"
    },
    {
        id: 6,
        title: "Making Traditional Feteer",
        excerpt: "Learning to make Egyptian Feteer Meshaltet - the flakiest pastry you'll ever try.",
        image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "food",
        date: "Feb 21, 2024",
        readTime: "5 min read"
    },
    {
        id: 7,
        title: "Alexandria's Seafood Scene",
        excerpt: "Fresh catch of the day at Alexandria's famous fish markets. A seafood lover's paradise.",
        image: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "food",
        date: "Feb 19, 2024",
        readTime: "5 min read"
    },
    {
        id: 8,
        title: "Street Food in Islamic Cairo",
        excerpt: "Exploring the best street food spots in historic Islamic Cairo. From hawawshi to falafel.",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "food",
        date: "Feb 17, 2024",
        readTime: "6 min read"
    },
    
    // Tech Posts
    {
        id: 9,
        title: "Rise of Tech in Egypt",
        excerpt: "How Egypt's tech scene is growing with new startups and innovation hubs in Cairo.",
        image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "tech",
        date: "Feb 23, 2024",
        readTime: "5 min read"
    },
    {
        id: 10,
        title: "Coding Bootcamps in Cairo",
        excerpt: "A guide to the best coding bootcamps and learning opportunities in the city.",
        image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "tech",
        date: "Feb 21, 2024",
        readTime: "4 min read"
    },
    {
        id: 11,
        title: "Egyptian FinTech Revolution",
        excerpt: "How FinTech startups are changing the way Egyptians bank and pay.",
        image: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "tech",
        date: "Feb 19, 2024",
        readTime: "6 min read"
    },
    {
        id: 12,
        title: "Remote Work from Cairo",
        excerpt: "Best cafes and coworking spaces in Cairo for digital nomads and remote workers.",
        image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "tech",
        date: "Feb 17, 2024",
        readTime: "5 min read"
    }
];

// DOM Elements
const postsGrid = document.getElementById('postsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');

// State
let currentCategory = 'all';
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [...blogPosts];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterPosts();
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentPage = 1;
            filterPosts();
        });
    });

    // Pagination buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
            updatePaginationButtons();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPosts();
            updatePaginationButtons();
        }
    });
}

// Filter posts based on category and search
function filterPosts() {
    let filtered = [...blogPosts];

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(post => post.category === currentCategory);
    }

    // Filter by search
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm !== '') {
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
    }

    filteredPosts = filtered;
    currentPage = 1;
    displayPosts();
    updatePaginationButtons();
}

// Display posts for current page
function displayPosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
    } else {
        postsGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    }

    updatePaginationInfo();
}

// Create post card HTML
function createPostCard(post) {
    const categoryIcons = {
        travel: '✈️',
        food: '🍳',
        tech: '💻'
    };

    return `
        <article class="post-card">
            <div class="post-image" style="background-image: url('${post.image}')">
                <span class="post-category">${categoryIcons[post.category]} ${post.category}</span>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

// Update pagination info
function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Generate page numbers
    let pageNumbersHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        pageNumbersHTML += `
            <span class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </span>
        `;
    }
    
    pageNumbers.innerHTML = pageNumbersHTML;

    // Add click events to page numbers
    document.querySelectorAll('.page-numbers .page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            if (page && page !== currentPage) {
                currentPage = page;
                displayPosts();
                updatePaginationButtons();
            }
        });
    });

    updatePaginationButtons();
}

// Update pagination buttons state
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Override displayPosts to include scroll
const originalDisplayPosts = displayPosts;
displayPosts = function() {
    originalDisplayPosts();
    scrollToTop();
};