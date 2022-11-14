import './aside.css';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/darkSlice';

function AsideMenu () {

    const toggleDark = useSelector(toggleDarkMode);

    return (
        <>
            <aside>
                <ul>
                    <NavLink
                        className={ toggleDark.payload.dark.value ? 'dark' : undefined  } 
                        style={ (isActive) => isActive.isActive ? { 
                            color: '#5c6bc0', 
                            borderRight: '0.3rem solid #5c6bc0' 
                        } 
                            : { 
                                    color: '#313131', 
                                    borderRight: '0.3rem solid transparent' 
                            } } 
                        to={ '/' } end>
                        <li>                                                                        
                            <ion-icon name="home-outline"></ion-icon>
                            <p>Home</p>                            
                        </li>
                    </NavLink>                    
                    <NavLink
                        className={ toggleDark.payload.dark.value ? 'dark' : undefined  } 
                        style={ (isActive) => isActive.isActive ? { 
                            color: '#5c6bc0', 
                            borderRight: '0.3rem solid #5c6bc0' 
                        } 
                            : { 
                                    color: '#313131', 
                                    borderRight: '0.3rem solid transparent' 
                            } } 
                        to={ 'transactions' }>
                        <li>                                            
                            <ion-icon name="cash-outline"></ion-icon>
                            <p>Pagadora</p>        
                        </li>                    
                    </NavLink>
                    
                    <NavLink
                        className={ toggleDark.payload.dark.value ? 'dark' : undefined  } 
                        style={ (isActive) => isActive.isActive ? { 
                            color: '#5c6bc0', 
                            borderRight: '0.3rem solid #5c6bc0' 
                        } 
                            : { 
                                    color: '#313131', 
                                    borderRight: '0.3rem solid transparent' 
                            } } 
                    to={ 'wallets' }>
                        <li>                        
                            <ion-icon name="wallet-outline"></ion-icon>
                            <p>Gestión</p>
                        </li>
                    </NavLink>
                    
                </ul>
            </aside>
        </>
    );

}

export default AsideMenu;