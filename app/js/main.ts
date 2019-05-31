interface Info {
  name: string;
  age: number;
  sayHi():void;
}

class Caico implements Info {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`I am ${this.name}, ${this.age} yeads old;`);
  }
}

const caico = new Caico('Caico', 25);
caico.sayHi();