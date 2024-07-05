import React, { useState } from 'react';
import { register } from '../services/auth';

const Register = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: 'buyer'
    });

    const { firstName, lastName, email, password, phone, role } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register(formData).then(() => {
            props.history.push('/login');
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required />
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" required />
                <select name="role" value={role} onChange={onChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};




  /*  const { firstName, lastName, email, password, phone, role } = formData;
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!firstName) tempErrors.firstName = 'First Name is required';
        if (!lastName) tempErrors.lastName = 'Last Name is required';
        if (!email) tempErrors.email = 'Email is required';
        if (!password) tempErrors.password = 'Password is required';
        if (!phone) tempErrors.phone = 'Phone is required';
        return tempErrors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }
        register(formData).then(() => {
            props.history.push('/login');
        }).catch(err => {
            setErrors({ general: err.response.data.message });
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required />
                {errors.firstName && <span>{errors.firstName}</span>}
                <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required />
                {errors.lastName && <span>{errors.lastName}</span>}
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                {errors.email && <span>{errors.email}</span>}
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                {errors.password && <span>{errors.password}</span>}
                <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" required />
                {errors.phone && <span>{errors.phone}</span>}
                <select name="role" value={role} onChange={onChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Register</button>
                {errors.general && <span>{errors.general}</span>}
            </form>
        </div>
    );
*/
export default Register;
