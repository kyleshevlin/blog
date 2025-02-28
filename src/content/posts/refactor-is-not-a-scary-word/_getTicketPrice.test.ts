import { getTicketPrice } from './_getTicketPrice'

describe('getTicketPrice', () => {
  it('should give members a 15% discount', () => {
    const show = {
      name: 'Test show',
      price: 1000,
    }

    expect(getTicketPrice(show, 'member')).toEqual(850)
  })

  it('should give non-members the full price', () => {
    const show = {
      name: 'Test show',
      price: 1000,
    }

    expect(getTicketPrice(show, 'non-member')).toEqual(1000)
  })

  it('should give premium members a 25% discount', () => {
    const show = {
      name: 'Test show',
      price: 1000,
    }

    expect(getTicketPrice(show, 'premium')).toEqual(750)
  })
})
