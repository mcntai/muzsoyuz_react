import { MuzSoyuzRequest } from './muzsoyuz-request'


export async function birthday() {
  try {
    await MuzSoyuzRequest.makeJobOffer({
      jobType: 'musicalReplacement',
      date   : '2020-12-01',
      address: 'вул Спортивна!',
      salary : 1,
      sets   : 3,
      title  : 'Amigo, happy birthday!!!',
      role   : 'drums',
    })

    console.log('Amigo, happy birthday!!!')
  }
  catch (e) {
    console.log('Amigo, happy birthday!!!')
  }
}
