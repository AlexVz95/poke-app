export const HttpStatusCode = {
  OK: 200,
  MultipleChoices: 300,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalServerError: 500,
  UnprocessableEntity: 422,
};

export const ErrorMessage: any = {
  Default: "Error al procesar. Inténtalo de nuevo.",
  [HttpStatusCode.NotFound]: "[404] Esta no es la página web que busca.",
  [HttpStatusCode.InternalServerError]:
    "[500] Perdón, algo salió mal. Vuelve a intentarlo o actualiza la página.",
  ParsingFailed: "Error al analizar.",
  TokenExpired: "El token ha caducado.",
  NoConection: "Sin conexión",
};