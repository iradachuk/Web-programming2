class Customer extends BaseModel {
  constructor () {
    super('customer')

    this.fields = this.fields.concat(['name', 'budget']) 
  }
}
