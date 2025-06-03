// limit defines the maximum number of requests | interval defines the time window in millisec
const rateLimit = (limit: any, interval: any) => {
    // Map to store each IP address's request
    const requests = new Map();

    return (req: any, res: any, next: any) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if(!requests.has(ip)) {
            requests.set(ip, { count: 0, firstRequest: Date.now() });
        }

        const data = requests.get(ip);

        if(Date.now() - data.firstRequest > interval) {
            // reset the count every interval
            data.count = 0;
            data.firstRequest = Date.now();
        }

        data.count +=1;

        if(data.count > limit) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }

        requests.set(ip, data);
        next();
    };
};

// export default rateLimit;

// import rateLimit from '../../utils/rateLimit';
// const loginHandler = async (req, res) => {
//   if (req.method === 'POST') {
//     // Add logic for logging in a user, e.g., check credentials, etc.
//     return res.status(200).json({ message: 'Login successful' });
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// };
// export default rateLimit(10, 60000)(loginHandler); // Allow 10 requests per minute