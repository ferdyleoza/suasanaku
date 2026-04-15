// js/moodInput.js
document.getElementById("moodForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const mood = document.getElementById("mood").value;
    const note = document.getElementById("note").value;
    const date = new Date().toISOString();
  
    const entry = { mood, note, date };
  
    const existing = JSON.parse(localStorage.getItem("moods")) || [];
    existing.push(entry);
  
    localStorage.setItem("moods", JSON.stringify(existing));
  
    alert("Suasana hatimu telah disimpan!");
    this.reset();
  });
  