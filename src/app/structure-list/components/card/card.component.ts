import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from '../../../models/structure.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public structure: Structure;
  @Input() public isSelected: boolean;
  @Input() public isOrientation: boolean;
  @Output() public showDetails: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public addToList: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public hover: EventEmitter<Structure> = new EventEmitter<Structure>();
  public isClaimed = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private structureService: StructureService
  ) {}
  ngOnInit(): void {
    if (this.profileService.isAdmin()) {
      this.setClaimIndicator();
    }
  }

  // Check if structure haven't owners to help admin vision.
  async setClaimIndicator() {
    this.isClaimed = await this.structureService.isClaimed(this.structure._id, null).toPromise();
  }

  /**
   * Display distance in m or km according to value
   */
  public formatDistance(): string {
    if (this.structure.distance > 1000) {
      return (this.structure.distance / 1000).toFixed(1).toString() + ' km';
    } else {
      return this.structure.distance + ' m';
    }
  }

  public cardClicked(): void {
    this.showDetails.emit(this.structure);
    if (!this.isOrientation) {
      const queryString = this.route.snapshot.queryParamMap.get('search');
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryString
          ? {
              id: this.structure._id,
              search: queryString,
            }
          : {
              id: this.structure._id,
            },
      });
    }
  }

  public cardHover(): void {
    this.hover.emit(this.structure);
  }

  public cardAddToList(): void {
    this.addToList.emit(this.structure);
  }
}
