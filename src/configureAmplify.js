import Amplify from 'aws-amplify';
import { config } from './config';

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      // identityPoolId: config.cognito.identityPoolId,
      region: config.cognito.region,
      // identityPoolRegion: config.cognito.identityPoolRegion,
      userPoolId: config.cognito.userPoolId,
      userPoolWebClientId: config.cognito.userPoolWebClientId,
    }
  });
};
