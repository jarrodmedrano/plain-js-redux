(function (): void {

    document.addEventListener('DOMContentLoaded', function (event: Event): void {

        let counterDiv = document.getElementById('counter-detail');

        // COUNT UP Action
        const COUNT_UP = "COUNT_UP";
        function countUp(): { type: string } {
            return {
                type: COUNT_UP
            };
        }

        // COUNT DOWN Action
        const COUNT_DOWN = "COUNT_DOWN";
        function countDown(): { type: string } {
            return {
                type: COUNT_DOWN
            };
        }

        // Reducer
        function reducer(state: number, action: { type: string }): number {
            switch (action.type) {
                case COUNT_UP:
                    return state += 1;
                case COUNT_DOWN:
                    return state -= 1;
                default:
                    return state
            }
        }

        // State Store
        let store = 0; // Initial state

        document.addEventListener('action', function (e: CustomEvent) {
            store = reducer(store, e.detail);
            document.dispatchEvent(new CustomEvent('state'));
        }, false);

        // UI state change method
        function render(): void {
            if (counterDiv) {
                counterDiv.innerHTML = 'Count is ' + store.toString();
            }
        }

        document.addEventListener('state', render);

        render();

        // UI event handlers
        let countUpButton = document.getElementById('countup-button');
        if (countUpButton) {
            countUpButton.addEventListener("click", function (): void {
                document.dispatchEvent(
                    new CustomEvent('action', { detail: countUp() })
                );
            });
        }

        let countDownButton = document.getElementById('countdown-button');
        if (countDownButton) {
            countDownButton.addEventListener("click", function (): void {
                document.dispatchEvent(
                    new CustomEvent('action', { detail: countDown() })
                );
            });
        }
    });

}());