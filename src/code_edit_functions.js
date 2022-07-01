function getLocalStorage() {
  console.log("Get local storage function called");
  console.log(localStorage.getItem("StoredData"));

  // Unpack JSON to object
  object = JSON.parse(localStorage.getItem("StoredData"));

    // Get values from object
    let motorport1 = object.motorport1;
    let motorport2 = object.motorport2;
    let speed = object.speed;
    let direction = object.direction;
    let seconds = object.seconds;
    console.log(motorport1, motorport2, speed, direction, seconds);

    // create code with our values
    fillCode(motorport1, motorport2, speed, direction, seconds); 
  // }
  
}

// FILL CODE FROM "CONTROL" INTO EDITOR
function fillCode(motorport1, motorport2, speed, direction, seconds) {
  // get our fill code
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  const code = editor.getValue();
  console.log(code)

  // initialize things, determine L / R speeds
  console.log("speed " + speed);
  let left_speed = speed;
  let right_speed = speed;
  seconds = seconds / 1000; 
  console.log(direction)

  // change values acc. direction
  if (direction == "backward") {
    left_speed = speed * -1;
    right_speed = speed * -1;
    console.log("Backward" + " " + left_speed + " " + right_speed)
  }
  else if (direction == "right") {
    right_speed = 0;
    console.log("Right" + " " + left_speed + " " + right_speed)
  }
  else if (direction == "left") {
    left_speed = 0;
    console.log("Left" + " " + left_speed + " " + right_speed)
  }

  // update code
  editor.setValue("# Code" + "\n" 
                  + "from spike import PrimeHub, Motor, MotorPair" + "\n" 
                  + "from spike.control import wait_for_seconds, wait_until, Timer" + "\n" 
                  + "\n" 
                  + "hub = PrimeHub()" + "\n" 
                  + "\n" 
                  + "pair = MotorPair(" + "'"+ motorport1 + "', '" + motorport2 + "')" + "\n" 
                  + "pair.start_tank(" + left_speed + ", " + right_speed + ")" + "\n" 
                  + "wait_for_seconds(" + seconds + ")" + "\n" 
                  + "pair.stop()");

  // console outputs 
  console.log("Fill code was called!")
  console.log(motorport1, motorport2, left_speed, right_speed, direction, seconds)

}