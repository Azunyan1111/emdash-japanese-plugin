# EmDash 日本語化プラグイン

EmDash 管理画面の英語 UI を日本語へ置換するプラグインです。

## 概要

- メニュー、ラベル、ボタン、プレースホルダー、説明文を日本語化します。
- `admin.tsx` の副作用で管理画面 DOM を監視し、既存 UI へ後付けで翻訳を適用します。
- 翻訳元カタログは `src/catalog/` 配下にファイル単位で保持しています。

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

## 開発

依存関係をインストールします。

```bash
pnpm install
```

テストを実行します。

```bash
pnpm test
```

翻訳カタログを再生成します。

```bash
pnpm extract:catalog
```

## リリース対象

- `src/descriptor.ts`
- `src/index.ts`
- `src/admin.tsx`
- `src/catalog/`
- `README.md`
- `CHANGELOG.md`

## 配布確認

- `pnpm pack --pack-destination ./work/release` で `emdash-japanese-plugin-0.1.0.tgz` を生成済みです。
- `work/release-site` に新規 EmDash サイトを作成し、`.tgz` を `pnpm add` で導入した状態で `pnpm bootstrap` と `pnpm dev` が通ることを確認済みです。
- 導入先の `/_emdash/api/admin/plugins` で `japanese` プラグインが `enabled: true` になることを確認済みです。

## リポジトリ

- GitHub: [https://github.com/Azunyan1111/emdash-japanese-plugin](https://github.com/Azunyan1111/emdash-japanese-plugin)
