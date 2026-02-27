// Animate sections on scroll
const isMobile = window.innerWidth <= 480;

const animatedElements = document.querySelectorAll(
    '.fade-in, .job, .skill-category, .skill, .project-card, #scalability .fade-in, .about-card, .process-card, .process-branch, .edu-card'
);

const observerOptions = {
    threshold: isMobile ? 0 : 0,           // trigger immediately
    rootMargin: isMobile ? "0px" : "0px 0px -200px 0px"  // start 200px before element enters
};
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        // Animate skill bars
        if (entry.target.classList.contains('skill')) {
            const bar = entry.target.querySelector('.progress-bar span');
            const percentLabel = entry.target.querySelector('.skill-percent');
            if (bar && percentLabel) {
                const targetPercent = parseInt(bar.dataset.skill);
                bar.style.width = bar.dataset.skill;
                if (!isMobile) { // animate gradually on desktop
                    let current = 0;
                    const increment = targetPercent / 60;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= targetPercent) {
                            current = targetPercent;
                            clearInterval(interval);
                        }
                        percentLabel.textContent = Math.round(current) + '%';
                    }, 16);
                } else {
                    percentLabel.textContent = bar.dataset.skill; // show immediately on mobile
                }
            }
        }

        observer.unobserve(entry.target);
    });
}, observerOptions);


// Observe all elements without preset delay
animatedElements.forEach(el => scrollObserver.observe(el));



// Smooth scroll for internal links
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#section-nav ul li a");
    const lineFill = document.querySelector("#section-nav .line-fill");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        // Animate line-fill
        const scrollPercent = (scrollTop / docHeight) * 100;
        lineFill.style.height = scrollPercent + "%";

        // Highlight active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollTop >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});




//Specify Subjects for Contact Form
// Show "Specify other" input if 'Other' is selected
const subjectSelect = document.getElementById('subject');
const subjectOther = document.getElementById('subject-other');

subjectSelect.addEventListener('change', () => {
    if(subjectSelect.value === 'other') {
        subjectOther.style.display = 'block';
        subjectOther.required = true;
    } else {
        subjectOther.style.display = 'none';
        subjectOther.required = false;
        subjectOther.value = '';
    }
});



//Years of Experience Counter
// Dynamic years of experience from 2021
const startYear = 2021;
const currentYear = new Date().getFullYear();
document.getElementById("years-exp").textContent = currentYear - startYear;



//CONTACT FORM SUBMISSION
//Trigger whatsapp/sms or phone call based on device
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default form submission

    // Capture form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value || document.getElementById("subject-other").value;
    const message = document.getElementById("message").value;

    // Prepare message links
    const fullMsg = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`;
    const whatsappLink = `https://wa.me/254716770021?text=${encodeURIComponent(fullMsg)}`;
    const telLink = "tel:+254716770021";
    const smsLink = `sms:+254716770021?body=${encodeURIComponent(fullMsg)}`;
    const mailtoLink = `mailto:ambetsafrankline@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMsg)}`;

    // SweetAlert2 main options
    Swal.fire({
        title: 'Submission Not Supported on This Platform',
        text: 'Kindly use another submission method to send your form and reach me, or give me a direct call.',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'WhatsApp',
        cancelButtonText: 'SMS / Email',
        denyButtonText: 'Call'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(whatsappLink, "_blank");
        } else if (result.isDenied) {
            window.location.href = telLink;
        } else {
            // Nested choice: SMS or Email
            Swal.fire({
                title: 'Send via SMS or Email?',
                showCancelButton: true,
                confirmButtonText: 'SMS',
                cancelButtonText: 'Email'
            }).then((choice) => {
                if (choice.isConfirmed) {
                    window.location.href = smsLink;
                } else {
                    window.location.href = mailtoLink;
                }
            });
        }
    });

    this.reset(); // Clear form
});


//-- Dynamic JS for Years of Experience -->

document.querySelectorAll(".years-exp").forEach(el => {
    const start = parseInt(el.getAttribute("data-start"));
    const current = new Date().getFullYear();
    const years = current - start;
    el.textContent = `Experience: ${years} Year${years !== 1 ? 's' : ''}`;
});


document.querySelectorAll('.view-project').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const imgSrc = link.dataset.img;
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('project-modal').style.display = 'flex';
    });
});

// Close modal on click
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
});
