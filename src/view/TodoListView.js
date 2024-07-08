import { TodoItemModel } from "../model/TodoItemModel.js";
import { TodoItemView } from "./TodoItemView.js";
import { element } from "./html-util.js";

export class TodoListView {

  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems
   * @param {function({id: number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id: number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul></ul>`;
    // 各TodoItemモデルに対応したHTML要素を作成し、リスト要素に追加
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onUpdateTodo,
        onDeleteTodo
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
