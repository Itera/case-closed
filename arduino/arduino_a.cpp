#include <Arduino.h>
#include "HX711.h"

#define CLK 2
#define DOUT 3
#define BUTTON_SOUND 6

#define COMMAND_TARE 1
#define COMMAND_LED 2

#define SCALE_FACTOR -96650
#define POLL_DELAY 500


HX711 scale(DOUT, CLK);

int led_state = LOW;


void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_SOUND, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, led_state);
  scale.set_scale(SCALE_FACTOR);
  scale.tare();
}

void loop() {
  // Check for command from serial.
  if (Serial.available()) {
    int command = Serial.read();

    // Execute command.
    if (command == COMMAND_TARE) {
      scale.tare();
    } else if (command == COMMAND_LED) {
      led_state = ~led_state;
      digitalWrite(LED_BUILTIN, led_state);
    }
  }

  // Poll and send sensor data (very ugly).
  Serial.print("#");
  Serial.print(scale.get_units(10), 3);
  Serial.print("|");
  Serial.print(digitalRead(BUTTON_SOUND) == LOW ? "1" : "0");
  Serial.print(";");
  delay(POLL_DELAY); // Delay is needed, or the button state will not print correctly. Should maby be tweaked?
}
