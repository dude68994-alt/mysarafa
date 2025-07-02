// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const searchInput = document.querySelector('.search-input');
const addNewBtn = document.querySelector('.add-new-btn, .add-member-btn');
const joinBtn = document.querySelector('.join-btn');
const communityDropdown = document.querySelector('.community-name');
const moreDropdown = document.querySelector('.nav-item.dropdown');

// console.log('Community Dropdown Element:', communityDropdown);
// console.log('More Dropdown Element:', moreDropdown);

// Menu Item Click Handler
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        menuItems.forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get the menu item text
        const menuText = this.querySelector('span') ? 
            this.querySelector('span').textContent : 
            this.textContent;
        
        console.log(`Navigating to: ${menuText}`);
        
        // Here you would typically handle navigation
        // For demo purposes, we'll just update the page title
        if (menuText !== 'Dashboard') {
            document.querySelector('.page-title').textContent = menuText;
        } else {
            document.querySelector('.page-title').textContent = 'Dashboard';
        }
    });
});

// Search Functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    console.log(`Searching for: ${searchTerm}`);
    
    // Here you would implement actual search functionality
    // For demo purposes, we'll just log the search term
    if (searchTerm.length > 2) {
        // Simulate search results
        console.log('Search results would appear here');
    }
});

// Add New Button Handler
// if (addNewBtn) {
//     addNewBtn.addEventListener('click', function() {
//         console.log('Add new member clicked');
        
//         // Create a simple modal simulation
//         const modal = document.createElement('div');
//         modal.style.cssText = `
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(0, 0, 0, 0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//         `;
        
//         const modalContent = document.createElement('div');
//         modalContent.style.cssText = `
//             background: white;
//             padding: 24px;
//             border-radius: 8px;
//             max-width: 400px;
//             width: 90%;
//         `;
        
//         modalContent.innerHTML = `
//             <h3 style="margin-bottom: 16px;">Add New Member</h3>
//             <p style="margin-bottom: 16px; color: #6b7280;">This would open a form to add a new member.</p>
//             <button onclick="this.closest('.modal').remove()" style="
//                 padding: 8px 16px;
//                 background-color: #2f95ff;
//                 color: white;
//                 border: none;
//                 border-radius: 6px;
//                 cursor: pointer;
//             ">Close</button>
//         `;
        
//         modal.className = 'modal';
//         modal.appendChild(modalContent);
//         document.body.appendChild(modal);
        
//         // Close modal when clicking outside
//         modal.addEventListener('click', function(e) {
//             if (e.target === modal) {
//                 modal.remove();
//             }
//         });
//     });
// }

// Join Meeting Button Handler
if (joinBtn) {
    joinBtn.addEventListener('click', function() {
        console.log('Join meeting clicked');
        
        // Simulate joining a meeting
        this.textContent = 'Joining...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Joined';
            this.style.backgroundColor = '#10b981';
            
            // Update the status badge
            const statusBadge = document.querySelector('.status-badge.green');
            if (statusBadge) {
                statusBadge.textContent = 'Meeting in progress';
                statusBadge.style.backgroundColor = '#fbbf24';
            }
        }, 2000);
    });
}

// Dropdown Handlers
communityDropdown.addEventListener('click', function() {
    console.log('Community dropdown clicked');
    // Here you would show a dropdown menu
    showDropdown(this, ['Sarafa Community', 'Tech Community', 'Business Community']);
});

moreDropdown.addEventListener('click', function() {
    console.log('More dropdown clicked');
    // Here you would show a dropdown menu
    showDropdown(this, ['Settings', 'Help', 'About', 'Logout']);
});

