import { Mongo } from 'meteor/mongo';

import { SmartHomeSchema } from './schema';

export const Homes = new Mongo.Collection('smarthomes');
