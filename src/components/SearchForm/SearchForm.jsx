import css from "./SearchForm.module.css";

export default function SearchForm({ handleSubmit, onChange }) {
  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        name="inputValue"
        onChange={onChange}
        className={css.inputForm}
      />
      <button type="submit" className={css.buttonForm}>
        Search
      </button>
    </form>
  );
}