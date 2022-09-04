export const actionRoutes = {
  authSignup: 'signup',
  authToken: 'signin',

  userInfo: '',
  userChangeInfo: '',

  authCheckUniqueUserName: 'check-unique-user-name',
  authCheckUniqueEmail: 'check-unique-email',

  rfpCreate: 'create',
  rfpUpdate: 'update',
  rfpGet: 'get',
  rfpDelete: 'delete',
  rfpGetAll: 'get-all',

  offerCreate: 'create',
  offerGet: 'get',
  offerDelete: 'delete',
  offerGetForRfp: 'get-for-rfp',

  dealSheetCreate: 'create',
};

export const controllerRoutes = {
  auth: '/api/auth/',
  user: '/api/user/',
  rfp: '/api/rfp/',
  offer: '/api/offer/',
  dealSheet: '/api/deal-sheet/',
};

export const authTokenRequestNames = {
  grantType: 'grant_type',
  clientId: 'client_id',
  username: 'username',
  password: 'password',
  scope: 'scope',
};

export const authTokenRequestValues = {
  password: 'password',
  scope: 'IdentityServerApi openid',
};

export const socketPrefix = '/ws';
