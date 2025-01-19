document.addEventListener('DOMContentLoaded', function() {
    // Ensure navigation block visibility on window resize
    var navigationBlock = document.getElementById('navigation-block');
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            navigationBlock.style.display = 'flex';
        } else {
            navigationBlock.style.display = 'none';
        }
    });

    // READ MORE ABOUT ME SECTION
    var readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var textBox = event.target.closest('.text-box');
            var hiddenContent = textBox.querySelector('.hidden-content');
            if (hiddenContent) {
                if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                    hiddenContent.style.display = 'block';
                    link.textContent = 'Read Less';
                } else {
                    hiddenContent.style.display = 'none';
                    link.textContent = 'Read More';
                }
            }
        });
    });

    // HAMBURGER MENU TOGGLE TO THE RESPECTIVE SECTION
    function scrollToSection(sectionId) {
        var section = document.querySelector(sectionId);
        if (section) {
            var sectionTop = section.offsetTop - 100;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
            section.classList.add('active');
        }
    }
    document.querySelectorAll('.navigation-block ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
            window.history.pushState(null, '', this.getAttribute('href'));
        });
    });
    document.querySelectorAll('.menu__box .menu__item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
            document.getElementById('menu__toggle').checked = false;
            window.history.pushState(null, '', this.getAttribute('href'));
        });
    });
    window.addEventListener('popstate', function(event) {
        const hash = window.location.hash || '#bio';
        scrollToSection(hash);
    });
    const initialSectionId = window.location.hash || '#bio';
    scrollToSection(initialSectionId);

    // Hide Navigation Bar When Hamburger Menu Opens
    var hamburgerMenu = document.getElementById('menu__toggle');
    var menuBox = document.querySelector('.menu__box');
    hamburgerMenu.addEventListener('click', function() {
        menuBox.classList.toggle('open');
        if (menuBox.classList.contains('open')) {
            navigationBlock.classList.add('hidden');
        } else {
            navigationBlock.classList.remove('hidden');
        }
    });

    // PROJECT LIST VIEWING

    // LOGO
    const logo = document.querySelector('.logo');
    const bioSection = document.getElementById('bio');
    logo.addEventListener('click', function() {
        bioSection.classList.add('active');
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });
        bioSection.scrollIntoView({ behavior: 'smooth' });
    });
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash === '#bio') {
        bioSection.classList.add('active');
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });
        bioSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Project hidden by default


    

    // SPA ARCHITECTURE
    function navigateTo(sectionId) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.classList.remove("active");
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add("active");
        }
    }
    const navLinks = document.querySelectorAll(".navigation-block ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            navigateTo(sectionId);
            window.history.pushState({ sectionId }, "", `#${sectionId}`);
        });
    });
    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.sectionId) {
            navigateTo(event.state.sectionId);
        }
    });

    // Toggling skill categories
    const skillLinks = document.querySelectorAll('.skills-list .skill-category h3');
    skillLinks.forEach(link => {
        link.addEventListener('click', function() {
            const category = link.closest('.skill-category');
            const skillItems = category.querySelector('.skill-items');
            if (skillItems.style.display === 'none' || skillItems.style.display === '') {
                skillItems.style.display = 'block';
            } else {
                skillItems.style.display = 'none';
            }
        });
    });

    // International telephone input
    const phoneInputField = document.querySelector("#phone");
    if (phoneInputField) {
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    }

    //SKILL SECTION SCROLL MOVEMENT OF DIV CLASS IN DIFF DIRECTIONS

    const skillItems = document.querySelectorAll('.skill-item');

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0 &&
            rect.left < window.innerWidth &&
            rect.right >= 0
        );
    };

    // Function to handle adding/removing the animation class
    const handleScroll = () => {
        skillItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        });
    };

    // Check on page load
    handleScroll();

    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    ;

    
});










//OPEN/CLOSE PROJECTS

