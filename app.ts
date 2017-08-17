(function(){

document.addEventListener("DOMContentLoaded", function(event) { 
        
let counterDiv = document.getElementById('counter-detail');
    
// COUNT UP Action
const COUNT_UP = "COUNT_UP";
function countUp() {
    return {
        type: COUNT_UP
    };
}

// COUNT DOWN Action
const COUNT_DOWN = "COUNT_DOWN";
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
      return state
  }
}
// State Store
let store = 0; // Initial state

document.addEventListener('action', function(e) {
    store = reducer(store, e.detail);
    document.dispatchEvent(new CustomEvent('state'));
}, false);

// UI state change method
function render() {
  counterDiv.innerHTML = 'Count is ' + store.toString();
}

document.addEventListener('state', render);

render();

// UI event handler
let countUpButton = document.getElementById('countup-button');
countUpButton.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: countUp()})
  );
});

let countDownButton = document.getElementById('countdown-button');
countDownButton.addEventListener("click", function() {
  document.dispatchEvent(
    new CustomEvent('action', { detail: countDown()})
  );
});

});

}());