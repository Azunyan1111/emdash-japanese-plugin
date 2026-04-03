# EmDash 日本語化プラグイン

EmDash 管理画面の英語 UI を日本語へ置換するプラグインです。

## 概要

- 管理画面のメニュー、ラベル、ボタン、プレースホルダー、説明文を日本語化します。
- 既存の EmDash 管理画面に対して、プラグイン側から翻訳を適用します。
- 翻訳カタログは `src/catalog/` 配下で管理しています。

## インストール

```bash
pnpm add emdash-japanese-plugin
```

ローカル配布物から導入する場合は、あらかじめこのリポジトリで `pnpm build` と `pnpm pack` を実行し、生成された `.tgz` を導入先サイトへ追加してください。

```bash
pnpm add ../emdash-japanese-plugin-0.1.0.tgz
```

## 使い方

`astro.config.mjs` でプラグインを登録してください。

```ts
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { japanesePlugin } from "emdash-japanese-plugin";

export default defineConfig({
	integrations: [
		emdash({
			plugins: [japanesePlugin()],
		}),
	],
});
```

その後は、導入先の EmDash サイト側で通常どおり依存関係の解決と開発サーバーの起動を行ってください。

## 対応範囲

- `astro.config.mjs` から利用するための `japanesePlugin()` を公開しています。
- パッケージには `./plugin` と `./admin` のエントリーポイントを含み、管理画面の文言置換を適用します。

## 開発

```bash
pnpm install
```

```bash
pnpm test
```

型検査とビルド:

```bash
pnpm typecheck
pnpm build
```

翻訳カタログの再生成:

```bash
pnpm extract:catalog
```

公開用パッケージの確認:

```bash
pnpm pack
```

公開対象には `dist/`, `README.md`, `CHANGELOG.md` のみを含めています。

## リポジトリ

- GitHub: [https://github.com/Azunyan1111/emdash-japanese-plugin](https://github.com/Azunyan1111/emdash-japanese-plugin)
