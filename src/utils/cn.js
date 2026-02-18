import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 TailwindCSS 类名
 * @param {...string} inputs - 类名
 * @returns {string} 合并后的类名
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 生成唯一 ID
 * @returns {string} 唯一标识符
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化日期时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期时间字符串
 */
export function formatDateTime(date) {
  const now = new Date(date);
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
