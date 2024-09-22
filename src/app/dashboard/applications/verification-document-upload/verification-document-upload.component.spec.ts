import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDocumentUploadComponent } from './verification-document-upload.component';

describe('VerificationDocumentUploadComponent', () => {
  let component: VerificationDocumentUploadComponent;
  let fixture: ComponentFixture<VerificationDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationDocumentUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
