const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector( '#domoName' ).value
    const age = e.target.querySelector( '#age' ).value

    if (!name || !age) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, onDomoAdded);
    return false;
}

const DomoForm = (props) => {
    return(
        <form id="domoForm"
        onSubmit={(e) => (e, props.triggerReload)}
        name='domoForm'
        action="/maker"
        method = "POST"
        className='domoForm'
        >
            <label htmlFor="domoName">Domo Name: </label>
            <input type="text" id="domoName" name="name" placeholder='Domo Name' />
            
            <label htmlFor="age">Age: </label>
            <input type="number" id="domoAge" name="age" min="0" />

            <input className="makeDomoSubmit" type='submit' value="Make Domo"/>
        </form>
    )
}

const Domolist = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();

    }, [props.reloadDomos]);

    if (domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos yet!</h3>
            </div>
        )
    }

    const domoNodes = domos.map(domo => {
        return (
            <div key={domo.id} className='domo'>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {domo.name}</h3>
                <h3 className='domoAge'>Age: {domo.age}</h3>
            </div>
         );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
}

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return(
        <div>
            <div id='makeDomo'>
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id='domos'>
                <Domolist domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    )
}

const init = () => { 
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
window.onload = init;