//using jest library
// const reverse = require('../utils/for_testing').reverse

// test('reverse of a', () => {
//   expect(reverse('a')).toBe('a')
// })

// test('reverse of react', () => {
//   expect(reverse('react')).toBe('tcaer')
// })

// test('reverse of saippuakauppias', () => {
//   expect(reverse('saippuakauppias')).toBe('saippuakauppias')
// })

//using node
const { test } = require('node:test')
const assert = require('node:assert')
console.log('dsfjlsadkj')
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
}

)


test('reverse of react', () => {

  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})