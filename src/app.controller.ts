import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/socketio')
  async socketIoTest() {
    return fs.readFileSync('./src/ws-test/client/index.html').toString();
  }
}
