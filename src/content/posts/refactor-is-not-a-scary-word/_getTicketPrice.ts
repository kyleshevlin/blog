type Show = {
  name: string
  /**
   * The price in cents. Typically it's better to store money as an object, but
   * here we'll make the assumption we're working with US currency.
   */
  price: number
}

type Membership = 'member' | 'non-member' | 'premium'

export function getTicketPrice(show: Show, membership: Membership) {
  switch (membership) {
    case 'premium':
      return show.price * 0.75
    case 'member':
      return show.price * 0.85
    case 'non-member':
      return show.price
  }
}
