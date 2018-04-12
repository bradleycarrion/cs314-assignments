// global function to apply the same function as an event
// listener to all buttons in an array of buttons
let applyClickListenersToButtons = (buttons, func) =>
    buttons.forEach((button) => button.addEventListener('click', func));

/* Problem 1 */
// scrolls into view the id number grabbed from the button
let moveToPositionOnClick = (event) =>
  document.getElementById(event.srcElement.innerHTML).scrollIntoView();

// get all the buttons in section w/ id='selection'
let selectorButtons = document.getElementById('selection')
                              .querySelectorAll('button');

applyClickListenersToButtons(selectorButtons, moveToPositionOnClick);

/* Problem 2 */
// changes the background color of the section to the color on the button
let changeBackgroundColorSectionOne = (event) => document.getElementById('1')
                          .style.backgroundColor = event.srcElement.innerHTML;


let backgroundColorButtons = document.getElementById('1')
                                     .querySelectorAll('button');

applyClickListenersToButtons(backgroundColorButtons,
                             changeBackgroundColorSectionOne);

/* Problem 3 */
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

applyClickListenersToButtons(document.getElementById('2')
            .querySelectorAll('button'), toggleBackgroundAndButton);
