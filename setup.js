const conn = require('./mysql');

const userTableQuery = `CREATE TABLE IF NOT EXISTS \`users\` (
    \`userId\` int(11) NOT NULL AUTO_INCREMENT,
    \`username\` varchar(255) NOT NULL,
    \`email\` varchar(255) NOT NULL,
    \`firstname\` varchar(255) DEFAULT NULL,
    \`lastname\` varchar(255) DEFAULT NULL,
    PRIMARY KEY (\`userId\`),
    UNIQUE KEY \`email_UNIQUE\` (\`email\`),
    UNIQUE KEY \`username_UNIQUE\` (\`username\`),
    KEY \`ix_username\` (\`username\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

  const eventTableQuery = `CREATE TABLE IF NOT EXISTS \`events\` (
    \`eventId\` int(11) NOT NULL AUTO_INCREMENT,
    \`name\` varchar(45) NOT NULL,
    \`start\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`end\` datetime DEFAULT NULL,
    PRIMARY KEY (\`eventId\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

module.exports =  {
    dbSetup: function (){
        conn.query(userTableQuery, (err, data) => {
            if(err) {
                console.log("Failed to set up user table.");
                console.log(err);
            }
            else console.log("User table created.")
        });

        conn.query(eventTableQuery, (err, data) => {
            if(err) {
                console.log("Failed to set up events table.");
                console.log(err);
            }
            else console.log("Events table created.");
        })
    }
}
