import query from "./queryExecuter";

const runStartupQuery = async () => {
  await query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100),
            email_verified BOOLEAN,
            password VARCHAR(100)
        );
        
        CREATE TABLE IF NOT EXISTS playlists(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            type VARCHAR(20),
            description VARCHAR(500),
            user_id INT,
            FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS songs(
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(200),
            duration_ms BIGSERIAL,
            album JSONB,
            artists JSONB ARRAY,
            preview_url VARCHAR(200),
            playlist_id INT,
            FOREIGN KEY (playlist_id)
            REFERENCES playlists (id)
            ON DELETE CASCADE
        );
    `);
};

export default runStartupQuery;
