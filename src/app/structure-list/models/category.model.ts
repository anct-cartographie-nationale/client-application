import { Module } from './module.model';

export class Category {
  name: string;
  id: string;
  modules: Module[];

  constructor(obj?: any) {
    Object.assign(this, obj, {
      modules:
        obj && obj.modules
          ? obj.modules.map((module) => new Module(module.display_id ? module.display_id : module.id, module.text))
          : null,
    });
  }

  public isBaseSkills(): boolean {
    return this.name === 'Les compétences de base';
  }

  public isRigthtsAccess(): boolean {
    return this.name === 'Accès aux droits';
  }

  public isParentingHelp(): boolean {
    return this.name === 'Aide à la parentalité';
  }

  public isDigitalCultureSecurity(): boolean {
    return this.name === 'Culture et sécurité numérique';
  }

  public isSocialAndProfessional(): boolean {
    return this.name === 'Insertion sociale et professionnelle';
  }
}
