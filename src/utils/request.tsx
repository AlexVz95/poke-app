import { HttpStatusCode, ErrorMessage } from "../constants/globals";

function checkStatus(response: Response) {
  if (
    response.status >= HttpStatusCode.OK &&
    response.status < HttpStatusCode.MultipleChoices
  ) {
    return response;
  }

  const error: Error & { response?: Response, status?: number } = new Error(
    response.statusText
  );

  error.response = response;
  error.status = response.status;

  throw error;
}

export const request = (url:string, method: string, data?: any) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};
