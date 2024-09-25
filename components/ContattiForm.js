"use client"

import React, {useState} from 'react'
import '../app/contatti/Contatti.css'

export default function ContattiForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [object, setObject] = useState('')
    const [message, setMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        return;
    }
    return (
        <form onSubmit={handleSubmit} className='form-contatti'>
              <label htmlFor='name-input'>Nome: </label>
              <input 
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id='name-input'
                  placeholder='Nome'
              />
              <label>Email: </label>
              <input 
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email-input'
                  placeholder='Email'
              />
              <label htmlFor='object-input'>Oggetto: </label>
              <input 
                  type='text'
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  id='object-input'
                  placeholder='Oggetto'
              />
              <label htmlFor='message-input'>Messaggio: </label>
              <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id='message-input'
                  rows="5"
                  maxLength="400" 
                  placeholder='Messaggio'
              />
              <button>Invia</button>
          </form>
    )
}