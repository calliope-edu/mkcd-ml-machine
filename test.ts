MLMachine.setup()

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    basic.showNumber(0)
})
