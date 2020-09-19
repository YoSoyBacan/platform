import mongoose, { Schema } from 'mongoose';

const RevervationSchema = new Schema({}, {
  timestamps: true
});

RevervationSchema.add({
 /* Properties */
 firstName: {
  type: String,
  required: true,
  trim: true
 },
 lastName: {
  type: String,
  required: true,
  trim: true
 },
 telephone: {
  type: String,
  required: true,
  trim: true
 },
 email: {
  type: String,
  required: true,
  trim: true
 },
 startTime: {
  type: String,
  required: true,
 },
 endTime: {

 },
 numberOfVisitors: {

 },
 hasConfirmed: {

 },
 /* Relationships */

});