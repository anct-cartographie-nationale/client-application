import { Module } from './module.model';

export class Category {
  name: string;
  modules: Module[];

  constructor(obj?: any) {
    Object.assign(this, obj, {
      modules: obj && obj.modules ? obj.modules.map((module) => new Module(module.id, module.text)) : null,
    });
  }
}
