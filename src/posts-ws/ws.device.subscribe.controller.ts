import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CheckRequestKaspiDto } from '../kaspiapi/dto/check.request.kaspi.dto';
import { PayRequestKaspiDto } from '../kaspiapi/dto/pay.request.kaspi.dto';

@Injectable()
export class WsDeviceSubscribeController {
  private socketIdToDeviceId = new Map<string, number>([]);
  private deviceIdToSocket = new Map<number, Socket>([]);

  log(): void {
    console.log(this.socketIdToDeviceId);
    console.log(this.deviceIdToSocket);
  }

  set(deviceId: number, socket: Socket): void {
    this.socketIdToDeviceId.set(socket.id, deviceId);
    this.deviceIdToSocket.set(deviceId, socket);
  }

  getByDeviceId(deviceId: number): Socket {
    return this.deviceIdToSocket.get(deviceId);
  }

  deleteBySocketId(socketId: string): void {
    const deviceId = this.socketIdToDeviceId.get(socketId);
    if (deviceId !== undefined) {
      this.socketIdToDeviceId.delete(socketId);
      this.deviceIdToSocket.delete(deviceId);
    }
  }

  readonly deviceActionMap = new Map<string, ActionDevice>();

  async checkDevice(
    deviceId: number,
    key: string,
    data: CheckRequestKaspiDto,
  ): Promise<string> {
    return await this.deviceRequest(deviceId, 'kaspi-check', key, data);
  }

  async payDevice(
    deviceId: number,
    key: string,
    data: PayRequestKaspiDto,
  ): Promise<string> {
    return await this.deviceRequest(deviceId, 'kaspi-pay', key, data);
  }

  private async deviceRequest<T>(
    deviceId: number,
    eventKey: string,
    key: string,
    data: T,
  ): Promise<string> {
    const socket = this.getByDeviceId(deviceId);
    socket.emit(eventKey, data);
    const promise = new Promise<string>((resolve) => {
      this.deviceActionMap.set(key, { resolver: resolve });
    });
    return await Promise.race([
      promise,
      this.wait(5000).then((e) => {
        throw e;
      }),
    ]);
  }

  async wait(milliseconds: number): Promise<string> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve('TIMEOUT');
      }, milliseconds);
    });
  }
}

interface ActionDevice {
  resolver: (value: unknown) => void;
}
