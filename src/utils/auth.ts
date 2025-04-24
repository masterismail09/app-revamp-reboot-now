
// Constants for Cognito configuration
const COGNITO_CONFIG = {
  domain: 'https://ap-south-1cn1xkgrvi.auth.ap-south-1.amazoncognito.com',
  clientId: '40ce95qriabb1vg4llg4quav19',
  redirectUri: 'https://d84l1y8p4kdic.cloudfront.net',
  clientSecret: 'jq2q33r9ds6olclvh23a2d4iv3ghp0qdj9ku7nfa1lu7glkob9q',
};

// Function to generate the login URL
export const getLoginUrl = () => {
  const params = new URLSearchParams({
    client_id: COGNITO_CONFIG.clientId,
    response_type: 'code',
    scope: 'email openid phone',
    redirect_uri: COGNITO_CONFIG.redirectUri,
  });

  return `${COGNITO_CONFIG.domain}/login?${params.toString()}`;
};

// Function to exchange auth code for tokens
export const exchangeCodeForTokens = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: COGNITO_CONFIG.clientId,
    code: code,
    redirect_uri: COGNITO_CONFIG.redirectUri,
  });

  // Basic auth header using client id and secret
  const basicAuth = btoa(`${COGNITO_CONFIG.clientId}:${COGNITO_CONFIG.clientSecret}`);

  try {
    const response = await fetch(`${COGNITO_CONFIG.domain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Token exchange failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
};

// Function to handle tokens
export const handleAuthTokens = (tokens: any) => {
  localStorage.setItem('id_token', tokens.id_token);
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

// Function to handle logout
export const logout = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/';
};
