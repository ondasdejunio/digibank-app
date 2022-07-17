import { Sequelize } from "sequelize"

const db = new Sequelize('digibank_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define:{freezeTableName:true}
})

export default db