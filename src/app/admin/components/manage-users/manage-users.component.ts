import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdministredStructuresComponent } from './administred-structures/administred-structures.component';

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  public attachedUsers: User[] = [];
  public unAttachedUsers: User[] = [];
  public unVerifiedUsers: User[] = [];
  public deleteModalOpenned = false;
  public userToDelete: User = null;

  public columnDefs;
  public frameworkComponents;
  public defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public unAttachedColDef = {
    ...this.defaultColDef,
    cellStyle: {
      color: '#da6c2e',
    },
  };

  constructor(private adminService: AdminService) {
    this.columnDefs = [
      {
        headerName: 'Nom',
        field: 'surname',
      },
      {
        headerName: 'Prénom',
        field: 'name',
      },
      {
        minWidth: 150,
        headerName: 'Mail',
        field: 'email',
      },
      {
        minWidth: 150,
        headerName: 'Téléphone',
        field: 'phone',
      },
      {
        headerName: 'Structures administrées',
        cellRenderer: 'administredStructuresComponent',
        cellRendererParams: {
          structures: 'structures',
        },
        minWidth: 350,
      },
      {
        headerName: 'Actions',
        minWidth: 150,
        cellRenderer: 'deleteUserComponent',
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Supprimer',
        },
        cellStyle: { 'text-align': 'center' },
      },
    ];
    this.frameworkComponents = {
      deleteUserComponent: DeleteUserComponent,
      administredStructuresComponent: AdministredStructuresComponent,
    };
    this.findAttachedUsers();
    this.findUnAttachedUsers();
    this.findUnVerifiedUsers();
  }

  public onDeleteButtonClick(arg): void {
    this.deleteUser(arg.data, false);
  }

  public deleteUser(user: User, shouldDelete: boolean): void {
    this.toggleDeleteModal(user);
    if (shouldDelete) {
      this.adminService.deleteUser(user._id).subscribe((data) => {
        this.unAttachedUsers = this.unAttachedUsers.filter((obj) => obj._id !== data._id);
        this.unVerifiedUsers = this.unVerifiedUsers.filter((obj) => obj._id !== data._id);
        this.attachedUsers = this.attachedUsers.filter((obj) => obj._id !== data._id);
      });
    }
  }

  public toggleDeleteModal(userToDelete: User): void {
    this.userToDelete = userToDelete;
    this.deleteModalOpenned = !this.deleteModalOpenned;
  }

  public findAttachedUsers(): void {
    this.adminService.getAttachedUsers().subscribe((users) => {
      this.attachedUsers = users;
      this.attachedUsers.map((user) => {
        user._id = user['id'];
      });
    });
  }

  public findUnAttachedUsers(): void {
    this.adminService.getUnAttachedUsers().subscribe((users) => {
      this.unAttachedUsers = users;
    });
  }

  public findUnVerifiedUsers(): void {
    this.adminService.getUnVerifiedUsers().subscribe((users) => {
      this.unVerifiedUsers = users;
      this.unVerifiedUsers.map((user) => {
        user._id = user['id'];
      });
    });
  }

  public getRowHeight(params): number {
    return params.data.structures ? (params.data.structures.length != 0 ? params.data.structures.length * 40 : 40) : 40;
  }
}
