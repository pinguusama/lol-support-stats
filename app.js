function render(data) {
  const tbody = document.querySelector("#champion-table tbody");
  tbody.innerHTML = "";

  data.forEach(champ => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="champion">
          <img src="${champ.championIcon}">
          ${champ.championName}
        </div>
      </td>
      <td class="winrate ${champ.winrate >= 50 ? "good" : "bad"}">
        ${champ.winrate.toFixed(1)}%
      </td>
      <td>${champ.games.toLocaleString()}</td>
      <td>
        <div class="item">
          <img src="${champ.bestItem.icon}">
          ${champ.bestItem.name}
          (${champ.bestItem.winrate.toFixed(1)}%)
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// DATOS MOCK PARA GITHUB
render([
  {
    championName: "Thresh",
    championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Thresh.png",
    winrate: 51.4,
    games: 18234,
    bestItem: {
      name: "Medallón de los Solari",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3190.png",
      winrate: 54.1
    }
  },
  {
    championName: "Leona",
    championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Leona.png",
    winrate: 52.8,
    games: 16421,
    bestItem: {
      name: "Promesa de caballero",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3109.png",
      winrate: 55.3
    }
  }
]);
