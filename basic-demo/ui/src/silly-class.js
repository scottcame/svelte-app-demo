import moment from 'moment';

export class Person {

  constructor(birthdate) {
    this.birthdate = moment(birthdate);
  }

  get birthDayOfWeek() {
    return this.birthdate.format("dddd");
  }

}
