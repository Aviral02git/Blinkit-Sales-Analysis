// Smooth animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply to sections or cards if needed
    // Currently relying on CSS fade-in for hero
});

// Simple tracking or interaction can go here
console.log('Ishita Thakur Portfolio Loaded');
