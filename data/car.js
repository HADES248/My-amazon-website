class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor (productDetails) {
    this.brand = productDetails.brand;
    this.model = productDetails.model;
  }

  displayInfo() {
    console.log(`${this.brand}, ${this.model}, is trunk open = ${this.isTrunkOpen}, Speed: ${this.speed} Km/h`);
  }

  go() {
    if (this.isTrunkOpen) return console.log('the trunk is open therefore the car cannot move');
    if (this.speed >= 200) return console.log('Over the Speed limit');
    this.speed += 5;
  }

  brake() {
    if (this.speed <= 0) return console.log('Speed can never be negative');
    this.speed -= 5;
  }
  
  openTrunk() {
    if (!this.isTrunkOpen && this.speed === 0 ) return this.isTrunkOpen = true;
    console.log('The Trunk cannot be opened as the car is moving');
  }

  closeTrunk() {
    if (this.isTrunkOpen) return this.isTrunkOpen = false;
  }
}

const Toyota = new Car({
  brand: 'Supera',
  model: 'V8'
});

const Tesla = new Car({
  brand: 'Model 3',
  model: 'V11'
});

class RaceCar extends Car {
  accleration;

  constructor(productDetails) {
    super(productDetails);
    this.accleration = productDetails.accleration;
  }

  go() {
    if (this.speed >= 300) return console.log('Over the Speed limit');
    this.speed += this.accleration;
  }

  displayInfo() {
    console.log(`${this.brand}, ${this.model}, accleration ${this.accleration} and speed: ${this.speed} Km/h`)
  }

  openTrunk() {
    return 'It has no Trunk';
  }
  closeTrunk() {
    return 'It has no Trunk';
  }
}

const Mcqueen = new RaceCar ({
  brand: 'McLaren',
  model: 'F1',
  accleration: 20
})

Mcqueen.go();

Mcqueen.displayInfo();

Toyota.go();

Toyota.displayInfo();