// OPEN/CLOSE PROJECTS
document.addEventListener("DOMContentLoaded", () => {
    const projectCategories = document.querySelectorAll(".project-category");

    // Function to close all project lists
    function closeAllProjectLists() {
        projectCategories.forEach(cat => {
            const list = cat.querySelector(".project-list");
            if (list) {
                list.classList.remove("open");
                list.querySelectorAll("li div").forEach(div => div.style.display = "none");
            }
        });
    }

    // Function to close all project details within a specific project list
    function closeAllProjectDetails(projectList) {
        const listItems = projectList.querySelectorAll("li");
        listItems.forEach(item => {
            const details = item.querySelector("div");
            if (details) {
                details.style.display = "none";
            }
        });
    }

    projectCategories.forEach(category => {
        const categoryTitle = category.querySelector("h3");
        const projectList = category.querySelector(".project-list");
        const listItems = projectList.querySelectorAll("li");

        // Hide project details by default
        closeAllProjectDetails(projectList);

        // Function to toggle the project list visibility
        function toggleProjectList() {
            const isOpen = projectList.classList.contains("open");

            // Close all other project lists
            closeAllProjectLists();

            // Toggle the current project list
            projectList.classList.toggle("open", !isOpen);
        }

        // Function to toggle the visibility of the specific project details
        function toggleProjectDetails(event) {
            if (event.target.tagName === "LI") {
                const details = event.target.querySelector("div");
                if (details) {
                    const isVisible = details.style.display === "block";
                    closeAllProjectDetails(projectList); // Close all other project details in the current list
                    details.style.display = isVisible ? "none" : "block";
                }

                // Scroll the clicked item to the top of the viewport minus the offset
                const offsetTop = event.target.offsetTop - 200;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Attach click event to the category title
        categoryTitle.addEventListener("click", toggleProjectList);

        // Attach click event to each list item
        projectList.addEventListener("click", toggleProjectDetails);
    });
});


// Ensure PDF.js is loaded
const renderPDF = (url, containerId) => {
    const container = document.getElementById(containerId).querySelector(".pdf-content");
    container.innerHTML = ""; // Clear previous content

    pdfjsLib.getDocument(url).promise.then(pdf => {
        const totalPages = pdf.numPages;

        const renderPage = pageNum => {
            pdf.getPage(pageNum).then(page => {
                const scale = 1;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise.then(() => {
                    container.appendChild(canvas);
                    if (pageNum < totalPages) {
                        renderPage(pageNum + 1);
                    }
                });
            });
        };

        renderPage(1);
    }).catch(error => {
        console.error("Error loading PDF:", error);
    });
};

// Function to toggle PDF visibility and close others
function togglePDF(containerId) {
    const pdfContainers = document.querySelectorAll(".pdf-container");
    const closeButtons = document.querySelectorAll(".close-button");

    pdfContainers.forEach((container, index) => {
        if (container.id === containerId) {
            // Toggle visibility for the clicked project
            const isOpen = container.style.display === "block";
            container.style.display = isOpen ? "none" : "block";
            closeButtons[index].classList.toggle("visible", !isOpen);
        } else {
            // Close all other projects
            container.style.display = "none";
            closeButtons[index].classList.remove("visible");
        }
    });
}

// Function to close a specific PDF
function closePDF(containerId) {
    const pdfContainer = document.getElementById(containerId);
    pdfContainer.style.display = "none";

    const closeButton = pdfContainer.previousElementSibling.querySelector(".close-button");
    closeButton.classList.remove("visible");
}

// Example URLs for PDFs
const urls = [
    { url: "Project001.pdf", containerId: "pdf-viewer-1" },
    { url: "Project002.pdf", containerId: "pdf-viewer-2" },
    { url: "Project003.pdf", containerId: "pdf-viewer-3" },
    { url: "Project004.pdf", containerId: "pdf-viewer-4" },
    { url: "Project005.pdf", containerId: "pdf-viewer-5" }
];

// Pre-render PDFs (if needed)
urls.forEach(({ url, containerId }) => renderPDF(url, containerId));



//CONTACT FORM - LEAVE A MESSAGE
// Contact Form Submission
const form = document.querySelector("#contactForm");
const statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";

    // Create a new AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "message.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onload = () => {
        if (xhr.status === 200) {
            let response = xhr.responseText;
            if (response.includes("Sorry") || response.includes("Enter a valid")) {
                statusTxt.style.color = "red";
            } else {
                form.reset();
                setTimeout(() => statusTxt.style.display = "none", 3000);
            }
            statusTxt.innerText = response;
        }
    };

    // Prepare form data
    let formData = new FormData(form);
    let encodedData = new URLSearchParams(formData).toString(); // Encode data

    // Send the form data
    xhr.send(encodedData);
};








