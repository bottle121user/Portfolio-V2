const dialogText = document.getElementById("dialog-text");
const menuItems = document.querySelectorAll(".menu-item");

// Resume data with classic links
let resumeData = {
    about: "Hi! I'm Yuvraj Kapri, a Computer Science student and an enthusiastic person for game development, AI tech, and blockchain!",
    skills: "• Languages: Java, SQL, Python<br>• Tech: Flask, MySQL, PostgreSQL<br>• Security: OWASP Top 10, API & Cloud Sec<br>• ML & Web3: LightGBM, Pandas, Solidity<br>• Game Dev: Unity, Unreal Engine 4",
    experience: "My work experience were from:",
    projects: "Check out some of my featured projects on the screen! You can find the source code on my GitHub.",
    games: "Check out my latest game: **Flappy Bird (Premium Edition)**! Use SPACE or Click to fly.",
    contact: "Email: <a href='mailto:yuv575raj537@gmail.com' class='retro-link' target='_blank'>yuv575raj537@gmail.com</a><br>Location: Pithoragarh, India<br>Find me on <a href='https://www.linkedin.com/in/yuvraj-kapri-25826a237/' class='retro-link' target='_blank'>LinkedIn</a>, <a href='https://github.com/bottle121user' class='retro-link' target='_blank'>GitHub</a> & <a href='https://leetcode.com/u/R00Noo9/' class='retro-link' target='_blank'>LeetCode</a>!"
};

// Role summaries for experience
const experienceSummaries = {
    'astra-exp': "At Astra Security, I specialized in technical cybersecurity documentation, revolving around API security, Cloud Vulnerability Scanners, and DAST methodologies.",
    'ea-exp': "During my EA internship, I worked with core game elements and libraries, optimizing various engine functions and frameworks for large-scale sports titles."
};

let typeInterval;
let isTyping = false;
let currentText = "";
let currentIndex = 0;

// Typewriter effect for the dialog box
function typeOutText(text) {
    clearInterval(typeInterval);
    dialogText.innerHTML = "";
    isTyping = true;
    currentText = text;
    currentIndex = 0;
    
    const avatar = document.getElementById("avatar-img");
    if (avatar) avatar.classList.add("talking");
    
    typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
            // Check for HTML tags to skip typing them out character by character
            if (text.charAt(currentIndex) === '<') {
                let tagEnd = text.indexOf('>', currentIndex);
                if (tagEnd !== -1) {
                    dialogText.innerHTML += text.substring(currentIndex, tagEnd + 1);
                    currentIndex = tagEnd + 1;
                    return;
                }
            }

            dialogText.innerHTML += text.charAt(currentIndex);
            currentIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            if (avatar) avatar.classList.remove("talking");
        }
    }, 25); // Typing speed
}

// Function to handle interaction with a menu item
function selectMenu(item) {
    // Remove active class from all
    menuItems.forEach(i => i.classList.remove('active'));
    // Add active to the passed item
    item.classList.add('active');
    
    // Type out corresponding text
    const action = item.getAttribute('data-action');
    if (resumeData[action]) {
        typeOutText(resumeData[action]);
    }

    // Toggle project display and UI mode
    const projectsDisplay = document.getElementById('projects-display');
    const experienceDisplay = document.getElementById('experience-display');
    const gamesDisplay = document.getElementById('games-display');
    const uiLayer = document.querySelector('.ui-layer');
    
    if (uiLayer) {
        if (action === 'projects') {
            uiLayer.classList.add('projects-mode');
            if (projectsDisplay) projectsDisplay.classList.remove('hidden');
            if (experienceDisplay) experienceDisplay.classList.add('hidden');
            if (gamesDisplay) gamesDisplay.classList.add('hidden');
            showProjectIcons();
        } else if (action === 'experience') {
            uiLayer.classList.add('projects-mode');
            if (experienceDisplay) experienceDisplay.classList.remove('hidden');
            if (projectsDisplay) projectsDisplay.classList.add('hidden');
            if (gamesDisplay) gamesDisplay.classList.add('hidden');
            showExperienceIcons();
        } else if (action === 'games') {
            uiLayer.classList.add('projects-mode');
            if (gamesDisplay) gamesDisplay.classList.remove('hidden');
            if (projectsDisplay) projectsDisplay.classList.add('hidden');
            if (experienceDisplay) experienceDisplay.classList.add('hidden');
            showGamesIcons();
        } else {
            uiLayer.classList.remove('projects-mode');
            if (projectsDisplay) projectsDisplay.classList.add('hidden');
            if (experienceDisplay) experienceDisplay.classList.add('hidden');
            if (gamesDisplay) gamesDisplay.classList.add('hidden');
        }
    }
}

// Games Navigation Logic
function showGamesIcons() {
    // Show the game container directly for now as it's our featured title
    const flappyContainer = document.getElementById('flappy-game-container');
    if (flappyContainer) flappyContainer.style.display = 'flex';
}

