document.addEventListener('DOMContentLoaded', () => {
    // Script for scroll animations - moved from individual HTML files
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionOutOfMemoryError(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
