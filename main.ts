// Advances the Microbit's idea of what time it is by 1 hour, and displays the hours on screen. Does not move the physical clock.
input.onButtonPressed(Button.A, function () {
    Hours += 1
    basic.showString("" + (Hours))
})
// Sends am advance-1-minute tick to the clock mechanism relay, allowing you to advance the time on the physical clock face without changing the time on the microbit
input.onButtonPressed(Button.AB, function () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(250)
    pins.digitalWritePin(DigitalPin.P13, 0)
})
// increases the Microbit's internal time by one minute. Does not move the physical clock.
input.onButtonPressed(Button.B, function () {
    Minutes += 1
    basic.showString("" + (Minutes))
})
// Clock thinks it has been switched on at 1 o'clock
let Hours = 0
let Minutes = 0
Minutes = 0
Hours = 1
// Uses a microbit and relay board to operate a slave clock. Made for a 1920s International Time Recording Co. clock, but will work for any slave clock requiring pulses once a minute.
// 
// Sends a 250ms pulse to P13 (slave clock) once a minute, and then, once an hour, sends [hours] number of pulses (at one second intervals) to P14 (bell solenoid).
// 
// We found 250ms was a suitable pulse length to advance the movement. If you change this value, don't forget it counts towards the length of a minute, so you'll have to adjust the 59,750ms value to compensate.
basic.forever(function () {
    if (Minutes <= 58) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        basic.pause(250)
        pins.digitalWritePin(DigitalPin.P13, 0)
        Minutes += 1
        basic.pause(59750)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 1)
        basic.pause(250)
        pins.digitalWritePin(DigitalPin.P13, 0)
        if (Hours <= 11) {
            Hours += 1
        } else {
            Hours = 1
        }
        Minutes = 0
        // This does the chimes.
        for (let index = 0; index < Hours; index++) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            basic.pause(100)
            pins.digitalWritePin(DigitalPin.P14, 0)
            basic.pause(900)
        }
        basic.pause(59750 - Hours * 1000)
    }
})
