export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) {
      return true;
    }

    // Handle base64url-encoded JWT payload.
    const normalized = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(normalized));

    if (!decodedPayload.exp) {
      return true;
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return decodedPayload.exp <= nowInSeconds;
  } catch {
    return true;
  }
};
