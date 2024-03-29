const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

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

function finalCalculation(ticket, data) {
  const { average, hasComments, userTickets, businessHrs } = data

  let risk = 0
  const price = parseInt(ticket.price)

  if (price < average) {
    const difference = average - price
    risk = risk + difference
    console.log('NEW RISK', risk)
  }
  else if (price > average) {
    let difference = price - average
    console.log('DIFFERENCE', difference)
    if (difference > 10) {
      risk = risk - 10
    } else {
      risk = risk - difference
    }
  }

  if (hasComments === true) {
    console.log('HAD MORE THAN 3 COMMENTS, +5')
    risk = risk + 5
  }

  if (userTickets === true) {
    console.log('ONLY TICKET OF THE USER, +10')
    risk = risk + 10
  }

  if (businessHrs === true) {
    console.log('WAS ADDED DURING BUSINESS HRS, +10')
    risk = risk + 10
  } else {
    console.log('WAS NOT ADDED DURING BUSINESS HRS, -10')
    risk = risk - 10
  }

  console.log('RISK BEFORE MIN MAX', risk)

  if (risk < 5) {
    return risk = 5
  }

  if (risk > 95) {
    return risk = 95
  }

  return risk
}




module.exports = { calculateAverage,
  findComments,
  ticketsPerUser,
  calculateHours,
  finalCalculation }