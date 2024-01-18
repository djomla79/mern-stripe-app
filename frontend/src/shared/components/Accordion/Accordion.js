import React, { useState, useContext, createContext } from 'react';

import './Accordion.css';

const ToggleContext = createContext({
  toggleShow: false,
  setToggleShow: () => {},
});

export const AccordionTitle = ({ children, ...restProps }) => {
  return (
    <div className='title' {...restProps}>
      {children}
    </div>
  );
};

export const AccordionFrame = ({ children, ...restProps }) => {
  return (
    <h2 className='frame' {...restProps}>
      {children}
    </h2>
  );
};

export const AccordionItem = ({ children, ...restProps }) => {
  const [toggleShow, setToggleShow] = useState(true);
  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <div className='item' {...restProps}>
        {children}
      </div>
    </ToggleContext.Provider>
  );
};

export const AccordionHeader = ({ children, ...restProps }) => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);
  return (
    <div
      className='header'
      onClick={() => setToggleShow(!toggleShow)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const AccordionBody = ({ children, ...restProps }) => {
  const { toggleShow } = useContext(ToggleContext);
  return (
    <div className={`body ${toggleShow ? 'open' : 'close'}`}>
      <span>{children}</span>
    </div>
  );
};

const Accordion = ({ children, ...restProps }) => {
  return (
    <div className='container' {...restProps}>
      <div className='inner'>{children}</div>
    </div>
  );
};

export default Accordion;

/** EXAMPLE Accordion
 *
 * <Accordion>
     <AccordionTitle>{`Accordion Title`}</AccordionTitle>
     <AccordionFrame>
        {data.map(({ id, header, body }) => (
        <AccordionItem key={id}>
            <AccordionHeader>{header}</AccordionHeader>
            <AccordionBody>{body}</AccordionBody>
        </AccordionItem>
        ))}
     </AccordionFrame>
   </Accordion>
 *
   Data example

   const data = [
  {
    id: 1,
    header: 'Header Title',
    body: ' Body text Body text Body text Body text Body text Body text Body text Body text',
  },
];
 */
