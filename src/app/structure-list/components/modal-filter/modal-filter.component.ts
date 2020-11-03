import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }
  @Input() public modalType: string;
  @Input() public categories: Category[];
  @Input() public modules: Module[] = [];
  @Output() searchEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  // Checkbox variable
  checkedModules: Module[];
  // Form search input
  searchForm: FormGroup;
  ngOnInit(): void {
    // Manage checkbox
    console.log('init');
    this.checkedModules = this.modules.slice();
  }

  // Return index of a specific module in array modules
  public getIndex(id: string, categ: string): number {
    return this.checkedModules.findIndex((m: Module) => m.id === id && m.text === categ);
  }

  // Management of the checkbox event (Check / Uncheck)
  public onCheckboxChange(event, categ: string): void {
    const checkValue: string = event.target.value;
    if (event.target.checked) {
      this.checkedModules.push(new Module(checkValue, categ));
    } else {
      // Check if the unchecked module is present in the list and remove it
      if (this.getIndex(checkValue, categ) > -1) {
        this.checkedModules.splice(this.getIndex(checkValue, categ), 1);
      }
    }
  }

  // Clear only filters in the current modal
  public clearFilters(): void {
    this.categories.forEach((categ: Category) => {
      categ.modules.forEach((module: Module) => {
        if (this.getIndex(module.id, categ.name) > -1) {
          this.checkedModules.splice(this.getIndex(module.id, categ.name), 1);
        }
      });
    });
    this.emitModules(this.checkedModules);
  }

  // Sends an array containing all modules
  public emitModules(m: Module[]): void {
    this.searchEvent.emit(m);
  }

  public closeModal(): void {
    this.closeEvent.emit();
  }
}
