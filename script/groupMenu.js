// Function to toggle the group menu visibility
function toggleGroupMenu(event, groupId) {
    event.stopPropagation();
    const menu = document.getElementById(`menu-${groupId}`);
    const allMenus = document.querySelectorAll('.group-menu');
    allMenus.forEach(menu => menu.style.display = 'none');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to rename a group
function renameGroup(groupId) {
    const newName = prompt('Enter the new name for the group:');
    if (newName) {
        const groupContainer = document.getElementById(groupId);
        const oldName = groupContainer.id;

        // Update group container ID and title
        groupContainer.id = newName;
        const titleElement = groupContainer.querySelector('.title');
        titleElement.textContent = newName;

        // Update local storage
        const linksInStorage = JSON.parse(localStorage.getItem('savedLinks')) || {};
        if (linksInStorage[oldName]) {
            linksInStorage[newName] = linksInStorage[oldName];
            delete linksInStorage[oldName];
            localStorage.setItem('savedLinks', JSON.stringify(linksInStorage));
        }

        // Update menu ID and toggleGroupMenu event handler
        const menu = document.getElementById(`menu-${oldName}`);
        if (menu) {
            menu.id = `menu-${newName}`;
            const dotsIcon = groupContainer.querySelector('.dots-icon i');
            dotsIcon.setAttribute('onclick', `toggleGroupMenu(event, '${newName}')`);
        }
    }
}

// Function to remove a group
function removeGroup(groupId) {
    if (confirm('Are you sure you want to remove this group and all its links?')) {
        const groupContainer = document.getElementById(groupId);
        groupContainer.remove();

        // Update local storage
        const linksInStorage = JSON.parse(localStorage.getItem('savedLinks')) || {};
        if (linksInStorage[groupId]) {
            delete linksInStorage[groupId];
            localStorage.setItem('savedLinks', JSON.stringify(linksInStorage));
        }
    }
}

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    const menus = document.querySelectorAll('.group-menu');
    menus.forEach(menu => {
        if (!menu.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
});


// Function to initialize group menus
function initializeGroupMenus() {
    const groups = document.querySelectorAll('.container');
    groups.forEach(group => {
        const groupName = group.id;
        const dotsIcon = group.querySelector('.dots-icon i');
        if (dotsIcon) {
            dotsIcon.setAttribute('onclick', `toggleGroupMenu(event, '${groupName}')`);
        }
    });
}

// Event listener to initialize group menus on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeGroupMenus();
});
