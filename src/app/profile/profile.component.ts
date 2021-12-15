import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureWithOwners } from '../models/structureWithOwners.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { StructureService } from '../services/structure.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userProfile: User;
  public structures: StructureWithOwners[] = [];

  constructor(
    private profileService: ProfileService,
    private structureService: StructureService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().then((profile) => {
      this.userProfile = profile;
      this.structures = [];
      profile.structuresLink.forEach((structureId) => {
        this.structureService.getStructureWithOwners(structureId, null).subscribe((s) => {
          this.structures.push(s);
        });
      });
    });
  }

  public addStructure(): void {
    this.router.navigateByUrl('/create-structure');
  }

  public logout(): void {
    this.authService.logout();
  }
}
