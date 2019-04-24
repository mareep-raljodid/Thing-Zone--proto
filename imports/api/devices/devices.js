import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export const Devices = new Mongo.Collection('devices');

export const DeviceSchema = new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    name: String,
    faIcon: String,
    pngIcon: String
});
