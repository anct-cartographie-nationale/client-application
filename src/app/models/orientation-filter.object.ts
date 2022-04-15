import { Category } from '../structure-list/models/category.model';
import { Address } from './address.model';

export class OrientationFormFilters {
  specificProfile: Category;
  handicap: boolean;
  passNumeric: boolean;
  structureAccompaniment: string;
  contactAccompanimentPhone: string;
  contactAccompanimentEmail: string;
  beneficiaryName: string;
  beneficiaryNeedCommentary: string;
  address: Address;
}
