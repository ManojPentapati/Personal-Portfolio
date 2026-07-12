// LeetCode Dynamic Stats Fetcher & Render
document.addEventListener('DOMContentLoaded', function() {
    const profileApi = 'https://alfa-leetcode-api.onrender.com/userProfile/221FA23057';
    const calendarApi = 'https://alfa-leetcode-api.onrender.com/221FA23057/calendar';
    
    // Fallback static data in case the public API fails or is rate-limited
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
        streak: 107
    };

    function updateStats(data) {
        // Elements
        const solvedCountEl = document.getElementById('lc-solved-count');
        const easySolvedEl = document.getElementById('lc-easy-solved');
        const mediumSolvedEl = document.getElementById('lc-medium-solved');
        const hardSolvedEl = document.getElementById('lc-hard-solved');
        const easyPercentEl = document.getElementById('lc-easy-percent');
        const mediumPercentEl = document.getElementById('lc-medium-percent');
        const hardPercentEl = document.getElementById('lc-hard-percent');
        const rankingEl = document.getElementById('lc-ranking');
        const reputationEl = document.getElementById('lc-reputation');
        const streakEl = document.getElementById('lc-streak');
        
        // Progress Bars
        const easyBar = document.getElementById('lc-easy-bar');
        const mediumBar = document.getElementById('lc-medium-bar');
        const hardBar = document.getElementById('lc-hard-bar');
        const circleProgress = document.querySelector('.circle-progress');

        // Calculate percentages
        const easyPct = (data.easySolved / data.totalEasy) * 100;
        const mediumPct = (data.mediumSolved / data.totalMedium) * 100;
        const hardPct = (data.hardSolved / data.totalHard) * 100;
        const totalPct = (data.totalSolved / data.totalQuestions) * 100;

        // Render textual values
        if (solvedCountEl) solvedCountEl.textContent = data.totalSolved;
        if (easySolvedEl) easySolvedEl.textContent = data.easySolved;
        if (mediumSolvedEl) mediumSolvedEl.textContent = data.mediumSolved;
        if (hardSolvedEl) hardSolvedEl.textContent = data.hardSolved;
        
        if (easyPercentEl) easyPercentEl.textContent = `/${data.totalEasy}`;
        if (mediumPercentEl) mediumPercentEl.textContent = `/${data.totalMedium}`;
        if (hardPercentEl) hardPercentEl.textContent = `/${data.totalHard}`;
        
        if (rankingEl) rankingEl.textContent = `#${Number(data.ranking).toLocaleString()}`;
        if (reputationEl) reputationEl.textContent = Number(data.reputation).toLocaleString();
        if (streakEl) streakEl.textContent = `${data.streak} Days`;

        // Animate circular meter
        if (circleProgress) {
            const circumference = 251.2; // 2 * PI * r (r=40)
            const offset = circumference - (totalPct / 100) * circumference;
            circleProgress.style.strokeDashoffset = offset;
        }

        // Animate progress bars
        setTimeout(() => {
            if (easyBar) easyBar.style.width = `${Math.min(easyPct * 5, 100)}%`;
            if (mediumBar) mediumBar.style.width = `${Math.min(mediumPct * 5, 100)}%`;
            if (hardBar) hardBar.style.width = `${Math.min(hardPct * 15, 100)}%`;
        }, 150);
    }

    // Initialize with fallback first so that the user immediately sees data
    // and doesn't get stuck on empty dashboards if APIs take time or fail
    updateStats(fallbackData);

    // Fetch profile stats
    fetch(profileApi)
        .then(res => {
            if (!res.ok) throw new Error('Profile API response error');
            return res.json();
        })
        .then(profileData => {
            if (profileData && typeof profileData.totalSolved !== 'undefined') {
                // Merge loaded profile stats with current state (which has fallback streak)
                fallbackData.totalSolved = profileData.totalSolved;
                fallbackData.totalQuestions = profileData.totalQuestions;
                fallbackData.easySolved = profileData.easySolved;
                fallbackData.totalEasy = profileData.totalEasy;
                fallbackData.mediumSolved = profileData.mediumSolved;
                fallbackData.totalMedium = profileData.totalMedium;
                fallbackData.hardSolved = profileData.hardSolved;
                fallbackData.totalHard = profileData.totalHard;
                fallbackData.ranking = profileData.ranking;
                fallbackData.reputation = profileData.reputation;
                
                updateStats(fallbackData);
            }
        })
        .catch(err => console.warn('LeetCode profile API failed, using cached values:', err));

    // Fetch calendar stats (streak)
    fetch(calendarApi)
        .then(res => {
            if (!res.ok) throw new Error('Calendar API response error');
            return res.json();
        })
        .then(calendarData => {
            if (calendarData && typeof calendarData.streak !== 'undefined') {
                fallbackData.streak = calendarData.streak;
                updateStats(fallbackData);
            }
        })
        .catch(err => console.warn('LeetCode calendar API failed, using cached values:', err));
});
