import { checkURL } from "../js/urlChecker";

describe('Testing urlChecker', () => {
  test('checkURL() function is defined', () => {
    expect(checkURL).toBeDefined()
  })
  test('checkURL() returns true for valid urls', () => {
    expect(checkURL("http://ibastawisi.ml/")).toBe(true)
    expect(checkURL("https://ibastawisi.ml/")).toBe(true)
    expect(checkURL("www.ibastawisi.ml/")).toBe(true)
    expect(checkURL("ibastawisi.ml")).toBe(true)
  })
  test('checkURL() returns false for invalid urls', () => {
    expect(checkURL("")).toBe(false)
    expect(checkURL("ibastawisi")).toBe(false)
    expect(checkURL("https://ibastawisi")).toBe(false)
  })
})