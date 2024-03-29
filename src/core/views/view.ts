import { Model, StateUpdate } from '../model';
import { Module } from '../module';

import { JetInfernoComponent, InfernoViewManager } from './inferno';
import { isDefined } from 'utils/helpers';

import { ComponentViewManager, ComponentViewType } from './manager';

export abstract class View<TModel extends Model = any> extends Module<TModel> {
    private componentViewManager!: ComponentViewManager;

    protected setView(view: ComponentViewType) {
        if(view.prototype instanceof JetInfernoComponent) {
            this.componentViewManager = new InfernoViewManager(this, view);
        }
    }

    public render(container: HTMLElement) {
        if(!isDefined(this.componentViewManager)) {
            throw new Error('View.componentView is undefined. Use setView in initialize() to define it');
        }

        this.componentViewManager.render(container);
    }

    public onStateUpdate(update: StateUpdate) {
        this.componentViewManager.onStateUpdate();
    }

    public onDataChange() {
        this.componentViewManager.onDataChange();
    }
}
