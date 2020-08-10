import {
  interactor,
  scoped,
  clickable,
  selectable,
  fillable,
  is,
  isPresent,
} from '@bigtest/interactor';

import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class ContributorsInteractor {
  makeFirstContributorPrimary = clickable('button[data-test-primary-toggle-button]');
  clickAddNewContributor = clickable('#clickable-add-contributor-add-button');
  fillNameField = fillable('[name="instance.contributors[0].name"]');
  selectNameTypeField = selectable('[name="instance.contributors[0].contributorNameTypeId"]');
}

@interactor class LocationLookupInteractor {
  isLoaded = isPresent('#locationId[aria-disabled="false"]');
  clickOnLocationBtn = clickable('#locationId');
  chooseFirstLocation = clickable('#option-locationId-1-53cf956f-c1df-410b-8bea-27f712cca7c0');
  clickSaveBtn = clickable('[data-test-button-save]');
  isClosed = isPresent('#location-form');

  whenClosed() {
    return this.when(() => !this.isClosed);
  }

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}

@interactor class FormInteractor {
  contributors = new ContributorsInteractor();
  fillTitleField = fillable('#input_instance_title');
  issnField = fillable('#issn');
  isbnField = fillable('#isbn');
  selectInstanceType = selectable('#select_instance_type');
  openLocationLookup = clickable('[data-test-location-lookup-button]');
  openHoldingAccordion = clickable('#accordion-toggle-button-holding');
}

@interactor class ModalInteractor {
  form = new FormInteractor('[data-test-create-records-form]');
  clickSaveButton = clickable('#save-records');
  clickCancel = clickable('#cancel');
}

@interactor class CreateRecordsWrapperInteractor {
  button = scoped('[data-test-add-inventory-records]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new ModalInteractor('[data-test-create-records-modal]');

  callout = new CalloutInteractor();
  locationLookup = new LocationLookupInteractor();
}

export default CreateRecordsWrapperInteractor;
