export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('Received JSON:', body)

  // Validate required fields
  if (!body.companyName || !body.delayUntil) {
    setResponseStatus(event, 400)
    return { error: 'Missing required fields' }
  }

  // Simulate business logic / database work here...

  return {
    status: 'ok',
    message: `Delay set for ${body.companyName} until ${body.delayUntil}`
  }
})

