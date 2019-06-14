const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

async function calculateRisk(ticket) {
  console.log('CALCULATION STARTED')
  console.log('TICKET OBJECT RECEIVED', ticket)

  // CALCULATING THE AVERAGE
  const average = await calculateAverage(ticket)
  console.log('AVERAAAAAAGE', average)

  // FIND AND COUNTS COMMENTS
  const hasComments = await findComments(ticket)
  console.log('HAS +3  COMMENTS', hasComments)


  // COUNTS TICKETS PER USER
  const userTickets = await ticketsPerUser(ticket)
  console.log('USER HAS +1 TICKET', userTickets)

  const businessHrs = await calculateHours(ticket)
  console.log('POSTED DURING BUSINESS HRS', businessHrs)

  const obj = {
    average: average,
    hasComments: hasComments,
    userTickets: userTickets,
    businessHrs: businessHrs
  }

  return [ticket, obj]
  
  console.log('END OBJECT', obj)

}

function calculateAverage(ticket) {
  return Ticket.findAll({
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
      return average
    })
}

function findComments(ticket) {
  return Comment.findAll({
    where: {
      ticketId: ticket.id
    }
  })
    .then(comments => {
      if (comments.length > 3) {
        const hasComments = true
        return hasComments
      } else {
        const hasComments = false
        return hasComments
      }
    })
}

function ticketsPerUser(ticket) {
  return Ticket.findAll({
    where: {
      userId: ticket.userId
    }
  })
    .then(tickets => {
      if (tickets.length === 1) {
        const onlyTicket = true
        return onlyTicket
      } else {
        const onlyTicket = false
        return onlyTicket
      }
    })
}

function calculateHours(ticket) {
    const createdAt = JSON.stringify(ticket.createdAt)
    const hours = parseInt(createdAt.slice(12, 14))
    // CHECKS FOR BUSINESS HOURS (BETWEEN 9 AND 17)
    // HR 09 MIN 00 AND HR 16 MIN 59
    if (hours >= 09 && hours < 17) {
      const businessHrs = true
      return businessHrs
    } else {
      const businessHrs = true
      return businessHrs
    }
}

module.exports = calculateRisk