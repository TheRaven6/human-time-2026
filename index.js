/**
 * human-time-2026 v1.0.0
 * Copyright (c) 2026 Abhishek Suresh (https://github.com/AbhishekSuresh2)
 * Released under the MIT License.
 * * Usage Restriction: Please do not copy, modify, and republish this 
 * Package as your own without explicit permission. 
 * * Contributions: Found a bug or have an idea?, Please open an issue; 
 * Please submit a Pull Request (PR) to the official repository.
 */

export default function humanTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now - target) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  // Future or Past Check
  const isFuture = diffInSeconds < 0;

  if (absDiff < 5) return "just now";
  if (absDiff < 60) return isFuture ? `in ${absDiff}s` : `${absDiff}s ago`;

  const diffInMinutes = Math.floor(absDiff / 60);
  if (diffInMinutes < 60) return isFuture ? `in ${diffInMinutes}m` : `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  
  if (diffInHours < 24) {
    if (target.getDate() === now.getDate()) {
      const hour = target.getHours();
      if (hour < 5) return "late last night";
      if (hour < 12) return "this morning";
      if (hour < 17) return "this afternoon";
      return "this evening";
    }
    return isFuture ? "tomorrow" : "yesterday";
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) return isFuture ? "tomorrow" : "yesterday";
    return isFuture ? `in ${diffInDays} days` : `${diffInDays} days ago`;
  }

  // Monthly/Yearly logic
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return target.toLocaleString('default', { month: 'short', day: 'numeric' });
  
  return target.getFullYear().toString();
}
