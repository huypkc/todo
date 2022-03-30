import React from 'react';
import styled from 'styled-components';
const Input = styled.input`
box-sizing: border-box;
margin: 0;
width: 100%;
min-width: 0;
padding: 4px 11px;
font-size: 14px;
line-height: 1.5715;
background-color: ${({theme}) => theme.inputBg};
color: ${({theme}) => theme.inputColor};
border: 1px solid #d9d9d9;
border-radius: 2px;
&:hover {
  border-color: #40a9ff;
  border-right-width: 1px;
}
&:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(82, 196, 26, .2);
    border-right-width: 1px;
    outline: 0;
}
`;
export default React.forwardRef(function({placeholder, onEnter}, ref){
    const handleKeyDown = React.useCallback((e) =>{
        if (e.key === 'Enter') {
            if (e.target.value.trim() === '') {
                alert('Please input valid todo');
            }
            else onEnter(e.target.value);
        }
    }, [onEnter]);
    return <Input ref={ref} placeholder={placeholder} onKeyDown={handleKeyDown}/>
})