import { Module } from './module.model';

export class Category {
  name: string;
  modules: Module[];

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
