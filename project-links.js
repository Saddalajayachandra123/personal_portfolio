// Project GitHub Links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.proj-btn.github, .btn.sm').forEach(btn => {
        if (btn.textContent.trim() === 'GitHub') {
            btn.href = 'https://github.com/Saddalajayachandra123?tab=repositories';
        }
    });
});
