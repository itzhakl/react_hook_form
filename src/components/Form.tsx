import { useForm } from "react-hook-form";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

export default function App() {
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        // Validate

        if (!data.username || data.username.length < 2) {
            alert("Username required and minimum 2 chars");
            return;
        }

        if (!data.email || !isEmail(data.email)) {
            alert("Email required and should be valid format");
            return;
        }

        if (!data.password) {
            alert("Password required");
            return;
        }

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                {...register("username")}
            />

            <input
                {...register("email")}
            />

            <input
                {...register("password")}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

function isEmail(email: string) {
    // Custom email regex check
    
}