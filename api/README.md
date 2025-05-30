# API Endpoints

## Logging

### `POST /api/logs`

Logs an event from the client application.

#### Request Body

```json
{
  "eventType": "string",  // Type of event (e.g., PAGE_VIEW, QUIZ_STARTED, QUIZ_COMPLETED)
  "timestamp": "string",   // ISO 8601 timestamp
  "data": {}               // Additional event-specific data
}
```

#### Response

- **200 OK**: Log entry was received successfully
- **405 Method Not Allowed**: Request method is not POST
- **500 Internal Server Error**: Server error while processing the log

#### Example

```bash
curl -X POST https://your-domain.com/api/logs \
  -H "Content-Type: application/json" \
  -d '{"eventType":"PAGE_VIEW","timestamp":"2023-01-01T00:00:00.000Z","data":{"path":"/"}}'
```

## Development

To test the API locally, you'll need to set up environment variables in a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Then start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/logs`
