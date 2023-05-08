class Momentum {
    constructor(id, title) {
      this.id = id;
      this.title = title;
    }
    static Library(id, isCucumber) {
      return new Momentum(id, '');
    }
    static Case(id, title) {
      return new Momentum(id, title);
    }
    static Section(id, title) {
      return new Momentum(id, title);
    }
    static Step(id, title) {
      return {
        run: (fn) => {
          eval(fn);
        },
      };
    }
  }
  module.exports = Momentum;
  