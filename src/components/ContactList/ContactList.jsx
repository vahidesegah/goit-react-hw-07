import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts, selectIsLoading, selectError } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import css from './ContactList.module.css';

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    if (isLoading) {
        return <div>Loading contacts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={css.contactGrid}>
            {contacts.map(({ id, name, number }) => (
                <div key={id} className={css.contactCard}>
                    <div className={css.contactInfo}>
                        <span className={css.name}>{name}</span>
                        <span className={css.phone}>{number}</span>
                    </div>
                    <button
                        className={css.button}
                        type="button"
                        onClick={() => dispatch(deleteContact(id))}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ContactList; 