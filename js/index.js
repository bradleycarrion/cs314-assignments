// global function to apply the same function as an event
// listener to all buttons in an array of buttons
let applyClickListenersToElements = (buttons, func) =>
    buttons.forEach((button) => button.addEventListener('click', func));

/* Problem 0 */
// scrolls into view the id number grabbed from the button
let moveToPositionOnClick = (event) =>
  document.getElementById(event.srcElement.innerHTML).scrollIntoView();

// get all the buttons in section w/ id='selection'
let selectorButtons = document.getElementById('selection')
                              .querySelectorAll('button');

applyClickListenersToElements(selectorButtons, moveToPositionOnClick);

/* Problem 1 */
// changes the background color of the section to the color on the button
let changeBackgroundColorSectionOne = (event) => document.getElementById('1')
                          .style.backgroundColor = event.srcElement.innerHTML;


let backgroundColorButtons = document.getElementById('1')
                                     .querySelectorAll('button');

applyClickListenersToElements(backgroundColorButtons,
                             changeBackgroundColorSectionOne);

/* Problem 2 */
const labelList = [
  ['Click for pink!'   , 'orange'],
  ['Click for orange!' , 'pink']
]

let toggleColorBasedOnLabel = (text) =>
  text === labelList[0][0] ? labelList[1] : labelList[0];

// toggles the backgroundColor and button text of the section
let toggleBackgroundAndButton = (event) => {
  let button = event.srcElement;

  document.getElementById('2').style.backgroundColor =
          toggleColorBasedOnLabel(button.innerHTML)[1];
  button.innerHTML = toggleColorBasedOnLabel(button.innerHTML)[0];
}

applyClickListenersToElements(document.getElementById('2')
            .querySelectorAll('button'), toggleBackgroundAndButton);

/* Problem 3 */
let addElementToList = (event) => {
  let input       = document.getElementById('3').querySelector('input');
  let listElement = document.getElementById('3').querySelector('ul');
  let li          = document.createElement('li');
  li.innerHTML    = input.value;

  // append new list element
  listElement.appendChild(li);

  // reset the content of the input box
  input.value  = '';
}

applyClickListenersToElements(document.getElementById('3')
            .querySelectorAll('button'), addElementToList);

/* Problem 4 */
// element clicked essentially removes itself
let removeElementClicked = (event) =>
  event.srcElement.parentNode.removeChild(event.srcElement);

applyClickListenersToElements(document.getElementById('4')
            .querySelectorAll('li'), removeElementClicked);

/* Problem 5 */
let selectElementClicked = (event) =>
  document.getElementById('5').querySelectorAll('li').forEach((el) =>
      el.style.backgroundColor = (el === event.srcElement) ? "pink" : "");

applyClickListenersToElements(document.getElementById('5')
            .querySelectorAll('li'), selectElementClicked);
