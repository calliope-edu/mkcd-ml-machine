//% color=190 weight=100 icon="\uf121" block="MLMachine"
namespace MLMachine {
    const DELIM_SYMBOL = "#"
    let is_setup = false

    class gestureRecognitions {
        addRecognitionCallback() {

        }
    }

    const CODEBOOK: string[][] = [
        ['t', 'a', 't', 'a', 't'],
        ['p', 'e', 'p', 'e', 'p'],
        ['g', 'i', 'g', 'i', 'g'],
        ['v', 'o', 'v', 'o', 'v'],
        ['z', 'u', 'z', 'u', 'z'],
    ];

    function setup(): void {
        bluetooth.setTransmitPower(7);
        bluetooth.startUartService();
        bluetooth.startAccelerometerService();
        bluetooth.startButtonService();
        bluetooth.startIOPinService();
        bluetooth.startLEDService();
    }

    //% block
    export function showPairingPattern(): void {
        const name = control.deviceName()
        const pattern = nameToPattern(name);
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const inx = x + 5*y
                const state = pattern[inx]
                if (state) {
                    led.plot(x, y)
                } else {
                    led.unplot(x,y)
                }
            }
        }
    }

    function nameToPattern(name: string): boolean[] {
        const pattern: boolean[] = [
            true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true
        ]

        // if wrong name length, return empty pattern
        if (name.length != 5) {
            return pattern.map(() => false);
        }

        for (let column = 0; column < 5; column++) {
            for (let row = 0; row < 5; row++) {
                if (CODEBOOK[row][column] === name.charAt(column)) {
                    break;
                }
                pattern[5 * row + column] = false;
            }
        }

        return pattern;
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
            }
        });
    }
}
