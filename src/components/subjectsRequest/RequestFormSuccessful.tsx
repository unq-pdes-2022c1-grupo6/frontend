import React from 'react';
import {
    Button, Card, CardBody,
    CardFooter, CardHeader,
    Heading, Paragraph
} from "grommet";
import {Validate} from "grommet-icons";

const RequestFormSuccessful = ({onClick}: { onClick: () => void }) => {

    return <Card background={{"color": "active-background"}} align="center">
        <CardHeader align="center" direction="row" justify="center" gap="medium" pad="small">
            <Heading>
                Solicitud Hecha
            </Heading>
            <Validate size="xlarge" color="status-ok"/>
        </CardHeader>
        <CardBody pad="small">
            <Paragraph textAlign="start" fill>
                Solicitud creada exitosamente!
            </Paragraph>
        </CardBody>
        <CardFooter align="center" direction="row" flex={false} justify="center" gap="medium" pad="small">
            <Button label="Listo" primary onClick={() =>onClick()}/>
        </CardFooter>
    </Card>
};

export default RequestFormSuccessful;