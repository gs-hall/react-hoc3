import cache from "../data/cache.json";

export function fetchContent() {
  return fetch(process.env.REACT_APP_CONTENT_URL);
};

export function fetchContentFromCache() {
  return cache;
};