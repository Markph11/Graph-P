document.addEventListener("DOMContentLoaded", function () {
    // Profile dropdown toggle
    const profileButton = document.getElementById('profileButton');
    const profileMenu = document.getElementById('profileMenu');

    profileButton.addEventListener('click', function () {
        profileMenu.classList.toggle('show');
    });

    // Nav toggle for sidebar
    const navToggle = document.getElementById('navToggle');
    const sidebar = document.getElementById('sidebar');

    navToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });


    // Delete button functionality
    const deleteButtons = document.querySelectorAll('.delete-role');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr'); // Get the closest row element
            const name = this.getAttribute('data-name');
            
            if (confirm(`Are you sure you want to permanently delete ${name}?`)) {
                // Remove the row from the table
                row.remove();
                
                // Optionally, send a request to the server to perform actual deletion
                /*
                fetch(`/delete-account?name=${encodeURIComponent(name)}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        alert(`${name} has been permanently deleted.`);
                    } else {
                        alert('Error deleting account. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
                */
            }
        });
    });
});

   // Search filter functionality
   const searchInput = document.getElementById('searchInput');
   searchInput.addEventListener('keyup', function() {
       const filter = searchInput.value.toLowerCase();
       const tableBody = document.getElementById('rolesTableBody');
       const rows = tableBody.getElementsByTagName('tr');

       Array.from(rows).forEach(row => {
           const fullNameCell = row.getElementsByTagName('td')[0]; // Assuming the first column contains the name
           const fullName = fullNameCell.textContent.toLowerCase();
           
           if (fullName.includes(filter)) {
               row.style.display = ''; // Show row
           } else {
               row.style.display = 'none'; // Hide row
           }
       });
   });

       // Sorting functionality
       const sortNewest = document.getElementById('sortNewest');
       const sortOldest = document.getElementById('sortOldest');
       const tableBody = document.getElementById('rolesTableBody');
   
       // Function to sort rows by date
       function sortTableByDate(order) {
           const rows = Array.from(tableBody.querySelectorAll('tr'));
           rows.sort((a, b) => {
               const dateA = new Date(a.cells[2].textContent);
               const dateB = new Date(b.cells[2].textContent);
               return order === 'newest' ? dateB - dateA : dateA - dateB;
           });
           // Append sorted rows back to the table body
           rows.forEach(row => tableBody.appendChild(row));
       }
   
       // Event listeners for sorting
       sortNewest.addEventListener('click', function () {
           sortTableByDate('newest');
       });
   
       sortOldest.addEventListener('click', function () {
           sortTableByDate('oldest');
       });