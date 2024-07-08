import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { element, render } from "./view/html-util.js";

export class App {

  #todoListModel = new TodoListModel();

  mount() {
    const createButtonElement = document.querySelector("#create-btn");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    const todoCompletedCountElement = document.querySelector("#js-todo-completed-count");
    const todoUnconpletedCountElement = document.querySelector("#js-todo-uncompleted-count");

    this.#todoListModel.onChange(() => {
      const todoListElement = element`<ul></ul>`;
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s> <button>編集</button> <button class="delete">削除</button></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title} <button>編集</button> <button class="delete">削除</button></li>`;

        // TODO更新
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          })
        })

        // TODO削除
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.#todoListModel.deleteTodo({
            id: item.id
          });
        });

        todoListElement.appendChild(todoItemElement);
      })
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `全てのタスク：${this.#todoListModel.getTotalCount()}`;
      todoCompletedCountElement.textContent = `完了済み：${this.#todoListModel.getCompletedCount()}`;
      todoUnconpletedCountElement.textContent = `未完了：${this.#todoListModel.getTotalCount() - this.#todoListModel.getCompletedCount()}`;
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
