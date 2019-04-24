import SimpleSchema from 'simpl-schema';

export const SmartHomeSchema = new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    devices: Array,
    'devices.$': SimpleSchema.RegEx.Id,
    admins: Array,
    'admins.$': SimpleSchema.RegEx.Id,
    limited: Array,
    'limited.$': SimpleSchema.RegEx.Id,
    temporary: Array,
    'temporary.$': SimpleSchema.RegEx.Id,
    emergency: Array,
    'emergency.$': Array,
    'emergency.$.$': SimpleSchema.RegEx.Id
});