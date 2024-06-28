const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Dinesh...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Dinesh...");
    } else {
        speak("Good Evening Dinesh...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US'; // Set the language for recognition
recognition.interimResults = false; // Disable interim results

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("how are you")) {
        speak("I'm just a computer program, but thank you for asking!");
    } else if (message.includes("what's up")) {
        speak("Not much, just here to assist you!");
    } else if (message.includes("thank you")) {
        speak("You're welcome, Sir!");
    } else if (message.includes("tell me a joke")) { 
        speak("Sure, here's one: Why don't scientists trust atoms? Because they make up everything!");
    } else if (message.includes("tell me a fact")) {
        speak("Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!");
    } else if (message.includes("who created you")) {
        speak("I was created by my Developer named Dinesh");
    } else if (message.includes("your name")) {
        speak("I'm just a program, so you can call me whatever you like!");
    } else if (message.includes("bye")) {
        speak("Goodbye, Sir! Have a great day!");
    } else if (message.includes("shutdown")) {
        speak("Shutting down JARVIS. Goodbye, Sir!");
        window.close(); // Close the window
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        const searchQuery = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + searchQuery;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
