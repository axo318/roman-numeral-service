import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import {RomanNumeralConverterService} from './roman-numeral-converter/roman-numeral-converter.service';

describe('AppController', () => {
  let appController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [RomanNumeralConverterService],
    }).compile();

    appController = app.get(AppController);
  });

  describe('root', () => {
    it('should return hello', () => {
      expect(appController.getHello()).toBe('hello');
    });
  });
});
