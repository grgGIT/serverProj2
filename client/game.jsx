const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

// Helper function to fetch user data
const fetchUserData = async () => {
    const response = await fetch('/getUserData');
    return response.json();
};

// Helper function to fetch account list
const fetchAccountList = async () => {
    const response = await fetch('/getAccountList');
    return response.json();
};

//creates a "Tag" game where the selected user is controllable and npcs of the other saved accounts can be spawned to play tag a long with them
const Game = () => {
    const [color, setColor] = useState('#ff0000');
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [userData, setUserData] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [itPlayer, setItPlayer] = useState(null);

    useEffect(() => {
        // Fetch user data and account list on component mount
        fetchUserData().then(data => setUserData(data));
        fetchAccountList().then(data => setAccounts(data));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newX = position.x;
            let newY = position.y;
            switch (e.key) {
                case 'ArrowUp':
                    newY -= 10;
                    break;
                case 'ArrowDown':
                    newY += 10;
                    break;
                case 'ArrowLeft':
                    newX -= 10;
                    break;
                case 'ArrowRight':
                    newX += 10;
                    break;
                default:
                    break;
            }
            setPosition({ x: newX, y: newY });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position]);

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const spawnNPC = (account) => {
        // Logic to spawn an NPC with random movement and hue
        const npc = {
            username: account.username,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            isIt: false
        };
        setNpcs([...npcs, npc]);
    };

    const checkCollision = () => {
        npcs.forEach(npc => {
            if (Math.abs(npc.position.x - position.x) < 50 && Math.abs(npc.position.y - position.y) < 50) {
                if (itPlayer === userData.username) {
                    setItPlayer(npc.username);
                    npc.isIt = true;
                }
            }
        });
    };

    useEffect(() => {
        checkCollision();
    }, [position, npcs]);

    // gives a game page with instructions and UI
    return (
        <div>
            <h1>Welcome to the Game!</h1>
            <div>
                <h2>Instructions</h2>
                <p>Use arrow keys to move your character.</p>
                <p>Select a color for your character:</p>
                <input type="color" value={color} onChange={handleColorChange} />
            </div>
            <div style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: '50px',
                height: '50px',
                backgroundColor: color,
                backgroundImage: 'url(assets/img/domoface.jpeg)',
                backgroundSize: 'cover',
                border: itPlayer === userData?.username ? '5px solid gold' : 'none'
            }}>
                {userData?.username}
            </div>
            <div>
                <h2>Accounts</h2>
                <ul>
                    {accounts.map(account => (
                        <li key={account.username} onClick={() => spawnNPC(account)}>
                            {account.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Tag Game Rules</h2>
                <p>Tag other players or NPCs to make them "it".</p>
                <p>Current "It": {itPlayer}</p>
            </div>
        </div>
    );
};

//creates on click of the button in the app.handlebar
const init = () => {
    const startButton = document.getElementById('startGameButton');
    startButton.addEventListener('click', () => {
        const root = createRoot(document.getElementById('app'));
        root.render(<Game />);
    });
};

window.onload = init;
module.exports = Game;