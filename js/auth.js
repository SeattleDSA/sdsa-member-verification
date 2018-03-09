export default function auth(request, response, next) {
  if(request.get("Authorization") == process.env.API_KEY) {
    next();
  } else {
    response.status(401).json({
      error: "unauthorized"
    });
  }
}
