MLMachine.setup()

bluetooth.onUartDataReceived("#", function () {
    basic.showNumber(2)
})
