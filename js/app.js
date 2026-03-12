// --- i18n Translations ---
const translations = {
    en: {
        login: "Login",
        explore_title: "Explore Our Trees",
        explore_desc: "Discover the diverse flora uploaded by our community.",
        user_login: "User Login",
        username: "Username",
        password: "Password",
        hint_code: "Type #123 anywhere to access Admin Login.",
        back_home: "Back to Home",
        admin_login: "Admin Login",
        secure: "Secure",
        access_code: "Access Code",
        access_dash: "Access Dashboard",
        back_user: "Back to User Login",
        admin_badge: "Admin",
        view_site: "View Site",
        logout: "Logout",
        admin_dash_title: "Tree Management Dashboard",
        admin_dash_desc: "Add, edit, or remove tree data from the ecosystem.",
        add_new_tree: "Add New Tree",
        tree_name: "Tree Name",
        bio_name: "Biological Name",
        description: "Description",
        upload_img: "Upload Image (Max 2MB)",
        publish_btn: "Publish to ESEC TREES",
        manage_db: "Manage Uploaded Database",
        total_trees: "Total Trees:",
        translated_db: "Database Empty.",
        species_count_label: "Species Count:",
        env_impact_title: "Environmental Impact",
        env_impact_desc: "Campus-wide ecological statistics based on our tree population.",
        total_trees_campus: "Total Trees in Campus",
        est_oxygen_day: "Est. Oxygen / Day",
        est_co2_yr: "Est. CO₂ Absorbed / Yr",
        green_score: "Green Impact Score",
        bio_analytics_title: "Biodiversity Analytics",
        bio_analytics_desc: "Interactive data on campus flora distribution and variety.",
        campus_bio_title: "Campus Biodiversity",
        total_species_index: "Total Species Index:",
        rare_species_hl: "Rare Species Highlight:",
        confirm_adoption: "Confirm Adoption"
    },
    ta: {
        login: "உள்நுழைக",
        explore_title: "எங்கள் மரங்களை ஆராயுங்கள்",
        explore_desc: "எங்கள் சமூகம் பதிவேற்றிய பல்வேறு தாவரங்களை கண்டறியுங்கள்.",
        user_login: "பயனர் உள்நுழைவு",
        username: "பயனர்பெயர்",
        password: "கடவுச்சொல்",
        hint_code: "நிர்வாகி உள்நுழைவை அணுக எங்கும் #123 என தட்டச்சு செய்க.",
        back_home: "முகப்புக்கு திரும்பு",
        admin_login: "நிர்வாகி உள்நுழைவு",
        secure: "பாதுகாப்பானது",
        access_code: "அணுகல் குறியீடு",
        access_dash: "கட்டுப்பாட்டகத்தை அணுகு",
        back_user: "பயனர் உள்நுழைவுக்கு திரும்பு",
        admin_badge: "நிர்வாகி",
        view_site: "தளத்தை காண்க",
        logout: "வெளியேறு",
        admin_dash_title: "மர மேலாண்மை கட்டுப்பாட்டகம்",
        admin_dash_desc: "சுற்றுச்சூழலில் மர தரவுகளைச் சேர்க்கவும், திருத்தவும் அல்லது அகற்றவும்.",
        add_new_tree: "புதிய மரத்தைச் சேர்",
        tree_name: "மரத்தின் பெயர்",
        bio_name: "உயிரியல் பெயர்",
        description: "விளக்கம்",
        upload_img: "படத்தை பதிவேற்று (அதிகபட்சம் 2MB)",
        publish_btn: "ESEC TREES இல் வெளியிடு",
        manage_db: "பதிவேற்றப்பட்ட தரவுத்தளத்தை நிர்வகி",
        total_trees: "மொத்த மரங்கள்:",
        translated_db: "தரவுத்தளம் காலியாக உள்ளது.",
        species_count_label: "இனங்கள் எண்ணிக்கை:",
        env_impact_title: "சுற்றுச்சூழல் தாக்கம்",
        env_impact_desc: "நமது மரங்களின் அடிப்படையில் வளாக அளவிலான சுற்றுச்சூழல் புள்ளிவிவரங்கள்.",
        total_trees_campus: "வளாகத்தில் உள்ள மொத்த மரங்கள்",
        est_oxygen_day: "மதிப்பிடப்பட்ட ஆக்சிஜன் / நாள்",
        est_co2_yr: "உறிஞ்சப்படும் CO₂ / ஆண்டு",
        green_score: "பச்சை தாக்க மதிப்பெண்",
        bio_analytics_title: "பல்லுயிர் பகுப்பாய்வு",
        bio_analytics_desc: "வளாக தாவர விநியோகம் மற்றும் வகை குறித்த தரவு.",
        campus_bio_title: "வளாக பல்லுயிர்",
        total_species_index: "மொத்த இனங்களின் குறியீடு:",
        rare_species_hl: "அரிய இனங்கள் சிறப்பு:",
        confirm_adoption: "தத்தெடுப்பை உறுதிப்படுத்தவும்"
    }
};

