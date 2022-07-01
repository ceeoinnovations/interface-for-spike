var mySPIKE;

window.onload = () => {

  console.log(document.getElementById("service_SPIKE"));
  console.log("FUNCTIONS");
  console.log(mySPIKE)

  // setup SPIKE Service Dock
  mySPIKE = document.getElementById("service_SPIKE").getService();
  console.log(mySPIKE)

  // initializing
  mySPIKE.executeAfterInit(async function() {
    // PUT UP ARM 
    console.log("initialized");
  });

  // maybe checking if initialized correctly
  if (mySPIKE.init()) {
    console.log("Successfully initialized the service SPIKE")
  }
  else {
    console.log("Was not able to successfully init")
  }

  // TOGGLE MOVE DIV
  var move = document.getElementById("move");
  var control = document.getElementById("control");
  var code = document.getElementById("code");
  move.style.display = "block";
  control.style.display = "none";
  code.style.display = "none";
  console.log("Toggle Move was called")

}

function showEverything() {
  div = document.getElementById("everything");
  div.classList.remove("hidden");
}

// MOVE FUNCTIONS --------------------------------------------------

function move_go_straight() {
  var motor_A = new mySPIKE.Motor("A");
  var motor_B = new mySPIKE.Motor("B");
  motor_A.run_for_degrees(360, -50, function() {
    console.log("forward: motor A");
  });
  motor_B.run_for_degrees(360, 50, function() {
    console.log("forward: motor B");
  });
};

function move_turn_right() {
  var motor_A = new mySPIKE.Motor("A");
  motor_A.run_for_degrees(405, -50, function() {
    console.log("turn RIGHT, run motor A: 405 degrees");
  });
};

function move_turn_left() {
  var motor_B = new mySPIKE.Motor("B");
  motor_B.run_for_degrees(405, 50, function() {
    console.log("turn LEFT, run motor B: 405 degrees");
  });
};

function move_go_backwards() {
  var motor_A = new mySPIKE.Motor("A");
  var motor_B = new mySPIKE.Motor("B");

  motor_A.run_for_degrees(360, 50, function() {
    console.log("motor just ran 90 deg");
  });
  motor_B.run_for_degrees(360, -50, function() {
    console.log("motor just ran 90 deg");
  });
};

function move_rotate_180() {
  var motor_A = new mySPIKE.Motor("A");
  motor_A.run_for_degrees(420, -50, function() {
    console.log("turn 180, run motor A: 405 degrees");
  });

  var motor_B = new mySPIKE.Motor("B");
  motor_B.run_for_degrees(420, -50, function() {
    console.log("turn 180, run motor B: 405 degrees");
  });
}


// // DROP DOWN FUNCTIONS -------------------------------------------
function on_submit() {
  let motorport1 = document.getElementById("motorport1").value;
  let motorport2 = document.getElementById("motorport2").value;
  let direction = document.getElementById("direction").value;
  let seconds = 1000 * document.getElementById("seconds").value;
  let speed = 1 * document.getElementById("myRange").value;
  console.log(motorport1, motorport2, direction, seconds, speed);

  store_code();
  run_commands(motorport1, motorport2, direction, seconds, speed);
}

function store_code() {
  let motorport1 = document.getElementById("motorport1").value;
  let motorport2 = document.getElementById("motorport2").value;
  let direction = document.getElementById("direction").value;
  let seconds = 1000 * document.getElementById("seconds").value;
  let speed = 1 * document.getElementById("myRange").value;
  console.log(motorport1, motorport2, direction, seconds, speed);

  // SAME PORT ALERT
  if (motorport1 == motorport2) {
    alert("Make sure you select different ports for your motors. Try again!")
  }
  // NULL ALERT
  else if (motorport1 == null || motorport2 == null || direction == null || seconds == null || speed == null) {
    alert("Please click Save & Run first! Then you can see the python code")
  }
  else {
    // CLEAR LOCAL STORAGE 
    localStorage.clear();
    console.log("The local storage has been cleared!");

    // STORE IN LOCALSTORAGE (for use in code page)
    let editorJSON = {
      "motorport1": motorport1,
      "motorport2": motorport2,
      "direction": direction,
      "seconds": seconds,
      "speed": speed,
    };

    console.log("Attempting to store data!")
    localStorage.setItem("StoredData", JSON.stringify(editorJSON))
    console.log(motorport1, motorport2, direction, seconds, speed)
  }
}

function run_commands(motorport1, motorport2, direction, seconds, speed) {
  if (direction == "forward") {
    go_straight(motorport1, motorport2, seconds, speed);
  }
  else if (direction == "backward") {
    go_backwards(motorport1, motorport2, seconds, speed);
  }
  else if (direction == "right") {
    turn_right(motorport1, motorport2, seconds, speed);
  }
  else if (direction == "left") {
    turn_left(motorport1, motorport2, seconds, speed);
  }
  else {
    alert("Something went wrong. Try again!")
  };
};

function go_straight(motorport1, motorport2, seconds, speed) {
  console.log(mySPIKE)
  console.log("PORTS: ", motorport1, motorport2);

  var motor_one = new mySPIKE.Motor(motorport1);
  var motor_two = new mySPIKE.Motor(motorport2);
  motor_one.run_for_seconds(seconds, -1 * speed, function() {
    console.log("forward: ", motorport1, speed);
  });
  motor_two.run_for_seconds(seconds, speed, function() {
    console.log("forward: ", motorport2, speed);
  });
};

function turn_right(motorport1, motorport2, seconds, speed) {
  var motor_one = new mySPIKE.Motor(motorport1);
  motor_one.run_for_seconds(seconds, -1 * speed, function() {
    console.log("turn RIGHT, run motor ONE");
  });
};

function turn_left(motorport1, motorport2, seconds, speed) {
  var motor_two = new mySPIKE.Motor(motorport2);
  motor_two.run_for_seconds(seconds, speed, function() {
    console.log(speed)
    console.log("turn LEFT, run motor TWO");
  });
};

function go_backwards(motorport1, motorport2, seconds, speed) {
  var motor_one = new mySPIKE.Motor(motorport1);
  var motor_two = new mySPIKE.Motor(motorport2);

  motor_one.run_for_seconds(seconds, speed, function() {
    console.log("motor just ran 90 deg");
  });
  motor_two.run_for_seconds(seconds, -1 * speed, function() {
    console.log("motor just ran 90 deg");
  });
};

