/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ElementRef, Renderer } from '@angular/core';
import { BaseDynamicComponent } from './base-dynamic-component';
/**
 * Represents the modal backdrop shaped by CSS.
 */
export declare class CSSBackdrop extends BaseDynamicComponent {
    constructor(el: ElementRef, renderer: Renderer);
}
