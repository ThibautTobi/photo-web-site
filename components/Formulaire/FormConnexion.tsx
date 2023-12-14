'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Grid, Button, TextField } from '@mui/material';
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

    const handleSignInGoogle = () => {
        signIn('google', { callbackUrl: '/' });
    };

    const handleSignInGitHub = () => {
        signIn('github', { callbackUrl: '/' });
    };

  return (
    /****************************************************** avant grosse modification  */
    // <form onSubmit={handleSubmit(onSubmit)} noValidate>
    //   <TextField
    //     label="Non ou Email"
    //     variant="outlined"
    //     autoComplete="username"
    //     fullWidth
    //     margin="normal"
    //     {...register("identifiant", { required: "Username or Email is required" })}
    //     error={!!errors.identifiant}
    //     helperText={errors.identifiant?.message}
    //     defaultValue=""
    //   />

    //   <TextField
    //     label="Mot de passe"
    //     type="password"
    //     variant="outlined"
    //     autoComplete="current-password"
    //     fullWidth
    //     margin="normal"
    //     {...register("password", { required: "Password is required" })}
    //     error={!!errors.password}
    //     helperText={errors.password?.message}
    //     defaultValue=""
    //   />

    //   <Button type="submit" fullWidth variant='outlined' color="primary">
    //     Sign In
    //   </Button>
    //   <p className='m-4'> ou </p>
    //   {/* Boutons pour la connexion avec Google et GitHub */}
    //   {/* <Button onClick={handleSignInGoogle} fullWidth variant='outlined' color="secondary">
    //     Se connecter avec Google
    //   </Button> */}
    //   <Button onClick={handleSignInGitHub} fullWidth variant='outlined' color="secondary">
    //     Se connecter avec GitHub
    //   </Button>
    // </form>


    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-md mx-auto bg-slate-100 p-6 rounded shadow-lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nom ou Email"
            variant="outlined"
            autoComplete="username"
            fullWidth
            margin="normal"
            {...register("identifiant", { required: "Username or Email is required" })}
            error={!!errors.identifiant}
            helperText={errors.identifiant?.message}
            defaultValue=""
          />
        </Grid>

        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Se Connecter
          </Button>
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <p>ou</p>
        </Grid>

        {/* Boutons pour la connexion avec Google et GitHub */}
        {/* <Grid item xs={12}>
          <Button onClick={handleSignInGoogle} fullWidth variant="outlined" color="secondary">
            Se connecter avec Google
          </Button>
        </Grid> */}

        <Grid item xs={12}>
          <Button onClick={handleSignInGitHub} fullWidth variant="contained" color="primary">
            Se connecter avec GitHub
          </Button>
        </Grid>
      </Grid>
  </form>
  );
}
