
export const setMultipleListeners = function( events: Array<string>, target: EventTarget, callback: EventListener ) {
    events.forEach( eventName => {
        target.addEventListener( eventName, callback );
    } );
};