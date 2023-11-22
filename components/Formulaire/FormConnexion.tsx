'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import Alert from '@mui/material/Alert';
import { FormData } from '@/types/types';

export default function FormConnexion() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
 // const router = useRouter();
  const { status } = useSession();
  
console.log('status : ', status)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data envoyer : ', data)
    const result = await signIn('credentials', {
      redirect: false,
      identifiant: data.identifiant,
      password: data.password,
    });

console.log('resultat recu : ', result)

    if (result?.error) {
      alert(result.error);
    } 
    // else {
    // //   router.push('/Login');

    // }
  };

  if (status === 'authenticated') {
    // router.push('/');
    console.log(`status c'est good :`, status)
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Non ou Email"
        variant="outlined"
        autoComplete="username"
        fullWidth
        margin="normal"
        {...register("identifiant", { required: "Username or Email is required" })}
        error={!!errors.identifiant}
        helperText={errors.identifiant?.message}
        defaultValue=""
      />

      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        autoComplete="current-password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        defaultValue=""
      />

      <Button type="submit" fullWidth variant='outlined' color="primary">
        Sign In
      </Button>
    </form>
  );
}
