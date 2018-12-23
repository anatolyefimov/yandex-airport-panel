export default {
    eventToggle(context, index) {
        console.log('action eventToggle is dipatch');
        context.commit('eventToggle', index);
    }
};