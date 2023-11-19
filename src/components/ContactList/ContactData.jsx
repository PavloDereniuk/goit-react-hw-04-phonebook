export const ContactData = ({ data, onDelete }) => {
  return data.map(({ name, number, id }) => {
    return (
      <li key={id}>
        {name}: {number} <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    );
  });
};
