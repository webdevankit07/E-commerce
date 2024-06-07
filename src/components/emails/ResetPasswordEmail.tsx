import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from '@react-email/components';

const ResetPasswordEmail = (token: string, username: string) => {
    return (
        <Html lang='en' dir='ltr'>
            <Head>
                <title>Reset Password</title>
                <Font
                    fontFamily='Roboto'
                    fallbackFontFamily='Verdana'
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle='normal'
                />
            </Head>
            <Preview>click here to reset Your Password</Preview>
            <Section>
                <Row>
                    <Heading as='h2'>Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>Hi, Please click here to reset Your Password. Token is valid till 10 minutes from now.</Text>
                </Row>
                <Row>
                    <Button
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/reset-token/${token}`}
                        style={{ color: '#001c9a' }}
                    >
                        Reset password
                    </Button>
                </Row>
                <Row>
                    <Text>If you did not request this code, please ignore this email.</Text>
                </Row>
            </Section>
        </Html>
    );
};

export default ResetPasswordEmail;