// Project Navigation Logic
const projectIcons = document.getElementById('project-icons');
const projectDetails = document.querySelectorAll('.project-detail');
const iconBtns = document.querySelectorAll('.project-icon-btn');
const backBtns = document.querySelectorAll('#projects-display .back-btn'); // Only project back btns
const gameBackBtn = document.querySelector('#games-display .back-btn');

function showProjectIcons() {
    if (projectIcons) projectIcons.style.display = 'flex';
    projectDetails.forEach(detail => detail.classList.add('hidden'));
}

function showProjectDetail(projectId) {
    if (projectIcons) projectIcons.style.display = 'none';
    projectDetails.forEach(detail => {
        if (detail.id === projectId) {
            detail.classList.remove('hidden');
        } else {
            detail.classList.add('hidden');
        }
    });
}

iconBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        showProjectDetail(projectId);
    });
});

backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showProjectIcons();
    });
});

if (gameBackBtn) {
    gameBackBtn.addEventListener('click', () => {
        // Return to main menu from games
        const menuFirstItem = document.querySelector('.menu-item[data-action="about"]');
        if (menuFirstItem) selectMenu(menuFirstItem);
    });
}

// Experience Navigation Logic
const experienceIcons = document.getElementById('experience-icons');
const experienceDetails = document.querySelectorAll('.experience-detail');
const expIconBtns = document.querySelectorAll('.experience-icon-btn');
const expBackBtns = document.querySelectorAll('.back-btn-exp');

function showExperienceIcons() {
    if (experienceIcons) experienceIcons.style.display = 'flex';
    experienceDetails.forEach(detail => detail.classList.add('hidden'));
    
    // Type back the initial experience message
    typeOutText(resumeData.experience);
}

function showExperienceDetail(expId) {
    if (experienceIcons) experienceIcons.style.display = 'none';
    experienceDetails.forEach(detail => {
        if (detail.id === expId) {
            detail.classList.remove('hidden');
        } else {
            detail.classList.add('hidden');
        }
    });

    // Type out the specific summary for this experience
    if (experienceSummaries[expId]) {
        typeOutText(experienceSummaries[expId]);
    }
}

expIconBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const expId = btn.getAttribute('data-exp');
        showExperienceDetail(expId);
    });
});

expBackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showExperienceIcons();
    });
});

// Add click listeners to menu items
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        selectMenu(e.currentTarget);
    });
});
// Optional feature: Clicking the dialog box skips the typing animation
document.querySelector('.dialog-box').addEventListener('click', (e) => {
    // Don't skip if clicking on a hyperlink
    if (e.target.tagName.toLowerCase() === 'a') return;
    
    if (isTyping) {
        clearInterval(typeInterval);
        dialogText.innerHTML = currentText; 
        isTyping = false;
        const avatar = document.getElementById("avatar-img");
        if (avatar) avatar.classList.remove("talking");
    }
});

// Initially type out the 'about' section
selectMenu(menuItems[0]);

// Allow keyboard navigation for menu
let selectedMenuIndex = 0;
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        selectedMenuIndex = (selectedMenuIndex + 1) % menuItems.length;
        selectMenu(menuItems[selectedMenuIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        selectedMenuIndex = (selectedMenuIndex - 1 + menuItems.length) % menuItems.length;
        selectMenu(menuItems[selectedMenuIndex]);
    } else if (e.key === 'Enter') {
        if (isTyping) {
            // Skip typing if currently typing
            clearInterval(typeInterval);
            dialogText.innerHTML = currentText; 
            isTyping = false;
            const avatar = document.getElementById("avatar-img");
            if (avatar) avatar.classList.remove("talking");
        } else {
            // Re-trigger the active menu
            selectMenu(menuItems[selectedMenuIndex]);
        }
    }
});

// Create Falling Pink Leaves Setup
function createLeaves() {
    const container = document.getElementById('leaves-container');
    if (!container) return;
    
    // Create a small quantity of leaves (20 for a subtle effect)
    for (let i = 0; i < 20; i++) {
        let leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Randomize size, horizontal position, delay, and flight duration
        let size = Math.random() * 8 + 8; // 8px to 16px wide
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        
        leaf.style.left = `${Math.random() * 100}vw`; // Anywhere across the screen
        
        let duration = Math.random() * 15 + 10; // 10s to 25s slow fall
        leaf.style.animationDuration = `${duration}s`;
        
        let delay = Math.random() * 20; // Stagger their start times up to 20s
        leaf.style.animationDelay = `${delay}s`;
        
        container.appendChild(leaf);
    }
}
createLeaves();

// Create Math Symbol Marquee
function createMathMarquee() {
    const marquee = document.createElement('div');
    marquee.className = 'math-strip';
    const symbols = "+ - = < > / % x ± ∑ √ ";
    marquee.innerText = symbols.repeat(150);
    const uiLayer = document.querySelector('.ui-layer');
    if (uiLayer) {
        uiLayer.appendChild(marquee);
    }
}
createMathMarquee();
