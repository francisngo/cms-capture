import config from './config.json';

interface Db {
    dialect: string
    host: string
    port: number
    database: string
    username: string
    password: string
}

interface Security {
    secretKey: string
    expiresIn: string
}

interface Server {
    port: number
}

const { db, security, server } = config;

export const $db: Db = db;
export const $security: Security = security;
export const $server: Server = server;