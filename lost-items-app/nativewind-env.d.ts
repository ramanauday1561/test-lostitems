/// <reference types="nativewind/types" />
// expo/types declares the `*.css` side-effect import that global.css needs.
// expo-env.d.ts normally carries this, but it is gitignored and only written by
// `expo start`, so a clean checkout (CI) has no declaration without this line.
/// <reference types="expo/types" />
