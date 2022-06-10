import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RomanNumeralConverterService } from './roman-numeral-converter/roman-numeral-converter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RomanNumeralConverterService],
})
export class AppModule {}
