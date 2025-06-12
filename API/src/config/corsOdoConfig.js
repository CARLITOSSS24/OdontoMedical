import cors from "cors";

const corsOptions = {
    origin: 'https://odonto-api.vercel.app/', 
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: ['Authorization', 'Content-Type']
};


const corsConfig = cors(corsOptions);
export default corsConfig;