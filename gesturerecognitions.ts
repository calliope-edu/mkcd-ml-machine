namespace MLMachine {
    /**
     * Acts as a map of gesture names to callbacks
     */
    export class GestureRecognitions {
        private gestureNames: string[]
        private callbacks: (() => void)[]

        public constructor() {
            this.gestureNames = []
            this.callbacks = []
        }

        public addRecognitionCallback(gestureName: string, callback: () => void) {
            this.gestureNames.push(gestureName.toLowerCase())
            this.callbacks.push(callback)
        }

        public fireCallbackFor(gestureName: string) {
            const callbackIndex = this.gestureNames.indexOf(gestureName.toLowerCase())
            if (callbackIndex == -1) {
                return
            }
            this.callbacks[callbackIndex]()
        }
    }
}