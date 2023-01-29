import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Drug } from '@frontend/drugs';

@Injectable()
export class SocketService {
  constructor(private socket: Socket) {}

  sendQuery(query: string) {
    this.socket.emit('on-search', query);
  }

  getData(): Observable<Drug[]> {
    return this.socket.fromEvent('drugs')
  }
}
