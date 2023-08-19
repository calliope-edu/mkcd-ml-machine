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
        bluetooth.onUartDataReceived(DELIM_SYMBOL, handleUartInput);
        bluetooth.onBluetoothConnected(handleBluetoothConnect)
        bluetooth.onBluetoothDisconnected(handleBluetoothDisconnect)
    }

    function handleBluetoothConnect(): void {
        pause(2000)
        bluetooth.uartWriteString("id_mkcd") // Identify as makecode hex
    }

    function handleBluetoothDisconnect(): void {
        showPairingPattern();
    }

    function handleUartInput(): void {
        const uartInput = bluetooth.uartReadUntil(DELIM_SYMBOL)
        const prefix = uartInput.substr(0, 2);
        const input = uartInput.substr(2);
        if (prefix === "g_") {
            // Gesture recognition
            gestureRecognitions.fireCallbackFor(input); // Could be something different from gesture names
        }
        if (prefix === "s_") {
            // System messages
            handleSystemInputs(input);
        }
    }

    function handleSystemInputs(input: string): void {
        if (input === "connected") {
            bluetooth.uartWriteLine("hello world");
        }
    }
}