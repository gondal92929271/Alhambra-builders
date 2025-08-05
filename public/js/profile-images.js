// Profile Images Handler - Simple and Effective
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile images script started');
    
    // Function to handle image loading
    function handleImage(img) {
        // Make sure image is visible
        img.style.opacity = '1';
        img.style.display = 'block';
        
        // Add error handling
        img.onerror = function() {
            console.log('Image failed to load:', this.src);
            const parent = this.parentElement;
            
            // Get name for initials
            let name = this.alt || 'Unknown';
            if (!this.alt && parent.nextElementSibling) {
                const h3 = parent.nextElementSibling.querySelector('h3');
                if (h3) name = h3.textContent;
            }
            
            // Create initials
            const initials = name.split(' ')
                .map(word => word.charAt(0))
                .join('')
                .substring(0, 2)
                .toUpperCase();
            
            // Replace with dummy
            parent.innerHTML = initials;
            parent.classList.add('dummy');
        };
        
        // Success handler
        img.onload = function() {
            console.log('Image loaded successfully:', this.src);
            this.style.opacity = '1';
        };
    }
    
    // Process all profile images
    const allImages = document.querySelectorAll('.team-photo img, .author-image img');
    console.log('Found profile images:', allImages.length);
    
    allImages.forEach((img, index) => {
        console.log(`Processing image ${index + 1}:`, img.src);
        handleImage(img);
    });
    
    // Double-check after full page load
    window.addEventListener('load', function() {
        console.log('Page fully loaded, final image check...');
        
        document.querySelectorAll('.team-photo img, .author-image img').forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                console.log('Retrying image load:', img.src);
                handleImage(img);
            }
        });
    });
});
