/// <reference types="vite/client" />

// StyleFeed 라이브러리 전역 타입 선언
declare module 'instagram-feed' {
  import { StyleFeedOptions, StyleFeedData } from './types/StyleFeed';

  class StyleFeed {
    constructor(options: StyleFeedOptions);
  }

  export = StyleFeed;
}
