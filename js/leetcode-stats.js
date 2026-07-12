// LeetCode Dynamic Stats Fetcher & Render
document.addEventListener('DOMContentLoaded', function() {
    const profileApi = 'https://alfa-leetcode-api.onrender.com/userProfile/221FA23057';
    const calendarApi = 'https://alfa-leetcode-api.onrender.com/221FA23057/calendar';
    
    // Fallback static data in case the public API fails or is rate-limited
    // Contains real parsed calendar history from our API check to ensure perfect render
    const fallbackData = {
        totalSolved: 363,
        totalQuestions: 3991,
        easySolved: 212,
        totalEasy: 954,
        mediumSolved: 145,
        totalMedium: 2084,
        hardSolved: 6,
        totalHard: 953,
        ranking: 355340,
        contributionPoint: 836,
        reputation: 72,
        maxStreak: 107,
        activeStreak: 11,
        submissionCalendar: {"1767225600": 1, "1767312000": 1, "1767398400": 1, "1767484800": 1, "1767571200": 1, "1767657600": 1, "1767744000": 1, "1767830400": 1, "1767916800": 1, "1768003200": 1, "1768089600": 1, "1768176000": 1, "1768262400": 1, "1768348800": 1, "1768435200": 1, "1768521600": 1, "1768608000": 1, "1768780800": 1, "1769040000": 1, "1769299200": 1, "1769472000": 1, "1769558400": 1, "1769644800": 1, "1769817600": 1, "1769904000": 1, "1769990400": 1, "1770076800": 1, "1770163200": 1, "1770249600": 1, "1770336000": 1, "1770422400": 1, "1770508800": 1, "1770595200": 1, "1770681600": 1, "1770768000": 1, "1770854400": 1, "1770940800": 1, "1771027200": 1, "1771113600": 1, "1771200000": 1, "1771286400": 1, "1771372800": 1, "1771459200": 1, "1771545600": 1, "1771632000": 1, "1771718400": 1, "1771804800": 1, "1771891200": 1, "1771977600": 1, "1772064000": 1, "1772150400": 1, "1772236800": 1, "1772323200": 1, "1772409600": 1, "1772496000": 1, "1772582400": 1, "1772668800": 1, "1772755200": 1, "1772928000": 1, "1773014400": 1, "1773100800": 1, "1773273600": 1, "1773446400": 1, "1773619200": 1, "1773705600": 1, "1773792000": 1, "1773878400": 1, "1773964800": 1, "1774051200": 1, "1774137600": 1, "1774224000": 1, "1774310400": 1, "1774396800": 1, "1774483200": 1, "1774569600": 1, "1774656000": 1, "1774742400": 1, "1774828800": 1, "1774915200": 1, "1775001600": 1, "1775088000": 1, "1775174400": 1, "1775260800": 1, "1775347200": 1, "1775433600": 1, "1775520000": 1, "1775606400": 1, "1775692800": 1, "1775779200": 1, "1775865600": 1, "1775952000": 1, "1776038400": 1, "1776124800": 1, "1776211200": 1, "1776297600": 1, "1776384000": 1, "1776470400": 1, "1776556800": 2, "1776643200": 1, "1776729600": 1, "1776816000": 1, "1776902400": 1, "1776988800": 1, "1777075200": 1, "1777161600": 1, "1777248000": 1, "1777334400": 1, "1777593600": 1, "1777680000": 1, "1777766400": 1, "1777852800": 1, "1777939200": 1, "1778025600": 1, "1778112000": 1, "1778198400": 1, "1778284800": 1, "1778371200": 1, "1778457600": 1, "1778544000": 1, "1778630400": 1, "1778716800": 1, "1778803200": 1, "1778889600": 1, "1778976000": 1, "1779062400": 1, "1779148800": 1, "1779235200": 1, "1779321600": 1, "1779408000": 1, "1779494400": 1, "1779580800": 1, "1779667200": 1, "1779753600": 1, "1779840000": 1, "1779926400": 1, "1780790400": 1, "1780876800": 1, "1780963200": 1, "1782864000": 1, "1782950400": 1, "1783036800": 1, "1783123200": 1, "1783209600": 2, "1783296000": 1, "1783382400": 1, "1783468800": 1, "1783555200": 1, "1783641600": 1, "1783728000": 1, "1752278400": 1, "1752364800": 6, "1752451200": 1, "1752537600": 3, "1752710400": 1, "1752796800": 2, "1752883200": 1, "1752969600": 4, "1753056000": 1, "1753142400": 1, "1753228800": 1, "1753315200": 4, "1753401600": 5, "1753488000": 1, "1753574400": 8, "1753660800": 1, "1753747200": 2, "1753833600": 4, "1753920000": 5, "1754006400": 2, "1754092800": 1, "1754179200": 4, "1754265600": 4, "1754352000": 1, "1754438400": 6, "1754524800": 3, "1754611200": 1, "1754697600": 2, "1754784000": 1, "1754870400": 1, "1754956800": 4, "1755043200": 3, "1755129600": 2, "1755216000": 1, "1755302400": 1, "1755388800": 5, "1755475200": 3, "1755561600": 2, "1755648000": 1, "1755734400": 1, "1755820800": 1, "1755907200": 1, "1755993600": 1, "1760080000": 1, "1760166400": 3, "1760252800": 1, "1760339200": 1, "1760425600": 1, "1760598400": 1, "1760684800": 7, "1760771200": 6, "1760857600": 1, "1760944000": 2, "1761030400": 1, "1761116800": 1, "1761203200": 1, "1761289600": 2, "1761376000": 1, "1761462400": 1, "1761548800": 1, "1761635200": 1, "1761721600": 1, "1761808000": 1, "1761894400": 1, "1761980800": 1, "1762067200": 1, "1762153600": 1, "1762240000": 1, "1762326400": 1, "1762412800": 5, "1762499200": 1, "1762585600": 4, "1762672000": 1, "1762758400": 2, "1762844800": 1, "1762931200": 1, "1763017600": 3, "1763104000": 1, "1763190400": 1, "1763276800": 1, "1763363200": 1, "1763449600": 1, "1763536000": 1, "1763622400": 5, "1763708800": 1, "1763795200": 1, "1763881600": 2, "1763968000": 1, "1764054400": 1, "1764140800": 1, "1764227200": 5, "1764313600": 1, "1764400000": 1, "1764486400": 1, "1764572800": 1, "1764659200": 1, "1764745600": 1, "1764832000": 8, "1764918400": 2, "1765004800": 1, "1765109120": 1, "1765177600": 1, "1765264000": 1, "1765350400": 1, "1765436800": 1, "1765523200": 1, "1765609600": 1, "1765696000": 1, "1765782400": 1, "1765868800": 1, "1765955200": 1, "1766041600": 8, "1766128000": 1, "1766214400": 1, "1766300800": 1, "1766387200": 1, "1766473600": 1, "1766560000": 1, "1766646400": 1, "1766732800": 1, "1766819200": 1, "1766905600": 1, "1766992000": 1, "1767078400": 1}
    };

    let calendarHistory = fallbackData.submissionCalendar;
    let selectedYear = 2026;

    function calculateCurrentStreak(submissionCalendar) {
        if (!submissionCalendar) return fallbackData.activeStreak;
        
        let calendar;
        try {
            calendar = typeof submissionCalendar === 'string' ? JSON.parse(submissionCalendar) : submissionCalendar;
        } catch (e) {
            return fallbackData.activeStreak;
        }
        
        const submittedDays = new Set();
        for (const timestamp in calendar) {
            const date = new Date(parseInt(timestamp) * 1000);
            const dateStr = date.toISOString().split('T')[0];
            submittedDays.add(dateStr);
        }
        
        let currentStreak = 0;
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (!submittedDays.has(todayStr) && !submittedDays.has(yesterdayStr)) {
            return 0;
        }
        
        let startDate = submittedDays.has(todayStr) ? today : yesterday;
        let loopDate = new Date(startDate);
        
        while (true) {
            const loopStr = loopDate.toISOString().split('T')[0];
            if (submittedDays.has(loopStr)) {
                currentStreak++;
                loopDate.setDate(loopDate.getDate() - 1);
            } else {
                break;
            }
        }
        
        return currentStreak;
    }

    function renderCalendarGrid(year, submissionCalendar) {
        const gridContainer = document.getElementById('lc-heatmap-grid-container');
        if (!gridContainer) return;
        gridContainer.innerHTML = '';
        
        let calendar = {};
        try {
            calendar = typeof submissionCalendar === 'string' ? JSON.parse(submissionCalendar) : submissionCalendar;
        } catch(e) {
            calendar = submissionCalendar || {};
        }

        const submissionMap = new Map();
        for (const timestamp in calendar) {
            const date = new Date(parseInt(timestamp) * 1000);
            const dateStr = date.toISOString().split('T')[0];
            submissionMap.set(dateStr, calendar[timestamp]);
        }

        // Set bounds: Sunday containing Jan 1 of selected year to Saturday containing Dec 31
        const jan1 = new Date(Date.UTC(year, 0, 1));
        const dayOfWeek = jan1.getUTCDay();
        const startDate = new Date(jan1);
        startDate.setUTCDate(jan1.getUTCDate() - dayOfWeek);

        const dec31 = new Date(Date.UTC(year, 11, 31));
        const endDayOfWeek = dec31.getUTCDay();
        const endDate = new Date(dec31);
        endDate.setUTCDate(dec31.getUTCDate() + (6 - endDayOfWeek));

        const grid = document.createElement('div');
        grid.className = 'lc-heatmap-grid';
        
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const isCurrentYear = currentDate.getUTCFullYear() === year;
            
            const count = isCurrentYear ? (submissionMap.get(dateStr) || 0) : 0;
            
            const cell = document.createElement('div');
            cell.className = 'lc-heatmap-cell';
            cell.dataset.date = dateStr;
            cell.dataset.count = count;
            
            if (!isCurrentYear) {
                cell.classList.add('cell-out-of-year');
            } else if (count === 0) {
                cell.classList.add('level-0');
            } else if (count <= 2) {
                cell.classList.add('level-1');
            } else if (count <= 4) {
                cell.classList.add('level-2');
            } else if (count <= 6) {
                cell.classList.add('level-3');
            } else {
                cell.classList.add('level-4');
            }
            
            // Add custom tooltip
            const formattedDate = currentDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                timeZone: 'UTC' 
            });
            cell.setAttribute('title', `${count === 0 ? 'No' : count} submissions on ${formattedDate}`);
            
            grid.appendChild(cell);
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }
        
        gridContainer.appendChild(grid);
    }

    function updateStats(data) {
        const solvedCountEl = document.getElementById('lc-solved-count');
        const easySolvedEl = document.getElementById('lc-easy-solved');
        const mediumSolvedEl = document.getElementById('lc-medium-solved');
        const hardSolvedEl = document.getElementById('lc-hard-solved');
        const easyPercentEl = document.getElementById('lc-easy-percent');
        const mediumPercentEl = document.getElementById('lc-medium-percent');
        const hardPercentEl = document.getElementById('lc-hard-percent');
        const rankingEl = document.getElementById('lc-ranking');
        const maxStreakEl = document.getElementById('lc-max-streak');
        const activeStreakEl = document.getElementById('lc-active-streak');
        
        const easyBar = document.getElementById('lc-easy-bar');
        const mediumBar = document.getElementById('lc-medium-bar');
        const hardBar = document.getElementById('lc-hard-bar');
        const circleProgress = document.querySelector('.circle-progress');

        const easyPct = (data.easySolved / data.totalEasy) * 100;
        const mediumPct = (data.mediumSolved / data.totalMedium) * 100;
        const hardPct = (data.hardSolved / data.totalHard) * 100;
        const totalPct = (data.totalSolved / data.totalQuestions) * 100;

        if (solvedCountEl) solvedCountEl.textContent = data.totalSolved;
        if (easySolvedEl) easySolvedEl.textContent = data.easySolved;
        if (mediumSolvedEl) mediumSolvedEl.textContent = data.mediumSolved;
        if (hardSolvedEl) hardSolvedEl.textContent = data.hardSolved;
        
        if (easyPercentEl) easyPercentEl.textContent = `/${data.totalEasy}`;
        if (mediumPercentEl) mediumPercentEl.textContent = `/${data.totalMedium}`;
        if (hardPercentEl) hardPercentEl.textContent = `/${data.totalHard}`;
        
        if (rankingEl) rankingEl.textContent = `#${Number(data.ranking).toLocaleString()}`;
        if (maxStreakEl) maxStreakEl.textContent = `${data.maxStreak} Days`;
        if (activeStreakEl) activeStreakEl.textContent = `${data.activeStreak} Days`;

        if (circleProgress) {
            const circumference = 251.2;
            const offset = circumference - (totalPct / 100) * circumference;
            circleProgress.style.strokeDashoffset = offset;
        }

        setTimeout(() => {
            if (easyBar) easyBar.style.width = `${Math.min(easyPct * 5, 100)}%`;
            if (mediumBar) mediumBar.style.width = `${Math.min(mediumPct * 5, 100)}%`;
            if (hardBar) hardBar.style.width = `${Math.min(hardPct * 15, 100)}%`;
        }, 150);
    }

    // Set up click handlers for Heatmap tabs
    const tabContainer = document.getElementById('lc-heatmap-tabs');
    if (tabContainer) {
        tabContainer.addEventListener('click', function(e) {
            const button = e.target.closest('.heatmap-tab-btn');
            if (!button) return;
            
            // Remove active class from all buttons
            tabContainer.querySelectorAll('.heatmap-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Change selected year and re-render grid
            selectedYear = parseInt(button.dataset.year);
            renderCalendarGrid(selectedYear, calendarHistory);
        });
    }

    // Initial render
    updateStats(fallbackData);
    renderCalendarGrid(selectedYear, calendarHistory);

    // Fetch profile stats
    fetch(profileApi)
        .then(res => {
            if (!res.ok) throw new Error('Profile API response error');
            return res.json();
        })
        .then(profileData => {
            if (profileData && typeof profileData.totalSolved !== 'undefined') {
                fallbackData.totalSolved = profileData.totalSolved;
                fallbackData.totalQuestions = profileData.totalQuestions;
                fallbackData.easySolved = profileData.easySolved;
                fallbackData.totalEasy = profileData.totalEasy;
                fallbackData.mediumSolved = profileData.mediumSolved;
                fallbackData.totalMedium = profileData.totalMedium;
                fallbackData.hardSolved = profileData.hardSolved;
                fallbackData.totalHard = profileData.totalHard;
                fallbackData.ranking = profileData.ranking;
                
                updateStats(fallbackData);
            }
        })
        .catch(err => console.warn('LeetCode profile API failed, using cached values:', err));

    // Fetch calendar stats (streak and heatmap data)
    fetch(calendarApi)
        .then(res => {
            if (!res.ok) throw new Error('Calendar API response error');
            return res.json();
        })
        .then(calendarData => {
            if (calendarData && typeof calendarData.submissionCalendar !== 'undefined') {
                fallbackData.maxStreak = calendarData.streak || fallbackData.maxStreak;
                fallbackData.activeStreak = calculateCurrentStreak(calendarData.submissionCalendar);
                
                // Update stats
                updateStats(fallbackData);
                
                // Cache calendar history and re-render current year
                calendarHistory = calendarData.submissionCalendar;
                renderCalendarGrid(selectedYear, calendarHistory);
            }
        })
        .catch(err => console.warn('LeetCode calendar API failed, using cached values:', err));
});
