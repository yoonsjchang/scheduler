const conn = require('./mysql');

const userTableQuery = `CREATE TABLE IF NOT EXISTS \`users\` (
    \`userId\` int(11) NOT NULL AUTO_INCREMENT,
    \`username\` varchar(255) NOT NULL,
    \`email\` varchar(255) NOT NULL,
    \`firstname\` varchar(255) DEFAULT NULL,
    \`lastname\` varchar(255) DEFAULT NULL,
    \`password\` varchar(255) DEFAULT NULL,
    PRIMARY KEY (\`userId\`),
    UNIQUE KEY \`email_UNIQUE\` (\`email\`),
    UNIQUE KEY \`username_UNIQUE\` (\`username\`),
    KEY \`ix_username\` (\`username\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
  

  const eventTableQuery = `CREATE TABLE IF NOT EXISTS \`events\` (
    \`eventId\` int(11) NOT NULL AUTO_INCREMENT,
    \`name\` varchar(45) NOT NULL,
    \`start\` timestamp NULL DEFAULT NULL,
    \`end\` timestamp NULL DEFAULT NULL,
    \`createdBy\` int(11) DEFAULT NULL,
    \`createdOn\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`eventId\`),
    KEY \`userId_idx\` (\`createdBy\`),
    CONSTRAINT \`createdBy\` FOREIGN KEY (\`createdBy\`) REFERENCES \`users\` (\`userId\`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
  

  const eventMapTableQuery = `CREATE TABLE IF NOT EXISTS \`eventMap\` (
    \`userId\` int(11) DEFAULT NULL,
    \`eventId\` int(11) DEFAULT NULL,
    KEY \`userId_idx\` (\`userId\`),
    KEY \`eventId_idx\` (\`eventId\`),
    CONSTRAINT \`eventId\` FOREIGN KEY (\`eventId\`) REFERENCES \`events\` (\`eventId\`) ON DELETE CASCADE,
    CONSTRAINT \`userId\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`userId\`) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
  

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

        conn.query(eventMapTableQuery, (err, data) => {
            if(err) {
                console.log("Failed to set up eventMap table.");
                console.log(err);
            }
            else console.log("Event map table created.")
        })
    }
}
