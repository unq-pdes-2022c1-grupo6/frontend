import React, {useState} from "react";
import {Box, Button, Collapsible, Heading, Grommet, ResponsiveContext, Layer} from 'grommet';
import {FormClose, Menu} from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#8a2d3e',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props: any) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
        {...props}
    />
);


function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
              <Box fill>
                <AppBar>
                  <Heading level='3' margin='none'>UNQ</Heading>
                  <Button icon={<Menu/>} onClick={() => setShowSidebar(!showSidebar)}/>
                </AppBar>
                <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                  <Box flex align='center' justify='center'>
                    Página de inicio de preinscripción
                  </Box>
                  {(!showSidebar || size !== 'small') ? (
                      <Collapsible direction="horizontal" open={showSidebar}>
                        <Box
                            flex
                            width='medium'
                            background='light-2'
                            elevation='small'
                            align='center'
                            justify='center'>
                          menu sidebar
                        </Box>
                      </Collapsible>
                  ) : (<Layer>
                        <Box
                            background='light-2'
                            tag='header'
                            justify='end'
                            align='center'
                            direction='row'
                        >
                          <Button
                              icon={<FormClose/>}
                              onClick={() => setShowSidebar(false)}
                          />
                        </Box>
                        <Box
                            fill
                            background='light-2'
                            align='center'
                            justify='center'
                        >
                          sidebar
                        </Box>
                      </Layer>
                  )}
                </Box>
              </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
  );
}

export default App;
