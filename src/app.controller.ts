import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as process from 'process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/socketio')
  async socketIoTest() {
    return fs
      .readFileSync('./src/ws-test/client/index.html')
      .toString()
      .replace(/{{WS_URL}}/, process.env.WS_URL ?? 'wss://api.grands-pay.com/');
  }
}
