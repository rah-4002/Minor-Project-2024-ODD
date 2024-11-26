const gestureElement = document.getElementById("gesture");
const gestureImageElement = document.getElementById("gestureImage");

// Map gestures to their corresponding image URLs
const gestureImageMap = {
    "Clockwise": "https://www.shutterstock.com/image-vector/passage-time-icon-600nw-551661892.jpg", // Replace with actual image URLs
    "Counter Clockwise": "https://www.shutterstock.com/image-vector/clock-icon-vector-history-time-600nw-1685347213.jpg",
    "Move": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzAxE3huwPKfeXsNfROHIgRD5L6xb_hb0GWg&s",
    "Stop": "https://www.lorenzoandlorenzo.com/wp-content/uploads/2018/02/22e3132c89a1aee6cdbc650b429abb79.jpeg",
    "No gesture detected yet": "", // No image for no gesture
};

let lastAnnouncedGesture = "";

// Function to speak a gesture using TTS
function speakGesture(gesture) {
    if (gesture === lastAnnouncedGesture) return; // Avoid repeating the same gesture
    lastAnnouncedGesture = gesture;

    const utterance = new SpeechSynthesisUtterance(gesture);
    utterance.lang = "en-US"; // Set the language
    speechSynthesis.speak(utterance);
}

async function fetchGesture() {
    try {
        const response = await fetch("http://localhost:5000/get_gesture");
        if (!response.ok) throw new Error("Failed to fetch gesture");

        const data = await response.json();
        const gesture = data.gesture || "No gesture detected yet";

        // Update gesture text
        gestureElement.textContent = gesture;

        // Update gesture image
        if (gestureImageMap[gesture]) {
            gestureImageElement.src = gestureImageMap[gesture];
            gestureImageElement.style.display = "block";
        } else {
            gestureImageElement.style.display = "none";
        }

        // Speak the gesture
        speakGesture(gesture);
    } catch (error) {
        console.error("Error fetching gesture:", error);
        gestureElement.textContent = "Error detecting gesture";
        gestureImageElement.style.display = "none";
    }
}

// Fetch gesture every second
setInterval(fetchGesture, 1000);