// Cache for translations to prevent API spam
const translationCache = JSON.parse(localStorage.getItem('ecolink_trans_cache') || '{}');

async function translateDynamicText(text) {
    if (!text) return text;
    if (currentLang === 'en') return text;

    const lower = text.trim();
    if (translationCache[lower]) return translationCache[lower];

    // Try Google Translate unauthenticated API wrapper for simple static site translation
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const data = await res.json();
        const translatedText = data[0].map(item => item[0]).join('');
        if (translatedText) {
            translationCache[lower] = translatedText;
            localStorage.setItem('ecolink_trans_cache', JSON.stringify(translationCache));
            return translatedText;
        }
    } catch (e) {
        console.error('Translation network request failed', e);
    }

    return text;
}

let currentLang = localStorage.getItem('ecolink_lang') || 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    localStorage.setItem('ecolink_lang', currentLang);
    updateLanguageText();

    // Re-render UI grids immediately so trees translate live without refresh
    const path = window.location.pathname;
    if (path.includes('admin.html')) {
        renderAdminList();
    } else if (!path.includes('login.html')) {
        renderTreeGrid();
        updateModalText();
    }
}

function updateModalText() {
    const modal = document.getElementById('tree-modal');
    if (modal && modal.style.display === 'block' && currentlyViewedTreeId) {
        const trees = getTrees();
        const tree = trees.find(t => t.id === currentlyViewedTreeId);
        if (tree) {
            // Force re-open to re-translate
            openTreeModal(tree.image, tree.name, tree.biologicalName, tree.description, tree.speciesCount, tree.id, true);
        }
    }
}

function updateLanguageText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Handle placeholders manually if needed
    const nameInput = document.getElementById('tree-name');
    if (nameInput) nameInput.placeholder = currentLang === 'ta' ? 'உதாரணம்: ஆலமரம்' : 'e.g., Banyan Tree';

    const descInput = document.getElementById('tree-desc');
    if (descInput) descInput.placeholder = currentLang === 'ta' ? 'முக்கிய விவரங்கள் மற்றும் நன்மைகள்...' : 'Key details and benefits...';

    const adminInput = document.getElementById('admin-code');
    if (adminInput) adminInput.placeholder = currentLang === 'ta' ? 'நிர்வாகி பின்னை உள்ளிடவும்' : 'Enter Admin Pin';
}


// --- Core Data Management ---
const STORAGE_KEY = 'ecolink_trees';