//REVIEW SECTION
document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.querySelector(".load-more-btn");
    const filters = document.querySelectorAll(".filter-btn");
    const reviewCategories = document.querySelectorAll(".review-category");
    let visibleReviews = {}; // Track how many reviews are visible per category

    // Initialize the visible reviews count for all categories
    reviewCategories.forEach(category => {
    const reviews = category.querySelectorAll(".review");
    reviews.forEach((review, index) => {
        review.classList.add("hidden"); // Initially hide all
    });
    visibleReviews[category.classList[1]] = 0; // Start with 0 visible
    });

    // Show 5 reviews for the "All" category by default
    showReviewsInBatches('all', 5);

    // Filter reviews based on category button click
    filters.forEach(filter => {
    filter.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        handleFilter(category);
    });
    });

    function handleFilter(category) {
    reviewCategories.forEach(cat => {
        if (category === "all") {
        cat.classList.remove("hidden"); // Show all categories
        showReviewsInBatches(category, 5); // Show first 5 reviews
        } else if (cat.classList.contains(category)) {
        cat.classList.remove("hidden"); // Show the selected category
        showReviewsInBatches(category, 5); // Show first 5 reviews for the category
        } else {
        cat.classList.add("hidden"); // Hide other categories
        }
    });
    }

    // Show reviews in batches of 5 for the selected category
    function showReviewsInBatches(category, count) {
    if (category === 'all') {
        reviewCategories.forEach(category => {
        const reviews = category.querySelectorAll(".review");
        reviews.forEach((review, index) => {
            if (index < count) {
            review.classList.remove("hidden"); // Show review
            } else {
            review.classList.add("hidden"); // Hide review
            }
        });
        });
    } else {
        const selectedCategory = document.querySelector(`.review-category.${category}`);
        const reviews = selectedCategory.querySelectorAll(".review");
        reviews.forEach((review, index) => {
        if (index < count) {
            review.classList.remove("hidden"); // Show review
        } else {
            review.classList.add("hidden"); // Hide review
        }
        });
    }
    }

    // Load more reviews when clicking the "Load More" button
    loadMoreBtn.addEventListener("click", () => {
    reviewCategories.forEach(category => {
        if (!category.classList.contains("hidden")) {
        const reviews = category.querySelectorAll(".review");
        const currentVisible = visibleReviews[category.classList[1]] || 0;

        // Show 5 more reviews or all remaining reviews
        const newVisible = Math.min(currentVisible + 5, reviews.length);
        visibleReviews[category.classList[1]] = newVisible;
        showReviewsInBatches(category.classList[1], newVisible);
        }
    });
    });
});



//Responsive Design

window.addEventListener("resize", function() {
    const screenWidth = window.innerWidth;
    const serviceDescription = document.querySelector(".service-description");

    if (screenWidth >= 250 && screenWidth <= 400) {
        serviceDescription.style.width = `${screenWidth * 0.8}px`; // 80% of screen width
    }
});



//FOOTER DATE DISPLAY automatically
document.getElementById('year').textContent = new Date().getFullYear();


//contact, skills and projects button
document.addEventListener('DOMContentLoaded', function() {
    // Button for "Get in Touch" (Contacts)
    document.getElementById('getInTouchBtn').addEventListener('click', function() {  
        const target = document.getElementById('contacts');  
        if (target) {  
            target.scrollIntoView({ behavior: 'smooth' });  
        } else {  
            console.error("Target section not found!");  
        }  
    });

    // Button for "See My Projects" (Projects)
    document.getElementById('seeProjectsBtn').addEventListener('click', function() {  
        const target = document.getElementById('projects');  
        if (target) {  
            target.scrollIntoView({ behavior: 'smooth' });  
        } else {  
            console.error("Target section not found!");  
        }  
    });

    // Button for "See My Sills" (Skills)
    document.getElementById('seeProjectsBtn').addEventListener('click', function() {  
        const target = document.getElementById('skills');  
        if (target) {  
            target.scrollIntoView({ behavior: 'smooth' });  
        } else {  
            console.error("Target section not found!");  
        }  
    });
});
