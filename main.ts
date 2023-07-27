//% color=190 weight=100 icon="\uf121" block="MLMachine"
namespace MLMachine {
    export let gestureRecognitions: GestureRecognitions = null

    export enum Role {
        INPUT, OUTPUT
    }

    //% block
    export function showPairingPattern(): void {
        const name = control.deviceName()
        const pattern = nameToPattern(name);
        setLEDPattern(pattern);
    }

    //% block
    export function onGestureRecognized(gesture: string = "shake", body: () => void): void {
        requireSetup();
        gestureRecognitions.addRecognitionCallback(gesture, body)
    }
}
