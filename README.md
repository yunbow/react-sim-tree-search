# ツリー探索可視化アプリ

React 18とTypeScript、Vis.jsで構築されたツリー探索アルゴリズムの可視化アプリケーションです。

## デモプレイ
https://yunbow.github.io/react-sim-tree-search/demo/

## 主要機能

### 1. 探索アルゴリズム
- **幅優先探索（BFS）**
- **深さ優先探索（DFS）Preorder**
- **深さ優先探索（DFS）Inorder**
- **深さ優先探索（DFS）Postorder**

### 2. ツリー生成機能
- **データサイズ**: 5〜50ノードの範囲で設定可能（デフォルト: 10ノード）

- **データ生成パターン**
  - ランダム
  - 二分探索木（BST）
  - AVL木
  - 赤黒木
  - Min-Heap
  - Max-Heap

### 3. アニメーション機能
- **再生制御**: 実行 / 一時停止 / 再開ボタン
- **アニメーション速度調整**: スライダーで速度調整可能

### 4. 色分けルール（視覚的ステータス表示）

探索アルゴリズムの進行状況を直感的に理解できるよう、ノードの状態を色で表現します。

| 状態                | 説明                          | カラー |
| ----------------- | --------------------------- | ---- |
| **未訪問**           | まだ処理されていない                  | 灰色   |
| **現在処理中（Active）** | BFS/DFS の現在ノード              | 青    |
| **探索済み（Visited）** | 探索キューから取り出され処理済み            | 緑    |
| **キュー/スタック待ち**    | BFSのQueue / DFSのStackに入っている | 黄    |

### 5. モード仕様

#### 5.1 シングルモード
- 1つの探索アルゴリズムを選択し、単体で実行・可視化

#### 5.2 比較モード
- 画面左右にアルゴリズム選択プルダウンを2つ配置
- ツリー構造は片側で生成したものと同じものを両側に適用
- 両アルゴリズムのアニメーションを独立して再生可能
- ステップ数や処理ログも左右それぞれに表示

### 6. UI機能
- アルゴリズム選択プルダウン
- データサイズ入力フィールド
- 生成パターンプルダウン
- 実行/一時停止/再開 ボタン
- リセットボタン
- アニメーション速度スライダー
- ステップ数表示
- 実行ログ表示

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Vis.js** - グラフ可視化ライブラリ
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                        # 機能別モジュール
│   └── tree/                        # ツリー探索機能
│       ├── algorithms/              # 探索アルゴリズム実装
│       │   └── index.ts
│       ├── components/              # 機能専用コンポーネント
│       │   ├── TreeVisualization/   # Vis.jsツリー可視化
│       │   ├── TreeControls/        # ツリーコントロール
│       │   ├── TreeStats/           # 統計表示
│       │   └── TreeLog/             # ログ表示
│       ├── hooks/                   # カスタムフック
│       │   └── useTreeTraversal.ts
│       ├── utils/                   # ユーティリティ
│       │   └── dataGenerator.ts
│       ├── TreeSimulator/           # シングルモードコンポーネント
│       └── ComparisonMode/          # 比較モードコンポーネント
├── components/                      # 共通UIコンポーネント
│   ├── Button/                      # ボタン
│   ├── Select/                      # セレクトボックス
│   ├── Slider/                      # スライダー
│   └── Input/                       # テキスト入力
├── types/                           # 汎用的な型定義
│   └── index.ts
├── App.tsx                          # メインアプリ
├── main.tsx                         # エントリーポイント
└── theme.css                        # テーマカラー定義
```

## セットアップ

### 依存パッケージのインストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### Storybook起動

```bash
npm run storybook
```

ブラウザで `http://localhost:6006` を開きます。

### Storybook ビルド

```bash
npm run build-storybook
```
## ライセンス

MIT License
