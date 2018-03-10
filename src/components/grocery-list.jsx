import xs from 'xstream'
import { div, button, ul } from '@cycle/dom'
import { GroceryItem } from './grocery-item';
const _ = require('lodash');
import Collection from '@cycle/collection';

export function GroceryList(sources) {

    const clicked$ = sources.DOM.select('.refresh-groceries').events('click');

    const getGroceryList$ = xs.merge(clicked$, xs.of(''))
        .map(() => {
            return {
                url: `http://localhost:8080/groceries?user=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                category: 'groceryList',
                method: 'GET'
            }
        });

    const groceryList$ = sources.HTTP.select('groceryList')
        .flatten()
        .map(res => {
            const result = JSON.parse(res.text).result;
            return {
                props$: result
            };
        });

    const groceryItems$ = Collection(GroceryItem, sources, groceryList$);
    const groceryItemsVtrees$ = Collection.pluck(groceryItems$, item => item.DOM);

    const vtree$ = groceryItemsVtrees$
        .map(vtrees => 
            div('', 'Grocery List', [
                'Grocery List',
                ul('', vtrees),
                button('.refresh-groceries', 'Refresh')
            ])
        )
    const sinks = {
        DOM: vtree$,
        HTTP: getGroceryList$
    }
    return sinks
}
