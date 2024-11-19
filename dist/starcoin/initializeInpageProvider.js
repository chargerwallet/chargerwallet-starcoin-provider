import StcInpageProvider from './StcInpageProvider';
/**
 * Initializes a StcInpageProvider and (optionally) assigns it as window.starcoin.
 *
 * @param options - An options bag.
 * @param options.connectionStream - A Node.js stream.
 * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.
 * @param options.maxEventListeners - The maximum number of event listeners.
 * @param options.shouldSendMetadata - Whether the provider should send page metadata.
 * @param options.shouldSetOnWindow - Whether the provider should be set as window.starcoin.
 * @returns The initialized provider (whether set or not).
 */
export function initializeProvider({ bridge, logger = console, maxEventListeners = 100, shouldSetOnWindow = true, }) {
    let provider = new StcInpageProvider({
        bridge,
        logger,
        maxEventListeners,
    });
    provider = new Proxy(provider, {
        // some common libraries, e.g. web3@1.x, mess with our API
        deleteProperty: () => true,
    });
    if (shouldSetOnWindow) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setGlobalProvider(provider);
    }
    return provider;
}
/**
 * Sets the given provider instance as window.starcoin and dispatches the
 * 'starcoin#initialized' event on window.
 *
 * @param providerInstance - The provider instance.
 */
export function setGlobalProvider(providerInstance) {
    window.starcoin = providerInstance;
    window.dispatchEvent(new Event('starcoin#initialized'));
}
