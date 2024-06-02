import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export const ConnectDB = async () => {
    if (connection.isConnected) return console.log('Already connected to database');

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL as string);

        connection.isConnected = db.connections[0].readyState;
        console.log('DB Connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit(1);
    }
};
