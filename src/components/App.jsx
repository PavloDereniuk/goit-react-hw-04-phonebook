import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './General.styled';
import { useState, useEffect } from 'react';

const storageKey = 'contact-list';

export const App = () => {
  const users = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(users);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = window.localStorage.getItem(storageKey);
  
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts]);

  const updateFilter = newFilter => {
    setFilter(newFilter);
  };

  const addContact = newContact => {
    const newEntry = {
      ...newContact,
      id: nanoid(),
    };

    let contactExists = false;

    setContacts(
      contacts.map(contact => {
        if (contact.name === newEntry.name) {
          contactExists = true;
          window.alert(`${contact.name} is alredy in contacts.`);
        }
        return contact;
      })
    );

    if (!contactExists) {
      setContacts(prevItems => [...prevItems, newEntry]);
    }
  };

  const deleteContact = contactID => {
    setContacts(prevState => {
      return prevState.filter(item => item.id !== contactID);
    });
  };

  const filteredData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2>Contacts</h2>
      <Filter filters={filter} onUpdateFilter={updateFilter} />
      {contacts.length > 0 && (
        <ContactList data={filteredData} onDelete={deleteContact} />
      )}
    </Container>
  );
};
