import React, { useReducer } from 'react';
import styled,  {ThemeProvider} from 'styled-components';
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Input from './components/Input';
import Footer from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import Toggle from "./components/Toggler";
const Application = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
& .theme-toggler {
  margin-bottom: 30px;
}
`;
const Wrapper = styled.div`
width: 50%;
max-width: 960px;
border: 2px solid grey;
border-radius: 5px;
background: ${({theme}) => theme.wrapper};
padding: 20px 20px 40px 20px;
`;
const Ul =styled.ul`
max-height: 175px;
overflow-y: auto;
& li {
  margin-top: 10px;
  & > div {
    display:flex;
    justify-content: space-between;
    align-items: center;
    & span {
      cursor: pointer;
      &.done {
        color: #a70909;
        text-decoration: line-through;
      }
    }
    & > button {
      padding: 5px 8px;
      background: #a70909;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
`;
const initialState = {todos: [], filter: 'all'};
function reducer(state, action) {
  switch (action.type) {
    case 'add': return { ...state, todos: [...state.todos, action.payload] };
    case 'toggle': {
      const todos = state.todos.map(_todo => _todo.name === action.payload ? {..._todo, done: !_todo.done}: _todo);
      return { ...state, todos };
    }
    case 'remove': {
      return {...state, todos: state.todos.filter(todo => todo.name !== action.payload)};
    }
    case 'toggle-all': {
      const todos = state.todos.map((todo) => {
        const _todo = action.payload.find(t => t.name === todo.name);
        const allSame = action.payload.every(t => t.done === action.payload[0].done);
        if (!_todo) {
          return todo;
        } else return {...todo, done: allSame? !todo.done: true};
      });
      return {...state, todos};

    }
    case 'click-all': {
      return {...state, filter: 'all' };
    }
    case 'click-active': {
      return {...state, filter: 'active'};
    }
    case 'click-done': {
      return {...state, filter: 'done'};
    }
    default: throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = React.useRef();
  const [theme, themeToggler] = useDarkMode();

  const todos = state.todos.filter((todo) => {
    if (state.filter === 'all') {
      return true;
    } else if (state.filter === 'active') {
      return !todo.done;
    } else return todo.done
  })
  const handleEnter = React.useCallback((name) => {
    const todo = state.todos.find(_todo => _todo.name === name);
    if (todo) {
      alert('This todo existed')
    } else {
      dispatch({type: 'add', payload: {name, done: false}})
      inputRef.current.value = '';
    }
  }, [state.todos, dispatch]);
  const handleToggleAll = React.useCallback(() => dispatch({type: 'toggle-all', payload: todos}), [todos, dispatch]);
  const handlClickAll = React.useCallback(() => dispatch({type: 'click-all'}), [dispatch]);
  const handleClickActive = React.useCallback(() => dispatch({type: 'click-active'}), [dispatch]);
  const handleClickDone = React.useCallback(() => dispatch({type: 'click-done', }), [dispatch]);
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <Application>
      <div className='theme-toggler' data-testid="toggler">
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </div>
      <Wrapper data-testid="wrapper">
        <Input ref={inputRef} placeholder='Enter todo name here' onEnter={handleEnter}/>
        {todos.length? <Ul>
          {todos.map(todo => <li key={todo.name}>
            <div>
            <span className={todo.done? 'done': ''} onClick={() => {dispatch({type: 'toggle', payload: todo.name})}}>{todo.name}</span>
            <button onClick={() => dispatch({type: 'remove', payload: todo.name})}>X</button>
          </div>
          </li>)}
        </Ul>: <div><br/>Nothing to display</div>}
        <Footer 
          filter={state.filter}
          onToggleAll={handleToggleAll}
          onClickAll={handlClickAll} 
          onClickActive={handleClickActive}
          onClickDone={handleClickDone}/>
      </Wrapper>
    </Application>
    </ThemeProvider>
  );
}

export default App;
