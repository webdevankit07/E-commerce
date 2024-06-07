import mongoose from 'mongoose';
import { dataBaseURL } from '.';

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export const ConnectDB = async () => {
    if (connection.isConnected) return console.log('Already connected to database');

    try {
        const db = await mongoose.connect(dataBaseURL!);

        connection.isConnected = db.connections[0].readyState;
        console.log('DB Connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
        mongoose.disconnect();
        process.exit(1);
    }
};
