"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalProvider = exports.initializeProvider = void 0;
const StcInpageProvider_1 = __importDefault(require("./StcInpageProvider"));
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
function initializeProvider({ bridge, logger = console, maxEventListeners = 100, shouldSetOnWindow = true, }) {
    let provider = new StcInpageProvider_1.default({
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
exports.initializeProvider = initializeProvider;
/**
 * Sets the given provider instance as window.starcoin and dispatches the
 * 'starcoin#initialized' event on window.
 *
 * @param providerInstance - The provider instance.
 */
function setGlobalProvider(providerInstance) {
    window.starcoin = providerInstance;
    window.dispatchEvent(new Event('starcoin#initialized'));
}
exports.setGlobalProvider = setGlobalProvider;
