/**
 * (c) 2024, A. Malthe Henriksen
 *
 * SPDX-License-Identifier: MIT
 */

namespace MLMachine {
    
    const CODEBOOK: string[][] = [
        ['t', 'a', 't', 'a', 't'],
        ['p', 'e', 'p', 'e', 'p'],
        ['g', 'i', 'g', 'i', 'g'],
        ['v', 'o', 'v', 'o', 'v'],
        ['z', 'u', 'z', 'u', 'z'],
    ];

    export function setLEDPattern(pattern: boolean[]) {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const pattern_index = x + 5 * y
                const state = pattern[pattern_index]
                if (state) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y)
                }
            }
        }
    }

    export function nameToPattern(name: string): boolean[] {
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
}
