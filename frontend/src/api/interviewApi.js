const API_URL = "http://localhost:8080/api/interview";

export async function startInterview(data) {
  const response = await fetch(`${API_URL}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function submitAnswer(sessionId, answer) {
  const response = await fetch(
    `${API_URL}/${sessionId}/answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    }
  );

  return response.json();
}