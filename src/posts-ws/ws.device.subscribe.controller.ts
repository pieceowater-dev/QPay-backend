import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WsDeviceSubscribeController {
  private socketIdToDeviceId = new Map<string, string>([]);
  private deviceIdToSocket = new Map<string, Socket>([]);

  log(): void {
    console.log(this.socketIdToDeviceId);
    console.log(this.deviceIdToSocket);
  }

  set(deviceId: string, socket: Socket): void {
    this.socketIdToDeviceId.set(socket.id, deviceId);
    this.deviceIdToSocket.set(deviceId, socket);
  }

  getByDeviceId(deviceId: string): Socket {
    return this.deviceIdToSocket.get(deviceId);
  }

  getBySocketId(socketId: string): string {
    return this.socketIdToDeviceId.get(socketId);
  }

  deleteBySocketId(socketId: string): void {
    const deviceId = this.socketIdToDeviceId.get(socketId);
    if (deviceId !== undefined) {
      this.socketIdToDeviceId.delete(socketId);
      this.deviceIdToSocket.delete(deviceId);
    }
  }

  readonly deviceActionMap = new Map<string, ActionDevice>();

  async checkDevice(deviceId: string, txn_id: string) {
    const socket = this.getByDeviceId(deviceId);
    socket.emit('kaspi-check', {
      txn_id,
    });
    const promise = new Promise<string>((resolve) => {
      this.deviceActionMap.set(txn_id, { resolver: resolve });
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
