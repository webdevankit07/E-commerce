import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from '@react-email/components';

const ContactEmail = (name: string, email: string, mobile: string, comment: string) => {
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
                    <Heading as='h2'>{name} contact you,</Heading>
                </Row>
                <Row>
                    <Text>Name: {name}</Text>
                </Row>
                <Row>
                    <Text>Email: {email}</Text>
                </Row>
                <Row>
                    <Text>Mobile: {mobile}</Text>
                </Row>
                <Row>
                    <Text>Comment: {comment}</Text>
                </Row>
            </Section>
        </Html>
    );
};

export default ContactEmail;
