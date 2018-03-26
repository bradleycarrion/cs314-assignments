'use strict';

function promptTerms() {
  let response = confirm("Do you accept the terms and conditions?");

  if (response) {
    alert("You accepted!");
  } else {
    alert("You didn't accept! :(");
  }
}

promptTerms();

function promptTermsWithTurnary() {
  let response = confirm("Do you accept the terms and conditions?");

  response ? alert("You accepted!") : alert("You didn't accept! :(");
}

promptTermsWithTurnary();

function getUsersAge() {
  let response = prompt("How old are you?");

  if (response === "") {
    alert("You didn't enter anything :(");
  } else if (response === null) {
    alert("That's okay, I didn't want to know anyways...");
  } else if (Number(response) === NaN) {
    alert("Invalid Input: Not a Number");
  } else {
    alert("Wow, you're " + Number(response) + "?!");
  }
}

getUsersAge();

function Person(firstname, lastname) {
  return {
    firstname,
    lastname,
    welcome: function() {
      alert("Hello, " + this.firstname + " " + this.lastname);
    }
  }
}

function deepCopy(obj, addStuff=null, stuff=null) {
  return (addStuff !== null && stuff !== null) ? Object.assign(stuff, obj)
                                                :Object.assign({}, obj);
}

let p = new Person("Bradley", "Carrion");
p.welcome();

let pcopy = deepCopy(p, true, {
  email: "bradley.carrion@gmail.com",
  age: 22,
  printObj: function() {
    alert("Summary:\n Name: " + this.firstname + " " + this.lastname + ",\n Email: " + this.email +
          "\n Age: " + this.age);
  }
});

pcopy.printObj();

console.log("First Obj:", p);
console.log("Second Obj:", pcopy);

/*function printClassNames(n1, n2, teacher="Nobody") {
  return "Teacher: " + teacher + "\nStudent 1: " + n1 +
         "Student 2: " + n2;
}*/

/*let printClassNames = function(n1, n2, teacher="Nobody") {
  return "Teacher: " + teacher + "\nStudent 1: " + n1 +
         "Student 2: " + n2;
}*/

let printClassNames = (n1, n2, teacher="Nobody") => {
  "Teacher: " + teacher + "\nStudent 1: " + n1 + "Student 2: " + n2;
};
