// utility functions
/**
 * Logs a stream disconnection error. Emits an 'error' if given an
 * EventEmitter that has listeners for the 'error' event.
 *
 * @param log - The logging API to use.
 * @param remoteLabel - The label of the disconnected stream.
 * @param error - The associated error to log.
 * @param emitter - The logging API to use.
 */
export function logStreamDisconnectWarning(log, remoteLabel, error, emitter) {
    let warningMsg = `StarMask: Lost connection to "${remoteLabel}".`;
    if (error === null || error === void 0 ? void 0 : error.stack) {
        warningMsg += `\n${error.stack}`;
    }
    log.warn(warningMsg);
    if (emitter && emitter.listenerCount('error') > 0) {
        emitter.emit('error', warningMsg);
    }
}
export const NOOP = () => undefined;
// constants
export const EMITTED_NOTIFICATIONS = [
    'stc_subscription', // per eth-json-rpc-filters/subscriptionManager
];
