import { MuzSoyuzRequest } from './muzsoyuz-request'


export async function birthday() {
  try {
    await MuzSoyuzRequest.makeJobOffer({
      jobType: 'musicalReplacement',
      date   : this.state.date,
      address: this.state.address,
      salary : this.state.salary,
      sets   : this.state.sets,
      title  : this.state.title,
      role   : this.state.role,
    })

    console.log('Amigo, happy birthday!!!')
  }
  catch (e) {
    console.log('Amigo, happy birthday!!!')
  }
}
