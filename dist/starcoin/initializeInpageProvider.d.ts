import { JsBridgeBase } from '@chargerwallet/cross-inpage-provider-core';
import StcInpageProvider, { StcInpageProviderOptions } from './StcInpageProvider';
interface InitializeProviderOptions extends StcInpageProviderOptions {
    bridge: JsBridgeBase;
    /**
     * Whether the provider should be set as window.starcoin.
     */
    shouldSetOnWindow?: boolean;
}
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
export declare function initializeProvider({ bridge, logger, maxEventListeners, shouldSetOnWindow, }: InitializeProviderOptions): StcInpageProvider;
/**
 * Sets the given provider instance as window.starcoin and dispatches the
 * 'starcoin#initialized' event on window.
 *
 * @param providerInstance - The provider instance.
 */
export declare function setGlobalProvider(providerInstance: StcInpageProvider): void;
export {};
