import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  socketObserver: any; 
  socketService: any;
  collections: any;
  port = 'http://localhost:2000';
  socket: any;

  constructor() {
    this.socketService = Observable.create(observer => {
      this.socketObserver = observer;
    });
  }


  initialize() {
    console.log("Initializing sockets...");
    let self = this;
    this.socket = io.connect(this.port);

    this.socket.on("connect", (msg) => {
      console.log('on connect');
      // self.socketObserver.next({ category: 'connect', message: 'user connected'});
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
    });

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
    });
    
    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
    });

    this.socket.on('disconnect', function () {
      console.log('user disconnected');
      // io.emit('user disconnected');
    });

    // "Sub-Socket" for each collection
    var c = [
      {
      'name': 'todos',
      'subscribers': {
          'allTodos': this.renderAllTodos
      },
    }];
    c.forEach(coll => {
      var name = coll.name;
      var _s = io.connect(self.port + '/' + name);
      console.log(Object.keys(coll.subscribers));
      Object.keys(coll.subscribers).forEach(mthd => {
        console.log(coll.subscribers[mthd]);
          _s.on(mthd, coll.subscribers[mthd]);
      });
      self.collections[name] = _s;
    });
  }

  saveTodo(todo) {
    console.log('in saveTodo and socket is: ', this.socket);
    this.collections['todos'].emit('saveTodo', todo);
    // this.socketObserver.next({ category: 'saveTodo', todo: todo });
  }

  renderAllTodos(data) {
    console.log('socket returned data');
    console.log(data);
    // this.socketObserver.next({ category: 'message', message: msg });
  }

}