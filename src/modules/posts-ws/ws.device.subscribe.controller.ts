import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CheckRequestKaspiDto } from '../kaspiapi/dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from '../kaspiapi/dto/pay.request.kaspi.dto';
import { ActionDevice } from './types/ActionDevice';

@Injectable()
export class WsDeviceSubscribeController {
  private socketIdToDeviceId = new Map<string, number>([]);
  private deviceIdToSocket = new Map<number, Socket>([]);
  readonly deviceActionMap = new Map<string, ActionDevice>();

  log(): void {
    console.log(this.socketIdToDeviceId);
    console.log(this.deviceIdToSocket);
  }

  set(deviceId: number, socket: Socket): void {
    this.socketIdToDeviceId.set(socket.id, deviceId);
    this.deviceIdToSocket.set(deviceId, socket);
  }

  deleteBySocketId(socketId: string): void {
    const deviceId = this.socketIdToDeviceId.get(socketId);
    if (deviceId !== undefined) {
      this.socketIdToDeviceId.delete(socketId);
      this.deviceIdToSocket.delete(deviceId);
    }
  }

  async checkDevice(
    deviceId: number,
    key: string,
    data: CheckRequestKaspiDto & { key: string },
  ): Promise<string> {
    return await this.deviceRequest(deviceId, 'kaspi-check', key, data);
  }

  async payDevice(
    deviceId: number,
    key: string,
    data: PayRequestKaspiDto & { key: string },
  ): Promise<string> {
    return await this.deviceRequest(deviceId, 'kaspi-pay', key, data);
  }

  private async deviceRequest<T>(
    deviceId: number,
    eventKey: string,
    key: string,
    data: T,
  ): Promise<string> {
    console.log(`[DEVICE-CHECK] START deviceId: ${deviceId}, key: ${key}`);
    const socket = this.getByDeviceId(deviceId);
    console.log(
      `[DEVICE-CHECK] SOCKET socketId: ${socket.id}, deviceId: ${deviceId}, key: ${key}`,
    );
    socket.emit(eventKey, data);
    console.log(
      `[DEVICE-CHECK] SOCKET EMIT eventKey: ${eventKey}, deviceId: ${deviceId}, key: ${key}`,
    );
    const promise = new Promise<string>((resolve) => {
      this.deviceActionMap.set(key, { resolver: resolve });
    });
    return await Promise.race([
      promise.then((result) => {
        console.log(
          `[DEVICE-CHECK] PROMISE SOLVED eventKey: ${eventKey}, deviceId: ${deviceId}, key: ${key}`,
        );
        return result;
      }),
      this.wait(10000).then((e) => {
        console.log(
          `[DEVICE-CHECK] TIMEOUT, deviceId: ${deviceId}, key: ${key}`,
        );
        throw e;
      }),
    ]);
  }

  private async wait(milliseconds: number): Promise<string> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve('TIMEOUT');
      }, milliseconds);
    });
  }

  private getByDeviceId(deviceId: number): Socket {
    return this.deviceIdToSocket.get(deviceId);
  }
}
