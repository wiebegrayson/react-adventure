interface ImportMetaEnv
  extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
  readonly VITE_UNSPLASH_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
