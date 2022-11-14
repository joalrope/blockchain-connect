import { useState } from 'react';
import { useSelector } from 'react-redux';
import { read, utils } from 'xlsx';
import { toggleDarkMode } from '../../redux/slices/darkSlice';
import TronWeb from "tronweb";

function Transactions ()
{

    const toggleDark = useSelector( toggleDarkMode );

    const [ walletsTemp, setWalletsTemp ] = useState( [] );

    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    // set in .env file
    // VITE_PRIVATE_KEY = "E07FA44D864D5EC8DFF590C65E36029E28513DC2AF6CB345C772FFC857926DEC"
    const url = 'https://gestorpayments.herokuapp.com/';
    const headers = { 'Content-type': 'application/json' };

    async function getTronWeb ()
    {

        const tronWeb = new TronWeb(
            'https://api.trongrid.io',
            'https://api.trongrid.io',
            'https://api.trongrid.io',
            privateKey
        );

        window.tronWeb = tronWeb;

    }

    const sendTransactions = async ( walletsToTransfer ) =>
    {

        try
        {

            for ( let i = 0; i < walletsToTransfer.length; i++ )
            {

                const fromAddress = "TZDCUCy3Wn1HhJVseANdrhzqDYCTEue8xT";

                const { amount, wallet } = walletsToTransfer[ i ];

                if ( window.tronWeb && window.tronWeb.defaultAddress.base58 )
                {

                    const transaction = tronWeb.transactionBuilder.sendTrx( wallet, amount, fromAddress );
                    const valuesToSend = {
                        transaction_id: transaction.toString(),
                        transaction_date: new Date(),
                        user_wallet: wallet,
                        transaction_value: amount
                    };

                    const body = {
                        method,
                        body: JSON.stringify( valuesToSend ),
                        headers
                    };

                    const registerDB = await fetch( url, body );

                    if ( registerDB )
                    {

                        alert( "Congratulation registration: successful" );
                    }


                } else
                {
                    return alert( 'Error, sesion failed' );
                }
            }

        } catch ( e )
        {

            console.log( e );
            return alert( 'Error during transactions' );

        }
    };

    const readExcel = async ( excel ) =>
    {

        try
        {

            let fileReader = new FileReader();
            fileReader.onload = function ( e )
            {

                let data = e.target.result;
                let workbook = read( data, {
                    type: "binary"
                } );

                workbook.SheetNames.forEach( async sheet =>
                {

                    try
                    {

                        let rowObject = utils.sheet_to_json( workbook.Sheets[ sheet ], { header: "A" } );
                        let walletsToTransfer = rowObject;

                        await getTronWeb();

                        const walletsToTransferTemp = walletsToTransfer.map( v =>
                        {

                            return { amount: v.B, wallet: v.A };

                        } );

                        setWalletsTemp( walletsToTransferTemp );

                    } catch ( e )
                    {
                        console.log( e );
                    }

                } );
            };

            fileReader.readAsBinaryString( excel );

        } catch ( e )
        {

            console.log( e );

        }
    };

    return (
        <>
            <div className="transactions-container">
                <form className={toggleDark.payload.dark.value ? 'dark' : undefined}>
                    <label htmlFor="excel" className={toggleDark.payload.dark.value ? 'dark' : undefined}>Subir excel:</label>
                    <input
                        type="file"
                        name="excel"
                        onChange={( e ) => { readExcel( e.target.files[ 0 ] ); }} />
                    <input type="button" onClick={() => sendTransactions( walletsTemp )} value={"ENVIAR"} />
                </form>
                <table>
                    <thead>
                        <tr>
                            <td>WALLET</td>
                            <td>MONTO</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from( walletsTemp ).map( ( wallet, i ) =>
                            {
                                return (
                                    <tr key={i}>
                                        <td>{wallet.wallet}</td>
                                        <td>{wallet.amount}</td>
                                    </tr>
                                );
                            } )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );

}

export default Transactions;