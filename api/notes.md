## GET /api/users/999 (non-existent user)
- Status: 404 Not Found (confirmed via curl -i)
- Body: {} (empty — body alone was ambiguous, status code was the real signal)
- Lesson: never assume success/failure just from the response body — always check the actual status code

## Rate limiting observed
- Free tier: 20 requests per 60 seconds (Ratelimit-Limit / Ratelimit-Remaining headers)
- Relevant for Day 31: automated test suites could hit 429 if run too fast/repeatedly

## API key trial note
- Key is on a 14-day trial (X-Reqres-Trial-Days-Remaining header)
- If expired later, switch to jsonplaceholder.typicode.com (no key required) as backup