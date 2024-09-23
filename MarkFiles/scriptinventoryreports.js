    // Handle profile dropdown menu toggle
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('profileButton').addEventListener('click', function () {
        const profileMenu = document.getElementById('profileMenu');
        profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    });
})
        // Sidebar toggle for mobile view
        document.addEventListener('DOMContentLoaded', function() {
        let navToggle = document.getElementById('navToggle');
        let sidebar = document.querySelector('.sidebar');
    
        navToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
});

function openModal(imageElement) {
    // Get the source of the clicked image
    var imgSrc = imageElement.src;
    // Set the source of the modal image
    document.getElementById("modalImage").src = imgSrc;
    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();
}

// JavaScript for search filter functionality
function filterTable() {
    // Get the input value
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var table = document.getElementById("inventoryTable");
    var rows = table.getElementsByTagName("tr");

    // Loop through the rows of the table and hide those that don't match the search
    for (var i = 1; i < rows.length; i++) {
        var productName = rows[i].getElementsByTagName("td")[1]; // Index 1 for Product Name
        var brand = rows[i].getElementsByTagName("td")[2]; // Index 2 for Brand
        if (productName || brand) {
            var textValueName = productName.textContent || productName.innerText;
            var textValueBrand = brand.textContent || brand.innerText;
            if (textValueName.toLowerCase().indexOf(filter) > -1 || textValueBrand.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

