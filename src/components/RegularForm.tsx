import { useState, ChangeEvent, FormEvent } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


type Inputs = {
    username: string,
    email: string,
    password: string
};

interface FormData {
    username: string;
    email: string;
    password: string;
}

function RegularForm() {
    const { register, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });    

    const schema = yup.object({
        username: yup.string().required('Username is required').min(2),
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required')
    }).required();


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(JSON.stringify(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Change Me To React Hook Form</h1>
            <div>
                <input
                    {...register('username', {
                        required: "User is required",
                        validate: {
                            minLength: (v) => v.length >= 2,
                            matchPattern: (v) => /^[a-zA-Z0-9_]{5,16}+$/.test(v),
                        }
                    })}
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Enter UserName'
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^(a-z0-9-_?)+@a-z0-9(.a-z0-9)+$/i,
                            message: "invalid email address"
                        }
                    })}
                    type='email'
                    id="email"
                    name="email"
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    {...register(
                        'password', {
                            required: 'password must be fileld',
                            pattern: {
                                value: /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*]).{8,20}$/,
                                message: "invalid password address"
                            }
                    })}
                    type='password'
                    id="password"
                    name="password"
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RegularForm;
