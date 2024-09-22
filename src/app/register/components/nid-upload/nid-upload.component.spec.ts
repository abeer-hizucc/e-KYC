import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NidUploadComponent } from './nid-upload.component';

describe('NidUploadComponent', () => {
  let component: NidUploadComponent;
  let fixture: ComponentFixture<NidUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NidUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NidUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
