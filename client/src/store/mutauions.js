export default {
    eventToggle(state, index) {
        console.log('mutation eventToggle is commit');
        state['event'] = (index === 0) ? 'departure' : 'arrival';
        console.log(state);
    }
}