// D1-backed key-value store.
//
// The panel historically stored its dataset (settings, panel password, JWT
// secret, Telegram bot, Warp accounts) in a Cloudflare KV namespace through
// the `env.kv.get/put` surface. Trigen panels now bind a D1 database as
// `env.db` instead; this shim keeps the exact same get/put surface on top of
// a single `store` table so no call site changes.

let tableReady: Promise<void> | null = null;

function ensureTable(db: D1Database): Promise<void> {
    if (!tableReady) {
        tableReady = db
            .prepare('CREATE TABLE IF NOT EXISTS store (key TEXT PRIMARY KEY, value TEXT NOT NULL)')
            .run()
            .then(() => undefined)
            .catch((error) => {
                tableReady = null;
                throw error;
            });
    }

    return tableReady;
}

export function createKvShim(db: D1Database): KvShim {
    return {
        async get(key: string, options?: { type?: string }): Promise<any> {
            await ensureTable(db);
            const row = await db
                .prepare('SELECT value FROM store WHERE key = ?')
                .bind(key)
                .first<{ value: string }>();

            if (!row) return null;
            if (options?.type === 'json') {
                try {
                    return JSON.parse(row.value);
                } catch {
                    return null;
                }
            }

            return row.value;
        },

        async put(key: string, value: string): Promise<void> {
            await ensureTable(db);
            await db
                .prepare('INSERT INTO store (key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
                .bind(key, value)
                .run();
        }
    };
}
