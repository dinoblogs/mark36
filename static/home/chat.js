const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
window.speechSynthesis.cancel();

const typedTextElement = document.getElementById('typed-text');
const cursorElement = document.getElementById('cursor');
const typingSpeed = 80; // Delay between typing each character in milliseconds

let currentIndex = 0;

function stop() {
    document.getElementById('stop').innerHTML = ''
    window.speechSynthesis.cancel();
}



function typeNextCharacter(text) {
    if (currentIndex < text.length) {
        const currentText = text.substring(0, currentIndex + 1);
        typedTextElement.textContent = currentText;
        currentIndex++;
        setTimeout(typeNextCharacter, typingSpeed);
    } else {
        cursorElement.style.display = 'none';
    }
}

// Start typing the paragraph


// FUnctions


// Trigger the sentence typing animation




let userText = null;

const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Narad AI Pro Unlimited [Free]</h1>
                            <h2>2x Faster & Efficient Than ChatGPT</h2>
                            <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    document.getElementById('stop').innerHTML = ''
    window.speechSynthesis.cancel();
    document.getElementById('chat-input').disabled = true
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "typed-text");
    const spanElement = document.createElement("span");
    spanElement.setAttribute("id", "cursor");

    if (userText == 'stop') {
        stop()
    }
    else {
        pElement.innerHTML = `<div class="typing-animation">
    <div class="typing-dot" style="--delay: 0.2s"></div>
    <div class="typing-dot" style="--delay: 0.3s"></div>
    <div class="typing-dot" style="--delay: 0.4s"></div>
    </div>`


        $.post("/api",

            {
                cmd: userText,
            },
            function (data, status) {
                response = data
                // Send POST request to API, get response and set the reponse as paragraph element text
                try {
                    // const response = await(await fetch(API_URL, requestOptions)).json();

                    pElement.innerHTML = response;

                    // typeNextCharacter(response);
                    window.speechSynthesis.cancel();
                    document.getElementById('stop').innerHTML = `    <span id="stop" onclick="stop()" class="material-symbols-rounded"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="orange" class="bi bi-sign-stop" viewBox="0 0 16 16">
                <path d="M3.16 10.08c-.931 0-1.447-.493-1.494-1.132h.653c.065.346.396.583.891.583.524 0 .83-.246.83-.62 0-.303-.203-.467-.637-.572l-.656-.164c-.61-.147-.978-.51-.978-1.078 0-.706.597-1.184 1.444-1.184.853 0 1.386.475 1.436 1.087h-.645c-.064-.32-.352-.542-.797-.542-.472 0-.77.246-.77.6 0 .261.196.437.553.522l.654.161c.673.164 1.06.487 1.06 1.11 0 .736-.574 1.228-1.544 1.228Zm3.427-3.51V10h-.665V6.57H4.753V6h3.006v.568H6.587Z"/>
                <path fill-rule="evenodd" d="M11.045 7.73v.544c0 1.131-.636 1.805-1.661 1.805-1.026 0-1.664-.674-1.664-1.805V7.73c0-1.136.638-1.807 1.664-1.807 1.025 0 1.66.674 1.66 1.807Zm-.674.547v-.553c0-.827-.422-1.234-.987-1.234-.572 0-.99.407-.99 1.234v.553c0 .83.418 1.237.99 1.237.565 0 .987-.408.987-1.237Zm1.15-2.276h1.535c.82 0 1.316.55 1.316 1.292 0 .747-.501 1.289-1.321 1.289h-.865V10h-.665V6.001Zm1.436 2.036c.463 0 .735-.272.735-.744s-.272-.741-.735-.741h-.774v1.485h.774Z"/>
                <path fill-rule="evenodd" d="M4.893 0a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146A.5.5 0 0 0 11.107 0H4.893ZM1 5.1 5.1 1h5.8L15 5.1v5.8L10.9 15H5.1L1 10.9V5.1Z"/>
              </svg></span> `
                    // Check if the browser supports the Web Speech API
                    if ('speechSynthesis' in window) {
                        // Create a new SpeechSynthesisUtterance object
                        var message = new SpeechSynthesisUtterance();

                        // Set the text that you want to convert to speech
                        message.text = 'Msg Send..';

                        // Set the voice to be used (optional)
                        // You can use the speechSynthesis.getVoices() method to get a list of available voices
                        message.voice = speechSynthesis.getVoices()[0];

                        // Set the volume (0.0 to 1.0)
                        message.volume = 1;

                        // Set the rate (0.1 to 10)
                        message.rate = 1;

                        // Set the pitch (0 to 2)
                        message.pitch = 1;

                        // Speak the message
                        speechSynthesis.speak(message);
                        message.onend = function () {
                            document.getElementById('stop').innerHTML = ''
                            // Perform any additional actions or logic here
                        };


                    }

                    // Remove the typing animation, append the paragraph element and save the chats to local storage
                    incomingChatDiv.querySelector(".typing-animation").remove();
                    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
                    incomingChatDiv.querySelector(".chat-details").appendChild(spanElement);
                    localStorage.setItem("all-chats", chatContainer.innerHTML);
                    chatContainer.scrollTo(0, chatContainer.scrollHeight);
                    document.getElementById('chat-input').disabled = false

                } catch (error) { // Add error class to the paragraph element and set error text
                    console.log(error)
                    pElement.classList.add("error");
                    pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
                    // Remove the typing animation, append the paragraph element and save the chats to local storage
                    incomingChatDiv.querySelector(".typing-animation").remove();
                    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
                    localStorage.setItem("all-chats", chatContainer.innerHTML);
                    chatContainer.scrollTo(0, chatContainer.scrollHeight);
                    document.getElementById('chat-input').disabled = false
                }

            })
    }

}

const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    // Display the typing animation and call the getChatResponse function
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="../static/home/kali.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                    
                </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if (!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="data:image/png;base64,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" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 100);
}

deleteButton.addEventListener("click", () => {
    // Remove the chats from local storage and call loadDataFromLocalstorage function
    if (confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});

themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode and save the updated theme to the local storage 
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger 
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);