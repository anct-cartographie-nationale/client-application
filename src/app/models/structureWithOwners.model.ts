import { Owner } from './owner.model';
import { Structure } from './structure.model';

export class StructureWithOwners {
  structure: Structure;
  owners: Owner[];
}
