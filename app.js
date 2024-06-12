const clientId = '75lg5it0seotaue9qzfcxbruytfzqy';
const clientSecret = '4z6ebht5q6rqfxjcl2ohsgc5fawhap';

async function getAccessToken() {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    });
    const data = await response.json();
    return data.access_token;
}

async function fetchGames() {
    const token = await getAccessToken();

    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: 'fields name,summary; limit 10;'
    });

    const games = await response.json();
    return games;
}

async function displayGames() {
    const games = await fetchGames();
    const gamesContainer = document.getElementById('games');
    gamesContainer.innerHTML = games.map(game => `<p>${game.name}: ${game.summary}</p>`).join('');
}

displayGames();
