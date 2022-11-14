import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/darkSlice';

function Wallets () {
    
    const toggleDark = useSelector(toggleDarkMode);

    const [newWallet, setNewWallet] = useState(null);

    const url = 'https://gestorpayments.herokuapp.com/';
    const headers = { 
        'Content-type': 'application/json'
    };

    const addWallet = async () => {
        
        try {

            const valuesToSend = {
                user_wallet: newWallet,
            };

            const body = {
                method: 'POST',
                body: JSON.stringify(valuesToSend),
                headers
            };
            
            let addedWallet = await fetch(url + 'users', body);
            addedWallet = await addedWallet.json();

            alert(addedWallet.message);

        } catch (e) {
            
            console.log(e);

        }

    }

    return (
        <>
            <form 
                className={ `add-wallets ${ toggleDark.payload.dark.value ? 'dark' : '' }`}>
                <label 
                    htmlFor="new-wallet"
                    className={ `add-wallets ${ toggleDark.payload.dark.value ? 'dark' : '' }`} >
                        Añadir wallet:
                </label>
                <input 
                    name="new-wallet"
                    type="text" 
                    className={ `${ toggleDark.payload.dark.value ? 'dark' : '' }` }
                    placeholder="Escribe la wallet"
                    onChange={ (e) => setNewWallet(e.target.value) } />
                <input
                    onClick={ addWallet } 
                    type="button" 
                    value="AÑADIR" />
            </form>
        </>
    );

}

export default Wallets;