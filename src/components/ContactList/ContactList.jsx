import { ContactData } from './ContactData';
import { ContactListWrapper } from './ContactList.styled.js';

export const ContactList = ({ data, onDelete }) => {
  return (
    <ContactListWrapper>
      <ContactData data={data} onDelete={onDelete} />
    </ContactListWrapper>
  );
};
