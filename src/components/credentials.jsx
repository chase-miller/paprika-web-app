import xs from 'xstream';
import { div, p, label, h } from '@cycle/dom';

export function Credentials(sources) {
    const username$ = sources.DOM.select('.username')
        .events('input')
        .map(ev => {
            return {
                type: 'usernameChanged',
                val: ev.target.value
            };
        });

    const password$ = sources.DOM.select('.password')
        .events('input')
        .map(ev => {
            return {
                type: 'passwordChanged',
                val: ev.target.value
            };
        });

    const state$ = xs.merge(username$, password$)
        .fold((data, action) => {
            if (action.type === 'usernameChanged') {
                return {
                    ...data,
                    username: action.val
                };
            }

            if (action.type === 'passwordChanged') {
                return {
                    ...data,
                    password: action.val
                };
            }

            return {
                ...data
            };
        }, {
            username: '',
            password: ''
        });

    const vtree$ = state$
        .map(({username, password}) =>
            div('', [
                div('', [
                    label('.username', ['Username']),
                    h('input.username', {props: {type: 'text'}}),
                    label('.password', ['Password']),
                    h('input.password', {props: {type: 'password'}}),
                ]),
                div('', [
                    p('', [`Username: ${username}`]),
                    p('', [`Password: ${password}`]),
                ]),
            ])
        );

    return {
        DOM: vtree$,
        creds: state$
    };
}