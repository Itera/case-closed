#include <Arduino.h>

#define LEFT 1
#define RIGHT 2


void setup() {
  Serial.begin(9600);

  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
}

void startLeft() {
  digitalWrite(D1, HIGH);
}

void startRight() {
  digitalWrite(D2, HIGH);
}

void stopLeft() {
  digitalWrite(D1, LOW);
}

void stopRight() {
  digitalWrite(D2, LOW);
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
