class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi () {
    return `I am ${this.name}, ${this.age} yeads old`;
  }
}

const person = new Person('Caico', 25);
person.sayHi();
