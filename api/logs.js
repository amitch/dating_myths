// This is a serverless function that will handle log storage
// In a production environment, you might want to use a database
// For this example, we'll just log to the server console

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const logData = req.body;
    
    // In a real application, you would save this to a database
    // For now, we'll just log it to the server console
    console.log('Log entry:', JSON.stringify(logData, null, 2));
    
    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
