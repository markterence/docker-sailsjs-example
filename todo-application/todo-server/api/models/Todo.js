/**
 * * CashFlowTransactionTypes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Promise = require('bluebird');
var empty = require('is-empty');
module.exports = {
    attributes: {
        task: {
            type: 'text'
        },
        isCompleted: {
            type: 'boolean',
            defaultsTo: 0
        },
        is_deleted: {
            type: 'boolean',
            defaultsTo: 0
        }
    },
    connection: 'mysqlDataStore',
    tableName: 'todo'
};