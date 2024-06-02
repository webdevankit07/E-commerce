export const GET = async () => {
    try {
        return Response.json({ message: 'server is live', success: true }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
    }
};
