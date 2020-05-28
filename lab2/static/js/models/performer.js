class Performer extends BaseModel {
  constructor () {
    super('performer')
  
    this.fields = this.fields.concat(['name', 'experience', 'numbers_of_workers'])
  }
}
  