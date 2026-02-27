// Simple request logging middleware
module.exports = (req, res, next) => {
    const startTime = Date.now();
    
    console.log('=== REQUEST ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('IP:', req.ip || req.connection.remoteAddress);
    console.log('User Agent:', req.get('User-Agent'));
    
    // Log request body for POST/PUT requests (excluding sensitive data)
    if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
        const logBody = { ...req.body };
        // Remove sensitive fields from logs
        delete logBody.password;
        delete logBody.confirmPassword;
        delete logBody.token;
        console.log('Body:', JSON.stringify(logBody));
    }
    
    // Log response when request completes
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log('Status:', res.statusCode);
        console.log('Duration:', duration + 'ms');
        console.log('===============');
    });
    
    next();
};