import { EventEmitter } from "../EventEmitter.js";
import { TodoItemModel } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
  #items;

  /**
   *
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items = []) {
    super();
    this.#items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.#items.length;
  }

  /**
   * 完了済みのTodoItemの個数を返す
   */
  getCompletedCount() {
    return this.#items.filter(item => item.completed).length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.#items;
  }

  /**
   * TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * 状態が変更されたときに呼ぶ、登録済みのりスナー関数を呼び出す
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したIDのTodoItemのcompletedを更新する
   * @param {{ id: number, completed: boolean}} param0
   * @returns
   */
  updateTodo({ id, completed }) {
    const todoItem = this.#items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したIDのTodoItemを削除する
   * @param { id: number } param0
   */
  deleteTodo({ id }) {
    // idに一致しないTodoItemだけを残すことで、idに一致するTodoItemを削除する
    this.#items = this.#items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }

  /**
   * 指定したIDのTodoItemのTodoを更新する
   * @param {id: number, title: string}
   * @returns
   */
  editSaveTodo({ id, title }) {
    const todoItem = this.#items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.title = title;
    this.emitChange();
  }

}
