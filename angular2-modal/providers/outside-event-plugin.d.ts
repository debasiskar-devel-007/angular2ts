/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { EventManager } from '@angular/platform-browser';
export declare class DOMOutsideEventPlugin {
    manager: EventManager;
    constructor();
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
}
