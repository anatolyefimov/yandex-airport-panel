export default {
    eventToggle(state, index) {
        state[event] = (index === 0) ? 'departure' : 'arrival';
    }
}