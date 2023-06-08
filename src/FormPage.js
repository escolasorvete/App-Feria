import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormPage.css';
import Logo from './assets/logo-horizontal.png';
import Autosuggest from 'react-autosuggest';

function FormPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [phone, setPhone] = useState('');

    const emailDomains = [
        '@gmail.com',
        '@yahoo.com',
        '@hotmail.com',
        '@outlook.com',
        '@live.com',
        '@live.net',
        '@aol.com',
        '@escolasorvete.com.br',
    ];

    const onEmailChange = (event, { newValue }) => {
        setEmail(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        const domainRegex = /@[\w-]+(\.\w+)+$/;
        if (value.includes('@') && !domainRegex.test(value)) {
            setSuggestions(
                emailDomains.map((domain) => value + domain.slice(1))
            );
        } else {
            setSuggestions([]);
        }
    };

    const theme = {
        input: 'my-input',
        suggestionsContainer: 'my-suggestions-container',
        suggestion: 'my-suggestion',
        suggestionHighlighted: 'my-suggestion-highlighted',
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

    const inputProps = {
        value: email,
        onChange: onEmailChange,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const data = { email, firstName: name, lastName: phone };
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/mailchimp`, data)
            .then((response) => {
                alert('Registration successful!');
                setName('');
                setEmail('');
                setPhone('');
            })
            .catch((error) => {
                console.error(error);
                alert('Registration failed, please try again.');
            });
    };

    return (
        <div className='formcito'>
            <div className='form-container'>
                <div className='logo-container'>
                    <img src={Logo} alt='Logo' className='logo' />
                </div>
                <div className='form-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome:</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <div className='autosuggest-wrapper'>
                                <Autosuggest
                                    theme={theme}
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={
                                        onSuggestionsFetchRequested
                                    }
                                    onSuggestionsClearRequested={
                                        onSuggestionsClearRequested
                                    }
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Telefone:</label>
                            <input
                                type='tel'
                                className='form-control'
                                id='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group-button'>
                            <button type='submit' className='botoncito'>
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormPage;
