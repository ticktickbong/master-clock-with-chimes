input.onButtonPressed(Button.A, function () {
    Hours += 1
    basic.showString("" + (Hours))
})
input.onButtonPressed(Button.AB, function () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(250)
    pins.digitalWritePin(DigitalPin.P13, 0)
})
input.onButtonPressed(Button.B, function () {
    Minutes += 1
    basic.showString("" + (Minutes))
})
let Hours = 0
let Minutes = 0
Minutes = 0
Hours = 1
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
        for (let index = 0; index < Hours; index++) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            basic.pause(100)
            pins.digitalWritePin(DigitalPin.P14, 0)
            basic.pause(900)
        }
        basic.pause(59750 - Hours * 1000)
        Minutes = 0
        if (Hours <= 11) {
            Hours += 1
        } else {
            Hours = 1
        }
    }
})
