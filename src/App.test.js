import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  expect(screen.getByTestId('toggler')).toBeInTheDocument();
  expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  expect(screen.getByText('Toggle All')).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Done')).toBeInTheDocument();
});
test('switch theme', () => {
  render(<App />);

  fireEvent.click(screen.getByText('Switch Theme'))

  expect(screen.getByPlaceholderText('Enter todo name here')).toHaveStyle('background-color: black');
  expect(screen.getByText('Toggle All')).toHaveStyle('background-color: black');
  expect(screen.getByText('All')).toHaveStyle('background-color: #1494a9');
  expect(screen.getByText('Active')).toHaveStyle('background-color: black');
  expect(screen.getByText('Done')).toHaveStyle('background-color: black');
});
const setup = () => {
  const utils = render(<App />)
  const input = utils.getByPlaceholderText('Enter todo name here')
  return {
    input,
    ...utils,
  }
}
test('add todo', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: 'todo1'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  expect(screen.getByText('todo1')).toBeInTheDocument();
})
test('remove todo', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: 'todo1'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.click(screen.getByText('X'));
  expect(screen.getByText('Nothing to display')).toBeInTheDocument();
})
test('toggle all', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: 'todo1'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.change(input, {target: {value: 'todo2'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.click(screen.getByText('todo1'));
  fireEvent.click(screen.getByText('Toggle All'));
  expect(screen.getByText('todo1')).toHaveStyle({color:"#a70909", 'text-decoration': 'line-through'});
  expect(screen.getByText('todo2')).toHaveStyle({color:"#a70909", 'text-decoration': 'line-through'});
  fireEvent.click(screen.getByText('Toggle All'));
  expect(screen.getByText('todo1')).not.toHaveStyle({color:"#a70909", 'text-decoration': 'line-through'});
  expect(screen.getByText('todo2')).not.toHaveStyle({color:"#a70909", 'text-decoration': 'line-through'});
})
test('Click Active', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: 'todo1'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.change(input, {target: {value: 'todo2'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.click(screen.getByText('todo1'));
  fireEvent.click(screen.getByText('Active'));
  expect(screen.queryByText('todo1')).toBeNull();
  expect(screen.queryByText('todo2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('All'));
  expect(screen.queryByText('todo1')).toBeInTheDocument();
  expect(screen.queryByText('todo2')).toBeInTheDocument();
})
test('Click Done', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: 'todo1'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.change(input, {target: {value: 'todo2'}});
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.click(screen.getByText('todo1'));
  fireEvent.click(screen.getByText('Done'));
  expect(screen.queryByText('todo2')).toBeNull();
  expect(screen.queryByText('todo1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('All'));
  expect(screen.queryByText('todo1')).toBeInTheDocument();
  expect(screen.queryByText('todo2')).toBeInTheDocument();
})