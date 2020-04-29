collections = db.getCollectionNames();
users = db.users;
business = db.businesses;

// CREATE A USER 
// TODO Create it in firebase
// createUser = users.insertOne({
//     firstName: "Juan",
//     lastName: "Casro",
//     email: "jaun.castro@live.com",
//     countryCode: "593",
//     phoneNumber: "999442370",
//     type: "Negocio",
//     authMethod: "Email",
//     password: "Pass123"
// })


/* CREATE A BUSINESS FOR THIS USER */
createBusiness = business.insertOne({
  businessPersonName: "Jose Castro", 
  businessPersonId: "0702074022", 
  businessCountry: "ECUADOR",
  businessEmail: "gerencia@techcomputer.com.ec", 
  legalName: "Tech Computer", 
  businessLegalId: "1791319869001",
  numEmployees: "20", 
  businessAddress: "12 de Octubre", 
  businessCity: "Quito", 
  entityType: "Persona Juridica",
  hasAccounting: true, 
  businessPhone: "2902374", 
  businessRegisteredAt: 02/03/2020,
  bankName: "Produbanco",
  bankAccountNumber: "123456789",
  bankAccountType: "Corriente", 
  bankBeneficiaryName: "NADA",
  // owner: createUser.insertedId.toString(), once firebase is done 
  owner: new ObjectId("5e9cfa566d41c26a5e10f50b")
})

// printjson(createBusiness);


foundBusinessData = business.findOne({"owner": "5e9cfa566d41c26a5e10f50b"})
printjson(foundBusinessData)


