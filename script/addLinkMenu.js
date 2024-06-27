// Function to toggle the visibility of the add link menu
function toggleAddLinkMenu() {
    const menu = document.querySelector('.add-link-menu');
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

// Function to add a new link to the selected group
function addLink() {
    const name = document.getElementById('link-name').value;
    const url = document.getElementById('link-url').value;
    let group = document.getElementById('link-group').value;

    // If the selected group is 'create new', use the input as the new group name
    if (group === 'create new') {
        const newGroupName = document.getElementById('new-group-name-input').value.trim();
        if (newGroupName === '') {
            alert('Please enter a valid group name.');
            return;
        }
        group = newGroupName;

        // Add the new group as an option to the dropdown (if not already added)
        const groupDropdown = document.getElementById('link-group');
        const existingOption = Array.from(groupDropdown.options).find(opt => opt.value === newGroupName);
        if (!existingOption) {
            const newOption = document.createElement('option');
            newOption.value = newGroupName;
            newOption.textContent = newGroupName;
            groupDropdown.appendChild(newOption);
        }
    }

    if (name && url && group) {
        // Find the container for the selected group or create new if it doesn't exist
        let groupContainer = document.querySelector(`#${group} .links`);
        if (!groupContainer) {
            // Create new group container if it doesn't exist
            const newGroupDiv = document.createElement('div');
            newGroupDiv.id = group;
            newGroupDiv.classList.add('container');

            const dotsIconDiv = document.createElement('div');
            dotsIconDiv.classList.add('dots-icon');
            dotsIconDiv.innerHTML = '<i class="fa-solid fa-ellipsis-h"></i>';
            newGroupDiv.appendChild(dotsIconDiv);

            const groupMenuDiv = document.createElement('div');
            groupMenuDiv.classList.add('group-menu');
            groupMenuDiv.id = 'menu-' + group;
            groupMenuDiv.innerHTML = `
                <ul>
                    <li onclick="renameGroup('${group}')">Rename</li>
                    <li onclick="removeGroup('${group}')">Remove</li>
                    <li>Edit Links</li>
                </ul>`;
            newGroupDiv.appendChild(groupMenuDiv);

            const groupTitle = document.createElement('h2');
            groupTitle.classList.add('title');
            groupTitle.textContent = group;
            newGroupDiv.appendChild(groupTitle);

            groupContainer = document.createElement('div');
            groupContainer.classList.add('links');
            newGroupDiv.appendChild(groupContainer);

            document.querySelector('.card-container').appendChild(newGroupDiv);
        }

        // Create a new link element
        const newLink = document.createElement('a');
        newLink.href = url;
        newLink.textContent = name;
        newLink.target = '_blank';

        // Append the new link to the group container
        groupContainer.appendChild(newLink);

        // Save added link to local storage
        const linksInStorage = JSON.parse(localStorage.getItem('savedLinks')) || {};
        if (!linksInStorage[group]) {
            linksInStorage[group] = [];
        }
        linksInStorage[group].push({ name, url });
        localStorage.setItem('savedLinks', JSON.stringify(linksInStorage));

        // Clear the inputs and hide the menu
        document.getElementById('link-name').value = '';
        document.getElementById('link-url').value = '';
        toggleAddLinkMenu();
    } else {
        alert('Please fill in all fields.');
    }
}


// Function to dynamically update the group dropdown options
function updateGroupOptions() {
    const groupDropdown = document.getElementById('link-group');
    const groupsInStorage = JSON.parse(localStorage.getItem('savedLinks')) || {};

    // Clear existing options
    //groupDropdown.innerHTML = '';

    // // Add default option
    // const defaultOption = document.createElement('option');
    // defaultOption.value = '';
    // defaultOption.textContent = 'Select a group or create new';
    // groupDropdown.appendChild(defaultOption);

    // Add existing groups as options
    Object.keys(groupsInStorage).forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        groupDropdown.appendChild(option);
    });

    // Add 'create new' option
    const createNewOption = document.createElement('option');
    createNewOption.value = 'create new';
    createNewOption.textContent = 'Create new group';
    groupDropdown.appendChild(createNewOption);
}


// Event listener to show/hide new group name input field based on dropdown selection
document.getElementById('link-group').addEventListener('change', function() {
    const newGroupInput = document.getElementById('new-group-name');
    if (this.value === 'create new') {
        newGroupInput.style.display = 'block';
    } else {
        newGroupInput.style.display = 'none';
    }
});


// Function to load saved links from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
    
    const linksInStorage = JSON.parse(localStorage.getItem('savedLinks')) || {};
    Object.keys(linksInStorage).forEach(group => {
        let groupContainer = document.querySelector(`#${group} .links`);

        // If group container doesn't exist, create it
        if (!groupContainer) {
            // Create new group container
            const newGroupDiv = document.createElement('div');
            newGroupDiv.id = group;
            newGroupDiv.classList.add('container');

            const dotsIconDiv = document.createElement('div');
            dotsIconDiv.classList.add('dots-icon');
            dotsIconDiv.innerHTML = '<i class="fa-solid fa-ellipsis-h" onclick="toggleGroupMenu(event, \'' + group + '\')"></i>';
            newGroupDiv.appendChild(dotsIconDiv);

            const groupMenuDiv = document.createElement('div');
            groupMenuDiv.classList.add('group-menu');
            groupMenuDiv.id = 'menu-' + group;
            groupMenuDiv.innerHTML = `
                <ul>
                    <li onclick="renameGroup('${group}')">Rename</li>
                    <li onclick="removeGroup('${group}')">Remove</li>
                    <li>Edit Links</li>
                </ul>`;
            newGroupDiv.appendChild(groupMenuDiv);

            const groupTitle = document.createElement('h2');
            groupTitle.classList.add('title');
            groupTitle.textContent = group;
            newGroupDiv.appendChild(groupTitle);

            groupContainer = document.createElement('div');
            groupContainer.classList.add('links');
            newGroupDiv.appendChild(groupContainer);

            document.querySelector('.card-container').appendChild(newGroupDiv);
        }

        // Append links to the group container
        linksInStorage[group].forEach(link => {
            const newLink = document.createElement('a');
            newLink.href = link.url;
            newLink.textContent = link.name;
            newLink.target = '_blank';
            groupContainer.appendChild(newLink);
        });
    });

    updateGroupOptions();

});


// // Close the menu when clicking outside of it
// document.addEventListener('click', (event) => {
//     const menus = document.querySelectorAll('.add-link-menu');
//     menus.forEach(menu => {
//         if (!menu.contains(event.target)) {
//             menu.style.display = 'none';
//         }
//     });
// });