const initialData = [
    {
        id: '1',
        name: 'Neem Tree',
        biologicalName: 'Ficus benghalensis',
        speciesCount: 149,
        description: 'The neem tree usually grows 15–20 meters tall, though some trees can reach up to 30 meters. It has a wide spreading crown with dense, dark-green leaves. The leaves are compound and serrated, giving the tree a feathery appearance. Neem produces small white fragrant flowers, and its fruits are smooth olive-like drupes that turn yellow when ripe.',
        image: 'https://unsplash.com/photos/leaves-and-flowers-bloom-on-a-tree-branch-rWWoelgz3So'
    },
    {
        id: '2',
        name: 'Neem Tree',
        biologicalName: 'Azadirachta indica',
        speciesCount: 12,
        description: 'A fast-growing tree noted for its drought resistance. Highly valued for its medicinal properties in traditional Indian medicine.',
        image: 'https://images.unsplash.com/photo-1627448371190-7d721111d4da?q=80&w=1632&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Peepal Tree',
        biologicalName: 'Ficus religiosa',
        speciesCount: 8,
        description: 'A sacred tree in many Indian religions. It is known for its heart-shaped leaves and long life span, often associated with meditation.',
        image: 'https://images.unsplash.com/photo-1605335198226-7786f4a7c06b?q=80&w=1471'
    },
    {
        id: '4',
        name: 'Mango Tree',
        biologicalName: 'Mangifera indica',
        speciesCount: 25,
        description: 'Famous for its sweet fruit, the mango tree is a staple in tropical climates. It has a dense foliage and provides a lush green canopy.',
        image: 'https://images.unsplash.com/photo-1621271617415-325f683411b0?q=80&w=1460'
    },
    {
        id: '5',
        name: 'Teak Tree',
        biologicalName: 'Tectona grandis',
        speciesCount: 15,
        description: 'Valued highly for its high-quality timber. It is a large deciduous tree that thrives in mixed hardwood forests across the peninsula.',
        image: 'https://images.unsplash.com/photo-1599598425947-330026216dff?w=400'
    },
    {
        id: '6',
        name: 'Gulmohar',
        biologicalName: 'Delonix regia',
        speciesCount: 7,
        description: 'Known for its flamboyant display of bright red-orange flowers. It is grown as an ornamental tree in many tropical areas.',
        image: 'https://images.unsplash.com/photo-1635398692797-29007a39ba5c?q=80&w=1000'
    },
    {
        id: '7',
        name: 'Coconut Tree',
        biologicalName: 'Cocos nucifera',
        speciesCount: 30,
        description: 'The tree of life, every part of the coconut tree is useful. It thrives in coastal areas and provides fruit, oil, and fiber.',
        image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=1470'
    },
    {
        id: '8',
        name: 'Tamarind Tree',
        biologicalName: 'Tamarindus indica',
        speciesCount: 6,
        description: 'A long-lived, medium-growth tree which produces sour, edible fruit used extensively in Indian cuisine.',
        image: 'https://images.unsplash.com/photo-1533038590840-bee593630f9a?q=80&w=1500'
    },
    {
        id: '9',
        name: 'Ashoka Tree',
        biologicalName: 'Polyalthia longifolia',
        speciesCount: 20,
        description: 'An evergreen tree used for its ornamental value and to suppress noise pollution. Often planted near temples.',
        image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a56?q=80&w=1000'
    },
    {
        id: '10',
        name: 'Mahogany',
        biologicalName: 'Swietenia mahagoni',
        speciesCount: 4,
        description: 'A large tropical tree valued for its hard, reddish-brown wood. It is an impressive tree with a large symmetrical crown.',
        image: 'https://images.unsplash.com/photo-1598453005898-3165b6a38069?q=80&w=1470'
    },
    {
        id: '11',
        name: 'Jackfruit Tree',
        biologicalName: 'Artocarpus heterophyllus',
        speciesCount: 9,
        description: 'The largest tree-borne fruit in the world. The tree is evergreen and has a thick canopy that provides excellent shade.',
        image: 'https://images.unsplash.com/photo-1621271617415-325f683411b0?q=80&w=1460'
    },
    {
        id: '12',
        name: 'Flame of the Forest',
        biologicalName: 'Butea monosperma',
        speciesCount: 3,
        description: 'Native to India, it is famous for its vibrant orange-red flowers that appear in the dry season.',
        image: 'https://images.unsplash.com/photo-1635398692797-29007a39ba5c?q=80&w=1000'
    }
];

function initData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
}

function getTrees() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveTree(tree) {
    try {
        const trees = getTrees();
        trees.push(tree);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
        return true;
    } catch (e) {
        console.error('Storage failed:', e);
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert(currentLang === 'ta' ? 'மெமரி முழுதுமாக உள்ளது! தயவுசெய்து சிறிய அளவிலான படங்களை பயன்படுத்தவும்.' : 'Storage full! Please use smaller images or remove existing trees to add more.');
        } else {
            alert(currentLang === 'ta' ? 'ஏதோ தவறு நடந்துவிட்டது!' : 'Something went wrong while saving!');
        }
        return false;
    }
}

function deleteTree(id) {
    let trees = getTrees();
    trees = trees.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
    if (window.location.pathname.includes('admin.html')) {
        renderAdminList();
    }
}


