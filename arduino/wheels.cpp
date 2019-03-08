#include <Arduino.h>

#define LEFT 1
#define RIGHT 2


void setup() {
  // TODO: Init motor pins?
  Serial.begin(9600);
}

void startLeft() {
  // TODO
}

void startRight() {
  // TODO
}

void stopLeft() {
  // TODO
}

void stopRight() {
  // TODO
}

void loop() {
  // Fetch and execute command.
  if (Serial.available()) {
    int command = Serial.read();
    Serial.println(command);

    if (command & LEFT) {
      startLeft();
    } else {
      stopLeft();
    }

    if (command & RIGHT) {
      startRight();
    } else {
      stopRight();
    }
  }

  // Just sleep for no reason.
  delay(10);
}
