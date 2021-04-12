import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-delete-user',
  templateUrl: './delete-user.component.html',
})
export class DeleteUserComponent {
  public users: User[];
  public deleteModalOpenned = false;
  public userToDelete: User = null;

  constructor(private adminService: AdminService, private profileService: ProfileService) {}

  public deleteUser(user: User, shouldDelete: boolean): void {
    this.toggleDeleteModal(user);
    if (shouldDelete) {
      this.adminService.deleteUser(user._id).subscribe((data) => {
        this.users = this.users.filter((obj) => obj.email !== data.email);
      });
    }
  }

  public toggleDeleteModal(userToDelete: User): void {
    this.userToDelete = userToDelete;
    this.deleteModalOpenned = !this.deleteModalOpenned;
  }

  public searchUsers(searchString: string): void {
    this.adminService.searchUsers(searchString).subscribe((users) => {
      this.profileService.getProfile().then((profile) => {
        this.users = users.filter((obj) => obj.email != profile.email);
      });
    });
  }
}
