document.addEventListener("DOMContentLoaded", () => {
    const ipElement = document.querySelector(".server-ip");
    const motdElement = document.getElementById("motd");
    const playersElement = document.getElementById("players");

    // Click-to-copy IP
    if (ipElement) {
        ipElement.addEventListener("click", () => {
            navigator.clipboard.writeText(ipElement.textContent.replace("IP: ", ""));
            alert("Server IP copied to clipboard!");
        });
    }

    // Fetch server status if elements exist
    if (motdElement && playersElement) {
        fetch("https://api.mcsrvstat.us/2/play.snooks.me")
            .then(response => response.json())
            .then(data => {
                if (data.online) {
                    motdElement.innerHTML = `MOTD: ${data.motd.clean.join(" ")}`;
                    playersElement.innerHTML = `Players Online: ${data.players.online} / ${data.players.max}`;
                } else {
                    motdElement.innerHTML = "Server is currently offline.";
                    playersElement.innerHTML = "";
                }
            })
            .catch(() => {
                motdElement.innerHTML = "Error fetching server status.";
                playersElement.innerHTML = "";
            });
    }
});
