import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DistanceModule } from '@gouvfr-anct/mediation-numerique/shared';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';
import {
  LeafletMapMarkerDirective,
  LeafletMapPopupDirective,
  LeafletMapStateChangeDirective,
  LeafletMapTooltipDirective
} from '../presentation/directives';
import {
  AidantsConnectComponent,
  ApticComponent,
  BoutonsActionComponent,
  DescriptionComponent,
  FabriqueDeTerritoireComponent,
  FrenchTechComponent,
  GrandesEcolesDuNumeriqueComponent,
  InformationsGeneralesComponent,
  InformationsPratiquesComponent,
  LabellisationsComponent,
  LeafletMapComponent,
  LieuMediationNumeriqueListItemComponent,
  MaisonFranceServiceComponent,
  PointRelaisCafComponent,
  PublicPrisEnChargeComponent,
  RelaisPoleEmploiComponent,
  CnfsComponent,
  CampusConnecteComponent,
  PointNumeriqueCafComponent,
  HorairesComponent
} from '../presentation/components';
import { ServicesComponent } from '../presentation/components/services/services.component';
import { ModalitesAccompagnementComponent } from '../presentation/components/modalites-accompagnement/modalites-accompagnement.component';

@NgModule({
  declarations: [
    CartographieLayout,
    LieuxMediationNumeriqueListPage,
    LieuxMediationNumeriqueDetailsPage,
    LieuMediationNumeriqueListItemComponent,
    InformationsGeneralesComponent,
    BoutonsActionComponent,
    InformationsPratiquesComponent,
    DescriptionComponent,
    ServicesComponent,
    HorairesComponent,
    ModalitesAccompagnementComponent,
    PublicPrisEnChargeComponent,
    LabellisationsComponent,
    MaisonFranceServiceComponent,
    AidantsConnectComponent,
    ApticComponent,
    CampusConnecteComponent,
    FabriqueDeTerritoireComponent,
    FrenchTechComponent,
    GrandesEcolesDuNumeriqueComponent,
    PointRelaisCafComponent,
    RelaisPoleEmploiComponent,
    CnfsComponent,
    PointNumeriqueCafComponent,
    LeafletMapComponent,
    LeafletMapPopupDirective,
    LeafletMapStateChangeDirective,
    LeafletMapTooltipDirective,
    LeafletMapMarkerDirective
  ],
  imports: [HttpClientModule, CartographieFeatureRoutingModule, CommonModule, DistanceModule]
})
export class CartographieFeatureModule {}
