import { Socket } from 'socket.io';

export class WsDeviceSubscribeController {
  // TODO refactor to injectable service

  private constructor() {}

  private static instance: WsDeviceSubscribeController;

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new WsDeviceSubscribeController();
    }
    return this.instance;
  }

  private socketIdToDeviceId = new Map<string, string>([]);
  private deviceIdToSocket = new Map<string, Socket>([]);

  log() {
    console.log(this.socketIdToDeviceId);
    console.log(this.deviceIdToSocket);
  }

  set(deviceId: string, socket: Socket) {
    this.socketIdToDeviceId.set(socket.id, deviceId);
    this.deviceIdToSocket.set(deviceId, socket);
  }

  getByDeviceId(deviceId: string): Socket {
    return this.deviceIdToSocket.get(deviceId);
  }

  getBySocketId(socketId: string): string {
    return this.socketIdToDeviceId.get(socketId);
  }

  deleteBySocketId(socketId: string) {
    const deviceId = this.socketIdToDeviceId.get(socketId);
    if (deviceId !== undefined) {
      this.socketIdToDeviceId.delete(socketId);
      this.deviceIdToSocket.delete(deviceId);
    }
  }
}
