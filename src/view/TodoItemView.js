import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";

export class TodoItemView {

  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id: number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id: number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {function({id: number, title: string})} onEditTodo 編集保存ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s> <button class="edit">編集</button> <button class="delete">削除</button></li>`
      : element`<li><input type="checkbox" class="checkbox">${todoItem.title} <button class="edit">編集</button> <button class="delete">削除</button></li>`;

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
      if (confirm("本当によろしいですか？")) {
        onDeleteTodo({
          id: todoItem.id
        });
      }
    });

    // TODO編集
    const editButtonElement = todoItemElement.querySelector(".edit");
    editButtonElement.addEventListener("click", () => {
      const editItemElement = element`<li><input id="js-form-edit-input" class="edit-todo" type="text" placeholder="What need to be done?" autocomplete="off" /><button id="save-btn">保存</button></li>`;

      // 置き換える
      todoItemElement.replaceWith(editItemElement);

      const saveButtonElement = editItemElement.querySelector("#save-btn");
      const inputElement = editItemElement.querySelector("#js-form-edit-input");
      saveButtonElement.addEventListener("click", () => {
        onEditTodo({
          id: todoItem.id,
          title: inputElement.value
        });
      });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;

  }
}
