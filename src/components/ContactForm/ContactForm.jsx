import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts, selectIsLoading } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const nameInputRef = useRef(null);

    // Sayfa yüklendiğinde ve işlemler tamamlandığında autofocus
    useEffect(() => {
        nameInputRef.current?.focus();
    }, [contacts.length, isLoading]);

    // Sadece harf girişi için kontrol
    const handleNameChange = (e) => {
        const value = e.target.value;
        // Sadece harf, boşluk, tire ve apostrof karakterlerine izin ver
        if (value === '' || /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s'-]*$/.test(value)) {
            setName(value);
        }
    };

    // Sadece sayı girişi için kontrol
    const handleNumberChange = (e) => {
        const value = e.target.value;
        // Sadece sayı ve bazı özel karakterlere izin ver
        if (value === '' || /^[0-9\s+()-]*$/.test(value)) {
            setNumber(value);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Boşlukları temizle
        const trimmedName = name.trim();
        const trimmedNumber = number.trim();

        // Minimum uzunluk kontrolü
        if (trimmedName.length < 2) {
            alert('Name should be at least 2 characters long');
            return;
        }

        if (trimmedNumber.length < 3) {
            alert('Number should be at least 3 digits long');
            return;
        }

        const isExist = contacts.find(
            contact => contact.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isExist) {
            alert(`${trimmedName} is already in contacts.`);
            return;
        }

        dispatch(addContact({ name: trimmedName, number: trimmedNumber }));
        setName('');
        setNumber('');
    };

    return (
        <div className={css.formContainer}>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.inputGroup}>
                    <label className={css.label}>
                        Name
                        <input
                            ref={nameInputRef}
                            className={css.input}
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter name"
                            minLength="2"
                            required
                        />
                    </label>
                </div>
                <div className={css.inputGroup}>
                    <label className={css.label}>
                        Number
                        <input
                            className={css.input}
                            type="tel"
                            name="number"
                            value={number}
                            onChange={handleNumberChange}
                            placeholder="Enter phone number"
                            minLength="3"
                            required
                        />
                    </label>
                </div>
                <button className={css.button} type="submit">
                    Add contact
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 