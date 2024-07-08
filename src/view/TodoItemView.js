import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";

export class TodoItemView {

  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id: number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id: number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s> <button>編集</button> <button class="delete">削除</button></li>`
      : element`<li><input type="checkbox" class="checkbox">${todoItem.title} <button>編集</button> <button class="delete">削除</button></li>`;

    // TODO更新
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    // TODO削除
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;

  }
}
