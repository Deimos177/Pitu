import { Sequelize } from 'sequelize'

const sequelize  = new Sequelize('mysql://root:Deimos@102201@localhost:3306/pitu')

export default sequelize