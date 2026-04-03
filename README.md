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

依存関係を追加した後は、通常どおり EmDash サイトを初期化して起動します。

```bash
pnpm install
pnpm bootstrap
pnpm dev
```

## 対応範囲

- 本プラグインは `astro.config.mjs` に登録して使う config-based plugin です。
- EmDash Marketplace 向けプラグインではありません。
- `emdash@0.1.0` の標準プラグイン一覧画面では、プラグイン名や説明文は表示されず、プラグイン ID が表示されます。

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
