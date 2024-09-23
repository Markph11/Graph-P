document.addEventListener("DOMContentLoaded", function() {
    // Profile dropdown toggle
    const profileButton = document.getElementById('profileButton');
    const profileMenu = document.getElementById('profileMenu');



    profileButton.addEventListener('click', function() {
        profileMenu.classList.toggle('show');
    });



    // Nav toggle for sidebar
    const navToggle = document.getElementById('navToggle');
    const sidebar = document.querySelector('.sidebar');


    
    navToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        navToggle.classList.toggle('active'); // Toggle button appearance
    });

    // Chart.js for Purchase and Sales graph
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Purchase',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Sales',
                data: [7, 11, 5, 8, 3, 7, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

        // Function to animate the stat numbers
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
      const updateCount = () => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;

        // Increase the speed by changing the value of `increment`
        const increment = target / 100;

        if (count < target) {
          stat.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20); // Adjust the speed of the animation
        } else {
          stat.innerText = target;
        }
      };

      updateCount();
    });
  }

  // Trigger the animation when the section is in view
  const statSection = document.querySelector('.stats');
  let hasAnimated = false;

  window.addEventListener('scroll', () => {
    const sectionPosition = statSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !hasAnimated) {
      animateStats();
      hasAnimated = true; // Prevents the animation from running multiple times
    }
  });
                