import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RomanNumeralConverterService } from './services/roman-numeral-converter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RomanNumeralConverterService],
})
export class AppModule {}
