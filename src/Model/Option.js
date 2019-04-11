// @flow

type A11y = {
    pa11yLogin: {
        startUrl: string,
        endUrl: string
    }
};

export default class Option {
    a11y: A11y;

    constructor(option: any) {
        Object.assign(this, option);
    }
}
