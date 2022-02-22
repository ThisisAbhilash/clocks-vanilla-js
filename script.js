const HOUR_HAND = document.querySelector("#hour");
const MINUTE_HAND = document.querySelector("#minute");
const SECOND_HAND = document.querySelector("#second");
const DIGITAL_CLOCK = document.querySelector('.digital_clock h1');

const CLOCK_CONSTANTS = {
  DEGREES: 360,
  HOURS: 12,
  MINUTES: 60,
  SECONDS: 60,
  DEGREE_PER_HOUR: 360 / 12,
  DEGREE_PER_MINUTE: 360 / 60,
  DEGREE_PER_SECOND: 360 / 60,
}
const padZero = (time) => String(time).padStart(2, '0');

class Clock {
  getTimeNow = () => {
    const date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }
}

class AnalogClock extends Clock {
  constructor (hourHand, minuteHand, secondHand) {
    super();
    this.hourHand = hourHand;
    this.minuteHand = minuteHand;
    this.secondHand = secondHand;
    this.interval = this.setInterval();
  }

  getHandDegree = () => {
    const { hour, minute, second } = this.getTimeNow();
    const { HOURS, MINUTES, DEGREE_PER_HOUR, DEGREE_PER_MINUTE, DEGREE_PER_SECOND } = CLOCK_CONSTANTS;
    return {
      hourPosition: (hour * DEGREE_PER_HOUR) + (minute * DEGREE_PER_MINUTE / HOURS),
      minutePosition: (minute * DEGREE_PER_MINUTE) + (second * DEGREE_PER_SECOND / MINUTES),
      secondPosition: second * DEGREE_PER_SECOND
    }
  }

  transform = (handElements, position) => {
    handElements.forEach((elem, i) => elem.style.transform = `rotate(${position[i]}deg)`);
  }

  updateTime = () => {
    this.transform(
      [this.hourHand, this.minuteHand, this.secondHand],
      Object.values(this.getHandDegree())
    )
  }
  setInterval() {
    return setInterval(this.updateTime, 1000);
  }
  clearInterval() {
    this.clearInterval(this.interval);
  }
}

class DigitalClock extends Clock {
  constructor(element) {
    super();
    this.clockElement = element;
    this.interval = this.setInterval();
  }
  updateTime = () => {
    const { hour, minute, second } = this.getTimeNow();
    this.clockElement.textContent = padZero(hour) + ":" + padZero(minute) + ":" + padZero(second);
  }
  setInterval() {
    return setInterval(this.updateTime, 1000);
  }
  clearInterval() {
    this.clearInterval(this.interval);
  }
}

new AnalogClock(HOUR_HAND, MINUTE_HAND, SECOND_HAND);
new DigitalClock(DIGITAL_CLOCK);