import { useState } from "react";
import { useRouter } from 'next/navigation';
import useRequest from "../../hooks/use-request";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { doRequest, errors } = useRequest({ url: '/api/users/signup', method: 'post', body: { email, password }, onSuccess: () => router.push('/') });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
