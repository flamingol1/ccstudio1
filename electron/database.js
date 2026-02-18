import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

const DB_PATH = path.join(app.getPath('userData'), 'ccstudio1.db');

class DatabaseManager {
  constructor() {
    this.db = new Database(DB_PATH);
    this.db.pragma('journal_mode = WAL');
    this.initTables();
  }

  initTables() {
    // 会话表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        messages TEXT NOT NULL,
        metadata TEXT
      )
    `);

    // 看板表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS boards (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);

    // 任务表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        board_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE
      )
    `);

    // 文档表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);

    // 配置表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    console.log('Database tables initialized');
  }

  // 会话操作
  getSessions() {
    return this.db
      .prepare('SELECT * FROM sessions ORDER BY updated_at DESC')
      .all();
  }

  getSession(id) {
    return this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
  }

  createSession(session) {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO sessions (id, name, provider, model, created_at, updated_at, messages, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        session.id,
        session.name,
        session.provider,
        session.model,
        now,
        now,
        JSON.stringify(session.messages || []),
        JSON.stringify(session.metadata || {})
      );
    return this.getSession(session.id);
  }

  updateSession(id, updates) {
    const now = Date.now();
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.messages !== undefined) {
      fields.push('messages = ?');
      values.push(JSON.stringify(updates.messages));
    }
    if (updates.metadata !== undefined) {
      fields.push('metadata = ?');
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) return this.getSession(id);

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    this.db
      .prepare(`UPDATE sessions SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values);
    return this.getSession(id);
  }

  deleteSession(id) {
    this.db.prepare('DELETE FROM sessions WHERE id = ?').run(id);
  }

  // 看板操作
  getBoards() {
    return this.db
      .prepare('SELECT * FROM boards ORDER BY created_at ASC')
      .all();
  }

  getBoard(id) {
    return this.db.prepare('SELECT * FROM boards WHERE id = ?').get(id);
  }

  createBoard(board) {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO boards (id, name, color, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(board.id, board.name, board.color, now, now);
    return this.getBoard(board.id);
  }

  updateBoard(id, updates) {
    const now = Date.now();
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.color !== undefined) {
      fields.push('color = ?');
      values.push(updates.color);
    }

    if (fields.length === 0) return this.getBoard(id);

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    this.db
      .prepare(`UPDATE boards SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values);
    return this.getBoard(id);
  }

  deleteBoard(id) {
    this.db.prepare('DELETE FROM boards WHERE id = ?').run(id);
  }

  // 任务操作
  getTasks(boardId) {
    return this.db
      .prepare('SELECT * FROM tasks WHERE board_id = ? ORDER BY position ASC')
      .all(boardId);
  }

  getTask(id) {
    return this.db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  }

  createTask(task) {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO tasks (id, board_id, title, description, status, priority, position, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        task.id,
        task.boardId,
        task.title,
        task.description || '',
        task.status,
        task.priority,
        task.position,
        now,
        now
      );
    return this.getTask(task.id);
  }

  updateTask(id, updates) {
    const now = Date.now();
    const fields = [];
    const values = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }
    if (updates.status !== undefined) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.priority !== undefined) {
      fields.push('priority = ?');
      values.push(updates.priority);
    }
    if (updates.position !== undefined) {
      fields.push('position = ?');
      values.push(updates.position);
    }

    if (fields.length === 0) return this.getTask(id);

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    this.db
      .prepare(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values);
    return this.getTask(id);
  }

  deleteTask(id) {
    this.db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  }

  // 文档操作
  getDocuments() {
    return this.db
      .prepare('SELECT * FROM documents ORDER BY updated_at DESC')
      .all();
  }

  getDocument(id) {
    return this.db.prepare('SELECT * FROM documents WHERE id = ?').get(id);
  }

  createDocument(doc) {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO documents (id, title, content, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(doc.id, doc.title, doc.content, now, now);
    return this.getDocument(doc.id);
  }

  updateDocument(id, updates) {
    const now = Date.now();
    const fields = [];
    const values = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push('content = ?');
      values.push(updates.content);
    }

    if (fields.length === 0) return this.getDocument(id);

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    this.db
      .prepare(`UPDATE documents SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values);
    return this.getDocument(id);
  }

  deleteDocument(id) {
    this.db.prepare('DELETE FROM documents WHERE id = ?').run(id);
  }

  // 设置操作
  getSetting(key) {
    const row = this.db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
    return row ? JSON.parse(row.value) : null;
  }

  setSetting(key, value) {
    this.db
      .prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `)
      .run(key, JSON.stringify(value));
  }

  close() {
    this.db.close();
  }
}

export default new DatabaseManager();
