import { useState } from "react";
import { isValidQueryType, type FormObject, type QueryType } from "../types";
import { formVaidator, isValidEmailAddress } from "../libs";

export default function ContactForm() {
    const [formData, setFormData] = 
        useState<FormObject>({firstName: '', lastName: '', email: '', queryType: undefined, message: '', consent: false});
    const [errorFlag, setErrorFlag] = useState({
        'firstName': false, 'lastName': false, 'email': false, 'queryType': false, message: false, consent: false});

    // const [errorFlag, setErrorFlag] = useState(new Map([
    //     ['firstName', formData.firstName.length === 0], 
    //     ['lastName', formData.lastName.length === 0], 
    //     ['email', !isValidEmailAddress(formData.email)], 
    //     ['queryType', !isValidQueryType(formData.queryType)], 
    //     ['message', formData.message.length === 0],
    //     ['consent', !formData.consent],
    // ]));
        
    const errorMessage = {
        firstName: 'The field is required',
        lastName: 'The field is required',
        email: 'Please enter a valid email address',
        queryType: 'Please select a query type',
        consent: 'To submit this form, please consent to being contacted',
        message: 'The field is required',
    }
    function updateErrorFlag(name: string, value: string | QueryType | boolean) {
        if(formVaidator(name, value)) {
            setErrorFlag(prev => ({...prev, [name]: false}))
        } else {
            setErrorFlag(prev => ({...prev, [name]: true}))
        }
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        updateErrorFlag(name, value);

        setFormData(prev => ({...prev, [name]:value}));
    }
    function handleChangeCheckBox (event) {
        const { value, checked } = event.target;

        updateErrorFlag('consent', value);

        setFormData((prev) => ({...prev, consent: checked}));
    };
    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        let ok = true;
        for(let key in formData) {
            if(updateErrorFlag(key, formData[key as keyof FormObject]) === false) {
                ok = false;
            }
        }

        if(ok) return true;
        else return false;
    }

    return (
        <form className='flex flex-col bg-gray-100 text-gray-800 rounded-xl'>
            <h1 className='text-3xl'>Contact Us</h1>
            <div className="full-name flex flex-col items-center sm:flex-row sm:gap-4">
                {/* <div className='fname-card' > */}
                    <label htmlFor="first-name" className={"w-full flex flex-col my-2" + `${errorFlag.firstName ? ' error': ''}`}>
                        First Name *
                        <input 
                            className='px-4 py-1'
                            type="text" 
                            id='first-name' 
                            name='firstName'
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                        {errorFlag.firstName && <p className='text-sm text-red-600'>{errorMessage.firstName}</p>}
                    </label>
                {/* </div> */}
                {/* <div className='lname-card'> */}
                    <label htmlFor="last-name" className={"w-full flex flex-col" + `${errorFlag.firstName ? ' error': ''}`}>
                        Last Name *
                        <input 
                            className='px-4 py-1'
                            type="text" 
                            id='last-name' 
                            name='lastName'
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                        {errorFlag.lastName && <p className='text-sm text-red-600'>{errorMessage.lastName}</p>}
                    </label>
                {/* </div> */}
            </div>
            <div className='email-card w-full' >
                <label htmlFor="email" className={"flex flex-col" + `${errorFlag.firstName ? ' error': ''}`}>
                    Email *
                    <input 
                        className='px-4 py-1'
                        type="email" 
                        id='email' 
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {errorFlag.email && <p className='text-sm text-red-600'>{errorMessage.email}</p>}
                </label>
            </div>
            <fieldset className='query-card flex flex-col' >
                <p>Query Type *</p>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                    <label htmlFor="query-general" 
                        className={'w-full px-4 py-2 my-2 border-1 border-gray-300 rounded-sm' + `${errorFlag.firstName ? ' error': ''}`}>
                        <input 
                            className='mx-4'
                            type="radio" 
                            id='query-general' 
                            name='queryType'
                            onChange={handleChange}
                            value='queryGeneral'
                            checked={formData.queryType === 'queryGeneral'}
                        />
                        General Enquiry
                    </label>
                    <label htmlFor="query-support" 
                        className={'w-full px-4 py-2 my-2 border-1 border-gray-300 rounded-sm' + `${errorFlag.firstName ? ' error': ''}`}>
                        <input 
                            className='mx-4'
                            type="radio" 
                            id='query-support' 
                            name='queryType'
                            onChange={handleChange}
                            value='querySupport'
                            checked={formData.queryType === 'querySupport'}
                        />
                        Support Request
                    </label>
                </div>
                {errorFlag.queryType && <p className='text-sm text-red-600'>{errorMessage.queryType}</p>}
            </fieldset>
            <div className='message w-full' >
                <label htmlFor="message" className={"flex flex-col" + `${errorFlag.firstName ? ' error': ''}`}>
                    Message *
                    <textarea 
                        id='last-name' 
                        name='message'
                        onChange={handleChange}
                        value={formData.message}
                        rows={7}
                    />
                    {errorFlag.message && <p className='text-sm text-red-600'>{errorMessage.message}</p>}
                </label>
            </div>
            <label className={'flex flex-col' + `${errorFlag.firstName ? ' error': ''}`}>
                <div className='flex flex-row items-center gap-4'>
                    <input className="flex flex-col"
                        type='checkbox' 
                        id='consent-box' 
                        name='consentBox' 
                        value='consent'
                        onChange={handleChangeCheckBox}
                        checked={formData.consent}/>
                    <p>I consent to being contacted by the team *</p>
                </div>
                {errorFlag.consent && <p className='text-sm text-red-600'>{errorMessage.consent}</p>}
            </label>
            <button
                className='w-full py-2 bg-green-800 text-gray-100 rounded-lg'
                onClick={handleSubmit}
            >
                Submit
            </button>
        </form>
    )
}