document.addEventListener('DOMContentLoaded', function () {
    // Profile dropdown toggle
    document.getElementById('profileButton').addEventListener('click', function () {
      const profileMenu = document.getElementById('profileMenu');
      profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    });
  
    // Sidebar toggle
    document.getElementById('navToggle').addEventListener('click', function () {
      document.querySelector('.sidebar').classList.toggle('active');
      this.classList.toggle('active'); // Toggle button appearance
    });
  });