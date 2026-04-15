// Main Application Logic

// ========== Page Navigation ==========
function navigateTo(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  const selectedPage = document.getElementById(pageName);
  if (selectedPage) {
    selectedPage.classList.add('active');
  }
  
  // Update active nav item
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const activeNav = document.querySelector(`[data-page="${pageName}"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }
  
  // Close mobile menu
  closeMobileMenu();
}

// ========== Mobile Menu ==========
function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

// ========== Theme Toggle ==========
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  
  // Save preference
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  
  // Update button icon
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const themeText = themeToggle.querySelector('.theme-text');
  
  if (isDarkMode) {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light Mode';
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark Mode';
  }
}

// ========== Toast Notification ==========
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ========== Mood Form Handler ==========
function handleMoodSubmit(e) {
  e.preventDefault();
  
  const selectedMood = document.getElementById('selected-mood').value;
  const selectedEmoji = document.getElementById('selected-emoji').value;
  const intensity = document.getElementById('mood-intensity').value;
  const notes = document.getElementById('mood-notes').value;
  
  // Get selected tags
  const selectedTags = Array.from(document.querySelectorAll('.tag-btn.selected'))
    .map(btn => btn.dataset.tag);
  
  if (!selectedMood) {
    showToast('Pilih suasana hati terlebih dahulu!');
    return;
  }
  
  // Create entry
  const entry = {
    id: Date.now(),
    type: 'mood',
    mood: selectedMood,
    emoji: selectedEmoji,
    intensity: parseInt(intensity),
    tags: selectedTags,
    notes: notes,
    date: new Date().toISOString()
  };
  
  // Save to localStorage
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(entry);
  localStorage.setItem('moods', JSON.stringify(moods));
  
  showToast('Suasana hatimu telah disimpan! 😊');
  
  // Reset form
  document.getElementById('mood-form').reset();
  document.getElementById('selected-mood').value = '';
  document.getElementById('selected-emoji').value = '';
  document.getElementById('mood-intensity').value = '5';
  document.getElementById('intensity-value').textContent = '5';
  document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
  document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('selected'));
}

// ========== Reflection Form Handler ==========
function handleReflectionSubmit(e) {
  e.preventDefault();
  
  const bestThing = document.getElementById('best-thing').value;
  const challenge = document.getElementById('biggest-challenge').value;
  const learned = document.getElementById('learned-today').value;
  const hopes = document.getElementById('hopes-tomorrow').value;
  
  if (!bestThing && !challenge && !learned && !hopes) {
    showToast('Isi minimal satu pertanyaan!');
    return;
  }
  
  // Create entry
  const entry = {
    id: Date.now(),
    type: 'reflection',
    bestThing,
    challenge,
    learned,
    hopes,
    date: new Date().toISOString()
  };
  
  // Save to localStorage
  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];
  reflections.push(entry);
  localStorage.setItem('reflections', JSON.stringify(reflections));
  
  showToast('Refleksimu telah disimpan! 📝');
  
  // Reset form
  document.getElementById('reflection-form').reset();
}

// ========== Mood Button Selection ==========
function setupMoodButtons() {
  const moodBtns = document.querySelectorAll('.mood-btn');
  moodBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from others
      moodBtns.forEach(b => b.classList.remove('selected'));
      
      // Add to this one
      this.classList.add('selected');
      
      // Store values
      document.getElementById('selected-mood').value = this.dataset.mood;
      document.getElementById('selected-emoji').value = this.dataset.emoji;
    });
  });
}

// ========== Mood Tags Selection ==========
function setupTagButtons() {
  const tagBtns = document.querySelectorAll('.tag-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('selected');
    });
  });
}

// ========== Mood Intensity Slider ==========
function setupIntensitySlider() {
  const slider = document.getElementById('mood-intensity');
  const valueDisplay = document.getElementById('intensity-value');
  
  slider.addEventListener('input', function() {
    valueDisplay.textContent = this.value;
  });
}

// ========== Load Saved Theme ==========
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light Mode';
  }
}

// ========== Update Dashboard Stats ==========
function updateDashboardStats() {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  
  // Total check-ins
  document.getElementById('total-checkins').textContent = moods.length;
  
  // Average intensity
  if (moods.length > 0) {
    const avgIntensity = (moods.reduce((sum, m) => sum + (m.intensity || 0), 0) / moods.length).toFixed(1);
    document.getElementById('avg-mood').textContent = avgIntensity;
  } else {
    document.getElementById('avg-mood').textContent = '-';
  }
  
  // Best mood (most frequent)
  if (moods.length > 0) {
    const moodCount = {};
    moods.forEach(m => {
      moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
    });
    const bestMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
    const bestMoodEmoji = moods.find(m => m.mood === bestMood)?.emoji || '😊';
    document.getElementById('best-day').textContent = bestMoodEmoji;
  } else {
    document.getElementById('best-day').textContent = '-';
  }
  
  // Recent entries
  const recentContainer = document.getElementById('recent-entries');
  recentContainer.innerHTML = '';
  
  if (moods.length === 0) {
    recentContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Belum ada data</p>';
  } else {
    moods.slice(-5).reverse().forEach(entry => {
      const date = new Date(entry.date);
      const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const div = document.createElement('div');
      div.className = 'recent-entry';
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid var(--border-color);">
          <div>
            <div style="font-size: 18px; margin-bottom: 4px;">${entry.emoji}</div>
            <small style="color: var(--text-secondary);">${formattedDate}</small>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 600;">${entry.intensity}/10</div>
            ${entry.notes ? `<small style="color: var(--text-secondary);">${entry.notes.substring(0, 20)}...</small>` : ''}
          </div>
        </div>
      `;
      recentContainer.appendChild(div);
    });
  }
}

