import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { App } from './app';
import { Credentials } from './components/credentials';
import { makeHTTPDriver } from '@cycle/http';

const main = Credentials;

const drivers = {
    DOM: makeDOMDriver('#root'),
    HTTP: makeHTTPDriver()
};

run(main, drivers);
