import React from 'react';
import {
    Button, Card, CardBody,
    CardFooter, CardHeader,
    Heading, Paragraph
} from "grommet";
import {Validate} from "grommet-icons";

const RequestFormSuccessful = ({onClick}: { onClick: () => void }) => {

    return <Card background={{"color": "active-background"}}>
        <CardHeader align="center" direction="row" justify="center" gap="medium" pad="small">
            <Heading>
                Solicitud Hecha
            </Heading>
            <Validate size="xlarge" color="status-ok"/>
        </CardHeader>
        <CardBody pad="small">
            <Paragraph textAlign="start" fill>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
                gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
                dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
                leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
                nunc porta egestas. Fusce dapibus lobortis tincidunt.
            </Paragraph>
        </CardBody>
        <CardFooter align="center" direction="row" flex={false} justify="center" gap="medium" pad="small">
            <Button label="Listo" primary onClick={() =>onClick()}/>
        </CardFooter>
    </Card>
};

export default RequestFormSuccessful;