// ========== Load History ==========
function loadMoodHistory() {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  const historyContainer = document.getElementById('mood-history-list');
  historyContainer.innerHTML = '';
  
  if (moods.length === 0) {
    historyContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Belum ada data</p>';
    return;
  }
  
  moods.slice().reverse().forEach(entry => {
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div style="padding: 12px; border-bottom: 1px solid var(--border-color);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 24px;">${entry.emoji}</span>
          <div>
            <strong>${entry.mood}</strong>
            <small style="display: block; color: var(--text-secondary);">${formattedDate}</small>
          </div>
          <span style="margin-left: auto; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${entry.intensity}/10</span>
        </div>
        ${entry.tags && entry.tags.length > 0 ? `
          <div style="margin-bottom: 8px;">
            ${entry.tags.map(tag => `<span style="display: inline-block; background: var(--secondary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 4px; margin-bottom: 4px;">${tag}</span>`).join('')}
          </div>
        ` : ''}
        ${entry.notes ? `<p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">${entry.notes}</p>` : ''}
      </div>
    `;
    historyContainer.appendChild(div);
  });
}

function loadReflectionHistory() {
  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];
  const historyContainer = document.getElementById('reflection-history-list');
  historyContainer.innerHTML = '';
  
  if (reflections.length === 0) {
    historyContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Belum ada data</p>';
    return;
  }
  
  reflections.slice().reverse().forEach(entry => {
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div style="padding: 12px; border-bottom: 1px solid var(--border-color);">
        <div style="margin-bottom: 12px;">
          <strong>${formattedDate}</strong>
        </div>
        ${entry.bestThing ? `<div style="margin-bottom: 8px;"><strong>✨ Yang terbaik:</strong> ${entry.bestThing}</div>` : ''}
        ${entry.challenge ? `<div style="margin-bottom: 8px;"><strong>🎯 Tantangan:</strong> ${entry.challenge}</div>` : ''}
        ${entry.learned ? `<div style="margin-bottom: 8px;"><strong>💡 Pelajaran:</strong> ${entry.learned}</div>` : ''}
        ${entry.hopes ? `<div style="margin-bottom: 8px;"><strong>🌟 Harapan:</strong> ${entry.hopes}</div>` : ''}
      </div>
    `;
    historyContainer.appendChild(div);
  });
}

// ========== Initialize App ==========
document.addEventListener('DOMContentLoaded', function() {
  // Load saved theme
  loadSavedTheme();
  
  // Setup navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const pageName = this.dataset.page;
      navigateTo(pageName);
      
      // Update dashboard if navigating to dashboard
      if (pageName === 'dashboard') {
        updateDashboardStats();
      }
      // Load history if navigating to history
      if (pageName === 'history') {
        loadMoodHistory();
      }
    });
  });
  
  // Mobile menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  sidebarOverlay.addEventListener('click', closeMobileMenu);
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Form submission
  const moodForm = document.getElementById('mood-form');
  if (moodForm) {
    moodForm.addEventListener('submit', handleMoodSubmit);
  }
  
  const reflectionForm = document.getElementById('reflection-form');
  if (reflectionForm) {
    reflectionForm.addEventListener('submit', handleReflectionSubmit);
  }
  
  // Setup mood buttons
  setupMoodButtons();
  
  // Setup tag buttons
  setupTagButtons();
  
  // Setup intensity slider
  setupIntensitySlider();
  
  // Tab switching in history
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all tabs and buttons
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
      
      // Add active to clicked button
      this.classList.add('active');
      
      // Show selected tab
      const tabId = this.dataset.tab;
      const tab = document.getElementById(tabId);
      if (tab) {
        tab.classList.add('active');
        
        // Load appropriate history
        if (tabId === 'mood-history-tab') {
          loadMoodHistory();
        } else if (tabId === 'reflection-history-tab') {
          loadReflectionHistory();
        }
      }
    });
  });
  
  // Initial dashboard update
  updateDashboardStats();
});

// Responsive mobile menu
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }
});