// --- Theme System ---
function initTheme() {
    const savedTheme = localStorage.getItem('ecolink_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ecolink_theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const iconPath = theme === 'dark'
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' // Moon
        : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'; // Sun

    const icon1 = document.getElementById('theme-icon');
    const icon2 = document.getElementById('theme-icon-admin');
    if (icon1) icon1.innerHTML = iconPath;
    if (icon2) icon2.innerHTML = iconPath;
}

// --- Global Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initData();
    initTheme();
    updateLanguageText(); // Initialize translation
    initGlobalRipples(); // Initialize global page touch effect

    const path = window.location.pathname;

    // Logo Click Water Droplet Effect
    const logoBtn = document.getElementById('main-logo-btn');
    if (logoBtn) {
        logoBtn.addEventListener('click', createWaterDroplets);
    }

    // Index page logic
    if (!path.includes('login.html') && !path.includes('admin.html')) {
        renderTreeGrid();
        setTimeout(initNewFeatures, 100); // Initialize new dashboards
        createLeaves('spring-leaves-container', 25, true, true); // Wind interactive leaves behind content

        // Extended Intro Screen logic
        const intro = document.getElementById('intro-screen');
        if (intro) {
            intro.style.display = 'flex'; // Ensure it's visible
            // Adding more leaves and making them cursor interactive on the intro screen
            createLeaves('intro-leaves-container', 25, true);

            // Clean up leaves container after extended animation
            setTimeout(() => {
                const c = document.getElementById('intro-leaves-container');
                if (c) c.innerHTML = '';
                const screen = document.getElementById('intro-screen');
                if (screen) screen.style.display = 'none';
            }, 2000); // 2 seconds duration
        }
    }

    // Admin page logic
    if (path.includes('admin.html')) {
        if (sessionStorage.getItem('role') !== 'admin') {
            window.location.href = 'login.html';
        }
        renderAdminList();
    }

    // Login page logic
    if (path.includes('login.html')) {
        initMouseTracking(); // background tracker
        createLeaves('login-leaves-container', 20, true); // interactive cursor leaves
    }

    // Handle hidden admin code (#123)
    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
        keyBuffer += e.key;
        if (keyBuffer.length > 4) {
            keyBuffer = keyBuffer.slice(-4);
        }

        if (keyBuffer === '#123') {
            const adminModal = document.getElementById('admin-modal');
            if (adminModal) {
                adminModal.style.display = 'block';
            }
        }
    });

    // Close modals on outside click
    window.onclick = function (event) {
        const adminModal = document.getElementById('admin-modal');
        const treeModal = document.getElementById('tree-modal');
        if (event.target == adminModal) {
            adminModal.style.display = "none";
        }
        if (event.target == treeModal) {
            treeModal.style.display = "none";
        }
    }
});


// --- Leaf Animation & Toggle System ---
let interactiveLeaves = [];
let leavesEnabled = true;

function toggleLeaves() {
    leavesEnabled = !leavesEnabled;
    const container = document.getElementById('spring-leaves-container');
    if (!container) return;

    if (leavesEnabled) {
        createLeaves('spring-leaves-container', 25, true, true);
    } else {
        container.innerHTML = '';
        interactiveLeaves = [];
    }
}

