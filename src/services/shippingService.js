const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getShippingAddress(userId) {
  const url = `${baseUrl}shippingAddress/${userId}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw response;
  });
}

export async function saveShippingAddress(address) {
  const url = `${baseUrl}shippingAddress`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
}
