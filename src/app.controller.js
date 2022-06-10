import { Controller, Dependencies, Get } from '@nestjs/common';
import { RomanNumeralConverterService } from './roman-numeral-converter/roman-numeral-converter.service';

@Controller()
@Dependencies(RomanNumeralConverterService)
export class AppController {
  constructor(romanNumeralConverterService) {
    this.romanNumeralConverterService = romanNumeralConverterService;
  }

  @Get()
  getHello() {
    return this.romanNumeralConverterService.getHello();
  }
}