function createLeaves(containerId, count, isInteractive, isSpring = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const trees = getTrees();
    const leafImages = trees.map(t => t.image);

    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';

        // Randomize leaf properties
        const startX = Math.random() * 100;
        const fallDuration = 7 + Math.random() * 8; // 7 to 15s
        const swayDuration = 3 + Math.random() * 4; // 3 to 7s
        const flipDuration = 4 + Math.random() * 6; // 4 to 10s
        const delay = Math.random() * -15; // Negative delay for pre-filled screen
        const scale = 0.6 + Math.random() * 0.6;

        leaf.style.left = `${startX}vw`;
        leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s, ${flipDuration}s`;
        leaf.style.animationDelay = `${delay}s, ${delay}s, ${delay}s`;
        leaf.style.transform = `scale(${scale})`;

        // Use clean emerald gradient (No images per user request)
        leaf.style.background = 'radial-gradient(circle at 30% 30%, #34d399, #10b981)';
        leaf.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.8)';
        leaf.style.borderRadius = '100% 0 100% 0'; // Authentic pointed leaf shape

        container.appendChild(leaf);

        if (isInteractive) {
            interactiveLeaves.push({
                element: leaf,
                baseScale: scale,
                baseLeft: startX
            });
        }
    }

    if (isInteractive) {
        // Add cursor move listener to push leaves away powerfully
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            interactiveLeaves.forEach(l => {
                if (!l.element.isConnected) return; // ignore dead leaves
                const rect = l.element.getBoundingClientRect();
                const leafCenterX = rect.left + rect.width / 2;
                const leafCenterY = rect.top + rect.height / 2;

                const dx = mouseX - leafCenterX;
                const dy = mouseY - leafCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If mouse is close (within 200px), push leaf away fast like wind
                if (distance < 200) {
                    const pushForce = Math.max(0, 200 - distance);
                    const pushX = (dx / distance) * -pushForce; // push left/right
                    const rotate = (dx / distance) * -pushForce;
                    l.element.style.transform = `scale(${l.baseScale}) translate(${pushX}px, 0px) rotate(${rotate}deg)`;
                    l.element.style.transition = 'transform 0.1s ease-out';
                } else {
                    l.element.style.transform = `scale(${l.baseScale})`;
                    l.element.style.transition = 'transform 1s ease-in'; // slowly return
                }
            });
        });
    }
}

// --- Global Ripple/Touch Effect (Now Falling Leaves) ---
function initGlobalRipples() {
    document.addEventListener('mousedown', (e) => {
        // Don't trigger on buttons or interactive elements to avoid clutter
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;

        // 1. Create the Nature Ripple
        const ripple = document.createElement('div');
        ripple.className = 'nature-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);

        // 2. Create the Leaf Burst (3-5 small leaves)
        const burstCount = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < burstCount; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'touch-leaf';
            leaf.style.left = `${e.clientX}px`;
            leaf.style.top = `${e.clientY}px`;

            // Random trajectory for the burst
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const tr = Math.random() * 360; // Random rotation

            leaf.style.setProperty('--tx', `${tx}px`);
            leaf.style.setProperty('--ty', `${ty}px`);
            leaf.style.setProperty('--tr', `${tr}deg`);

            document.body.appendChild(leaf);
            setTimeout(() => leaf.remove(), 1000);
        }
    });
}

// --- Logo Water Droplet Effect ---
function createWaterDroplets() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.classList.add('water-drop');
            // Random horizontal position across screen width
            drop.style.left = `${Math.random() * 100}vw`;
            const duration = 0.8 + Math.random() * 1.5;
            drop.style.animationDuration = `${duration}s`;

            document.body.appendChild(drop);

            setTimeout(() => {
                drop.remove();
            }, duration * 1000);
        }, i * 50); // drop sequence delay
    }
}


// --- Cursor Reactive Effect ---
function initMouseTracking() {
    const bg = document.getElementById('interactive-bg');
    if (!bg) return;

    document.addEventListener('mousemove', (e) => {
        bg.style.setProperty('--x', `${e.clientX}px`);
        bg.style.setProperty('--y', `${e.clientY}px`);
    });
}


let displayedTreeLimit = 6;

// --- Renders & UI State ---
async function renderTreeGrid(limit = displayedTreeLimit) {
    const grid = document.getElementById('tree-grid');
    const countDisplay = document.getElementById('tree-count-display');
    if (!grid) return;

    const trees = getTrees();
    grid.innerHTML = '';

    // Remove existing View More container if present
    const existingViewMore = document.getElementById('view-more-container');
    if (existingViewMore) existingViewMore.remove();

    if (countDisplay) {
        countDisplay.textContent = trees.length;
    }

    if (trees.length === 0) {
        const msg = currentLang === 'ta' ? 'தரவுத்தளம் காலியாக உள்ளது.' : 'Database empty. Awaiting admin upload.';
        grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; color: var(--text-muted);">${msg}</p>`;
        return;
    }

    const treesToShow = trees.slice(0, limit);

    // Number them based on chronological upload order
    for (let iterIndex = 0; iterIndex < treesToShow.length; iterIndex++) {
        const tree = treesToShow[iterIndex];
        const displayCount = iterIndex + 1;

        // Translate dynamic data before rendering
        const displayName = await translateDynamicText(tree.name);
        const displayDesc = await translateDynamicText(tree.description);
        const displayBio = tree.biologicalName ? tree.biologicalName : 'Unknown Species';

        // Escape for onclick handler params
        const safeImg = tree.image.replace(/'/g, "\\'");
        const safeName = displayName.replace(/'/g, "\\'");
        const safeBio = displayBio.replace(/'/g, "\\'");
        const safeDesc = displayDesc.replace(/'/g, "\\'");
        const safeCount = tree.speciesCount || 0;
        const safeId = tree.id;

        const card = document.createElement('div');
        card.className = 'tree-card';
        card.style.cursor = 'pointer';
        card.onclick = () => openTreeModal(safeImg, safeName, safeBio, safeDesc, safeCount, safeId);
        card.innerHTML = `
            <div class="tree-card-count">NO. ${displayCount}</div>
            <div class="tree-img-container">
                <img src="${tree.image}" alt="${tree.name}" onerror="this.src='https://images.unsplash.com/photo-1542273917363-3b1817f69a56?auto=format&fit=crop&q=80&w=1000'">
            </div>
            <div class="tree-info">
                <h3>${displayName}</h3>
                <p class="bio-font" style="color:var(--text-main);">${displayBio}</p>
                <p class="desc-text">${displayDesc}</p>
            </div>
        `;
        grid.appendChild(card);
    }

    // Append View More button if needed
    if (limit < trees.length) {
        const viewMoreContainer = document.createElement('div');
        viewMoreContainer.id = 'view-more-container';
        viewMoreContainer.style.textAlign = 'center';
        viewMoreContainer.style.marginTop = '2rem';

        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.className = 'login-btn';
        viewMoreBtn.textContent = currentLang === 'ta' ? 'மேலும் காண்க' : 'View More Trees';
        viewMoreBtn.onclick = () => {
            displayedTreeLimit = trees.length;
            renderTreeGrid(displayedTreeLimit);
        };

        viewMoreContainer.appendChild(viewMoreBtn);
        grid.parentNode.insertBefore(viewMoreContainer, grid.nextSibling);
    }
}

// --- Modals ---
let currentlyViewedTreeId = null;

function openTreeModal(imgStr, titleStr, bioStr, descStr, countStr, treeId = null, isReopen = false) {
    const modal = document.getElementById('tree-modal');
    if (!modal) return;

    // Use translations if available
    let finalTitle = titleStr;
    let finalDesc = descStr;

    if (isReopen || treeId) {
        const trees = getTrees();
        const tree = trees.find(t => t.id === treeId);
        if (tree) {
            // We'll let renderTreeGrid's translation logic be mirrored here if possible, 
            // but the simplest is to just re-translate the passed strings if we have the tree object.
            // Or better, just wait for the translateDynamicText inside this function if needed.
            // For now, we'll just update the text content.
        }
    }

    // Since titleStr and descStr might already be translated from renderTreeGrid, 
    // but if we toggle language INSIDE modal, we need fresh ones.
    (async () => {
        const transTitle = await translateDynamicText(titleStr);
        const transDesc = await translateDynamicText(descStr);

        document.getElementById('modal-img').src = imgStr;
        document.getElementById('modal-title').textContent = transTitle;
        document.getElementById('modal-bio').textContent = bioStr;
        document.getElementById('modal-count').textContent = countStr;
        document.getElementById('modal-desc').textContent = transDesc;
    })();

    currentlyViewedTreeId = treeId;
    if (treeId) {
        if (typeof generateTreeTimeline === 'function') generateTreeTimeline(treeId);
    }

    modal.style.display = 'block';

    // Scroll-triggered expansion (DISABLED per user request)
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('expanded'); // Reset state
    modal.scrollTop = 0; // Reset scroll
}

function closeTreeModal() {
    const modal = document.getElementById('tree-modal');
    if (modal) {
        modal.style.display = 'none';
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.remove('expanded');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'none';
}

function toggleAdminForm(showAdmin) {
    const userForm = document.getElementById('user-login-form');
    const adminForm = document.getElementById('admin-login-form');
    if (!userForm || !adminForm) return;

    if (showAdmin) {
        userForm.classList.remove('active');
        setTimeout(() => adminForm.classList.add('active'), 300);
    } else {
        adminForm.classList.remove('active');
        setTimeout(() => userForm.classList.add('active'), 300);
    }
}

// --- Form Handlers ---
function handleUserLogin(e) {
    e.preventDefault();
    const msg = currentLang === 'ta' ? 'பயனர் உள்நுழைவு வெற்றிகரமானது!' : 'User login successful! Exploring ESEC TREES.';
    alert(msg);
    sessionStorage.setItem('role', 'user');
    window.location.href = 'index.html';
}

function handleAdminLogin(e) {
    e.preventDefault();
    const code = document.getElementById('admin-code').value;
    if (code === '#123' || code === 'admin123') {
        sessionStorage.setItem('role', 'admin');
        window.location.href = 'admin.html';
    } else {
        const msg = currentLang === 'ta' ? 'தவறான நிர்வாகி குறியீடு!' : 'Invalid Admin Code!';
        alert(msg);
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('role');
    window.location.href = 'index.html';
}

let currentBase64Image = null;
let editingTreeId = null;

function editTree(id) {
    const trees = getTrees();
    const tree = trees.find(t => t.id === id);
    if (!tree) return;

    editingTreeId = id;
    document.getElementById('tree-name').value = tree.name;
    document.getElementById('tree-bio-name').value = tree.biologicalName || '';
    document.getElementById('tree-species-count').value = tree.speciesCount || '';
    document.getElementById('tree-desc').value = tree.description;
    currentBase64Image = tree.image;
    document.getElementById('file-name').textContent = "Existing Image Retained";

    document.querySelector('#add-tree-form button[type="submit"]').textContent = currentLang === 'ta' ? 'தரவை புதுப்பி' : "Update Tree";

    let cancelBtn = document.getElementById('cancel-edit-btn');
    if (!cancelBtn) {
        cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancel-edit-btn';
        cancelBtn.type = 'button';
        cancelBtn.className = 'login-btn btn-danger';
        cancelBtn.style.marginTop = '1rem';
        cancelBtn.style.width = '100%';
        cancelBtn.textContent = currentLang === 'ta' ? 'ரத்து செய்' : "Cancel Edit";
        cancelBtn.onclick = cancelEdit;
        document.getElementById('add-tree-form').appendChild(cancelBtn);
    }
    cancelBtn.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    editingTreeId = null;
    document.getElementById('add-tree-form').reset();
    document.getElementById('file-name').textContent = currentLang === 'ta' ? 'படத்தை பதிவேற்று (அதிகபட்சம் 2MB)' : "Upload Image (Max 2MB)";
    currentBase64Image = null;
    document.querySelector('#add-tree-form button[type="submit"]').textContent = translations[currentLang]['publish_btn'];
    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) cancelBtn.style.display = 'none';
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const nameLabel = document.getElementById('file-name');
    const errorMsg = document.getElementById('image-error');

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        errorMsg.textContent = currentLang === 'ta' ? 'படம் மிகவும் பெரியது.' : "Image is too large. Max size is 2MB.";
        nameLabel.textContent = currentLang === 'ta' ? 'படத்தை பதிவேற்று (அதிகபட்சம் 2MB)' : "Upload Image (Max 2MB)";
        currentBase64Image = null;
        event.target.value = '';
        return;
    }

    errorMsg.textContent = "";
    nameLabel.textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        currentBase64Image = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleAddTree(e) {
    e.preventDefault();
    const name = document.getElementById('tree-name').value;
    const bioName = document.getElementById('tree-bio-name').value;
    const speciesCount = document.getElementById('tree-species-count').value;
    const desc = document.getElementById('tree-desc').value;

    if (!currentBase64Image) {
        document.getElementById('image-error').textContent = currentLang === 'ta' ? 'தயவுசெய்து சரியான படத்தைத் தேர்ந்தெடுக்கவும்.' : "Please select a valid image.";
        return;
    }

    const newTree = {
        name: name,
        biologicalName: bioName,
        speciesCount: speciesCount,
        description: desc,
        image: currentBase64Image
    };

    if (editingTreeId) {
        newTree.id = editingTreeId;
        const trees = getTrees();
        const idx = trees.findIndex(t => t.id === editingTreeId);
        if (idx !== -1) {
            trees[idx] = newTree;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
        }
        cancelEdit();
    } else {
        newTree.id = Date.now().toString();
        const res = saveTree(newTree);
        if (res) {
            e.target.reset();
            document.getElementById('file-name').textContent = currentLang === 'ta' ? 'படத்தை பதிவேற்று (அதிகபட்சம் 2MB)' : "Upload Image (Max 2MB)";
            currentBase64Image = null;
            renderAdminList();
        }
    }
}

async function renderAdminList() {
    const list = document.getElementById('admin-tree-list');
    if (!list) return;
    const trees = getTrees();

    list.innerHTML = '';

    if (trees.length === 0) {
        const text = currentLang === 'ta' ? 'இன்னும் மரங்கள் சேர்க்கப்படவில்லை.' : 'No trees added yet.';
        list.innerHTML = `<p class="hint">${text}</p>`;
        return;
    }

    for (const tree of trees) {
        const displayBio = tree.biologicalName ? tree.biologicalName : 'Unknown Species';

        const item = document.createElement('div');
        item.className = 'admin-tree-item';
        item.innerHTML = `
            <img src="${tree.image}" class="admin-item-img" alt="${tree.name}">
            <div class="admin-item-info">
                <h4>${tree.name}</h4>
                <p class="bio-font" style="margin-bottom:0.2rem; font-size:0.85rem;">${displayBio}</p>
                <p class="desc-text">${tree.description}</p>
            </div>
            <div class="admin-item-actions">
                <button class="action-btn" style="background:var(--accent);" onclick="editTree('${tree.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteTree('${tree.id}')">Delete</button>
            </div>
        `;
        list.appendChild(item);
    }
}

// --- NEW FEATURES ---

// 1. Environmental Impact Dashboard
function updateImpactDashboard() {
    const trees = getTrees();
    const totalTrees = trees.length;

    let totalOxygen = totalTrees * 0.5;
    let totalCO2 = totalTrees * 22;
    let impactScore = totalTrees * 15 + Math.floor(Math.random() * 100);

    animateCounter('stat-total-trees', totalTrees);
    animateCounter('stat-oxygen', totalOxygen, ' kg');
    animateCounter('stat-co2', totalCO2, ' kg');
    animateCounter('stat-impact-score', impactScore);
}

function animateCounter(id, maxVal, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;
    let curr = 0;
    const increment = Math.ceil(maxVal / 50) || 1;
    const timer = setInterval(() => {
        curr += increment;
        if (curr >= maxVal) {
            curr = maxVal;
            clearInterval(timer);
        }
        el.textContent = curr + suffix;
    }, 30);
}

// 2. Biodiversity Analytics
let speciesChartInstance = null;
function renderBiodiversityChart() {
    const ctx = document.getElementById('speciesChart');
    if (!ctx) return;

    const trees = getTrees();

    const speciesMap = {};
    trees.forEach(t => {
        let bio = t.biologicalName || 'Unknown';
        speciesMap[bio] = (speciesMap[bio] || 0) + 1;
    });

    const labels = Object.keys(speciesMap);
    const data = Object.values(speciesMap);

    const idxEl = document.getElementById('stat-species-index');
    const rareEl = document.getElementById('stat-rare-species');


    if (idxEl) idxEl.textContent = labels.length;
    if (rareEl) rareEl.textContent = labels.length > 0 ? labels[labels.length - 1] : 'None';



    if (speciesChartInstance) speciesChartInstance.destroy();

    if (typeof Chart === 'undefined') {
        setTimeout(renderBiodiversityChart, 500);
        return;
    }

    Chart.defaults.color = 'rgba(255,255,255,0.7)';
    speciesChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#10b981', '#34d399', '#059669', '#064e3b', '#6ee7b7', '#10b981', '#34d399', '#059669'],
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.5)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 3. Leaderboard
function renderLeaderboard() {
    const grid = document.getElementById('leaderboard-grid');
    if (!grid) return;

    const trees = getTrees();
    if (trees.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Not enough data for leaderboard.</p>';
        return;
    }

    grid.innerHTML = '';

    const categories = [
        { title: "Oldest Tree", rank: "rank-badge", color: "#fbbf24", label: "Gold", index: 0 },
        { title: "Largest Canopy", rank: "rank-badge rank-silver", color: "#9ca3af", label: "Silver", index: Math.min(1, trees.length - 1) },
        { title: "Rare Species", rank: "rank-badge rank-bronze", color: "#d97706", label: "Bronze", index: Math.min(2, trees.length - 1) }
    ];

    categories.forEach(cat => {
        const t = trees[cat.index];
        const card = document.createElement('a');
        card.className = 'rank-card';

        const safeImg = t.image.replace(/'/g, "\\'");
        const safeName = t.name.replace(/'/g, "\\'");
        const safeBio = t.biologicalName ? t.biologicalName.replace(/'/g, "\\'") : 'Unknown';
        const safeDesc = t.description.replace(/'/g, "\\'");

        card.onclick = () => openTreeModal(safeImg, safeName, safeBio, safeDesc, t.speciesCount || 0, t.id);

        // Translated dynamic Leaderboard fields
        const titles = {
            "Oldest Tree": currentLang === 'ta' ? "பழமையான மரம்" : "Oldest Tree",
            "Largest Canopy": currentLang === 'ta' ? "மிகப்பெரிய விதானம்" : "Largest Canopy",
            "Rare Species": currentLang === 'ta' ? "அரிய இனம்" : "Rare Species"
        };
        const labels = {
            "Gold": currentLang === 'ta' ? "தங்கம்" : "Gold",
            "Silver": currentLang === 'ta' ? "வெள்ளி" : "Silver",
            "Bronze": currentLang === 'ta' ? "வெண்கலம்" : "Bronze"
        };

        const displayCatTitle = titles[cat.title] || cat.title;
        const displayLabel = labels[cat.label] || cat.label;

        card.innerHTML = `
            <div class="${cat.rank}">${displayLabel}</div>
            <h3 style="color:var(--text-main); font-size:1.1rem; margin-top:0.5rem;">${displayCatTitle}</h3>
            <img src="${t.image}" class="rank-img">
            <h4 style="color:var(--primary);">${t.name}</h4>
        `;
        grid.appendChild(card);
    });
}



// 5. Timeline Generator
function generateTreeTimeline(treeId) {
    const container = document.getElementById('tree-timeline');
    if (!container) return;
    container.innerHTML = '';

    const hash = treeId ? treeId.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0) : 123;
    const plantedYear = 2018 + (Math.abs(hash) % 5);

    const events = [
        { year: plantedYear, desc: "Seedling planted in campus grounds.", img: "" },
        { year: plantedYear + 2, desc: "First major growth spurt observed. Reached targeted milestone.", img: "https://images.unsplash.com/photo-1599598425947-330026216dff?w=400&q=80" }
    ];

    events.forEach(ev => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-year">${ev.year}</div>
                <div class="timeline-desc">${ev.desc}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function initNewFeatures() {
    updateImpactDashboard();
    renderBiodiversityChart();
    renderLeaderboard();
}
