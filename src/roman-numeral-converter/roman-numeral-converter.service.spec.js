import { Test } from '@nestjs/testing';
import { RomanNumeralConverterService } from './roman-numeral-converter.service';

describe('RomanNumeralConverterService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RomanNumeralConverterService],
    }).compile();

    service = module.get(RomanNumeralConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should say hello', () => {
    expect(service.getHello()).toBe('hello');
  });
});
