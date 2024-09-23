// For Roles javascript

// Handle Add Role Form Submission
document.getElementById("addRoleForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the input values from the form
  const roleName = document.getElementById("roleName").value;
  const createdDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  // Add the new role to the table
  const rolesTableBody = document.getElementById('rolesTableBody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
      <td><input type="checkbox" class="row-checkbox"></td>
      <td>${roleName}</td>
      <td>${createdDate}</td>
      <td>
          <button class="btn btn-sm btn-primary edit-role">Edit</button>
          <button class="btn btn-sm btn-danger delete-role">Delete</button>
      </td>
  `;

  // Append the new row to the table
  rolesTableBody.appendChild(newRow);

  // Re-attach event listeners to the new Edit and Delete buttons and checkboxes
  attachRoleActions(newRow);
  attachCheckboxListeners(newRow);

  // Close the modal after saving the role
  const addRoleModal = bootstrap.Modal.getInstance(document.getElementById('addRoleModal'));
  addRoleModal.hide();

  // Optionally, reset the form for next entry
  document.getElementById("addRoleForm").reset();
});


// Attach role action buttons (edit and delete) to a row
function attachRoleActions(row) {
  const editButton = row.querySelector('.edit-role');
  const deleteButton = row.querySelector('.delete-role');

  // Attach event listener for edit button
  editButton.addEventListener('click', function () {
      const roleName = row.cells[1].textContent; // Adjusted for new column with checkboxes
      document.getElementById('editRoleName').value = roleName;
      const editRoleModal = new bootstrap.Modal(document.getElementById('editRoleModal'));
      editRoleModal.show();

      // Handle edit form submission
      document.getElementById('editRoleForm').onsubmit = function (event) {
          event.preventDefault();

          // Update the role name in the table
          row.cells[1].textContent = document.getElementById('editRoleName').value;

          // Hide the modal after saving
          editRoleModal.hide();

          // Ensure the modal backdrop is completely removed after hiding
          document.body.classList.remove('modal-open');
          document.querySelector('.modal-backdrop').remove();
      };
  });

  // Attach event listener for delete button
  deleteButton.addEventListener('click', function () {
      const rowToDelete = row; // Set the row to be deleted
      const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      deleteConfirmModal.show();

      // Confirm deletion
      document.getElementById('confirmDeleteButton').addEventListener('click', function () {
          rowToDelete.remove(); // Remove the row from the table
          const deleteConfirmModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
          deleteConfirmModal.hide(); // Hide the delete confirmation modal
      });
  });
}

// Attach role actions to existing rows
document.querySelectorAll('#rolesTableBody tr').forEach(row => attachRoleActions(row));

// Handle profile dropdown menu toggle
document.getElementById('profileButton').addEventListener('click', function () {
  const profileMenu = document.getElementById('profileMenu');
  profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});

// Sidebar toggle functionality
document.getElementById('navToggle').addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('active');
  this.classList.toggle('active'); // Toggle button appearance
});

// Filter Table Functionality
document.getElementById('filterRole').addEventListener('change', function () {
  const selectedRole = this.value;
  const rows = document.querySelectorAll('#rolesTableBody tr');

  rows.forEach(row => {
      const roleName = row.cells[1].textContent.trim();
      row.style.display = (selectedRole === 'All' || roleName === selectedRole) ? '' : 'none';
  });
});


// Handle "Select All" Checkbox
document.getElementById('selectAll').addEventListener('change', function () {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

// Handle "Delete Selected" Button Click
document.getElementById('deleteSelectedBtn').addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked'); // Get all checked rows
  checkboxes.forEach(checkbox => {
      const row = checkbox.closest('tr'); // Find the row containing the checkbox
      row.remove(); // Remove the row from the table
  });
});