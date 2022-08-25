import {useRef} from 'react';
import {useState} from 'react';

const Withdraw = () => {
    const firstRef = useRef(null);
    const [err, setErr] = useState('');

    const handleSubmit = async () => {
        try {
          const response = await fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/accounts/withdraw/" + firstRef.current.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
        })
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          console.log('result is: ', JSON.stringify(result, null, 4));
    
        } catch (err) {
          setErr(err.message);
        } finally {
            firstRef.current.value = '';
        }
      };

    return (
        <div>
        <label htmlFor="input">Withdraw Funds</label>
        <form id="input" onSubmit={handleSubmit}>
            <input ref={firstRef} id="first_name" name="first_name" type="text" />

            <button type="submit">Transfer</button>
        </form>
        </div>
    );
};

export default Withdraw;