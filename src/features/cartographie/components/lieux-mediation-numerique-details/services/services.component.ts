import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import servicesMapping from './services-mapping.json';

type ServicesMapping = {
  icon: string;
  value: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() public services?: Service[];

  public iconFromServices: ServicesMapping[] = servicesMapping;

  public getIconFromServices(service: string): string | undefined {
    return this.iconFromServices.find((fromService: ServicesMapping) => fromService.value === service)?.icon;
  }
}
