import React from 'react';
import styled from 'styled-components';
const Footer = styled.div`
margin-top: 20px;
& button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
& .toggle-all {
  background: ${({theme}) => theme.btnToggleAll.bg};
  color: ${({theme}) => theme.btnToggleAll.color};
}
& .all-active-done {
  margin-top: 15px;
  & button {
    background: ${({theme}) => theme.btnAllActiveDone.bg};
    color: ${({theme}) => theme.btnAllActiveDone.color}
  }
  & button.act {
      background: #1494a9;
  }
  & .active, .done {
    margin-left: 10px;
  }
}
`;
function Index({onToggleAll, onClickAll, onClickActive, onClickDone, filter}) {
  return (
    <Footer>
        <button className='toggle-all' onClick={onToggleAll}>Toggle All</button>
        <div className='all-active-done'>
            <button className={`all ${filter === 'all' && 'act'}`} onClick={onClickAll}>All</button>
            <button className={`active ${filter === 'active' && 'act'}`} onClick={onClickActive}>Active</button>
            <button className={`done ${filter === 'done' && 'act'}`} onClick={onClickDone}>Done</button>
        </div>
    </Footer>
  );
}
export default Index;
