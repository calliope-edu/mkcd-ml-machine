//% color=190 weight=100 icon="\uf121" block="MLMachine"
namespace MLMachine {
    const DELIM_SYMBOL = "#"
    let is_setup = false
    let gestureRecognitions: GestureRecognitions = null

    /**
     * Acts as a map of gesture names to callbacks
     */
    class GestureRecognitions {
        private gestureNames: string[]
        private callbacks: (() => void)[]

        public constructor() {
            this.gestureNames = []
            this.callbacks = []
        }

        public addRecognitionCallback(gestureName: string, callback: () => void) {
            this.gestureNames.push(gestureName)
            this.callbacks.push(callback)
        }

        public fireCallbackFor(gestureName: string) {
            const callbackIndex = this.gestureNames.indexOf(gestureName)
            if (callbackIndex == -1) {
                return
            }
            this.callbacks[callbackIndex]()
        }
    }

    function requireSetup(): void {
        if (is_setup) {
            return
        }
        is_setup = true
        bluetooth.setTransmitPower(7);
        bluetooth.startUartService();
        bluetooth.startAccelerometerService();
        bluetooth.startButtonService();
        bluetooth.startIOPinService();
        bluetooth.startLEDService();
        gestureRecognitions = new GestureRecognitions();

        bluetooth.onUartDataReceived(DELIM_SYMBOL, function () {
            const gestureName = bluetooth.uartReadUntil(DELIM_SYMBOL)
            gestureRecognitions.fireCallbackFor(gestureName); // Could be something different from gesture names
        });
    }

    //% block
    export function onGestureRecognized(gesture: string = "shake", body: () => void): void {
        requireSetup();
        gestureRecognitions.addRecognitionCallback(gesture, body)
    }
}
