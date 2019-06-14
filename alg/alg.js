const Ticket = require('../tickets/model')

function calculateRisk (ticket) {
  console.log('THIS WAS FIRED!')
  console.log('IT RECEIVED', ticket)
  const currentEvent = ticket.eventId
  
  Ticket.findAll({
    where: {
      eventId: currentEvent 
    }
  })
  .then(tickets => {
    // Calculates the total price
    const parsedPrices = tickets.map(ticket => parseFloat(ticket.price))
    const totalPrice = parsedPrices.reduce((prevPrice, nextPrice) => {
      return prevPrice + nextPrice
    })
    const average = Math.round(totalPrice / tickets.length)
    console.log('AVERAGE PRICE', average)
    return average
  })
}

module.exports = calculateRisk