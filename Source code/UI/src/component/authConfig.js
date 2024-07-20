// authConfig.js
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
  authority: 'https://dev-33ate4vacw7cjpv4.us.auth0.com', //domain name
  client_id: 'frxB2qt4HZmKeq6v0jP2GzVSrgIRPwXC',
  redirect_uri: 'http://localhost:3000/callback',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  scope: 'openid profile email roles',
  userStore: new WebStorageStateStore({ store: window.localStorage })
};

const userManager = new UserManager(oidcConfig);

export default userManager;
