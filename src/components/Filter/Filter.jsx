import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import css from './Filter.module.css';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    return (
        <div className={css.filterContainer}>
            <div className={css.filterWrapper}>
                <label className={css.label}>
                    Find contacts by name
                    <input
                        className={css.input}
                        type="text"
                        value={filter}
                        onChange={e => dispatch(changeFilter(e.target.value))}
                        placeholder="Search contacts..."
                    />
                </label>
            </div>
        </div>
    );
};

export default Filter; 