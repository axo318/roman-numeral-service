import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should respond with correct Roman numeral', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?query=137')
      .expect(200)
      .expect('CXXXVII');
  });

  it('should fail because input is not numeric', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?query=1a')
      .expect(400)
      .expect({
        'statusCode':400,
        'message':'Validation failed (numeric string is expected)',
        'error':'Bad Request'
      });
  });

  it('should fail because input is a decimal', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?query=1.1')
      .expect(400)
      .expect({
        'statusCode':400,
        'message':'Validation failed (numeric string is expected)',
        'error':'Bad Request'
      });
  });

  it('should fail because input is less than 0', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?query=-1')
      .expect(400)
      .expect({
        'statusCode':400,
        'message':'Number must be greater or equal to 0'
      });
  });

  it('should fail because input is too big', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?query=4000000000')
      .expect(400)
      .expect({
        'statusCode':400,
        'message':'Number must be smaller or equal to 3999999999'
      });
  });
});
