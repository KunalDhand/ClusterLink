// sidebar.js

function toggleSidebar() {
    const sidebar = document.querySelector('.settings-sidebar');
    sidebar.classList.toggle('open');
}

function toggleGroup(groupId) {
    const group = document.getElementById(groupId);
    if (group.style.display === "none" || group.style.display === "") {
        group.style.display = "block";
    } else {
        group.style.display = "none";
    }
}