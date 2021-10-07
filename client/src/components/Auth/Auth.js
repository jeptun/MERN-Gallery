import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './stylesAuth';
import { signin, signup } from '../../actions/auth';

/*⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️*/
/*⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️*/


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) =>{
        const result = res?.profileObj; // je undefined !  v přípdě bez otazníku  nelze získat vlastnost profileObj z undefined
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token} });

            history.push('/')
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) =>{
        console.log(error);
        console.log("Google přihlášení se nepovedlo. Zkus akci opakovat.");
    };


    /*🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽*/
    /*🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽🚽*/

    return (
     <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Vytvoření profilu' : 'Přihlášení'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>                                
                                <Input name="firstName" label="Jméno" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Příjmení" handleChange={handleChange} half />    
                            </>
                        )}
                        <Input name="email" label="Email adresa" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Heslo" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Potvrď heslo" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit"  fullWidth variant="contained" color="primary" className={classes.submit}>                   
                    { isSignup ? 'Vytvoření' : 'Přihlášení'}
                </Button>
                <GoogleLogin
                    clientId="876275936948-ra7f946uqgunsv0nvaagtksqmsps9uj5.apps.googleusercontent.com"
                    render={(renderProps) =>(
                        <Button 
                        className={classes.googleButton}
                         color='primary' 
                         fullWidth 
                         onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                           startIcon={<Icon />}
                            variant="contained"> Google přihlášení  
                            </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item >
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
     </Container>
    );
};

export default Auth;
