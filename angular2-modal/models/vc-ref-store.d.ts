/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ViewContainerRef } from '@angular/core';
/**
 * A Simple store that holds a reference to ViewContainerRef instances by a user defined key.
 * This, with the OverlayTarget directive makes it easy to block the overlay inside an element
 * without having to use the angular query boilerplate.
 * @type {{
 *  getVCRef: (function(string): ViewContainerRef),
 *  setVCRef: (function(string, ViewContainerRef): void),
 *  delVCRef: (function(string): void)
 *  }}
 */
export declare const vcRefStore: {
    getVCRef: (key: string) => ViewContainerRef[];
    setVCRef: (key: string, vcRef: ViewContainerRef) => void;
    delVCRef: (key: string, vcRef?: ViewContainerRef) => void;
};
