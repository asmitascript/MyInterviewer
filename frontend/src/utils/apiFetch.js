export const apiFetch = async (url, options = {}, setAuthError) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    const data = await response.json().catch(() => null);

    if (data?.message === "Session expired. Please login again.") {
      setAuthError("expired");
    }
  }

  return response;
};