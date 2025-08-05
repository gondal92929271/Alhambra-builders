// Notification System
class NotificationManager {
    constructor() {
        this.createNotificationContainer();
        this.checkForUrlParams();
    }

    createNotificationContainer() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    checkForUrlParams() {
        // Check URL parameters for success/error messages
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');

        if (success === 'true') {
            const currentPage = window.location.pathname;
            if (currentPage.includes('/quote')) {
                this.showNotification('Thank you for your quote request! We\'ll be in touch within 24-48 hours.', 'success');
            } else if (currentPage.includes('/contact')) {
                this.showNotification('Thank you for your message! We\'ll get back to you shortly.', 'success');
            }
        }

        if (error) {
            let errorMessage = 'An error occurred. Please try again.';
            switch (error) {
                case 'missing_fields':
                    errorMessage = 'Please fill in all required fields.';
                    break;
                case 'email_failed':
                    errorMessage = 'Sorry, there was an error sending your message. Please try again or call us directly at 07494 656352.';
                    break;
                case 'server_error':
                    errorMessage = 'A server error occurred. Please try again later or contact us directly.';
                    break;
            }
            this.showNotification(errorMessage, 'error');
        }

        // Clean URL by removing the parameters after showing notification
        if (success || error) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }

    showNotification(message, type = 'info', duration = 6000) {
        const container = document.getElementById('notification-container');
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Add icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i>';
                break;
        }

        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icon}</div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add to container
        container.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 100);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }

        return notification;
    }

    removeNotification(notification) {
        if (notification && notification.parentElement) {
            notification.classList.remove('notification-show');
            notification.classList.add('notification-hide');
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }
    }

    // Public method to show notifications programmatically
    static show(message, type = 'info', duration = 6000) {
        if (!window.notificationManager) {
            window.notificationManager = new NotificationManager();
        }
        return window.notificationManager.showNotification(message, type, duration);
    }
}

// Initialize notification manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.notificationManager = new NotificationManager();
});

// Export for use in other scripts
window.NotificationManager = NotificationManager;
