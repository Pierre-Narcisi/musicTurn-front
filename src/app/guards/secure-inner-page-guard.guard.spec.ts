import { TestBed } from '@angular/core/testing';

import { SecureInnerPageGuardGuard } from './secure-inner-page-guard.guard';

describe('SecureInnerPageGuardGuard', () => {
  let guard: SecureInnerPageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureInnerPageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
