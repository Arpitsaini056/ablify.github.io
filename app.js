async function addSong() {
    const songName = document.getElementById('songName').value;
    const artistName = document.getElementById('artistName').value;
    const songFile = document.getElementById('songFile').files[0];
    const imageFile = document.getElementById('imageFile').files[0];

    if (!songName || !artistName || !songFile || !imageFile) {
        alert('All fields are required!');
        return;
    }

    const formData = new FormData();
    formData.append('songName', songName);
    formData.append('artistName', artistName);
    formData.append('songFile', songFile);
    formData.append('imageFile', imageFile);

    try {
        const response = await fetch('/addSong', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            fetchSongs(); // Songs list reload karne ke liye
        } else {
            alert('Failed to add song!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the song!');
    }
}
