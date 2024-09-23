            // Handle profile dropdown menu toggle
            document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('profileButton').addEventListener('click', function () {
            const profileMenu = document.getElementById('profileMenu');
            profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});
    
            // Handle Add User Form Submission
            document.getElementById('addUserForm').addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
        
            const username = document.getElementById('username').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            const createdOn = document.getElementById('createdOn').value;
            const status = document.getElementById('status').value;
        
            const newUser = {
            username,
            phone,
            email,
            role,
            createdOn,
            status
};

            addUserToTable(newUser);

            // Close modal
            const addUserModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            addUserModal.hide();

            // Clear form
            document.getElementById('addUserForm').reset();
});

            // Function to add user to table
            function addUserToTable(user) {
            const usersTableBody = document.getElementById('usersTableBody');

            // Create a new row
            const row = document.createElement('tr');
            row.setAttribute('data-username', user.username); // Set a data attribute for easy lookup
            row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.createdOn}</td>
            <td><span class="badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary edit-user" data-bs-toggle="modal" data-bs-target="#editUserModal" data-username="${user.username}">Edit</button>
                <button class="btn btn-sm btn-danger delete-user" data-username="${user.username}" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">Delete</button>
            </td>
            `;
            usersTableBody.appendChild(row);
}

            // Handle Edit button click
            document.querySelectorAll('.edit-user').forEach(button => {
            button.addEventListener('click', () => {
            const username = button.getAttribute('data-username');
            const row = button.closest('tr');
            
            // Populate the edit form with existing user data
            document.getElementById('editUsername').value = row.children[0].textContent;
            document.getElementById('editPhone').value = row.children[1].textContent;
            document.getElementById('editEmail').value = row.children[2].textContent;
            document.getElementById('editRole').value = row.children[3].textContent;
            document.getElementById('editStatus').value = row.children[5].textContent === 'Active' ? 'Active' : 'Inactive';
            
            // Handle save changes button click
            document.getElementById('saveUserChanges').addEventListener('click', () => {
            const editedUser = {
            username: document.getElementById('editUsername').value,
            phone: document.getElementById('editPhone').value,
            email: document.getElementById('editEmail').value,
            role: document.getElementById('editRole').value,
            status: document.getElementById('editStatus').value
};
                
            // Update the table row with new values
            updateUserInTable(row, editedUser);

            // Close modal
            const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            editUserModal.hide();
        });
    });
});

            // Function to update user in table
            function updateUserInTable(row, user) {
            row.children[0].textContent = user.username;
            row.children[1].textContent = user.phone;
            row.children[2].textContent = user.email;
            row.children[3].textContent = user.role;
            row.children[5].innerHTML = `<span class="badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${user.status}</span>`;
}

            // Handle Delete button click
            document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', () => {
            const username = button.getAttribute('data-username');
            const deleteUserBtn = document.getElementById('confirmDeleteBtn');
            deleteUserBtn.addEventListener('click', () => {


            // Remove the user from the table
            const row = button.closest('tr');
            row.remove();
            alert(`${username} deleted`); // Replace with actual delete logic


            // Close modal
            const deleteConfirmModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
            deleteConfirmModal.hide();
            });
        });
    });
});
            // Filter button click event

            document.addEventListener('DOMContentLoaded', () => {
            let ascending = true; // Variable to track sorting order
            
            // Function to format the date from the string (MM/DD/YYYY)
            function parseDate(dateString) {
            const parts = dateString.split('/');
            return new Date(parts[2], parts[0] - 1, parts[1]);
        }
            
            // Function to sort rows by the "Created On" column
            function sortTableByDate() {
            const tableBody = document.getElementById('usersTableBody');
            const rows = Array.from(tableBody.querySelectorAll('tr'));
            
            rows.sort((rowA, rowB) => {
            const dateA = parseDate(rowA.cells[4].textContent);
            const dateB = parseDate(rowB.cells[4].textContent);
            
            return ascending ? dateA - dateB : dateB - dateA; // Toggle ascending/descending order
});
            
            // Remove all existing rows and re-add them in the sorted order
            tableBody.innerHTML = '';
            rows.forEach(row => tableBody.appendChild(row));
            
            // Toggle the sorting order for the next click
            ascending = !ascending;
            
            // Update the sorting icon
            const sortIcon = document.querySelector('#sortByDate i');
            if (ascending) {
            sortIcon.classList.remove('fa-sort-down');
            sortIcon.classList.add('fa-sort-up');
            } else {
            sortIcon.classList.remove('fa-sort-up');
            sortIcon.classList.add('fa-sort-down');
        }
}
            
            // Attach click event to the "Created On" header for sorting
            document.getElementById('sortByDate').addEventListener('click', sortTableByDate);
        });

            
            // Search filter functionality
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const tableBody = document.getElementById('usersTableBody'); // Corrected ID
            const rows = tableBody.getElementsByTagName('tr');

            Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let matchFound = false;

            // Loop through each cell in the row
            Array.from(cells).forEach(cell => {
            if (cell.textContent.toLowerCase().includes(filter)) {
            matchFound = true;
                        }
        });

            if (matchFound) {
            row.style.display = ''; // Show row if any cell matches the search
            } else {
            row.style.display = 'none'; // Hide row if no cells match
        }
    });
});
