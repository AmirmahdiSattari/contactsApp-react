
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2'

const ContactsApp = () => {

    const notifyAdd = () => toast("Item Added Successfuly");
    const notifyDel = () => toast("Item Deleted Successfuly");


    const [contacts, setContacts] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [relation, setRelation] = useState('Friend');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');


    const validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            emailError: '',
            phoneError: '',
        };

        if (fullName.length < 3) {
            isError = true;
            errors.nameError = 'Name must be at least 3 characters long';
        }

        if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            isError = true;
            errors.emailError = 'Email is not valid';
        }

        if (
            !/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(
                phoneNumber
            )
        ) {
            isError = true;
            errors.phoneError = 'Phone number is not valid';
        }

        if (isError) {

            setNameError(errors.nameError);
            setEmailError(errors.emailError);
            setPhoneError(errors.phoneError);

        }

        return isError;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = validate();

        if (!err) {
            const newContact = {
                fullName,
                email,
                phoneNumber,
                relation,
            };
            const updatedContacts = [...contacts, newContact];
            setContacts(updatedContacts);
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setRelation('Friend');
            notifyAdd();
        }
    };

    const handleDelete = (index) => {


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                //Delete item
                const updatedContacts = [...contacts];
                updatedContacts.splice(index, 1);
                setContacts(updatedContacts);
                notifyDel();

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    };


    const handleEdit = (index) => {
        const { fullName, email, phoneNumber, relation } = contacts[index];
        setFullName(fullName);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setRelation(relation);
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    return (
        <div className='w-screen h-screen'>
            <h1 className='flex w-screen items-center 
            justify-center py-4 bg-slate-800 h-[10%]
            text-white font-bold'>Contacts App</h1>
            <form onSubmit={handleSubmit}
                className=" flex  my-4 px-4 w-full
                h-[15%]
            flex-wrap py-6 shadow-2xl justify-evenly">

                <div>
                    <input
                        className='border-b mx-2 border-black
                m-1'
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className='text-red-500 flex'>{nameError}</div>
                </div>
                <div>
                    <input
                        className='border-b mx-2 border-black
                m-1'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='text-red-500 flex'>{emailError}</div>
                </div>
                <div>
                    <input
                        className='border-b mx-2 border-black
                m-1'
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div className='text-red-500 flex'>{phoneError}</div>
                </div>
                <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                    <option value="Friend">Friend</option>
                    <option value="Family">Family</option>
                    <option value="Colleague">Colleague</option>
                </select>
                <button type="submit" className='
                bg-slate-800 text-white p-2 my-4
                rounded font-semibold'>Add Contact</button>
            </form>
            <div>
                {contacts.map((contact, index) => (
                    <div key={index} className="bg-slate-200 sm:w-[50%]
                md:w-[30%]
                flex flex-col m-2 p-3 rounded-2xl shadow-2xl
                items-start justify-evenly">

                        <p className='p-1'>
                            <span className='text-slate-600 pr-2 font-semibold'>
                                Full Name:
                            </span>
                            {contact.fullName} </p>
                        <p className='p-1'>
                            <span className='text-slate-600 pr-2 font-semibold'>
                                Email:
                            </span>
                            {contact.email}</p>
                        <p className='p-1'>
                            <span className='text-slate-600 pr-2 font-semibold'>
                                Phone Number:
                            </span>
                            {contact.phoneNumber}</p>
                        <p className='p-1'>
                            <span className='text-slate-600 pr-2 font-semibold'>
                                Relation:
                            </span>
                            {contact.relation}</p>
                        <div className='flex w-full m-2
                    items-center justify-evenly'>
                            <button className='bg-slate-600 w-[30%]
                        px-2 py-1 rounded-md shadow-xl text-white' onClick={() => handleDelete(index)}>Delete</button>
                            <button className='bg-slate-600 w-[30%]
                        px-2 py-1 rounded-md shadow-xl text-white' onClick={() => handleEdit(index)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    );
}

export default ContactsApp;