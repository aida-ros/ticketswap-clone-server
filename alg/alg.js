const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

function calculateRisk (ticket) {
  console.log('THIS WAS FIRED!')
  console.log('IT RECEIVED', ticket)
  const currentEvent = ticket.eventId
  
// CALCULATING THE AVERAGE  
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

// FIND AND COUNTS COMMENTS
  .then(() => {
    Comment.findAll({
      where: {
        ticketId: ticket.id
      }
    })
    .then(comments => {
      console.log('FOUND COMMENTS:', comments.length)
      if (comments.length > 3) {
        const hasComments = true
        console.log('HAS +3 COMMENTS', hasComments)
        return hasComments
      } else {
        const hasComments = false
        console.log('HAS +3 COMMENTS', hasComments)
        return hasComments
      }
    })

    // .then(() => {
    //   User.findall
    // })
  })
}

module.exports = calculateRisk