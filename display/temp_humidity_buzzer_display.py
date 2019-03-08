#!/usr/bin/env python

import time
import grovepi
import time,sys
import math

if sys.platform == 'uwp':
    import winrt_smbus as smbus
    bus = smbus.SMBus(1)
else:
    import smbus
    import RPi.GPIO as GPIO
    rev = GPIO.RPI_REVISION
    if rev == 2 or rev == 3:
        bus = smbus.SMBus(1)
    else:
        bus = smbus.SMBus(0)

sensor = 4  # The Sensor goes on digital port 4.
buzzer = 8
# this device has two I2C addresses
DISPLAY_RGB_ADDR = 0x62
DISPLAY_TEXT_ADDR = 0x3e

# temp_humidity_sensor_type
# Grove Base Kit comes with the blue sensor.
blue = 0    # The Blue colored sensor.
white = 1   # The White colored sensor.

grovepi.pinMode(buzzer,"OUTPUT")

# set backlight to (R,G,B) (values from 0..255 for each)
def setRGB(r,g,b):
     bus.write_byte_data(DISPLAY_RGB_ADDR,0,0)
     bus.write_byte_data(DISPLAY_RGB_ADDR,1,0)
     bus.write_byte_data(DISPLAY_RGB_ADDR,0x08,0xaa)
     bus.write_byte_data(DISPLAY_RGB_ADDR,4,r)
     bus.write_byte_data(DISPLAY_RGB_ADDR,3,g)
     bus.write_byte_data(DISPLAY_RGB_ADDR,2,b)

# send command to display (no need for external use)
def textCommand(cmd):
    bus.write_byte_data(DISPLAY_TEXT_ADDR,0x80,cmd)

#Update the display without erasing the display
def setText_norefresh(text):
    textCommand(0x02) # return home
    time.sleep(.05)
    textCommand(0x08 | 0x04) # display on, no cursor
    textCommand(0x28) # 2 lines
    time.sleep(.05)
    count = 0
    row = 0
    while len(text) < 32: #clears the rest of the screen
        text += ' '
    for c in text:
        if c == '\n' or count == 16:
            count = 0
            row += 1
            if row == 2:
                break
            textCommand(0xc0)
            if c == '\n':
                continue
        count += 1
        bus.write_byte_data(DISPLAY_TEXT_ADDR,0x40,ord(c))

# example code
if __name__=="__main__":
    print("her er jeg")
    setRGB(0,255,0)
    for c in range(0,20): #while True:
        print("----")
        [temp,humidity] = grovepi.dht(sensor,blue)  
        if math.isnan(temp) == False and math.isnan(humidity) == False:
            print("temp = %.02f C humidity =%.02f%%"%(temp, humidity))
            t = str(temp)
            h = str(humidity)
            setText_norefresh("T:" + t + "C\n" + "H:" + h + "%")
            if temp > 23 :
                setRGB(255,0,0)
                grovepi.digitalWrite(buzzer,1)
                time.sleep(1)
                grovepi.digitalWrite(buzzer,0)
                time.sleep(1)
            else:
                setRGB(0,255,0)
        time.sleep(0.05)