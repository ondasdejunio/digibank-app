//Importa la conexion a la db
import db from '../database/db.js'

//Importa sequelize
import { DataTypes } from 'sequelize'

const ProductoModel = db.define('producto', {
    nombre_producto: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false},
    monto_maximo: {
        type: DataTypes.FLOAT,
        required: true,
        allowNull: false}
}, {timestamps: false})

const TipoProductoModel = db.define('tipo_producto', {
    /*
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    */
    nombre_tipo: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false}
}, {timestamps: false})

TipoProductoModel.hasMany(ProductoModel)
ProductoModel.belongsTo(TipoProductoModel)

const DepositoModel = db.define('deposito', {
    tipo_moneda: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    limite_maximo: {
        type: DataTypes.FLOAT,
        required: true,
        allowNull: false
    }
}, {timestamps: false})

DepositoModel.belongsToMany(ProductoModel, {through: 'producto_deposito'})
ProductoModel.belongsToMany(DepositoModel, {through: 'producto_deposito'})

const SegmentoModel = db.define('segmento', {
    nombre_segmento: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
}, {timestamps: false})

SegmentoModel.belongsToMany(ProductoModel, {through: 'producto_segmento'})
ProductoModel.belongsToMany(SegmentoModel, {through: 'producto_segmento'})

const PrestamoModel = db.define('prestamo', {
    valor_prestamo: {
        type: DataTypes.FLOAT,
        required: true,
        allowNull: false
    },
    valor_cuota: {
        type: DataTypes.FLOAT,
        required: false,
        allowNull: true
    },
    cantidad_cuota: {
        type: DataTypes.INTEGER,
        required: false,
        allowNull: true,
        validate: {
            min: 12,
            max: 240
        }
    }
}, {timestamps: false})

const AdquisicionModel = db.define('adquisicion', {
    nombre_adquisicion: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
}, {timestamps: false})

AdquisicionModel.hasMany(PrestamoModel)
PrestamoModel.belongsTo(AdquisicionModel)

ProductoModel.belongsToMany(PrestamoModel, {through: 'producto_prestamo'})
PrestamoModel.belongsToMany(ProductoModel, {through: 'producto_prestamo'})

const models = {
    ProductoModel,
    TipoProductoModel,
    DepositoModel,
    SegmentoModel,
    PrestamoModel,
    AdquisicionModel
}

export default models