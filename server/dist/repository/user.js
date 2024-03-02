"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_om_1 = require("redis-om");
const user_1 = require("../models/user");
const client_1 = require("../client");
const userRespository = new redis_om_1.Repository(user_1.userSchema, client_1.client);
exports.default = userRespository;
//# sourceMappingURL=user.js.map