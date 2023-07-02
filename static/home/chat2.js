var audio = {};
audio["click"] = new Audio();
audio["click"].src = "static/click.mp3"


function off() {
  audio["click"].play();
  $("#auto").attr("onclick", "on()");
  document.getElementById('auto').innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
  <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
</svg>
`
}
function on() {
  audio["click"].play();
  $("#auto").attr("onclick", "off()");
  document.getElementById('auto').innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
  <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
</svg>
`
}


document.getElementById('mic').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
<path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
</svg>`


const form = document.getElementById('speechForm');
const transcriptInput = document.getElementById('chat-input');

function startRecognition() {
  var audio = {};
  audio["walk"] = new Audio();
  audio["walk"].src = "static/mic.wav"
  audio["walk"].play();

  $("#pop1").addClass('is-visible');
  // setTimeout(
  //   function() 
  //   {
  //     $("#pop1").removeClass('is-visible');
  //     //do something special
  //   }, 5000);
  try {
    // Check if the browser supports the Web Speech API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      // Configure the recognition settings
      recognition.lang = 'en-IN'; // Set the language
      recognition.interimResults = true; // Enable interim results

      let finalTranscript = '';

      // Event handler for receiving speech recognition results
      recognition.onresult = function (event) {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        console.log('Interim transcript:', interimTranscript);
        console.log('Final transcript:', finalTranscript);
        document.getElementById('now').innerHTML = interimTranscript;
      };

      // Event handler for when speech recognition ends
      recognition.onend = function () {
        console.log('Speech recognition has ended.');
        console.log('Full transcript:', finalTranscript);
        transcriptInput.value = finalTranscript;
        $("#pop1").removeClass('is-visible');
        handleOutgoingChat();
        // Perform any additional actions or logic with the full transcript here
      };

      // Start speech recognition
      recognition.start();
    } else {
      console.log('Speech recognition is not supported in this browser.');
    }

  } catch (error) {
    console.log(error)
    $("#pop1").removeClass('is-visible');

  }




  //   try {

  //     const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  //     recognition.lang = 'en-US';
  //     recognition.onresult = function (event) {
  //       const transcript = event.results[0][0].transcript;
  //       transcriptInput.value = transcript;
  //       $("#pop1").removeClass('is-visible');


  //       handleOutgoingChat();

  //     };

  //     recognition.start();
  //   } catch (error) {
  //     $("#pop1").removeClass('is-visible');

  //   }

  // }
}

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    $("#pop1").removeClass('is-visible');
  });


