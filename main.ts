//% color=190 weight=100 icon="\uf121" block="MLMachine"
namespace MLMachine {
    //% block
    export function setup(): void {
        bluetooth.setTransmitPower(7);
        bluetooth.startUartService();
        bluetooth.startAccelerometerService();
        bluetooth.startButtonService();
        bluetooth.startIOPinService();
        bluetooth.startLEDService();
    }

    //% block
    export function onGestureRecognized(gestureName: string = "Shake", body: () => void) {
        bluetooth.onUartDataReceived("#", function () {
            basic.showNumber(2)
        })
    }
}
