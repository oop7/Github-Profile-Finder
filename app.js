document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    fetchProfiles(username);
});

async function fetchProfiles(username) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    // Only GitHub platform included
    const platforms = ['github'];

    const profiles = await Promise.all(platforms.map(async (platform) => {
        const profile = await fetchProfile(platform, username);
        return profile ? `<p>${platform.charAt(0).toUpperCase() + platform.slice(1)}: <a href="${profile}" target="_blank">${profile}</a></p>` : `<p>${platform.charAt(0).toUpperCase() + platform.slice(1)}: Not found</p>`;
    }));

    resultsDiv.innerHTML = profiles.join('');
}

async function fetchProfile(platform, username) {
    let url;

    switch (platform) {
        case 'github':
            url = `https://api.github.com/users/${username}`;
            break;
        default:
            return null;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        return data.html_url;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}
