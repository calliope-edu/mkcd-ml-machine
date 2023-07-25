//% color=190 weight=100 icon="\uf121" block="MLMachine"
namespace MLMachine {
    const DELIM_SYMBOL = "#"
    let is_setup = false

    function setup(): void {
        bluetooth.setTransmitPower(7);
        bluetooth.startUartService();
        bluetooth.startAccelerometerService();
        bluetooth.startButtonService();
        bluetooth.startIOPinService();
        bluetooth.startLEDService();
    }

    //% block
    export function onGestureRecognized(gesture: string = "shake", body: () => void): void {
        if (is_setup === false) {
            setup()
            is_setup = true
        }
        bluetooth.onUartDataReceived(DELIM_SYMBOL, function () {
            const input = bluetooth.uartReadUntil(DELIM_SYMBOL)
            if (input == gesture) {
                body()
            } else {
                basic.showString(input)
            }
        });
    }
}
