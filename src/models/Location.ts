import mongoose, { Schema } from 'mongoose';

const LocationSchema = new Schema({}, {
  timestamps: true
});

LocationSchema.add({
  /* Properties */
  name: {

  },
  address: {

  },
  totalCapacity: {

  },
  openAt: {

  },
  closeAt: {

  },
  daysOpen: {

  },
  staffCount: {

  },
  timeInterval: {
    // How often we have timeslots for people.
  },
  phoneNumber: {

  },
  personResponsibleFirstName: {

  },
  personResponsibleLastName: {

  },
  
  /* Relationships */
  reservations: {

  },
  business: {

  }
})