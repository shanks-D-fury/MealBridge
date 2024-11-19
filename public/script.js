function toggleWidget(widget) {
    // Get the content and image inside the clicked widget
    var content = widget.querySelector('.content');
    var toggleimg = widget.querySelector('.toggleimg');
    
    // Check if content is collapsed or expanded
    if (content.style.height === '' || content.style.height === '0px') {
      content.style.height = content.scrollHeight + 'px';  // Expand
      toggleimg.src = "../public/images/cross.svg";  // Change image to cross when expanded
    } else {
      content.style.height = '0px';  // Collapse
      toggleimg.src = "../public/images/plus.svg";  // Change image to plus when collapsed
    }
  }
  
  