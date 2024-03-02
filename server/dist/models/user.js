"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const redis_om_1 = require("redis-om");
exports.userSchema = new redis_om_1.Schema('user', {
    cards: {
        type: 'string[]',
    },
    diffuseCards: {
        type: 'string[]',
    },
});
//# sourceMappingURL=user.js.map