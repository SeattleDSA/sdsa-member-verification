export default function errorHandler(error, request, response, next) {
  console.error(error, error.stack);

  response.status(500).json({ error: "an error occurred" });
}
