import xs from 'xstream'
import { div, li } from '@cycle/dom'

export function GroceryItem(sources) {
    const vtree$ = sources.props$
        .map(item => 
            <li>
                <span>{item.aisle} - {item.name}</span>
            </li>
        );

    return {
        DOM: vtree$,
    }
}