import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocketService } from '../../providers/socket-service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {
  todo = {
    id: null,
    name: ''
  };
  todos: any;

  constructor(public navCtrl: NavController,
              private socketService: SocketService) {
    this.socketService.addCollection('todos');
    this.socketService.addSubscription('todos', 'allTodos')
    .subscribe(data => {
      console.log("Component received todos : ");
      console.log(data);
      if (data) {
        this.todos = data;
      } else {
        this.todos = null;
      }
    });
  }

  saveTodo() {
    let self = this;
    console.log('in saveTodo and socket is: ', this.socketService.socket);
    if (!this.todo.id) {
      this.todo.id = Math.ceil(Math.random() * 1000);
    }
    this.socketService.pubData('todos', 'saveTodo', this.todo, function(savedToLocal) {
        console.log('savedToLocal : ', savedToLocal);
        self.todo = {
          id: null,
          name: ''
        };
    });
  }

  removeTodo(todo) {
    this.socketService.pubData('todos', 'deleteTodo', todo, function(savedToLocal) {
        console.log('savedToLocal : ', savedToLocal);
    });
  }

  editTodo(todo) {
    this.todo = todo;
  }

}
