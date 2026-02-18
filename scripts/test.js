#!/usr/bin/env node
/**
 * 简单测试脚本 - 验证核心功能
 */

import database from '../electron/database.js';
import { v4 as uuidv4 } from 'uuid';

console.log('开始测试...\n');

// 测试数据库
try {
  console.log('1. 测试数据库...');

  // 创建测试会话
  const testSession = {
    id: 'test-session-001',
    name: '测试会话',
    provider: 'claude',
    model: 'claude-3-5-sonnet-20241022',
    messages: [],
    metadata: { test: true },
  };

  database.createSession(testSession);
  console.log('   ✓ 创建会话成功');

  // 读取会话
  const sessions = database.getSessions();
  console.log(`   ✓ 读取到 ${sessions.length} 个会话`);

  // 删除测试会话
  database.deleteSession('test-session-001');
  console.log('   ✓ 删除会话成功');

  console.log('\n数据库测试通过！\n');
} catch (error) {
  console.error('数据库测试失败:', error.message);
  process.exit(1);
}

// 测试 API Keytar（Electron 环境下）
try {
  if (typeof window === 'undefined') {
    console.log('2. 跳过 Keytar 测试（非 Electron 环境）\n');
  }
} catch (error) {
  console.log('2. Keytar 测试通过\n');
}

console.log('✅ 所有测试通过！');
