const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

function calculateRisk(ticket) {
  console.log('CALCULATION STARTED')
  console.log('TICKET OBJECT RECEIVED', ticket)

  // CALCULATING THE AVERAGE
  Ticket.findAll({
    where: {
      eventId: ticket.eventId
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
    })
    // COUNTS TICKETS PER USER
    .then(() => {
      console.log('TICKET USERID', ticket.userId)
      Ticket.findAll({
        where: {
          userId: ticket.userId
        }
      })
        .then(tickets => {
          console.log('TICKETS OF USER FOUND:', tickets.length)
          if (tickets.length === 1) {
            const onlyTicket = true
            console.log('ONLY TICKET:', onlyTicket)
            return onlyTicket
          } else {
            const onlyTicket = false
            console.log('ONLY TICKET:', onlyTicket)
            return onlyTicket
          }
        })
    })
    .then(() => {
      const createdAt = JSON.stringify(ticket.createdAt)
      const hours = parseInt(createdAt.slice(12, 14))
      // CHECKS FOR BUSINESS HOURS (BETWEEN 9 AND 17)
      // HR 09 MIN 00 AND HR 16 MIN 59
      if (hours >= 09 && hours < 17) {
        const businessHrs = true
        console.log('POSTED DURING BUSINESS HRS', businessHrs)
        return businessHrs
      } else {
        const businessHrs = true
        console.log('POSTED DURING BUSINESS HRS', businessHrs)
        return businessHrs
      }
    })
    .catch(console.error());

    
}

module.exports = calculateRisk