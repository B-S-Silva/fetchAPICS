let teamsData = [];

    async function loadTeams() {
      try {
        const res = await fetch("https://hltv-api.vercel.app/api/player.json");
        teamsData = await res.json();
      } catch (error) {
        console.error("Erro ao carregar os dados da API:", error);
        alert("Erro ao carregar os dados da API.");
      }
    }

    async function searchPlayer() {
      const input = document.getElementById("nicknameInput").value.trim().toLowerCase();
      const display = document.getElementById("playerDisplay");

      if (!input) {
        alert("Digite um nickname.");
        return;
      }

      if (teamsData.length === 0) {
        await loadTeams();
      }

      let found = null;
      let teamFound = null;

      for (const team of teamsData) {
        for (const player of team.players) {
          if (player.nickname.toLowerCase() === input) {
            found = player;
            teamFound = team;
            break;
          }
        }
        if (found) break;
      }

      if (!found) {
        display.innerHTML = `<p>Jogador com nickname "<strong>${input}</strong>" não encontrado.</p>`;
        display.style.display = 'block';
        return;
      }

      display.style.display = 'block';
      display.innerHTML = `
        <h2>${found.nickname} - ${found.fullname}</h2>
        <img class="player-image" src="${found.image}" alt="${found.nickname}" />
        <p><strong>País:</strong> ${found.country.name} <img class="flag" src="${found.country.flag}" alt="${found.country.name}" /></p>
        <p><strong>Time:</strong> ${teamFound.name} (Ranking #${teamFound.ranking}) <img class="team-logo" src="${teamFound.logo}" alt="${teamFound.name}" /></p>
      `;
    }

    loadTeams();