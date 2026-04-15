// js/history.js
const list = document.getElementById("historyList");
const moods = JSON.parse(localStorage.getItem("moods")) || [];

if (moods.length === 0) {
  list.innerHTML = "<p>Belum ada catatan suasana.</p>";
} else {
  moods.reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    li.innerHTML = `
      <strong>${entry.mood.toUpperCase()}</strong>
      <br/>
      <small>${formattedDate}</small>
      <p>${entry.note || "(Tidak ada catatan)"}</p>
    `;

    list.appendChild(li);
  });
}
