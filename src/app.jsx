import xs from 'xstream'
import {GroceryList} from './components/grocery-list'
import {div, input, p, makeDOMDriver, h2} from '@cycle/dom';

export function App(sources) {
    const groceryList = GroceryList(sources);

    const vtree$ = xs.from(groceryList.DOM)
        .map((groceryList) => 
        <div>
            <h1>Paprika</h1>
            <div>{groceryList}</div>
        </div>
    )
    const sinks = {
        DOM: vtree$,
        HTTP: groceryList.HTTP
    }
    return sinks
}
