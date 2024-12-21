// Add basic interactivity
document.querySelectorAll(".google-btn, .phone-btn").forEach(button => {
    button.addEventListener("click", () => {
      alert("Feature coming soon!");
    });
  });
// script.js

// Set User ID dynamically from localStorage
document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('username') || 'Guest';
    document.getElementById('user-id').textContent = `Hi, ${userId}!`;
  
    // Load Songs
    loadSongs();
  });
  
  // Sample Songs
  const songs = [
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' },
    { title: 'Song 3', artist: 'Artist 3' }
  ];
  
  // Function to Load Songs
  function loadSongs() {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = ''; // Clear existing content
  
    if (songs.length === 0) {
      songsContainer.innerHTML = '<p class="no-songs">No songs added yet. Add some to enjoy!</p>';
    } else {
      songs.forEach((song) => {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');
        songCard.innerHTML = `
          <strong>${song.title}</strong>
          <span>by ${song.artist}</span>
        `;
        songsContainer.appendChild(songCard);
      });
    }
  }
    