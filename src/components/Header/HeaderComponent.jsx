import './header.css';
import Switch from "react-switch";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/darkSlice';

function HeaderComponent() {

    const [dark, setDark] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        async function getTronWeb() {            

            let tronWeb;

            if (window.tronLink.ready) {
            
                tronWeb = tronLink.tronWeb;

                
            } else {
                
                const res = await tronLink.request({ method: 'tron_requestAccounts' });
                console.log(res);
                
                if (res.code === 200) {
                
                    tronWeb = tronLink.tronWeb;
                }
            }

            return tronWeb;
          }

        getTronWeb();

    }, []);

    const toggle = () => {

        const contextWindow = document.querySelector(`header`).parentNode;
        const toggleDark = !dark;

        setDark(toggleDark);
        dispatch(toggleDarkMode(toggleDark));

        const deleteDark = contextWindow.className.split(' ');
        const htmlDomObject = document.querySelector('html');

        contextWindow.className = `${ contextWindow.className.split(' ')[0] } ${ deleteDark[deleteDark.length - 1] !== 'dark' ? 'dark' : '' }`;
        htmlDomObject.className = `${ htmlDomObject.className.split(' ')[0] } ${ deleteDark[deleteDark.length - 1] !== 'dark' ? 'dark' : '' }`;

    }

    return (
        <>
            <header>
                <h1 className={ dark ? 'dark' : 'light' }>Backoffice</h1>
                <div className={ "toggle-mode-div" + (dark ? ' dark' : ' light') }>
                    <ion-icon name="moon-outline"></ion-icon>
                    <Switch 
                        onColor= { '#5c6bc0' }
                        uncheckedIcon = { false }
                        checkedIcon = { false }
                        onChange={ toggle } 
                        checked={ dark } />
                </div>
            </header>
        </>
    );

}

export default HeaderComponent;