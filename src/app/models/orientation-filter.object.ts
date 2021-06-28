import { Category } from '../structure-list/models/category.model';
import { Module } from '../structure-list/models/module.model';
import { Address } from './address.model';

export class OrientationFormFilters {
  specificProfile: Category;
  handicap: boolean;
  passNumeric: boolean;
  structureAccompaniment: string;
  contactAccompaniment: string;
  beneficiaryName: string;
  beneficiaryNeedCommentary: string;
  address: Address;
}
