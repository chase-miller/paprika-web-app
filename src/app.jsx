import xs from 'xstream';
import { GroceryList } from './components/grocery-list';
import { Credentials } from './components/credentials';
import { div, input, p, makeDOMDriver, h2 } from '@cycle/dom';

export function App(sources) {
    const creds = Credentials(sources);
    const groceryList = GroceryList({
        ...sources,
        creds$: creds.creds
    });


    const vtree$ = xs.combine(groceryList.DOM, creds.DOM)
        .map(([groceryList, creds]) =>
            <div>
                <h1>Paprika</h1>
                <div>{creds}</div>
                <div>{groceryList}</div>
            </div>
        );
    const sinks = {
        DOM: vtree$,
        HTTP: groceryList.HTTP
    };
    return sinks;
}
