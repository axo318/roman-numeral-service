import { Bind, Controller, Dependencies, Get, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { RomanNumeralConverterService } from './services/roman-numeral-converter.service';
import { MonitorInterceptor } from './common/monitor.interceptor';

@Controller()
@Dependencies(RomanNumeralConverterService)
@UseInterceptors(MonitorInterceptor)
export class AppController {
  /**
   * @param {RomanNumeralConverterService} romanNumeralConverterService
   */
  constructor(romanNumeralConverterService) {
    this.converterService = romanNumeralConverterService;
  }

  /**
   * @param {number} query - Number to be converted to Roman numerals
   * @returns {string} Roman numeral string representation
   */
  @Get('/romannumeral')
  @Bind(Query('query', ParseIntPipe))
  convertNumberToRomanNumeral(query) {
    return this.converterService.toRoman(query);
  }
}
