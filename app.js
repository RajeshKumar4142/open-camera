let stream; // Store the stream globally

// Open the camera
async function openCamera() {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.getElementById('video');
  video.srcObject = stream;
}

// Close the camera
function closeCamera() {
  if (stream) {
    const tracks = stream.getTracks(); // Get all tracks from the stream
    tracks.forEach(track => track.stop()); // Stop each track (video and/or audio)
    const video = document.getElementById('video');
    video.srcObject = null; // Clear the video source
    stream = null; // Clear the stream
  }
}

// Take a photo
async function takePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  const imageData = canvas.toDataURL('image/png');
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageData }),
  });
  
  const { result } = await response.json();
  console.log(result);
}
