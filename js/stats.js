// js/stats.js
const moodData = JSON.parse(localStorage.getItem("moods")) || [];

const moodCounts = moodData.reduce((acc, entry) => {
  acc[entry.mood] = (acc[entry.mood] || 0) + 1;
  return acc;
}, {});

const moods = Object.keys(moodCounts);
const counts = Object.values(moodCounts);

const colors = moods.map((mood) => {
  switch (mood) {
    case "senang": return "#4ade80";
    case "sedih": return "#60a5fa";
    case "marah": return "#f87171";
    case "cemas": return "#fbbf24";
    default: return "#a78bfa";
  }
});

const ctx = document.getElementById("moodChart").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: moods,
    datasets: [{
      label: 'Jumlah Mood',
      data: counts,
      backgroundColor: colors,
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Statistik Suasana Hati Anda',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});
