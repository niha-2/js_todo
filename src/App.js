import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

export class App {

  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {id: number, completed: boolean} param0
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {id: number}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  /**
   * TODOのタイトルを更新するときに呼ばれるリスナー関数
   * @param {id: number, titile: string}
   */
  handleEditSave({ id, title }) {
    this.#todoListModel.editSaveTodo({ id, title });
  }

  mount() {
    const createButtonElement = document.querySelector("#create-btn");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");

    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      // todoItemsに対応するTodoListViewを作成する
      const todoListElement = this.#todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
        onEditTodo: ({ id, title }) => {
          this.handleEditSave({ id, title });
        }
      });

      const todoItemCountElement = element`<p>全てのタスク：${this.#todoListModel.getTotalCount()}  完了済み：${this.#todoListModel.getCompletedCount()}  未完了：${this.#todoListModel.getTotalCount() - this.#todoListModel.getCompletedCount()}</p>`;
      todoListElement.appendChild(todoItemCountElement);
      render(todoListElement, containerElement);
    })


    // TODO追加
    createButtonElement.addEventListener("click", (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = ""
    });


  }
}
