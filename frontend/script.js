// Utility function for showing custom messages

const allDonors = []
var donorRes;
const showMessage = (message) => {
  const messageBox = document.getElementById("message-box");
  const messageContent = document.getElementById("message-content");
  messageContent.textContent = message;
  messageBox.classList.remove("hidden");
};

// Event listener for the message box OK button
document.getElementById("message-ok-button").addEventListener("click", () => {
  document.getElementById("message-box").classList.add("hidden");
});

// Function to handle adding a new donor

const addDonor = async (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("donor-name").value;
  const contact = document.getElementById("donor-contact").value;
  const bloodGroup = document.getElementById("donor-blood-group").value;
  const location = document.getElementById("donor-location").value;

  if (!name || !contact || !bloodGroup || !location) {
    showMessage("Please fill in all donor details.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contact,
        bloodGroup,
        location,
      }),
    });
    if (res.ok) {
      console.log(await res.json());
    }
    document.getElementById("add-donor-form").reset(); // Clear the form
  } catch (error) {
    console.error("Error adding donor:", error);
    showMessage(`Error adding donor: ${error.message}`);
  }
};

// Function to handle finding blood (filtering donors)
const findBlood = async (event) => {
    var str = "";
  event.preventDefault(); // Prevent default form submission

  const searchBloodGroup = document.getElementById("search-blood-group").value;
  const searchLocation = document
    .getElementById("search-location")
    .value
  try {
    const res = await fetch("http://localhost:3000/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "bloodType":searchBloodGroup,
        "location":searchLocation
      }),
    });
    if (res.ok) {
        const data = (await res.json()).data
        data.forEach(element => {
            str = donorRes.innerHTML
            str+= `<span>${element.name}</span><span>${element.number}</span><span>${element.bloodtype}</span><br>`
            donorRes.innerHTML = str
        })
    }
  } catch (e) {
    console.log(e);
  }
  
};

// Event listeners for forms after the DOM is fully loaded
window.onload = function () {
  document
    .getElementById("add-donor-form")
    .addEventListener("submit", addDonor);
  document
    .getElementById("find-blood-form")
    .addEventListener("submit", findBlood);
    donorRes = document.getElementById("donor-results")
};
