#include <Arduino.h>

#define READ_W0 0
#define READ_W1 1
#define LIGHT_ON 2
#define LIGHT_OFF 3


void send_float(float val) {
  Serial.write((byte *) &val, 4);
}

void send_double(double val) {
  Serial.write((byte *) &val, 8);
}


void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // Check for command (single byte). Could extend to 'read until newline' or read a fixed amount of bytes for more
  // advanced options.
  if (Serial.available()) {
    char command = Serial.read();

    // Execute recognized commands.
    if (command == LIGHT_ON) {
      digitalWrite(LED_BUILTIN, HIGH);
      return;
    }

    if (command == LIGHT_OFF) {
      digitalWrite(LED_BUILTIN, LOW);
      return;
    }

    if (command == READ_W0) {
      send_float(0.01);
      return;
    }

    if (command == READ_W1) {
      send_float(0.02);
      return;
    }
  }

  // Just sleep for no reason.
  delay(100);
}
