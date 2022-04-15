import { stripElementTags } from '.'

test('stripElementTags', () => {
  expect(stripElementTags('Hello')).toEqual('Hello')
  expect(stripElementTags('<div>Hello</div></br>')).toEqual('Hello')
})
