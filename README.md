# 日本産業医機構ポータル

産業医・産業保健に関する総合情報サイト。
運営: 日本産業医機構

GitHub: https://github.com/nihon-sangyoui-organization/sangyoui-navi

## 構成

1. 企業向け
   - 安全衛生の実務情報
   - 産業医紹介・コンサル相談窓口

2. 産業医向け
   - 産業医業務で必要な知識
   - 自分で仕事を取り、適正に契約するための情報
   - 産業医アカデミーへの導線

## 原則

- 表のブランドは中立の情報拠点とする
- 企業向け記事にアカデミーを出さない
- 産業医向け記事に紹介サービスの営業を出さない
- アカデミーの売り込み文は /for-doctors/learn/ とアカデミー本体に限る
- 法令は一次情報へリンクする
- 独自ドメイン移行を前提にする

## 開発

[Astro](https://astro.build/) で構築した情報サイトです。コンテンツページは静的生成し、相談フォームの受付 API のみ Node アダプタでオンデマンド実行します。

### 必要環境

- Node.js 20.3 以上（推奨: 22）

### セットアップと起動

```bash
npm ci          # 依存関係のインストール
npm run dev     # 開発サーバー (http://localhost:4321)
```

### そのほかのコマンド

```bash
npm run build   # 本番ビルド (dist/)
npm run preview # ビルド成果物を Node サーバーで起動
npm run check   # 型チェック (astro check)
```

### ディレクトリ構成

- `src/pages/` … ルーティング（`for-companies/`・`for-doctors/`・`api/`）
- `src/layouts/` … 共通レイアウト
- `src/styles/` … グローバル CSS
- `public/` … 静的アセット