// Community Leader Panel System
// Role-based access control
const USER_ROLES = {
  MEMBER: 'member',
  LEADER: 'leader',
  ADMIN: 'admin'
};

// Current user role (in a real app, this would come from authentication)
let currentUserRole = USER_ROLES.LEADER; // For demo purposes, set as leader
let currentUser = {
  name: 'Piyush Rathore',
  email: 'Piyush@email.com',
  role: currentUserRole,
  isLeader: currentUserRole === USER_ROLES.LEADER || currentUserRole === USER_ROLES.ADMIN
};

// Function to check if user is a leader
function isUserLeader() {
  return currentUser.isLeader;
}

// Function to show/hide leader elements
function toggleLeaderElements() {
  const leaderElements = document.querySelectorAll('.leader-only');
  const leaderMenuItems = document.querySelectorAll('.leader-menu-item');
  
  if (isUserLeader()) {
    // Show leader elements
    leaderElements.forEach(element => {
      element.style.display = 'block';
    });
    
    // Show leader menu items
    leaderMenuItems.forEach(item => {
      item.style.display = 'flex';
    });
    
    // Update user info to show leader status
    updateUserInfo();
  } else {
    // Hide leader elements
    leaderElements.forEach(element => {
      element.style.display = 'none';
    });
    
    // Hide leader menu items
    leaderMenuItems.forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Function to update user info display
function updateUserInfo() {
  const userNameElement = document.querySelector('.avatar-user-name');
  const userEmailElement = document.querySelector('.avatar-user-email');
  
  if (userNameElement && userEmailElement) {
    userNameElement.textContent = currentUser.name;
    userEmailElement.textContent = currentUser.email;
    
    // Add leader badge if user is leader
    if (isUserLeader()) {
      const leaderBadge = document.createElement('span');
      leaderBadge.className = 'leader-badge';
      leaderBadge.textContent = 'Leader';
      leaderBadge.style.cssText = `
        background: #fbbf24;
        color: #92400e;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        margin-left: 8px;
      `;
      
      // Remove existing badge if any
      const existingBadge = userNameElement.querySelector('.leader-badge');
      if (existingBadge) {
        existingBadge.remove();
      }
      
      userNameElement.appendChild(leaderBadge);
    }
  }
}

// Initialize leader panel system
document.addEventListener('DOMContentLoaded', function() {
  toggleLeaderElements();
  
  // Add role switcher for demo purposes
  addRoleSwitcher();
  
  // Initialize leader action buttons
  initializeLeaderActions();
});

// Initialize leader action buttons
function initializeLeaderActions() {
  const actionButtons = document.querySelectorAll('.action-btn');
  
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent.toLowerCase();
      
      switch(action) {
        case 'review (12)':
          showApprovalModal();
          break;
        case 'create event':
          showCreateEventModal();
          break;
        case 'post announcement':
          showAnnouncementModal();
          break;
        case 'view reports':
          showAnalyticsModal();
          break;
        default:
          showNotification('Action not implemented yet', 'info');
      }
    });
  });
}

// Show approval modal
function showApprovalModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  `;

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0; color: #1f2937;">Pending Member Approvals</h3>
      <button onclick="this.closest('.approval-modal').remove()" style="
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
      ">&times;</button>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="color: #6b7280; margin-bottom: 16px;">12 members are waiting for approval</p>
      
      <div style="max-height: 400px; overflow-y: auto;">
        ${generateApprovalList()}
      </div>
    </div>
    
    <div style="display: flex; gap: 8px; justify-content: flex-end;">
      <button onclick="approveAllMembers()" style="
        padding: 8px 16px;
        background-color: #10b981;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      ">Approve All</button>
      
      <button onclick="this.closest('.approval-modal').remove()" style="
        padding: 8px 16px;
        background-color: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      ">Close</button>
    </div>
  `;

  modal.className = 'approval-modal';
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Generate approval list
function generateApprovalList() {
  const members = [
    { name: 'Rahul Sharma', email: 'rahul@email.com', date: '2024-01-15' },
    { name: 'Priya Patel', email: 'priya@email.com', date: '2024-01-14' },
    { name: 'Amit Kumar', email: 'amit@email.com', date: '2024-01-13' },
    { name: 'Neha Singh', email: 'neha@email.com', date: '2024-01-12' },
    { name: 'Vikram Mehta', email: 'vikram@email.com', date: '2024-01-11' }
  ];

  return members.map(member => `
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-bottom: 8px;
      background: #f9fafb;
    ">
      <div>
        <div style="font-weight: 600; color: #111827;">${member.name}</div>
        <div style="font-size: 12px; color: #6b7280;">${member.email}</div>
        <div style="font-size: 11px; color: #9ca3af;">Applied: ${member.date}</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button onclick="approveMember('${member.name}')" style="
          padding: 4px 8px;
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        ">Approve</button>
        <button onclick="rejectMember('${member.name}')" style="
          padding: 4px 8px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        ">Reject</button>
      </div>
    </div>
  `).join('');
}

// Approve all members
function approveAllMembers() {
  showNotification('All members approved successfully!', 'success');
  document.querySelector('.approval-modal').remove();
}

