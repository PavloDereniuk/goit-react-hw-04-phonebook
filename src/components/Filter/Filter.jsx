import { FieldWrapper } from './Filter.styled';

export const Filter = ({ filters, onUpdateFilter }) => {
  return (
    <FieldWrapper>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        value={filters}
        onChange={e => onUpdateFilter(e.target.value)}
      />
    </FieldWrapper>
  );
};
