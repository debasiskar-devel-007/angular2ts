/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.12
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ComponentRef, ResolvedReflectiveProvider, ViewContainerRef, ComponentFactoryResolver, EventEmitter, TemplateRef, Injector } from '@angular/core';
export declare class SwapComponentDirective {
    private cfr;
    private vcRef;
    private tRef;
    private component;
    constructor(cfr: ComponentFactoryResolver, vcRef: ViewContainerRef, tRef: TemplateRef<Object>);
    swapCmpBindings: ResolvedReflectiveProvider[];
    swapCmpInjector: Injector;
    swapCmpProjectables: any[][];
    onCreate: EventEmitter<ComponentRef<any>>;
    swapCmp: any;
}
