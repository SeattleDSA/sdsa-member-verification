import { timingSafeEqual } from 'crypto';

const apiKey = Buffer.from(process.env.API_KEY);

export default function auth(request, response, next) {
  const authHeader = Buffer.from(request.get("Authorization"));

  if(timingSafeEqual(authHeader, apiKey)) {
    next();
  } else {
    response.status(401).json({
      error: "unauthorized"
    });
  }
}
