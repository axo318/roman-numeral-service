import { Injectable, ExecutionContext, CallHandler, NestInterceptor, Logger, HttpException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
/**
 * @implements {NestInterceptor}
 */
export class MonitorInterceptor {
  logger = new Logger('MonitorInterceptor');

  /**
   * Monitors controller endpoints requests/responses
   * @public
   * @param {ExecutionContext} context
   * @param {CallHandler} next
   * @returns {Observable}
   */
  intercept(context, next) {
    this.logger.log(this.constructRequestLog(context));
    return next
      .handle()
      .pipe(
        tap(
          (result) => this.logger.log(this.constructResponseLog(context, result)),
          (error) => this.logger.error(this.constructErrorLog(context, error))
        )
      );
  }

  /**
   * @private
   * @param {ExecutionContext} context
   * @return {string}
   */
  constructRequestLog(context) {
    const {method, url} = context.switchToHttp().getRequest();
    return `[${context.getClass().name}.${context.getHandler().name}] request ${method}: ${url}`;
  }

  /**
   * @private
   * @param {ExecutionContext} context
   * @param {any} response
   * @return {string}
   */
  constructResponseLog(context, response) {
    return `[${context.getClass().name}.${context.getHandler().name}] response: ${response}`;
  }

  /**
   * @private
   * @param {ExecutionContext} context
   * @param {HttpException} error
   * @return {string}
   */
  constructErrorLog(context, error) {
    return `[${context.getClass().name}.${context.getHandler().name}] failed with ${error}`;
  }
}