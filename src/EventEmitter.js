export class EventEmitter {
  // 登録する [イベント名, Set(リスナー関数)] を管理するMap
  #listeners = new Map();

  addEventListener(type, listener) {
    // 指定したイベントに対応するSetを取得し、リスナー関数を登録する
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }
    const listenerSet = this.#listeners.get(type);
    listenerSet.add(listener);
  }

  /**
   * 指定したイベントをディスパッチする
   * @param {string} type イベント名
   * @returns
   */
  emit(type) {
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    });
  }

  /**
   * 指定したイベントのイベントリスナーを解除する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type, listener) {
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }

}
