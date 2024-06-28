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

const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US'; // Set the language for recognition
recognition.interimResults = false; // Disable interim results

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    content.textContent = transcript;
    await takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

async function getChatGPTResponse(input) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: input,
                max_tokens: 150,
                temperature: 0.7,
                top_p: 1,
                n: 1,
                stop: '\n'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.choices || !data.choices.length) {
            throw new Error('Invalid response from ChatGPT API');
        }

        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching response from ChatGPT API:', error);
        throw error; // Rethrow the error for the calling function to handle
    }
}

async function takeCommand(message) {
    try {
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
            speak("I was created by a team of developers at OpenAI.");
        } else if (message.includes("your name")) {
            speak("I'm just a program, so you can call me whatever you like!");
        } else if (message.includes("bye")) {
            speak("Goodbye, Sir! Have a great day!");
        } else if (message.includes("shutdown")) {
            speak("Shutting down JARVIS. Goodbye, Sir!");
            window.close(); // Close the window
        } else {
            const response = await getChatGPTResponse(message);
            speak(response);
        }
    } catch (error) {
        speak("Sorry, there was an error processing your request.");
        console.error('Error in takeCommand:', error);
    }
}
