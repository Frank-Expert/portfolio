// Animate sections on scroll

/* ============================================================
   PORTFOLIO INTERACTIONS
   ============================================================ */

"use strict";


/* ============================================================
   ANIMATE SECTIONS ON SCROLL
   ============================================================ */

const isMobile = window.innerWidth <= 480;

const animatedElements = document.querySelectorAll(
    [
        ".fade-in",
        ".job",
        ".skill-category",
        ".project-card",
        "#scalability .fade-in",
        ".about-card",
        ".process-card",
        ".process-branch",
        ".edu-card"
    ].join(", ")
);

const observerOptions = {
    threshold: 0,
    rootMargin: isMobile
        ? "0px"
        : "0px 0px -200px 0px"
};

const scrollObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
        });

    },
    observerOptions
);

animatedElements.forEach((element) => {
    scrollObserver.observe(element);
});


/* ============================================================
   SMOOTH SCROLL / SECTION NAVIGATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#section-nav ul li a");
    const lineFill = document.querySelector("#section-nav .line-fill");

    if (!sections.length || !navLinks.length) {
        return;
    }

    const updateSectionNavigation = () => {

        const scrollTop = window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        let current = "";

        /* --------------------------------------------------------
           Animate navigation progress line
           -------------------------------------------------------- */

        if (lineFill) {

            const scrollPercent =
                documentHeight > 0
                    ? Math.min(
                        100,
                        Math.max(
                            0,
                            (scrollTop / documentHeight) * 100
                        )
                    )
                    : 0;

            lineFill.style.height = `${scrollPercent}%`;
        }


        /* --------------------------------------------------------
           Detect active section
           -------------------------------------------------------- */

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 200;

            if (scrollTop >= sectionTop) {
                current = section.getAttribute("id");
            }
        });


        /* --------------------------------------------------------
           Update active navigation link
           -------------------------------------------------------- */

        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${current}`
            );
        });
    };


    window.addEventListener(
        "scroll",
        updateSectionNavigation,
        { passive: true }
    );

    updateSectionNavigation();

});


/* ============================================================
   CONTACT FORM — SUBJECT "OTHER"
   ============================================================ */

const subjectSelect = document.getElementById("subject");
const subjectOther = document.getElementById("subject-other");

if (subjectSelect && subjectOther) {

    const updateSubjectOther = () => {

        const isOther =
            subjectSelect.value === "other";

        subjectOther.style.display =
            isOther ? "block" : "none";

        subjectOther.required = isOther;

        if (!isOther) {
            subjectOther.value = "";
        }
    };

    subjectSelect.addEventListener(
        "change",
        updateSubjectOther
    );

    updateSubjectOther();
}


/* ============================================================
   DYNAMIC SKILL EXPERIENCE
   ------------------------------------------------------------
   Each skill stores only its starting year:

       data-start="2022"

   JavaScript calculates the current experience automatically.
   No manual yearly updates are required.
   ============================================================ */

(function updateSkillExperience() {

    const currentYear =
        new Date().getFullYear();

    const experienceElements =
        document.querySelectorAll(
            ".skill-item-exp[data-start]"
        );

    experienceElements.forEach((element) => {

        const startYear =
            Number.parseInt(
                element.dataset.start,
                10
            );

        /* --------------------------------------------------------
           Invalid or future start year
           -------------------------------------------------------- */

        if (
            !Number.isFinite(startYear) ||
            startYear > currentYear
        ) {
            element.textContent = "Starting";
            return;
        }


        /* --------------------------------------------------------
           Calculate experience
           -------------------------------------------------------- */

        const years =
            Math.max(
                0,
                currentYear - startYear
            );


        /* --------------------------------------------------------
           Compact portfolio-friendly display
           -------------------------------------------------------- */

        if (years === 0) {

            element.textContent =
                "Less than 1 yr";

        } else if (years === 1) {

            element.textContent =
                "1 yr";

        } else {

            element.textContent =
                `${years} yrs`;
        }

    });

})();


/* ============================================================
   CONTACT FORM SUBMISSION
   ------------------------------------------------------------
   Uses WhatsApp, SMS, phone call, or email depending on the
   user's selected submission method.
   ============================================================ */

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ----------------------------------------------------
               Capture form values
               ---------------------------------------------------- */

            const name =
                document.getElementById("name")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim() || "";

            const phone =
                document.getElementById("phone")?.value.trim() || "";

            const selectedSubject =
                document.getElementById("subject")?.value || "";

            const customSubject =
                document.getElementById("subject-other")?.value.trim() || "";

            const subject =
                selectedSubject === "other"
                    ? customSubject
                    : selectedSubject;

            const message =
                document.getElementById("message")?.value.trim() || "";


            /* ----------------------------------------------------
               Prepare message
               ---------------------------------------------------- */

            const fullMsg =
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Subject: ${subject}\n` +
                `Message: ${message}`;


            /* ----------------------------------------------------
               Prepare submission links
               ---------------------------------------------------- */

            const encodedMessage =
                encodeURIComponent(fullMsg);

            const encodedSubject =
                encodeURIComponent(subject);


            const whatsappLink =
                `https://wa.me/254716770021?text=${encodedMessage}`;

            const telLink =
                "tel:+254716770021";

            const smsLink =
                `sms:+254716770021?body=${encodedMessage}`;

            const mailtoLink =
                `mailto:ambetsafrankline@gmail.com` +
                `?subject=${encodedSubject}` +
                `&body=${encodedMessage}`;


            /* ----------------------------------------------------
               SweetAlert2 submission selector
               ---------------------------------------------------- */

            if (typeof Swal === "undefined") {

                window.location.href =
                    whatsappLink;

                return;
            }


            Swal.fire({

                title:
                    "Submission Not Supported on This Platform",

                text:
                    "Kindly use another submission method to send your form and reach me, or give me a direct call.",

                icon:
                    "info",

                showDenyButton:
                    true,

                showCancelButton:
                    true,

                confirmButtonText:
                    "WhatsApp",

                cancelButtonText:
                    "SMS / Email",

                denyButtonText:
                    "Call"

            }).then((result) => {


                /* ------------------------------------------------
                   WhatsApp
                   ------------------------------------------------ */

                if (result.isConfirmed) {

                    window.open(
                        whatsappLink,
                        "_blank",
                        "noopener,noreferrer"
                    );

                    contactForm.reset();

                    if (subjectOther) {
                        subjectOther.style.display = "none";
                        subjectOther.required = false;
                    }

                    return;
                }


                /* ------------------------------------------------
                   Phone call
                   ------------------------------------------------ */

                if (result.isDenied) {

                    window.location.href =
                        telLink;

                    contactForm.reset();

                    if (subjectOther) {
                        subjectOther.style.display = "none";
                        subjectOther.required = false;
                    }

                    return;
                }


                /* ------------------------------------------------
                   SMS or Email
                   ------------------------------------------------ */

                Swal.fire({

                    title:
                        "Send via SMS or Email?",

                    icon:
                        "question",

                    showCancelButton:
                        true,

                    confirmButtonText:
                        "SMS",

                    cancelButtonText:
                        "Email"

                }).then((choice) => {

                    if (choice.isConfirmed) {

                        window.location.href =
                            smsLink;

                    } else {

                        window.location.href =
                            mailtoLink;
                    }

                    contactForm.reset();

                    if (subjectOther) {
                        subjectOther.style.display = "none";
                        subjectOther.required = false;
                    }

                });

            });

        }
    );

}