// Approve individual member
function approveMember(name) {
  showNotification(`${name} approved successfully!`, 'success');
}

// Reject individual member
function rejectMember(name) {
  showNotification(`${name} rejected.`, 'error');
}

// Show create event modal
function showCreateEventModal() {
  showNotification('Create Event feature coming soon!', 'info');
}

// Show announcement modal
function showAnnouncementModal() {
  showNotification('Announcement feature coming soon!', 'info');
}

// Show analytics modal
function showAnalyticsModal() {
  showNotification('Analytics feature coming soon!', 'info');
}

//   const headerRight = document.querySelector('.header-right');
//   if (headerRight && isUserLeader()) {
//     const roleSwitcher = document.createElement('div');
//     roleSwitcher.style.cssText = `
//       position: relative;
//       margin-right: 16px;
//     `;
    
//     const roleButton = document.createElement('button');
//     roleButton.textContent = 'Switch Role';
//     roleButton.style.cssText = `
//       background: rgba(255, 255, 255, 0.2);
//       border: 1px solid rgba(255, 255, 255, 0.3);
//       color: white;
//       padding: 6px 12px;
//       border-radius: 4px;
//       font-size: 12px;
//       cursor: pointer;
//     `;
    
//     roleButton.addEventListener('click', function() {
//       currentUserRole = currentUserRole === USER_ROLES.LEADER ? USER_ROLES.MEMBER : USER_ROLES.LEADER;
//       currentUser.isLeader = currentUserRole === USER_ROLES.LEADER || currentUserRole === USER_ROLES.ADMIN;
//       toggleLeaderElements();
//       showNotification(`Role switched to: ${currentUserRole}`, 'info');
//     });
    
//     roleSwitcher.appendChild(roleButton);
//     headerRight.insertBefore(roleSwitcher, headerRight.firstChild);
//   }
// }

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
            color: #374252ff;
            border-bottom: 1px solid #f3f4f6;
        `;
        dropdownItem.textContent = item;
        
        dropdownItem.addEventListener('mouseenter', function(){
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
    const email = document.getElementById('memberEmail').value.trim();
    
    // Validate required fields
    if (!name || !mobileNumber || !email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Generate invitation link
    const invitationLink = generateInvitationLink(name, email);
    
    // Send invitation email
    sendInvitationEmail(name, email, invitationLink);
    
    // Show success message
    alert(`Invitation sent successfully to ${email}!`);
    
    // Close modal and reset form
    addMemberModal.style.display = 'none';
    addMemberForm.reset();
  };
}





function showInvitationModal(name, email, invitationLink) {
  // Create modal to show invitation details
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  `;

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0; color: #1f2937;">Invitation Sent Successfully!</h3>
      <button onclick="this.closest('.invitation-modal').remove()" style="
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
      ">&times;</button>
    </div>
    
    <div style="margin-bottom: 16px;">
      <p style="margin: 8px 0; color: #374151;"><strong>Recipient:</strong> ${name} (${email})</p>
      <p style="margin: 8px 0; color: #374151;"><strong>Invitation Link:</strong></p>
      <div class="invitation-link-display">${invitationLink}</div>
    </div>
    
    <div class="invitation-actions">
      <button onclick="copyInvitationLink('${invitationLink}')" class="copy-btn">Copy Link</button>
      
      <button onclick="window.open('mailto:${email}?subject=${encodeURIComponent('You\'re invited to join Sarafa Community!')}&body=${encodeURIComponent(`Dear ${name},\n\nYou have been invited to join the Sarafa Community!\n\nPlease click the following link to complete your registration:\n${invitationLink}\n\nThis invitation link is valid for 7 days.\n\nBest regards,\nSarafa Community Team`)}', '_blank')" class="email-btn">Send Email</button>
      
      <button onclick="this.closest('.invitation-modal').remove()" class="close-btn">Close</button>
    </div>
  `;

  modal.className = 'invitation-modal';
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function copyInvitationLink(link) {
  navigator.clipboard.writeText(link).then(() => {
    // Show a more user-friendly notification
    showNotification('Invitation link copied to clipboard!', 'success');
  }).catch(err => {
    console.log('Could not copy to clipboard:', err);
    showNotification('Could not copy to clipboard. Please copy the link manually.', 'error');
  });
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    z-index: 3000;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.backgroundColor = '#10b981';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#ef4444';
  } else {
    notification.style.backgroundColor = '#2f95ff';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

const func=(a,b)=>a+b;

console.log(func(2,3));


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
        // Disabled old submit handler in favor of multi-step handler below
        // kycForm.addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     handleKYCSubmission();
        // });
    }
});



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
//profile Function
document.addEventListener('DOMContentLoaded', function() {
  const profileBtn = document.getElementById('profileDetailsBtn');
  const profileModal = document.getElementById('profileModal');
  const closeProfileModal = document.getElementById('closeProfileModal');

  if (profileBtn && profileModal && closeProfileModal) {
    profileBtn.onclick = () => { profileModal.style.display = 'flex'; };
    closeProfileModal.onclick = () => { profileModal.style.display = 'none'; };
    profileModal.onclick = (e) => {
      if (e.target === profileModal) profileModal.style.display = 'none';
    };
  }
});

