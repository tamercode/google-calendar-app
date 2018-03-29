import { TestBed, inject } from '@angular/core/testing';

import { ApiLoaderService } from './api-loader-service';

describe('ApiLoaderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLoaderService]
    });
  });

  it('should be created', inject([ApiLoaderService], (service: ApiLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
