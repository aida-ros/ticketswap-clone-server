const Ticket = require('../tickets/model')

const {
  calculateAverage,
  findComments,
  ticketsPerUser,
  calculateHours,
  finalCalculation
} = require('./calc')

// Calculates the risk rate for a single ticket
async function calculateRisk(ticket) {
  console.log('CALCULATION STARTED')
  console.log('TICKET OBJECT RECEIVED', ticket)

  // CALCULATING THE AVERAGE
  const average = await calculateAverage(ticket)
  console.log('AVERAGE', average)

  // FIND AND COUNTS COMMENTS
  const hasComments = await findComments(ticket)
  console.log('HAS +3  COMMENTS', hasComments)

  // COUNTS TICKETS PER USER
  const userTickets = await ticketsPerUser(ticket)
  console.log('USER HAS +1 TICKET', userTickets)

  // FINDS IF POSTED DURING BUSINESS HOURS
  const businessHrs = await calculateHours(ticket)
  console.log('POSTED DURING BUSINESS HRS', businessHrs)

  const data = {
    average: average,
    hasComments: hasComments,
    userTickets: userTickets,
    businessHrs: businessHrs
  }

  const risk = await finalCalculation(ticket, data)
  return { riskRate: risk, ticket: ticket }

}

// Used to pass in multiple tickets (for color coding the tickets on EventsDetails page)
async function riskOfAllTickets(event) {
  const filtered =
    await Ticket.findAll({
      where: {
        eventId: event.id
      }
    })
      .then(tickets => {
        return tickets
      })

  const ticketValues = await filtered.map(ticket => ticket.dataValues)
  
  return await ticketValues.map(async (ticket) =>  {
    const ticketRisk = await calculateRisk(ticket)
    return await ticketRisk
  })
}

module.exports = { calculateRisk, riskOfAllTickets }