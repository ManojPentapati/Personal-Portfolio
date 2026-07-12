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
        maxStreak: 107,
        activeStreak: 11
    };

    function calculateCurrentStreak(submissionCalendar) {
        if (!submissionCalendar) return fallbackData.activeStreak;
        
        let calendar;
        try {
            calendar = typeof submissionCalendar === 'string' ? JSON.parse(submissionCalendar) : submissionCalendar;
        } catch (e) {
            return fallbackData.activeStreak;
        }
        
        // Convert all keys to date strings (in UTC to keep consistency)
        const submittedDays = new Set();
        for (const timestamp in calendar) {
            const date = new Date(parseInt(timestamp) * 1000);
            const dateStr = date.toISOString().split('T')[0];
            submittedDays.add(dateStr);
        }
        
        let currentStreak = 0;
        const today = new Date();
        
        // Normalize today and yesterday to UTC date strings
        const todayStr = today.toISOString().split('T')[0];
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        // If no submission today and no submission yesterday, the streak is broken (0)
        if (!submittedDays.has(todayStr) && !submittedDays.has(yesterdayStr)) {
            return 0;
        }
        
        // If today has a submission, start counting from today; otherwise start from yesterday
        let startDate = submittedDays.has(todayStr) ? today : yesterday;
        let loopDate = new Date(startDate);
        
        // Count backwards consecutive days
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
        const maxStreakEl = document.getElementById('lc-max-streak');
        const activeStreakEl = document.getElementById('lc-active-streak');
        
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
        if (maxStreakEl) maxStreakEl.textContent = `${data.maxStreak} Days`;
        if (activeStreakEl) activeStreakEl.textContent = `${data.activeStreak} Days`;

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
    updateStats(fallbackData);

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

    // Fetch calendar stats (streak)
    fetch(calendarApi)
        .then(res => {
            if (!res.ok) throw new Error('Calendar API response error');
            return res.json();
        })
        .then(calendarData => {
            if (calendarData && typeof calendarData.streak !== 'undefined') {
                fallbackData.maxStreak = calendarData.streak; // API streak value represents the Max Streak
                fallbackData.activeStreak = calculateCurrentStreak(calendarData.submissionCalendar); // Calculate active current streak
                updateStats(fallbackData);
            }
        })
        .catch(err => console.warn('LeetCode calendar API failed, using cached values:', err));
});
