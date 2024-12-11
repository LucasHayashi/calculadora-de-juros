import { TestBed } from '@angular/core/testing';

import { DadosService } from './dados.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DadosService', () => {
  let service: DadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