/* ============================================================
   PROJECT IMAGE MODAL
   ============================================================ */

const projectLinks =
    document.querySelectorAll(".view-project");

const projectModal =
    document.getElementById("project-modal");

const modalImage =
    document.getElementById("modal-img");

const modalClose =
    document.getElementById("modal-close");


/* ------------------------------------------------------------
   Open project modal
   ------------------------------------------------------------ */

projectLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const imageSource =
            link.dataset.img;

        if (!projectModal || !modalImage || !imageSource) {
            return;
        }

        modalImage.src =
            imageSource;

        projectModal.style.display =
            "flex";

        document.body.classList.add(
            "modal-open"
        );
    });

});


/* ------------------------------------------------------------
   Close project modal
   ------------------------------------------------------------ */

if (modalClose && projectModal) {

    modalClose.addEventListener(
        "click",
        () => {

            projectModal.style.display =
                "none";

            document.body.classList.remove(
                "modal-open"
            );
        }
    );

}


/* ------------------------------------------------------------
   Close modal when clicking backdrop
   ------------------------------------------------------------ */

if (projectModal) {

    projectModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === projectModal
            ) {

                projectModal.style.display =
                    "none";

                document.body.classList.remove(
                    "modal-open"
                );
            }
        }
    );

}


/* ------------------------------------------------------------
   Close modal with Escape
   ------------------------------------------------------------ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.style.display === "flex"
        ) {

            projectModal.style.display =
                "none";

            document.body.classList.remove(
                "modal-open"
            );
        }

    }
);


/* ============================================================
   CONTACT MESSAGE CHARACTER COUNTER
   ------------------------------------------------------------
   Supports the current contact form:
       #message
       #message-count
       maxlength="2000"
   ============================================================ */

const messageField =
    document.getElementById("message");

const messageCount =
    document.getElementById("message-count");

if (messageField && messageCount) {

    const updateMessageCount = () => {

        const length =
            messageField.value.length;

        messageCount.textContent =
            `${length} / 2000`;
    };

    messageField.addEventListener(
        "input",
        updateMessageCount
    );

    updateMessageCount();
}



/* ============================================================
   DYNAMIC YEARS OF EXPERIENCE
   ------------------------------------------------------------
   Calculates completed years based on the exact start date.
   ============================================================ */

(function updateYearsExperience() {

    const experienceElement =
        document.getElementById("years-exp");

    if (!experienceElement) {
        return;
    }

    const startDate =
        new Date("2022-01-01");

    const today =
        new Date();

    let years =
        today.getFullYear() -
        startDate.getFullYear();

    const anniversary =
        new Date(
            today.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        );

    if (today < anniversary) {
        years--;
    }

    experienceElement.textContent =
        Math.max(0, years);

})();