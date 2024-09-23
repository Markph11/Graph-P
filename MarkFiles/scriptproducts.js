    // Handle profile dropdown menu toggle
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('profileButton').addEventListener('click', function () {
      const profileMenu = document.getElementById('profileMenu');
      profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
  });
  
      // Sidebar toggle for mobile view
      document.addEventListener('DOMContentLoaded', function() {
      let navToggle = document.getElementById('navToggle');
      let sidebar = document.querySelector('.sidebar');
  
      navToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  });
  
      // Function to display product details in the modal
      function showProductDetailsModal(productRow) {
      // Extract the product details from the table row
      const productImage = productRow.querySelector('img').src;
      const productName = productRow.querySelectorAll('td')[1].textContent;
      const productBrand = productRow.querySelectorAll('td')[2].textContent;
      const productQuantity = productRow.querySelectorAll('td')[3].textContent;
      const productPrice = productRow.querySelectorAll('td')[4].textContent;
      const productCreatedBy = productRow.querySelectorAll('td')[5].textContent;
                        
      // Populate the product details modal
      document.getElementById('productImageDetail').src = productImage;
      document.getElementById('productNameDetail').textContent = productName;
      document.getElementById('productBrandDetail').textContent = productBrand;
      document.getElementById('productQuantityDetail').textContent = productQuantity;
      document.getElementById('productPriceDetail').textContent = productPrice;
      document.getElementById('productStatusDetail').textContent = productQuantity > 0 ? 'In Stock' : 'Out of Stock';
      document.getElementById('productDescriptionDetail').textContent = `The design is very very High Performance if you want to buy the price start at ₱300,000 with free kiss Hmmm Yummy! HAHAHAHA`; // Example description
          
    
      // Show product description if available
      const description = productRow.dataset.description || '';
      const descriptionElement = document.getElementById('productDescriptionDetail');
                        
      if (description) {
      descriptionElement.style.display = 'block'; // Show description
      descriptionElement.querySelector('span').textContent = description;
      } else {
      descriptionElement.style.display = 'none'; // Hide description
    }
      // Show the product details modal
      const detailsModal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
      detailsModal.show();
  }
  
      // Handle "View" button click
      document.getElementById('productsTableBody').addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-product')) {
      // Get the parent row of the clicked "View" button
      const productRow = event.target.closest('tr');                  
      // Show the product details modal with the extracted data
      showProductDetailsModal(productRow);
    }
  });
  
      // Handle product image click to show image in modal
      document.getElementById('productsTableBody').addEventListener('click', function(event) {
      if (event.target.tagName === 'IMG') {
      const imageSrc = event.target.src;
      const modalImage = document.getElementById('modalProductImage');
      modalImage.src = imageSrc;               
      const imageModal = new bootstrap.Modal(document.getElementById('productImageModal'));
      imageModal.show();
    }
  });
                  
      // Ensure the modal closes and resources are reset
      document.getElementById('productImageModal').addEventListener('hidden.bs.modal', function () 
  {
      // Clear the modal image src to avoid memory leaks or hanging image states
      document.getElementById('modalProductImage').src = '';                
      // Ensure any lingering backdrops are removed (just in case)
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
      modalBackdrop.remove();
    }
      
      // Reset any CSS changes made during the modal's lifecycle
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = ''; // Reset padding applied during modal display
  });
  
                    
      // Add new product logic
      document.getElementById('addProductButton').addEventListener('click', function() {
      const productName = document.getElementById('productName').value;
      const productBrand = document.getElementById('productBrand').value;
      const productQuantity = document.getElementById('productQuantity').value;
      const productPrice = document.getElementById('productPrice').value;
      const createdBy = document.getElementById('createdBy').value;
      const productImage = document.getElementById('productImage').files[0];
      const productDescription = document.getElementById('productDescription').value;
                        
      if (productName && productBrand && productQuantity && productPrice && createdBy && productImage) {
      const reader = new FileReader();
      reader.onload = function(e) {
      const tableBody = document.getElementById('productsTableBody');
      const newRow = document.createElement('tr');
                        
      newRow.innerHTML = `
      <td><img src="${e.target.result}" alt="${productName}" class="img-thumbnail" style="max-width: 100px;"></td>
      <td>${productName}</td>
      <td>${productBrand}</td>
      <td>${productQuantity}</td>
      <td>${productPrice}</td>
      <td>${createdBy}</td>
      <td>
      <button class="btn btn-sm btn-primary edit-product">View</button>
      <button class="btn btn-sm btn-danger delete-product" data-item="${productName}">Delete</button>
      </td>
  `;
  
  
      // Attach product description as a data attribute for later use
      newRow.dataset.description = productDescription;
      tableBody.appendChild(newRow);           
      // Reset form
      document.getElementById('addProductForm').reset();            
      // Hide modal and remove backdrop if needed
      const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
      modal.hide();            
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if
      (modalBackdrop) {
      modalBackdrop.remove();
    }
  };
      reader.readAsDataURL(productImage);
      } 
      else {
      alert('Please fill in all fields.');
      }
  });
  
      // Function to display product details in the modal
      function showProductDetailsModal(productRow) {
      // Extract the product details from the table row
      const productImage = productRow.querySelector('img').src;
      const productName = productRow.querySelectorAll('td')[1].textContent;
      const productBrand = productRow.querySelectorAll('td')[2].textContent;
      const productQuantity = productRow.querySelectorAll('td')[3].textContent;
      const productPrice = productRow.querySelectorAll('td')[4].textContent;
      const productCreatedBy = productRow.querySelectorAll('td')[5].textContent;
                    
      // Populate the product details modal
      document.getElementById('productImageDetail').src = productImage;
      document.getElementById('productNameDetail').textContent = productName;
      document.getElementById('productBrandDetail').textContent = productBrand;
      document.getElementById('productQuantityDetail').textContent = productQuantity;
      document.getElementById('productPriceDetail').textContent = productPrice;
      document.getElementById('productStatusDetail').textContent = productQuantity > 0 ? 'In Stock' : 'Out of Stock';
                    
      
  
      // Show product description if available
      const description = productRow.dataset.description || '';
      const descriptionElement = document.getElementById('productDescriptionDetail');            
      if (description) {
      descriptionElement.style.display = 'block'; // Show description
      descriptionElement.querySelector('span').textContent = description;
      }
      else
      {
      descriptionElement.style.display = 'none'; // Hide description
    }
                  
      // Show the product details modal
      const detailsModal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
      detailsModal.show();
  }
  
  
      // Function to ensure any lingering modal backdrops are removed
      function removeModalBackdrop() {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
  
      // Function to close modal and clean up backdrops
      function closeModal(modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
      modalInstance.hide(); // Hide the modal using Bootstrap's method
      }
      removeModalBackdrop(); // Manually remove any lingering backdrop
  }
    
      // Handle delete product logic
      document.getElementById('productsTableBody').addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-product')) {
      const productName = event.target.getAttribute('data-item');
      document.getElementById('itemToDelete').innerText = productName;
      const confirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      confirmModal.show();
      document.getElementById('confirmDeleteBtn').onclick = function() {
      event.target.closest('tr').remove();
      confirmModal.hide();
      // Remove lingering backdrop if exists
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
      modalBackdrop.remove();
      }
    };
  }
  });
    
      // Delete product logic
      document.getElementById('productsTableBody').addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-product')) {
      const productName = event.target.getAttribute('data-item');
      document.getElementById('itemToDelete').innerText = productName;
      const confirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      confirmModal.show();
      document.getElementById('confirmDeleteBtn').onclick = function() {
      // Remove the product row from the table
      event.target.closest('tr').remove();
      // Close the delete confirmation modal
      closeModal(document.getElementById('deleteConfirmModal'));
      };
    }
  });
  
      // Modal close listener for the delete confirmation modal
      document.getElementById('deleteConfirmModal').addEventListener('hidden.bs.modal', function () {
      // Ensure any lingering backdrops are removed when the modal is closed
      removeModalBackdrop();
  });
  
      // Function to filter products
      function filterProducts() {
      const searchProductName = document.getElementById('searchProductName').value.toLowerCase();
      const filterBrand = document.getElementById('filterBrand').value.toLowerCase();
      const filterQuantity = document.getElementById('filterQuantity').value;
      const filterPrice = document.getElementById('filterPrice').value;
    
      const productRows = document.querySelectorAll('#productsTableBody tr');
    
      productRows.forEach((row) => {
      const productName = row.querySelectorAll('td')[1].textContent.toLowerCase();
      const brand = row.querySelectorAll('td')[2].textContent.toLowerCase();
      const quantity = row.querySelectorAll('td')[3].textContent;
      const price = row.querySelectorAll('td')[4].textContent;
    
      let showRow = true;
      if (searchProductName && !productName.includes(searchProductName)) {
      showRow = false;
      }
      if (filterBrand && !brand.includes(filterBrand)) {
      showRow = false;
      }
      if (filterQuantity && parseInt(quantity) < parseInt(filterQuantity)) {
      showRow = false;
      }
      if (filterPrice && parseFloat(price) > parseFloat(filterPrice)) {
      showRow = false;
      }
      if (showRow) {
      row.style.display = '';
      }
      else
      {
      row.style.display = 'none';
      }
    });
  }
    
      // Event listeners for filters
      document.getElementById('searchProductName').addEventListener('input', filterProducts);
      document.getElementById('filterBrand').addEventListener('input', filterProducts);
      document.getElementById('filterQuantity').addEventListener('input', filterProducts);
      document.getElementById('filterPrice').addEventListener('input', filterProducts);
      // Reset filters
      document.getElementById('resetFilters').addEventListener('click', function() {
      document.getElementById('searchProductName').value = '';
      document.getElementById('filterBrand').value = '';
      document.getElementById('filterQuantity').value = '';
      document.getElementById('filterPrice').value = '';
      filterProducts();  // Reset the table to show all products
    });
  })