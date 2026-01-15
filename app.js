// ==============================
// DATA DRAGON VERSION (AUTO)
// ==============================
let DDRAGON_VERSION = "16.1.1"; // fallback seguro

fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  .then(res => res.json())
  .then(versions => {
    DDRAGON_VERSION = versions[0];
    render("gold");
  })
  .catch(() => {
    render("gold");
  });

// ==============================
// MOCK DATA (SUPPORTS)
// ==============================
const data = {
  gold: [
    {
      name: "Thresh",
      winrate: 51.4,
      pickrate: 8.2,
      games: 18234,
      championKey: "Thresh",
      item: {
        id: 3190,
        name: "Medallón de los Solari",
        winrate: 54.1
      }
    },
    {
      name: "Leona",
      winrate: 52.8,
      pickrate: 9.1,
      games: 16421,
      championKey: "Leona",
      item: {
        id: 3109,
        name: "Promesa de caballero",
        winrate: 55.3
      }
    },
    {
      name: "Lulu",
      winrate: 50.6,
      pickrate: 6.3,
      games: 14120,
      championKey: "Lulu",
      item: {
        id: 3011,
        name: "Putrificador tecnoquímico",
        winrate: 53.2
      }
    },
    {
      name: "Soraka",
      winrate: 47.6,
      pickrate: 4.1,
      games: 9321,
      championKey: "Soraka",
      item: {
        id: 3107,
        name: "Redención",
        winrate: 51.8
      }
    }
  ]
};

// ==============================
// TIER LOGIC
// ==============================
function getTier(winrate, pickrate) {
  if (winrate >= 52 && pickrate >= 5) return { text: "S+", class: "Splus" };
  if (winrate >= 51 && pickrate >= 5) return { text: "S", class: "S" };
  if (winrate >= 50) return { text: "A", class: "A" };
  if (winrate >= 48) return { text: "B", class: "B" };
  return { text: "C", class: "C" };
}

// ==============================
// RENDER TABLE
// ==============================
function render(elo) {
  const tbody = document.querySelector("#champion-table tbody");
  tbody.innerHTML = "";

  data[elo].forEach(champ => {
    const tier = getTier(champ.winrate, champ.pickrate);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="tier ${tier.class}">${tier.text}</td>
      <td>
        <div class="champion">
          <img src="https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ.championKey}.png">
          ${champ.name}
        </div>
      </td>
      <td class="winrate ${champ.winrate >= 50 ? "good" : "bad"}">
        ${champ.winrate.toFixed(1)}%
      </td>
      <td>${champ.pickrate.toFixed(1)}%</td>
      <td>${champ.games.toLocaleString()}</td>
      <td>
        <div class="item">
          <img src="https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${champ.item.id}.png">
          ${champ.item.name}
          (${champ.item.winrate.toFixed(1)}%)
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==============================
// ELO SELECT
// ==============================
document.getElementById("elo").addEventListener("change", e => {
  render(e.target.value);
});
