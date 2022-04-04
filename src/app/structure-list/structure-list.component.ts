import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Structure } from '../models/structure.model';
import { GeoJson } from '../map/models/geojson.model';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureService } from '../services/structure.service';
import { ButtonType } from '../shared/components/button/buttonType.enum';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnChanges {
  @Input() public structureList: Structure[];
  @Input() public location: GeoJson;
  @Input() public selectedStructure: Structure = new Structure();
  @Output() public displayMapMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectedMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public updatedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();

  public buttonTypeEnum = ButtonType;
  public showStructureDetails = false;
  public structure: Structure;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structureService: StructureService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.id) {
        if (!this.structure) {
          this.structureService.getStructure(queryParams.id).subscribe((s) => {
            this.showDetails(new Structure(s));
          });
        }
      } else {
        this.closeDetails();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStructure && this.selectedStructure) {
      this.showDetails(this.selectedStructure);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          id: this.selectedStructure._id,
        },
      });
    }
    if (changes.structureList) {
      document.getElementById('listCard').scrollTo(0, 0);
    }
  }

  public addStructure(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/form/structure');
    }
  }

  public showDetails(event: Structure): void {
    this.showStructureDetails = true;
    this.structure = event;
    this.selectedMarkerId.emit(this.structure._id);
  }

  public closeDetails(): void {
    this.selectedMarkerId.emit();
    this.showStructureDetails = false;
  }

  public handleCardHover(structure: Structure): void {
    this.displayMapMarkerId.emit(structure._id);
  }

  public mouseLeave(): void {
    this.displayMapMarkerId.emit(undefined);
  }

  public emitUpdatedStructure(s: Structure): void {
    this.updatedStructure.emit(s);
  }
}
