window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  /**
   * The tab list element.
   * @type {Element}
   */
  const tabList = document.querySelector('[role="tablist"]');

  // Add a click event handler to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", (e) => {
    // Move right
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (e.key === "ArrowRight") {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.key === "ArrowLeft") {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  });

  document.body.addEventListener("mousedown", play(1));
  document.body.addEventListener("mouseup", play(0));
  makeDraggable(document.querySelector("#main-window"));
});

/**
 * Event handler for changing tabs.
 * @param {Event} e - The event object.
 */
function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;

  // Remove all current selected tabs
  parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  target.setAttribute("aria-selected", true);

  // Hide all tab panels
  grandparent
    .querySelectorAll('[role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  // Show the selected panel
  grandparent.parentNode
    .querySelector(`#${target.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}

/**
 * Makes an element draggable.
 * @param {HTMLElement} element - The element to make draggable.
 */
function makeDraggable(element) {
  let currentPosX = 0;
  let currentPosY = 0;
  let previousPosX = 0;
  let previousPosY = 0;

  if (!element) {
    return;
  }

  if (window.matchMedia("screen and (max-width: 600px)").matches) {
    return;
  }

  if (element.querySelector(".title-bar")) {
    element.querySelector(".title-bar").onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }

  /**
   * Event handler for when the mouse button is pressed down.
   * @param {MouseEvent} e - The mouse event object.
   */
  function dragMouseDown(e) {
    e.preventDefault();
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  /**
   * Event handler for when the mouse is moved.
   * @param {MouseEvent} e - The mouse event object.
   */
  function elementDrag(e) {
    e.preventDefault();
    currentPosX = previousPosX - e.clientX;
    currentPosY = previousPosY - e.clientY;
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    element.style.top = element.offsetTop - currentPosY + "px";
    element.style.left = element.offsetLeft - currentPosX + "px";
  }

  /**
   * Event handler for when the mouse button is released.
   */
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/**
 * Plays a sound effect.
 * @param {number} event - The event type.
 * @returns {Function} - The function to play the sound effect.
 */
function play(event) {
  if (event) {
    return () => {
      const audio = document.getElementById("clickPress");
      audio.play();
    };
  } else {
    return () => {
      const audio = document.getElementById("clickRelease");
      audio.play();
    };
  }
}
