import SimpleSchema from 'simpl-schema';

const userSchema = new SimpleSchema({
    id: SimpleSchema.RegEx.Id,
    admin: Boolean,
    limited: Boolean,
    temporary: Boolean
});

export const SmartHomeSchema = new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    devices: Array,
    'devices.$': SimpleSchema.RegEx.Id,
    admin: SimpleSchema.RegEx.Id,
    users: Array,
    'users.$': userSchema,
    emergency: Array,
    'emergency.$': Array,
    'emergency.$.$': SimpleSchema.RegEx.Id
});