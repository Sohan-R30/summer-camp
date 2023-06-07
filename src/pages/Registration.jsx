import { useForm } from "react-hook-form";
const Registration = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
    return (
        <div>
            <p className='text-3xl text-center my-10'>THis is from Registration</p>
        </div>
    );
};

export default Registration;