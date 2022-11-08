import {
  AnimateToOptions,
  TransitionInOptions,
  TransitionOptions,
  TransitionSettings,
  TransitionStyleOptions,
} from "./type";

export class TransitionBuilder {
  private static _defaultBackTransitions: {
    out: TransitionSettings;
    in: TransitionSettings;
  } = {
    out: {
      transitionStyle: "spring",
      halfswipe: true,
      animateTo: "right",
    },
    in: {
      animateFrom: "left",
      animateTo: "center",
      halfswipe: false,
      transitionStyle: "spring",
    },
  };
  private static _defaultNextTransitions: {
    out: TransitionSettings;
    in: TransitionSettings;
  } = {
    out: {
      transitionStyle: "spring",
      halfswipe: true,
      animateTo: "left",
    },
    in: {
      animateFrom: "right",
      animateTo: "center",
      transitionStyle: "spring",
      halfswipe: false,
    },
  };

  static getDefaultBack(): { in: Transition; out: Transition } {
    return {
      out: new Transition(this._defaultBackTransitions.out),
      in: new Transition(this._defaultBackTransitions.in),
    };
  }

  static getDefaultNext(): { in: Transition; out: Transition } {
    return {
      in: new Transition(this._defaultNextTransitions.in),
      out: new Transition(this._defaultNextTransitions.out),
    };
  }

  static swipeInFrom(
    direction: TransitionInOptions,
    options: { transitionTiming: number } = { transitionTiming: 250 }
  ): Transition {
    return new Transition({
      animateTo: "center",
      animateFrom: direction,
      transitionStyle: "timing",
      transitionTiming: options.transitionTiming
    });
  }

  static springInFrom(direction: TransitionInOptions): Transition {
    return new Transition({
      animateFrom: direction,
      animateTo: 'center',
      transitionStyle: 'spring'
    })
  }

  static create(settings: TransitionSettings): Transition {
    return new Transition(settings);
  }
}

export class Transition {
  private _transitionIn: TransitionOptions;
  private _transitionOut: TransitionOptions;
  private _animateTo: AnimateToOptions;
  private _halfswipe: boolean;
  private _transitionStyle: TransitionStyleOptions;
  private _transitionTiming: number;
  private _animateFrom: AnimateToOptions;

  get animateTo() {
    return this._animateTo;
  }
  get transitionIn() {
    return this._transitionIn;
  }
  get animateFrom() {
    return this._animateFrom;
  }
  get transitionOut() {
    return this._transitionOut;
  }
  get halfswipe() {
    return this._halfswipe;
  }
  get transitionStyle() {
    return this._transitionStyle;
  }
  get transitionTiming() {
    return this._transitionTiming;
  }

  constructor({
    animateTo,
    halfswipe,
    transitionIn,
    transitionOut,
    transitionStyle,
    transitionTiming,
    animateFrom,
  }: TransitionSettings) {
    this._animateTo = animateTo;
    this._transitionIn = transitionIn;
    this._transitionOut = transitionOut;
    this._transitionStyle = transitionStyle;
    this._halfswipe = halfswipe;
    this._transitionTiming = transitionTiming;
    this._animateFrom = animateFrom;
  }
}
