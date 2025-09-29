import resumePDF from '../assets/resume.pdf';

/**
 * Show temporary toast notification
 */
const showToast = (message, type = 'info') => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  }`;
  toast.textContent = message;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

/**
 * Handle resume button click - download on mobile, open in new tab on desktop
 */
export const handleResumeClick = () => {
  try {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;

    if (isMobile) {
      // On mobile: Download the PDF
      const link = document.createElement('a');
      link.href = resumePDF;
      link.download = 'Hayakkiri_Resume.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('Resume download started!', 'success');
    } else {
      // On desktop: Open in new tab
      const newWindow = window.open(resumePDF, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        showToast('Resume opened in new tab!', 'success');
      } else {
        // Fallback to download if popup blocked
        handleResumeDownload();
        showToast('Resume download started!', 'success');
      }
    }
  } catch (error) {
    console.error('Error handling resume:', error);
    showToast('Error opening resume. Please try again.', 'error');
  }
};

/**
 * Get resume PDF URL for direct access
 */
export const getResumeURL = () => resumePDF;

/**
 * Handle resume download (force download regardless of device)
 */
export const handleResumeDownload = () => {
  const link = document.createElement('a');
  link.href = resumePDF;
  link.download = 'Hayakkiri_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Handle resume view in new tab (force view regardless of device)
 */
export const handleResumeView = () => {
  window.open(resumePDF, '_blank', 'noopener,noreferrer');
};