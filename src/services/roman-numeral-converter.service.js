import { Injectable } from '@nestjs/common';
import { ServiceException } from '../common/service.exception';


export const SV = '\u0305';           // single Vinculum
export const DV = '\u033F';           // double Vinculum

export class RomanNumeralConverterException extends ServiceException {}

@Injectable()
export class RomanNumeralConverterService {
  minimumNumber = 0;
  maximumNumber = 3999999999;

  romanUniqueValues = [9, 5, 4, 1];   // Numbers that have unique roman symbols
  romanUniqueSymbols = [
    ['IX', 'V', 'IV', 'I'],           // Power of 0 (*10^0)
    ['XC', 'L', 'XL', 'X'],           // Power of 1 (*10^1)
    ['CM', 'D', 'CD', 'C'],           // Power of 2 (*10^2)
    ['', '', '', 'M']                 // Power of 9 (*10^9)
  ];

  /**
   * Converts an integer to a roman numeral string representation
   * @public
   * @param {number} num - Number to be converted
   * @throws {RomanNumeralConverterException}
   * @returns {string} Roman numeral string
   */
  toRoman(num) {
    this.validateNumber(num);

    const digits = Array.from(String(num), Number);
    const maxPower = digits.length - 1;

    const romanNumeralList = digits.map((digit, index) =>
      this.convertDigitWithPowerOfTen(digit, maxPower - index)
    );

    return romanNumeralList.join('');
  }

  /**
   * Throws errors if number is not valid for conversion
   * @private
   * @param {number} num - Number to be validated
   * @throws {RomanNumeralConverterException}
   */
  validateNumber(num) {
    if (num < this.minimumNumber) {
      throw new RomanNumeralConverterException(`Number must be greater or equal to ${this.minimumNumber}`);
    }
    if (num > this.maximumNumber) {
      throw new RomanNumeralConverterException(`Number must be smaller or equal to ${this.maximumNumber}`);
    }
  }

  /**
   * Converts single digit (0-9) in its correct roman string representation
   * taking into account its power of 10.
   * Eg. 5 * 10^2^ = 500 => 'D'
   * @private
   * @param {number} digit - Single digit to be converted
   * @param {number} power - Power of 10 digit is raised to
   * @returns {string} Roman numeral string representation of the digit
   */
  convertDigitWithPowerOfTen(digit, power) {
    const characterMap = this.getCharacterValueMap(power);
    let romanString = '';

    characterMap.forEach((value, romanSymbol) => {
      const repetitions = Math.floor(digit / value);
      const toConcat = romanSymbol.repeat(repetitions);
      romanString = romanString.concat(toConcat);
      digit = digit % value;
    });

    return this.applyVinculum(romanString, power);
  }

  /**
   * Creates a Map with roman characters mapped to their value for the specified
   * power of 10.
   * Eg.  10^0^ => {'IX': 9, 'V': 5, 'IV': 4, 'I': 1}
   *      10^1^ => {'XC': 9, 'L': 5, 'XL': 4, 'X': 1}
   * @private
   * @param {number} power - Number representing power of 10 in range [0-9]
   * @returns {Map<string, number>} Map containing appropriate roman symbols
   */
  getCharacterValueMap(power) {
    const m = new Map();
    const symbolIndex = power < 9 ? power % 3 : 3;
    this.romanUniqueSymbols[symbolIndex].forEach((romanNumeral, i) => {
      m.set(romanNumeral, this.romanUniqueValues[i]);
    });
    return m;
  }

  /**
   * Applies Vinculum literal to the given roman numeral string according to its
   * power of 10
   * eg. IV * 10^3^ => Vinculum(IV)
   * @private
   * @param {string} numeralString - Roman numeral string
   * @param {number} power - Power of 10
   * @returns {string} String with optional Vinculum characters
   */
  applyVinculum(numeralString, power) {
    if (power < 3) {
      return numeralString;
    }

    const vinculum = power < 6 ? SV : DV;
    return Array.from(numeralString)
      .map(char => char.concat(vinculum))
      .join('');
  }
}
