/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
export * from './framework/fluent-assign';
export { extend, arrayUnion, PromiseCompleter, Maybe } from './framework/utils';
export { createComponent } from './framework/createComponent';
export * from './models/errors';
export { DialogRef } from './models/dialog-ref';
export { DROP_IN_TYPE, ModalComponent, OverlayRenderer, OverlayConfig, CloseGuard, ContainerContent } from './models/tokens';
export { Modal, DOMOverlayRenderer } from './providers/index';
export { overlayConfigFactory, OverlayContext, OverlayContextBuilder, ModalControllingContextBuilder } from './models/overlay-context';
export { Overlay, EmbedComponentConfig, ModalOverlay, OverlayDialogBoundary, OverlayTarget } from './overlay/index';
export { DEFAULT_VALUES, ModalContext, ModalContextBuilder } from './models/modal-context';
export { ModalOpenContext, ModalOpenContextBuilder } from './models/modal-open-context';
export * from './components/index';
export { ModalModule } from './angular2-modal.module';
