import { HttpException } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(message) {
    super(message, 400);
  }
}