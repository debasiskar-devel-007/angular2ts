/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { DialogRef, OverlayRenderer, ModalOverlay } from 'angular2-modal';
export declare class JSNativeModalRenderer implements OverlayRenderer {
    render(dialog: DialogRef<any>, vcRef: ViewContainerRef): ComponentRef<ModalOverlay>;
}
