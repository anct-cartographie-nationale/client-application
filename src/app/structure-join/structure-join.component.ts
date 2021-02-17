import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StructureService } from '../services/structure.service';

@Component({
  selector: 'app-structure-join',
  templateUrl: './structure-join.component.html',
  styleUrls: ['./structure-join.component.scss'],
})
export class StructureJoinComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private structureService: StructureService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (
        params.get('id') &&
        params.get('userId') &&
        (params.get('status') === 'true' || params.get('status') === 'false')
      ) {
        this.structureService
          .validateStructureJoin(params.get('id'), params.get('userId'), params.get('status') === 'true' ? true : false)
          .subscribe(
            (res) => {
              this.router.navigateByUrl('/home');
            },
            (err) => {
              this.router.navigateByUrl('/home');
            }
          );
      }
    });
  }
}
