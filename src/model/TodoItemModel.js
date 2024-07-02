let todoIdx = 0;

export class TodoItemModel {
  /**
   * @param {number} id
   * @param {string} title
   * @param {boolean} completed Todoアイテムが完了済みならtrue, そうでないならfalse
   */
  /**
   * @param {{ title: string, completed: boolean}} param0
   */
  constructor({ title: string, completed: boolean }) {
    this.id = todoIdx++;
    this.title = string;
    this.completed = boolean;
  }
}
