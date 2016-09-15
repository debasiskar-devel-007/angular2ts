/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DialogRef } from '../models/dialog-ref';
import { OverlayRenderer } from '../models/tokens';
import { ModalOverlay } from '../overlay/index';
export declare class DOMOverlayRenderer implements OverlayRenderer {
    private _cr;
    constructor(_cr: ComponentFactoryResolver);
    render(dialog: DialogRef<any>, vcRef: ViewContainerRef): ComponentRef<ModalOverlay>;
}
