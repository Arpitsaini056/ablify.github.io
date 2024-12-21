// Add Song Function
async function addSong() {
    const songName = document.getElementById("songName").value.trim();
    const artistName = document.getElementById("artistName").value.trim();
    const songFile = document.getElementById("songFile").files[0];
    const imageFile = document.getElementById("imageFile").files[0];

    if (!songName || !artistName || !songFile || !imageFile) {
        alert("All fields are required!");
        return;
    }

    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("artistName", artistName);
    formData.append("songFile", songFile);
    formData.append("imageFile", imageFile);

    try {
        const response = await fetch("/addSong", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            fetchSongs(); // Reload song list
        } else {
            alert("Failed to add song!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the song.");
    }
}

// Fetch Songs Function
async function fetchSongs() {
    try {
        const response = await fetch("/getSongs");
        if (response.ok) {
            const songs = await response.json();
            displaySongs(songs);
        } else {
            console.error("Failed to fetch songs.");
        }
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

// Display Songs Function
function displaySongs(songs) {
    const songList = document.getElementById("songList");
    songList.innerHTML = "";
    songs.forEach((song) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${song.name} - ${song.artist}</span>
            <button onclick="deleteSong('${song.id}')">Delete</button>
        `;
        songList.appendChild(li);
    });
}

// Delete Song Function
async function deleteSong(songId) {
    try {
        const response = await fetch(`/deleteSong/${songId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Song deleted successfully!");
            fetchSongs(); // Reload song list
        } else {
            alert("Failed to delete song!");
        }
    } catch (error) {
        console.error("Error deleting song:", error);
        alert("An error occurred while deleting the song.");
    }
}

// Load songs on page load
fetchSongs();
async function uploadBulkSongs() {
    const bulkFile = document.getElementById("bulkFile").files[0];

    if (!bulkFile) {
        alert("Please select a file to upload!");
        return;
    }

    const formData = new FormData();
    formData.append("bulkFile", bulkFile);

    try {
        const response = await fetch("/uploadBulkSongs", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            fetchSongs(); // Refresh the song list
        } else {
            alert("Failed to upload songs!");
        }
    } catch (error) {
        console.error("Error uploading bulk songs:", error);
        alert("An error occurred while uploading songs.");
    }
}
