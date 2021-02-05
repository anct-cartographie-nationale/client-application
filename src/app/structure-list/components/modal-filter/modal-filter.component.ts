import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeModal } from '../../enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Module } from '../../models/module.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  constructor(public searchService: SearchService) {}
  @Input() public modalType: TypeModal;
  @Input() public categories: Category[];
  @Input() public modules: Module[] = [];
  @Output() searchEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  // Checkbox variable
  public checkedModules: Module[] = [];
  ngOnInit(): void {
    // Manage checkbox
    this.checkedModules = this.modules.slice();
  }

  // Management of the checkbox event (Check / Uncheck)
  public onCheckboxChange(event, categ: string): void {
    const checkValue: string = event.target.value;
    if (event.target.checked) {
      this.checkedModules.push(new Module(checkValue, categ));
    } else {
      // Check if the module is present in the list and remove it
      if (this.searchService.getIndex(this.checkedModules, checkValue, categ) > -1) {
        this.checkedModules.splice(this.searchService.getIndex(this.checkedModules, checkValue, categ), 1);
      }
    }
  }
  // Clear only filters in the current modal
  public clearFilters(): void {
    this.categories.forEach((categ: Category) => {
      categ.modules.forEach((module: Module) => {
        const index = this.searchService.getIndex(this.checkedModules, module.id, categ.id);
        if (index > -1) {
          this.checkedModules.splice(index, 1);
        }
      });
    });
    this.emitModules(this.checkedModules);
  }

  // Sends an array containing all modules
  public emitModules(m: Module[]): void {
    this.searchEvent.emit(m);
  }

  public getModalType(): string {
    switch (this.modalType) {
      case TypeModal.training:
        return 'training';
      case TypeModal.moreFilters:
        return 'moreFilters';
      default:
        return '';
    }
  }

  public closeModal(): void {
    this.closeEvent.emit();
  }
}
