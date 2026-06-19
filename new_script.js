// =========================
// IBM Bob Developer Day
// Shared Script (All Cities)
// =========================


// -------------------------
// City Detection
// -------------------------
function getCity() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('/ottawa/')) return 'ottawa';
    if (path.includes('/markham/')) return 'markham';
    if (path.includes('/calgary/')) return 'calgary';

    return 'ottawa'; // default fallback
}


// -------------------------
// Event Config
// -------------------------
const eventConfig = {
    markham: {
        eventDate: '2026-06-15T08:30:00',
        endDate: '2026-06-16T00:00:00'
    },

    ottawa: {
        eventDate: '2026-06-25T08:30:00',
        endDate: '2026-06-26T00:00:00'
    },

    calgary: {
        eventDate: '2026-09-01T08:30:00',
        endDate: '2026-09-02T00:00:00'
    }
};


// -------------------------
// Countdown Timer
// -------------------------
function initCountdown() {
    const city = getCity();
    const config = eventConfig[city];

    if (!config) return;

    const eventDate = new Date(config.eventDate).getTime();
    const endDate = new Date(config.endDate).getTime();

    const countdown = document.getElementById('countdown');
    if (!countdown) return;

    function update() {
        const now = new Date().getTime();

        // Event ended
        if (now >= endDate) {
            countdown.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">Event Ended</span>
                </div>
            `;
            return;
        }

        // Event currently running
        if (now >= eventDate) {
            countdown.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">Event In Progress</span>
                </div>
            `;
            return;
        }

        // Countdown before start
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = String(val).padStart(2, '0');
            }
        };

        set('days', days);
        set('hours', hours);
        set('minutes', minutes);
        set('seconds', seconds);
    }

    update();
    setInterval(update, 1000);
}


// -------------------------
// Sticky Register Button
// -------------------------
function initStickyButton() {
    const sticky = document.getElementById('stickyRegister');
    const hero = document.querySelector('.hero');

    if (!sticky || !hero) return;

    window.addEventListener('scroll', () => {
        const heroBottom = hero.offsetTop + hero.offsetHeight;

        if (window.pageYOffset > heroBottom) {
            sticky.classList.add('visible');
        } else {
            sticky.classList.remove('visible');
        }
    });
}


// -------------------------
// Smooth Scroll
// -------------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const target = document.querySelector(
                link.getAttribute('href')
            );

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// -------------------------
// Event End State
// -------------------------
function initEventState() {
    const city = getCity();
    const config = eventConfig[city];

    if (!config) return;

    const now = new Date();
    const endDate = new Date(config.endDate);

    // Event still active
    if (now < endDate) return;

    // Hide sticky button
    const sticky = document.getElementById('stickyRegister');
    if (sticky) {
        sticky.style.display = 'none';
    }

    // Replace registration section
    const register = document.getElementById('register');

    if (register) {
        register.innerHTML = `
            <div class="section-inner">
                <div class="register-card" style="text-align:center;">

                    <span class="section-kicker">Event Complete</span>

                    <h2>IBM Bob Developer Day Has Ended</h2>

                    <p>Thank you for attending the ${city.toUpperCase()} event.</p>

                    <p>See you at the next one!</p>

                </div>
            </div>
        `;
    }
}


// -------------------------
// Init
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initStickyButton();
    initSmoothScroll();
    initEventState();
});
