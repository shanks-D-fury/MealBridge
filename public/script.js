function toggleWidget(widget) {
    // Get the content and image inside the clicked widget
    var content = widget.querySelector('.content');
    var toggleimg = widget.querySelector('.toggleimg');
    
    // Check if content is collapsed or expanded
    if (content.style.height === '' || content.style.height === '0px') {
      content.style.height = content.scrollHeight + 'px';  // Expand
      toggleimg.src = "/images/cross.svg";  // Change image to cross when expanded
    } else {
      content.style.height = '0px';  // Collapse
      toggleimg.src = "/images/plus.svg";  // Change image to plus when collapsed
    }
  }
  

  //Tag lines;
  const taglines = [
    "Connecting Communities, One Meal at a Time.",
    "Bridging the Gap to Nourishment and Care.",
    "Providing Meals, Building Hope.",
    "Together, We Can Feed More.",
    "Compassionate Meals, Stronger Communities.",
    "Serving Those in Need, One Meal at a Time.",
    "Uniting Hearts and Meals for a Stronger Future.",
    "Your Generosity Makes Every Meal Possible."
];

let taglineIndex = 0;  // To keep track of the current tagline
let letterIndex = 0;   // To keep track of the current letter being typed

const container = document.getElementById('tagline-container');

function typeTagline() {
    const tagline = taglines[taglineIndex]; 
    let currentText = tagline.substring(0, letterIndex + 1);  

    container.textContent = currentText;  
    if (letterIndex < tagline.length - 1) {
        letterIndex++; 
        setTimeout(typeTagline, 50);  
    } else {
        
        setTimeout(() => {
            letterIndex = 0;
            taglineIndex = (taglineIndex + 1) % taglines.length; 
            container.textContent = '';  
            setTimeout(typeTagline, 500); 
        }, 2000);  
    }
}

// Start the typing effect
typeTagline();