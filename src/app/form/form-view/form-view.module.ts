import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import { ProgressBarComponent } from './global-components/progress-bar/progress-bar.component';
import { NavigationButtonsComponent } from './global-components/navigation-buttons/navigation-buttons.component';
import { StructureFormComponent } from './structure-form/structure-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PersonalOfferFormComponent } from './personal-offer-form/personal-offer-form.component';
import { InformationStepComponent } from './global-components/information-step/information-step.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { ProfileEmployerSelectionComponent } from './profile-form/profile-employer-selection/profile-employer-selection.component';
import { ProfileJobSelectionComponent } from './profile-form/profile-job-selection/profile-job-selection.component';
import { ProfileStructureChoiceComponent } from './profile-form/profile-structure-choice/profile-structure-choice.component';
import { PersonalOfferOtherStructureChoiceComponent } from './personal-offer-form/personal-offer-other-structure-choice/personal-offer-other-structure-choice.component';
import { StructureNameAndAddressComponent } from './structure-form/structure-name-and-address/structure-name-and-address.component';
import { StructureContactComponent } from './structure-form/structure-contact/structure-contact.component';
import { StructureAccompanimentChoiceComponent } from './structure-form/structure-accompaniment-choice/structure-accompaniment-choice.component';
import { StructureChoiceCompletionComponent } from './structure-form/structure-choice-completion/structure-choice-completion.component';
import { StructureContactCompletionComponent } from './structure-form/structure-contact-completion/structure-contact-completion.component';
import { StructureAccessModalityComponent } from './structure-form/structure-access-modality/structure-access-modality.component';
import { StructureHoursComponent } from './structure-form/structure-hours/structure-hours.component';
import { StructurePmrComponent } from './structure-form/structure-pmr/structure-pmr.component';
import { StructureWebAndSocialNetworkComponent } from './structure-form/structure-web-and-social-network/structure-web-and-social-network.component';
import { StructurePublicTargetComponent } from './structure-form/structure-public-target/structure-public-target.component';
import { StructureDigitalHelpingAccompanimentComponent } from './structure-form/structure-digital-helping-accompaniment/structure-digital-helping-accompaniment.component';
import { StructureTrainingPriceComponent } from './structure-form/structure-training-price/structure-training-price.component';
import { StructureWifiComponent } from './structure-form/structure-wifi/structure-wifi.component';
import { StructureEquipmentsComponent } from './structure-form/structure-equipments/structure-equipments.component';
import { StructureLabelsComponent } from './structure-form/structure-labels/structure-labels.component';
import { StructureOtherServicesComponent } from './structure-form/structure-other-services/structure-other-services.component';
import { StructureDescriptionComponent } from './structure-form/structure-description/structure-description.component';
import { StructureCovidInfoComponent } from './structure-form/structure-covid-info/structure-covid-info.component';
import { StructureConsentComponent } from './structure-form/structure-consent/structure-consent.component';
import { AccountInfoComponent } from './account-form/account-info/account-info.component';
import { AccountCredentialsComponent } from './account-form/account-credentials/account-credentials.component';
import { SharedModule } from '../../shared/shared.module';
import { FormViewRoutingModule } from './form-view-routing.module';
import { FooterFormComponent } from '../footer-form/footer-form.component';
import { StructureTypeComponent } from './structure-form/structure-type/structure-type.component';
import { PersonalOfferAccompanimentComponent } from './personal-offer-form/personal-offer-accompaniment/personal-offer-accompaniment.component';
import { PersonalOfferTrainingTypeComponent } from './personal-offer-form/personal-offer-training-type/personal-offer-training-type.component';
import { AccountNewsletterComponent } from './account-form/account-newsletter/account-newsletter.component';
import { StructureTrainingTypeComponent } from './structure-form/structure-training-type/structure-training-type.component';
import { PersonalOfferGuard } from './guards/personalOffer.guard';

@NgModule({
  declarations: [
    FormViewComponent,
    ProgressBarComponent,
    NavigationButtonsComponent,
    StructureFormComponent,
    ProfileFormComponent,
    PersonalOfferFormComponent,
    PersonalOfferAccompanimentComponent,
    PersonalOfferTrainingTypeComponent,
    PersonalOfferOtherStructureChoiceComponent,
    InformationStepComponent,
    AccountFormComponent,
    ProfileEmployerSelectionComponent,
    ProfileJobSelectionComponent,
    ProfileStructureChoiceComponent,
    PersonalOfferOtherStructureChoiceComponent,
    StructureNameAndAddressComponent,
    StructureContactComponent,
    StructureAccompanimentChoiceComponent,
    StructureChoiceCompletionComponent,
    StructureContactCompletionComponent,
    StructureAccessModalityComponent,
    StructureHoursComponent,
    StructurePmrComponent,
    StructureWebAndSocialNetworkComponent,
    StructurePublicTargetComponent,
    StructureDigitalHelpingAccompanimentComponent,
    StructureTrainingPriceComponent,
    StructureWifiComponent,
    StructureEquipmentsComponent,
    StructureLabelsComponent,
    StructureOtherServicesComponent,
    StructureDescriptionComponent,
    StructureCovidInfoComponent,
    StructureConsentComponent,
    AccountInfoComponent,
    AccountCredentialsComponent,
    FooterFormComponent,
    StructureTypeComponent,
    AccountNewsletterComponent,
    StructureTrainingTypeComponent,
  ],
  imports: [CommonModule, FormViewRoutingModule, SharedModule],
  providers: [PersonalOfferGuard],
})
export class FormViewModule {}
