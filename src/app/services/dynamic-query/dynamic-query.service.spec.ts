import { TestBed } from '@angular/core/testing';

import { DynamicQueryService } from './dynamic-query.service';

describe('DynamicQueryService', () => {
  let service: DynamicQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
