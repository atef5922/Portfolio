document.addEventListener('DOMContentLoaded', function () {
    
    // --- Project Filter Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block'; // Show card
                    } else {
                        card.style.display = 'none'; // Hide card
                    }
                });
            });
        });
    }

    // --- Active Nav Link Logic ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav ul li a');
    const header = document.querySelector('header');

    if (sections.length > 0 && navLinks.length > 0 && header) {
        const headerHeight = header.offsetHeight;

        function updateActiveLink() {
            let currentSectionId = '';
            // Use window.scrollY for modern browsers
            const scrollY = window.scrollY;

            sections.forEach(section => {
                // Subtract header height and a small buffer (e.g., 10px)
                const sectionTop = section.offsetTop - headerHeight - 10; 
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // Special case for the top of the page (Home)
            if (currentSectionId === '' && scrollY < sections[0].offsetTop - headerHeight - 10) {
                currentSectionId = 'home';
            }

            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('nav-active');
                }
            });
        }

        // Listen for scroll events
        window.addEventListener('scroll', updateActiveLink);
        // Run once on page load to set the initial state
        updateActiveLink();
    }

    // --- NEW: Typing Animation Logic ---
    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    if (typedTextSpan && cursorSpan) {
        const textArray = ["Web Developer", "Problem Solver", "Learner"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                // Add next character
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                // Finished typing
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                // Remove last character
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                // Finished erasing
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0; // Loop back to first word
                setTimeout(type, typingDelay + 1100);
            }
        }

        // Start the animation
        setTimeout(type, newTextDelay);
    }
    // --- END: Typing Animation Logic ---
});