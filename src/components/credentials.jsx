import xs from 'xstream';
import { div, p, label, h } from '@cycle/dom';

export function Credentials(sources) {
    const username$ = sources.DOM.select('.username')
        .events('input')
        .map(ev => {
            return ev.target.value;
        });

    const password$ = sources.DOM.select('.password')
        .events('input')
        .map(ev => {
            return ev.target.value;
        });

    const state$ = xs.merge(username$, password$)
        .map((username, password) => {
            return {
                username: username,
                password: password
            };
        });

    const vtree$ = state$
        .startWith({
            username: '',
            password: ''
        })
        .map(data =>
            div('', [
                div('', [
                    label('.username', ['Username']),
                    h('input.username', {props: {type: 'text'}}),
                    label('.password', ['Password']),
                    h('input.password', {props: {type: 'password'}}),
                ]),
                div('', [
                    p('', [`Username: ${data.username}`]),
                    p('', [`Password: ${data.password}`]),
                ]),
            ])
            // <div>
            //     <div>
            //         <label for="username">Username</label>
            //         <input type="text" class="username"></input>
            //         <label for="password">Password</label>
            //         <input type="text" class="password"></input>
            //     </div>
            //     <div>
            //         <p>Username: {data.username}</p>
            //         <p>Password: {data.password}</p>
            //     </div>
            // </div>
        );

    return {
        DOM: vtree$,
        creds: state$
    };
}