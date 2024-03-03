"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const reqTimeStamps = {};
const logger = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    console.log(`Request Type: ${req.method}`);
    const reqType = `${req.method} ${req.path}`;
    const currentTime = new Date().getTime();
    const value = reqTimeStamps[reqType];
    const timeSinceLatRequest = value ? currentTime - value : 0;
    reqTimeStamps[reqType] = currentTime;
    const original = res.send;
    //@ts-ignore
    res.send = function (body) {
        const responseTime = Date.now() - currentTime;
        console.log(`Status: ${res.statusCode}  | 
            Response Time: ${responseTime} | 
            Time since last Request:  ${reqType} =  ${timeSinceLatRequest}ms`);
        original.call(this, body);
    };
    next();
};
exports.logger = logger;
