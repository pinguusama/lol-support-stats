const data = {
  gold: [
    {
      name: "Thresh",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Thresh.png",
      winrate: 51.4,
      pickrate: 8.2,
      games: 18234,
      item: {
        name: "Medallón de los Solari",
        icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3190.png",
        winrate: 54.1
      }
    },
    {
      name: "Leona",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Leona.png",
      winrate: 52.8,
      pickrate: 9.1,
      games: 16421,
      item: {
        name: "Promesa de caballero",
        icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3109.png",
        winrate: 55.3
      }
    },
    {
      name: "Lulu",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Lulu.png",
      winrate: 50.6,
      pickrate: 6.3,
      games: 14120,
      item: {
        name: "Putrificador tecnoquímico",
        icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3011.png",
        winrate: 53.2
      }
    },
    {
      name: "Soraka",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Soraka.png",
      winrate: 47.6,
      pickrate: 4.1,
      games: 9321,
      item: {
        name: "Redención",
        icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3107.png",
        winrate: 51.8
      }
    }
  ]
};

function getTier(winrate, pickrate) {
  if (winrate >= 52 && pickrate >= 5) return ["S+", "Splus"];
  if (winrate >= 51 && pickrate >= 5) return ["S", "S"];
  if (winrate >= 50) return ["A", "A"];
  if (winrate >= 48) return ["B", "B"];
  return ["C", "C"];
}

function render(elo) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data[elo].forEach(champ => {
    const [tierText, tierClass] = getTier(champ.winrate, champ.pickrate);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="tier ${tierClass}">${tierText}</td>
      <td>
        <div class="champion">
          <img src="${champ.icon}">
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
          <img src="${champ.item.icon}">
          ${champ.item.name}
          (${champ.item.winrate.toFixed(1)}%)
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("elo").addEventListener("change", e => {
  render(e.target.value);
});

// render inicial
render("gold");
