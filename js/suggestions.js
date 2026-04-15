// js/suggestions.js
const container = document.getElementById("suggestionContainer");
const moods = JSON.parse(localStorage.getItem("moods")) || [];

if (moods.length === 0) {
  container.innerHTML = `
    <h2>Belum Ada Data</h2>
    <p>Silakan catat suasana hati Anda terlebih dahulu.</p>
  `;
} else {
  const lastMood = moods[moods.length - 1].mood;
  let title = "";
  let message = "";

  switch (lastMood) {
    case "senang":
      title = "Tetap Semangat!";
      message = "Lanjutkan hari Anda dengan berbagi kebahagiaan kepada orang lain.";
      break;
    case "sedih":
      title = "Tidak Apa-Apa untuk Bersedih";
      message = "Luangkan waktu untuk diri sendiri. Dengarkan musik yang menenangkan atau tuliskan perasaanmu.";
      break;
    case "marah":
      title = "Ambil Napas Dalam-dalam";
      message = "Coba teknik pernapasan atau jalan kaki sejenak untuk menenangkan diri.";
      break;
    case "cemas":
      title = "Kamu Tidak Sendiri";
      message = "Coba meditasi ringan atau bicara dengan orang terdekat yang kamu percaya.";
      break;
    default:
      title = "Perhatikan Dirimu";
      message = "Pantau perasaanmu dan jangan ragu mencari bantuan jika dibutuhkan.";
  }

  container.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
  `;
}
