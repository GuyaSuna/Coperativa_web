"use client";
export const getToken = () => {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
};
