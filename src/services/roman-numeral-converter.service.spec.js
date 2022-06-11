import { Test } from '@nestjs/testing';
import { RomanNumeralConverterException, RomanNumeralConverterService } from './roman-numeral-converter.service';

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

  it('should throw exception when number is less than 0', () => {
    expect(() => service.toRoman(-1)).toThrowError(RomanNumeralConverterException);
  });

  it('should throw exception when number is greater than 3999999999', () => {
    expect(() => service.toRoman(4000000000)).toThrowError(RomanNumeralConverterException);
  });

  it('should return correct roman numerals for power of 0', () => {
    expect(service.toRoman(1)).toEqual('I');
    expect(service.toRoman(3)).toEqual('III');
    expect(service.toRoman(4)).toEqual('IV');
    expect(service.toRoman(5)).toEqual('V');
    expect(service.toRoman(7)).toEqual('VII');
    expect(service.toRoman(9)).toEqual('IX');
  });

  it('should return correct roman numerals for power 1', () => {
    expect(service.toRoman(10)).toEqual('X');
    expect(service.toRoman(17)).toEqual('XVII');
    expect(service.toRoman(40)).toEqual('XL');
    expect(service.toRoman(50)).toEqual('L');
    expect(service.toRoman(90)).toEqual('XC');
  });

  it('should return correct roman numerals for power 2', () => {
    expect(service.toRoman(100)).toEqual('C');
    expect(service.toRoman(177)).toEqual('CLXXVII');
    expect(service.toRoman(400)).toEqual('CD');
    expect(service.toRoman(500)).toEqual('D');
    expect(service.toRoman(900)).toEqual('CM');
  });

  it('should return correct Vinculum numerals', () => {
    expect(service.toRoman(1000)).toEqual('I̅');
    expect(service.toRoman(4000)).toEqual('I̅V̅');
    expect(service.toRoman(10000)).toEqual('X̅');
    expect(service.toRoman(100000)).toEqual('C̅');
    expect(service.toRoman(1000000)).toEqual('I̿');
    expect(service.toRoman(10000000)).toEqual('X̿');
    expect(service.toRoman(100000000)).toEqual('C̿');
    expect(service.toRoman(1000000000)).toEqual('M̿');
  });
});
