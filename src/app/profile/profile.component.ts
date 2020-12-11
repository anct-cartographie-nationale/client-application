import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userProfile: User;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((profile) => {
      this.userProfile = profile;
    });
  }
}
