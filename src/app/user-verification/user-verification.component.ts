import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Structure } from '../models/structure.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { StructureService } from '../services/structure.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
})
export class UserVerificationComponent implements OnInit {
  public userId: string;
  public token: string;
  public structure: Structure;
  public verificationSuccess = false;
  public verificationIssue = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private structureService: StructureService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.sendVerification();
  }

  private sendVerification(): void {
    this.authService.verifyUser(this.userId, this.token).subscribe(
      (user: User) => {
        this.structureService.getStructure(user.structuresLink[0]).subscribe(
          (structure) => {
            structure.accountVerified = true;
            this.structure = structure;
            this.structureService.updateStructureAfterOwnerVerify(structure._id, structure).subscribe(
              () => {
                this.verificationSuccess = true;
              },
              () => {
                this.verificationIssue = true;
              }
            );
          },
          () => {
            this.verificationIssue = true;
          }
        );
      },
      () => {
        this.verificationIssue = true;
      }
    );
  }
}
