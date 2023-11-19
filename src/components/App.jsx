import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './General.styled';
import { useState, useEffect } from 'react';

const storageKey = 'contact-list';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = window.localStorage.getItem(storageKey);
    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    }
  }, [contacts]);

  useEffect(() => {
    setFilter(prevState => {
      if (prevState !== filter) {
        window.localStorage.setItem(storageKey, JSON.stringify(contacts));
      }
    });
  }, [filter]);

  const updateFilter = newFilter => {
    setFilter(newFilter);
  };

  const addContact = newContact => {
    const item = {
            ...newContact,
            id: nanoid(),
          };
      
    let contactExists = false;

    setContacts(
      contacts.map(item => {
        if (contacts.name === item.name) {
          contactExists = true;
          window.alert(`${contacts.name} is alredy in contacts.`);
        }
        return contacts.name;
      })
    );

    if (!contactExists) {
      setContacts(prevItems => [...prevItems.contacts, item]);
    }
  };

  const deleteContact = contactID => {
    setContacts(prevState =>
      prevState.contacts.filter(item => item.id !== contactID)
    );
  };

  // const filteredData = contacts.filter(item => {
  //   const filterName = item.name.toLowerCase().includes(filter.toLowerCase());
  //   return filterName;
  // });

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

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = window.localStorage.getItem(storageKey);
//     if (savedContacts !== null) {
//       this.setState({
//         contacts: JSON.parse(savedContacts),
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.filters !== this.state.contacts) {
//       window.localStorage.setItem(
//         storageKey,
//         JSON.stringify(this.state.contacts)
//       );
//     }
//   }

//   updateFilter = newFilter => {
//     this.setState({
//       filter: newFilter,
//     });
//   };

//   addContact = newContact => {
//     const contact = {
//       ...newContact,
//       id: nanoid(),
//     };

//     let contactExists = false;

//     this.state.contacts.map(contacts => {
//       if (contacts.name === contact.name) {
//         contactExists = true;
//         window.alert(`${contacts.name} is alredy in contacts.`);
//       }
//       return contacts.name;
//     });

//     if (!contactExists) {
//       this.setState(prevState => {
//         return {
//           contacts: [...prevState.contacts, contact],
//         };
//       });
//     }
//   };

//   deleteContact = contactID => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(item => item.id !== contactID),
//       };
//     });
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const filteredData = contacts.filter(item => {
//       const filterName = item.name.toLowerCase().includes(filter.toLowerCase());

//       return filterName;
//     });

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm onAdd={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter filters={filter} onUpdateFilter={this.updateFilter} />
//         {contacts.length > 0 && (
//           <ContactList data={filteredData} onDelete={this.deleteContact} />
//         )}
//       </Container>
//     );
//   }
// }
