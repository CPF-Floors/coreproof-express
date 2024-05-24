class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  hasElements() {
    return this.items.length > 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    return this.items.toString();
  }

  clear() {
    this.items = [];
  }
}

export default Queue;
