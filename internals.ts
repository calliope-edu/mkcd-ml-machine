namespace MLMachine {
    // Hijacks bluetooth capabilities and ensures all required services are started.

    const DELIM_SYMBOL = "#"
    let is_setup = false

    export function requireSetup(): void {
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

        // Map to an action, it may not be gestures recognized
        bluetooth.onUartDataReceived(DELIM_SYMBOL, function () {
            const gestureName = bluetooth.uartReadUntil(DELIM_SYMBOL)
            gestureRecognitions.fireCallbackFor(gestureName); // Could be something different from gesture names
        });
    }
}