// Generic Dropdown Function
function showDropdown(element, items) {
    // Remove existing dropdown
    const existingDropdown = document.querySelector('.custom-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 100;
        min-width: 150px;
        margin-top: 4px;
    `;
    
    items.forEach(item => {
        const dropdownItem = document.createElement('div');
        dropdownItem.style.cssText = `
            padding: 8px 12px;
            cursor: pointer;
            color: #374151;
            border-bottom: 1px solid #f3f4f6;
        `;
        dropdownItem.textContent = item;
        
        dropdownItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f3f4f6';
        });
        
        dropdownItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        dropdownItem.addEventListener('click', function() {
            console.log(`Selected: ${item}`);
            dropdown.remove();
        });
        
        dropdown.appendChild(dropdownItem);
    });
    
    // Position dropdown relative to clicked element
    element.style.position = 'relative';
    element.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!element.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 0);
}

// Simulate real-time updates
// function simulateRealTimeUpdates() {
//     // Update member count occasionally
//     setInterval(() => {
//         const memberCount = document.querySelector('.stat-number');
//         const currentCount = parseInt(memberCount.textContent);
//         const newCount = currentCount + Math.floor(Math.random() * 3);
//         memberCount.textContent = newCount;
//     }, 30000); // Update every 30 seconds
    
    // Update meeting status
    // setTimeout(() => {
    //     const statusBadge = document.querySelector('.status-badge.green');
    //     if (statusBadge && statusBadge.textContent === 'Starts in 10 minutes') {
    //         statusBadge.textContent = 'Starts in 5 minutes';
    //         statusBadge.style.backgroundColor = '#fbbf24';
    //     }
    // }, 10000); // Update after 10 seconds


// Initialize real-time updates
// if (document.querySelector('.stat-number') || document.querySelector('.status-badge.green')) {
//     simulateRealTimeUpdates();
// }

let mobileMenuToggleBtn = null;

function createMobileMenuToggle() {
    const sidebar = document.querySelector('.sidebar');
    const headerLeft = document.querySelector('.header-left');
    if (!sidebar || !headerLeft) return;

    if (window.innerWidth <= 768) {
        if (!mobileMenuToggleBtn) {
            mobileMenuToggleBtn = document.createElement('button');
            mobileMenuToggleBtn.className = 'mobile-menu-toggle-btn';
            mobileMenuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuToggleBtn.style.cssText = `
                background: none;
                color: white;
                border: none;
                padding: 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 20px;
                z-index: 1101;
            `;
            mobileMenuToggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                sidebar.classList.toggle('open');
                document.body.classList.toggle('sidebar-open');
            });
            headerLeft.prepend(mobileMenuToggleBtn);
        }
        sidebar.classList.remove('open');
        sidebar.style.display = 'block';
        mobileMenuToggleBtn.style.display = 'block';
    } else {
        if (mobileMenuToggleBtn) {
            mobileMenuToggleBtn.style.display = 'none';
        }
        sidebar.classList.remove('open');
        sidebar.style.display = 'block';
    }
}

window.addEventListener('load', createMobileMenuToggle);
window.addEventListener('resize', createMobileMenuToggle);

document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    if (
        sidebar &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        (!mobileMenuToggleBtn || (e.target !== mobileMenuToggleBtn && !mobileMenuToggleBtn.contains(e.target)))
    ) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
});

console.log('Community Dashboard initialized successfully!');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  console.log('kycForm element:', document.getElementById('kycForm'));
  
  // Initialize KYC form if on KYC page
  if (document.getElementById('kycForm')) {
    console.log('Initializing KYC form...');
    showStep(1);
    updateProgress();
    
    // Handle form submission
    document.getElementById('kycForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateStep(3)) {
        // Submit the form
        alert('KYC form submitted successfully!');
        // Here you would typically send the data to your server
      }
    });
  } else {
    console.log('KYC form not found on this page');
  }
});

// Add New Member Modal logic
const addMemberModal = document.getElementById('addMemberModal');
const closeAddMemberModal = document.getElementById('closeAddMemberModal');
const addMemberForm = document.getElementById('addMemberForm');
const membersTable = document.querySelector('.members-table tbody');

if (addNewBtn && addMemberModal && closeAddMemberModal && addMemberForm) {
  addNewBtn.onclick = () => { addMemberModal.style.display = 'flex'; };
  closeAddMemberModal.onclick = () => { addMemberModal.style.display = 'none'; };
  addMemberModal.onclick = (e) => {
    if (e.target === addMemberModal) addMemberModal.style.display = 'none';
  };
  
  addMemberForm.onsubmit = function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('memberName').value.trim();
    const mobileNumber = document.getElementById('memberNumber').value.trim();
    const shopName = document.getElementById('shopName').value.trim();
    const address = document.getElementById('memberAddress').value.trim();
    const email = document.getElementById('memberEmail').value.trim();
    
    // Validate required fields
    if (!name || !mobileNumber || !shopName || !address) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Add new member to table
    if (membersTable) {
      const newRow = document.createElement('tr');
      const srNo = membersTable.children.length + 1;
      
      newRow.innerHTML = `
        <td>${srNo}</td>
        <td>${name}</td>
        <td>${mobileNumber}</td>
        <td>${shopName}</td>
        <td>${address}</td>
        <td>
          <div class="action-dropdown">
            <button class="action-btn">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item">
                <i class="fas fa-edit"></i> Edit
              </a>
              <a href="#" class="dropdown-item">
                <i class="fas fa-trash"></i> Delete
              </a>
            </div>
          </div>
        </td>
      `;
      
      membersTable.appendChild(newRow);
    }
    
    // Show success message
    alert(`Member "${name}" added successfully!`);
    
    // Close modal and reset form
    addMemberModal.style.display = 'none';
    addMemberForm.reset();
  };
}

const func=(a,b)=>a+b;

console.log(func(2,3));

// KYC Step-by-Step Form Functions
let currentStep = 1;
const totalSteps = 3;

function nextStep(step) {
  console.log('nextStep called with step:', step);
  alert('nextStep function called with step: ' + step);
  
  // Simple validation
  const currentSection = document.querySelector(`[data-step="${step}"]`);
  if (!currentSection) {
    alert('Section not found!');
    return;
  }
  
  const requiredInputs = currentSection.querySelectorAll('input[required]');
  let hasEmptyField = false;
  
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'red';
      hasEmptyField = true;
    } else {
      input.style.borderColor = '#d1d5db';
    }
  });
  
  if (hasEmptyField) {
    alert('Please fill in all required fields before proceeding.');
    return;
  }
  
  // Move to next step
  if (step < totalSteps) {
    currentStep = step + 1;
    
    // Hide all sections
    document.querySelectorAll('.kyc-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show current section
    const nextSection = document.querySelector(`[data-step="${currentStep}"]`);
    if (nextSection) {
      nextSection.style.display = 'block';
    }
    
    updateProgress();
  }
}

function prevStep(step) {
  if (step > 1) {
    currentStep = step - 1;
    
    // Hide all sections
    document.querySelectorAll('.kyc-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show current section
    const prevSection = document.querySelector(`[data-step="${currentStep}"]`);
    if (prevSection) {
      prevSection.style.display = 'block';
    }
    
    updateProgress();
  }
}

function updateProgress() {
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    const stepNumber = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNumber < currentStep) {
      step.classList.add('completed');
    } else if (stepNumber === currentStep) {
      step.classList.add('active');
    }
  });
}

function validateStep(step) {
  const currentSection = document.querySelector(`[data-step="${step}"]`);
  const inputs = currentSection.querySelectorAll('input[required]');
  
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      input.style.borderColor = '#d1d5db';
    }
  });
  
  if (!isValid) {
    alert('Please fill in all required fields before proceeding.');
  }
  
  return isValid;
}

function saveStepData(step) {
  // Save form data to localStorage (optional)
  const currentSection = document.querySelector(`[data-step="${step}"]`);
  const formData = new FormData();
  
  currentSection.querySelectorAll('input').forEach(input => {
    if (input.value) {
      formData.append(input.name, input.value);
    }
  });
  
  // You can store this data or send it to server
  console.log(`Step ${step} data saved`);
}

// KYC Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add Worker functionality
    const addWorkerBtn = document.getElementById('addWorkerBtn');
    const workersContainer = document.getElementById('workersContainer');
    const numWorkersInput = document.getElementById('numWorkers');
    
    if (addWorkerBtn && workersContainer) {
        addWorkerBtn.addEventListener('click', function() {
            addWorkerField();
        });
    }
    
    // Update number of workers when adding/removing workers
    if (numWorkersInput) {
        numWorkersInput.addEventListener('input', function() {
            const numWorkers = parseInt(this.value) || 0;
            updateWorkersFields(numWorkers);
        });
    }
    
    // KYC Form submission
    const kycForm = document.getElementById('kycForm');
    if (kycForm) {
        kycForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleKYCSubmission();
        });
    }
});

// Function to add a worker field
function addWorkerField() {
    const workersContainer = document.getElementById('workersContainer');
    const workerIndex = workersContainer.children.length;
    
    const workerField = document.createElement('div');
    workerField.className = 'worker-field';
    workerField.innerHTML = `
        <div class="form-group">
            <label for="workerName${workerIndex}">Worker Name</label>
            <input type="text" id="workerName${workerIndex}" name="workerName${workerIndex}" class="kyc-input" placeholder="Enter worker name">
        </div>
        <div class="form-group">
            <label for="workerPhone${workerIndex}">Phone Number</label>
            <input type="tel" id="workerPhone${workerIndex}" name="workerPhone${workerIndex}" class="kyc-input" placeholder="Enter phone number">
        </div>
        <button type="button" class="remove-worker-btn" onclick="removeWorkerField(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    
    workersContainer.appendChild(workerField);
    
    // Update the number of workers input
    const numWorkersInput = document.getElementById('numWorkers');
    if (numWorkersInput) {
        numWorkersInput.value = workersContainer.children.length;
    }
}

// Function to remove a worker field
function removeWorkerField(button) {
    const workerField = button.closest('.worker-field');
    workerField.remove();
    
    // Update the number of workers input
    const workersContainer = document.getElementById('workersContainer');
    const numWorkersInput = document.getElementById('numWorkers');
    if (numWorkersInput && workersContainer) {
        numWorkersInput.value = workersContainer.children.length;
    }
}

// Function to update workers fields based on number input
function updateWorkersFields(numWorkers) {
    const workersContainer = document.getElementById('workersContainer');
    if (!workersContainer) return;
    
    const currentWorkers = workersContainer.children.length;
    
    if (numWorkers > currentWorkers) {
        // Add more workers
        for (let i = currentWorkers; i < numWorkers; i++) {
            addWorkerField();
        }
    } else if (numWorkers < currentWorkers) {
        // Remove workers
        const workersToRemove = currentWorkers - numWorkers;
        for (let i = 0; i < workersToRemove; i++) {
            const lastWorker = workersContainer.lastElementChild;
            if (lastWorker) {
                lastWorker.remove();
            }
        }
    }
}

// Function to handle KYC form submission
function handleKYCSubmission() {
    // Get form data
    const formData = new FormData(document.getElementById('kycForm'));
    const formObject = {};
    
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate required fields
    const requiredFields = ['fullName', 'dob', 'nationality', 'state', 'city', 'postalCode', 'address', 'shopOwner', 'shopName', 'shopAddress', 'aadhaarCard', 'shopLicence', 'panCard'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!formObject[field] || formObject[field].trim() === '') {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Validate file uploads
    const fileFields = ['aadhaarCard', 'shopLicence', 'panCard'];
    const missingFiles = [];
    
    fileFields.forEach(field => {
        const fileInput = document.getElementById(field);
        if (!fileInput.files || fileInput.files.length === 0) {
            missingFiles.push(field);
        }
    });
    
    if (missingFiles.length > 0) {
        alert('Please upload all required documents: ' + missingFiles.join(', '));
        return;
    }
    
    // Show success message
    alert('KYC form submitted successfully! Your application is under review.');
    
    // Reset form
    document.getElementById('kycForm').reset();
    
    // Clear workers container
    const workersContainer = document.getElementById('workersContainer');
    if (workersContainer) {
        workersContainer.innerHTML = '';
    }
    
    // Reset number of workers
    const numWorkersInput = document.getElementById('numWorkers');
    if (numWorkersInput) {
        numWorkersInput.value = '';
    }
}

// User avatar dropdown logic
const userAvatar = document.getElementById('userAvatar');
const avatarDropdown = document.getElementById('avatarDropdown');

if (userAvatar && avatarDropdown) {
    userAvatar.addEventListener('click', function(event) {
        event.stopPropagation();
        avatarDropdown.style.display = avatarDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function() {
        avatarDropdown.style.display = 'none';
    });
    // Prevent closing when clicking inside dropdown
    avatarDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Placeholder for logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        alert('Logged out! (Implement actual logout logic here)');
    });
}