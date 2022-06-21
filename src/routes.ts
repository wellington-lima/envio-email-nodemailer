import { Router } from "express"
import nodemailer from "nodemailer"

const routes = Router()

routes.get('/', (request, response)=>{
  return response.json({res: 'OK'})
})

routes.post('/', async(request, response)=>{
  
  const remetente = nodemailer.createTransport({
    host: 'smtp.dominio.com.br',
    port: 111,
    secure: false,
    auth: {
      user:'remetente@email.com',
      pass: 'xxxxxx'
    },
    tls: { rejectUnauthorized: false }
  })

  const destinatario = {
    from: 'remetente@email.com.br',
    to: 'destinatario@email.com',
    subject: 'Teste email',
    text: 'Teste de envio de email via nodemailer'
  }

  try {
    const res = await remetente.sendMail(destinatario)
    return response.json({ok: res})
    
  } catch (error) {
    return response.json({error})
  }
})

export default routes