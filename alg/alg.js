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
    const totalPrice = tickets.reduce((prevTicket, nextTicket) => {
      return parseInt(prevTicket.price) + parseInt(nextTicket.price)
    })
    console.log('TOTALPRICE:', totalPrice)
  })
}

module.exports = calculateRisk