import './home.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/darkSlice';

function Home () {

    const toggleDark = useSelector(toggleDarkMode);
    
    const [wallets, setWallets] = useState([]);
    const [walletsTemp, setWalletsTemp] = useState([]);
    const [search, setSearch] = useState('');
    const url = 'https://gestorpayments.herokuapp.com/';
    const headers = { 
        'Content-type': 'application/json'
    };

    useEffect(() => {        

        fetchWalletsData();

    }, []);

    const searchWallet = () => {
        
        const searchWallet = wallets.filter((wallet) => wallet.user_wallet.includes(search));        
        setWalletsTemp(searchWallet);

    }

    const fetchWalletsData = () => {
        
        fetch(url + 'users', headers).then(data => data.json()).then(data => {

            setWallets(data.wallets);
            setWalletsTemp(data.wallets);

        }).catch(e => console.log(e));

    }

    const toggleWallet = async (status, wallet) => {

        try {

            const valuesToSend = {
                status,
                wallet
            };

            const body = {
                method: 'PUT',
                body: JSON.stringify(valuesToSend),
                headers
            };
            
            await fetch(url + 'users', body);

            fetchWalletsData();
            alert('Estado modificado');

        } catch (e) {
            
            console.log(e);
            alert(e);

        }
    }

    return (
        <>
            <div 
                className={ `container-home ${ toggleDark.payload.dark.value ? 'dark' : undefined }`}>
                <form>
                    <label 
                        className={ `${ toggleDark.payload.dark.value ? 'dark' : undefined }`}
                        htmlFor="wallet">Buscar Wallet:</label>
                    <input 
                        value={ search }
                        onChange={ (e) => setSearch(e.target.value) }
                        className={ `${ toggleDark.payload.dark.value ? 'dark' : undefined }`}
                        type="text" 
                        placeholder="Buscar..."
                        name="wallet" />
                    <input type="button" value="BUSCAR WALLET" onClick={ searchWallet } />
                </form>
                <table>
                    <thead>
                        <tr>
                            <td>WALLET</td>
                            <td>ESTADO</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(walletsTemp).map((wallet, i) => {
                                return (
                                    <tr key={ i }>                                        
                                        <td>{ wallet.user_wallet }</td>
                                        <td>                                            
                                            <button 
                                                className={ 'toggle-wallet-' + wallet.status ? 'activate' : 'deactivate' }
                                                onClick={ () => toggleWallet(!wallet.status, wallet.user_wallet) }>
                                                { wallet.status ? 'DESACTIVAR' : 'ACTIVAR' }
                                            </button>
                                        </td>
                                    </tr>);
                            })
                        }                    
                    </tbody>
                </table>
            </div>
        </>
    );

}

export default Home;