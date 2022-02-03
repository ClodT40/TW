import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('spaceship', 'postgres', 'parolamea', {
    host: 'localhost',
    dialect: 'postgres',
    storage: './baza.db',
    define: {
        timestamps: false
    }
});

const Spacecraft = sequelize.define('spacecraft', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            len: [3, 140]
        }
    },
    maximSpeed: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1000
        }
    },
    masa: {
        type: Sequelize.INTEGER,
        validate: {
            min: 200
        }
    }
});
const Astronaut = sequelize.define('astronaut', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5, 140]
        }
    },
    role: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['COMMANDER', 'PILOT']]
        }
    }
})

async function syncDB() {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
}

Spacecraft.hasMany(Astronaut, { foreignKey: 'idSpacecraft' });
Astronaut.belongsTo(Spacecraft, { foreignKey: 'idSpacecraft' });

export { Astronaut, Spacecraft, syncDB };