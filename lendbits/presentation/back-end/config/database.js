
import { Sequelize } from "sequelize";

const db = new Sequelize('lend_bits', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,

})
export default db
