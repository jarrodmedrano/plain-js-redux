"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function (event) {
        var counterDiv = document.getElementById('counter-detail');
        // COUNT UP Action
        var COUNT_UP = "COUNT_UP";
        function countUp() {
            return {
                type: COUNT_UP
            };
        }
        // COUNT DOWN Action
        var COUNT_DOWN = "COUNT_DOWN";
        function countDown() {
            return {
                type: COUNT_DOWN
            };
        }
        // Reducer
        function reducer(state, action) {
            switch (action.type) {
                case COUNT_UP:
                    return state += 1;
                case COUNT_DOWN:
                    return state -= 1;
                default:
                    return state;
            }
        }
        // State Store
        var store = 0; // Initial state
        document.addEventListener('action', function (e) {
            store = reducer(store, e.detail);
            document.dispatchEvent(new CustomEvent('state'));
        }, false);
        // UI state change method
        function render() {
            if (counterDiv) {
                counterDiv.innerHTML = 'Count is ' + store.toString();
            }
        }
        document.addEventListener('state', render);
        render();
        // UI event handlers
        var countUpButton = document.getElementById('countup-button');
        if (countUpButton) {
            countUpButton.addEventListener("click", function () {
                document.dispatchEvent(new CustomEvent('action', { detail: countUp() }));
            });
        }
        var countDownButton = document.getElementById('countdown-button');
        if (countDownButton) {
            countDownButton.addEventListener("click", function () {
                document.dispatchEvent(new CustomEvent('action', { detail: countDown() }));
            });
        }
    });
}());
