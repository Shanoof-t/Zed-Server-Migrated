import express, { Router } from 'express';
import { accessTokenGenerator, emailRegister, emailSignIn, githubAuth, googleAuth, resetPassword, sendOtp, sendResetOtp } from '../controllers/authControllers';

const authRouter :Router = express.Router();

authRouter.post('/otp-request',sendOtp);//done
authRouter.post('/register',emailRegister);//done
authRouter.post('/signin',emailSignIn);//done
authRouter.post('/get-access-token',accessTokenGenerator);//done
authRouter.post('/reset-otp-request',sendResetOtp);//done
authRouter.post('/reset-password',resetPassword);//done
authRouter.post('/auth/google',googleAuth);//done
authRouter.post('/auth/github/callback',githubAuth);

export default authRouter;