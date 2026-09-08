<div align="center">
  <h1>🤖 Telegram Bot Template</h1>
  <p><i>A structured, modular, and professional template for building robust <a href="https://telegraf.js.org/">Telegraf v4</a> bots in JavaScript (ESM).</i></p>

  <p>
    <a href="https://telegraf.js.org/"><img src="https://img.shields.io/badge/Telegraf-Hardened-blue?style=for-the-badge&logo=telegram" alt="Telegraf Hardened" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma" alt="Prisma" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js" alt="Node.js" /></a>
  </p>
</div>

---

## 🧩 Structure Codebase

Codebase ini disusun secara modular berdasarkan 3 folder utama:

- `plugins/`: Tempat menyimpan handler command/slash command yang dipisahkan berdasarkan kategori (contoh: `general/`, `utility/`, `interactive/`).
- `middleware/`: Tempat menyimpan handler event listener bot (events, buttons, scenes, command options, serta loader handlers).
- `utils/`: Tempat menyimpan utilitas pembantu (Logger, env parser, path resolver, prisma client).

---

## ✨ Features

This template abstracts away the boilerplate of registering commands and strict middleware routing for the Telegram API.

- **Automatic Command Syncing**: Command metadata (descriptions and names) automatically sync to the Telegram UI menu when the bot starts. You can exclude specific commands using the `hideFromMenu` property.
- **Component Routing**: Supports granular, file-based routing for **Slash Commands**, **Inline Buttons**, **Keyboard Buttons**, and **Inline Queries (Autocomplete)**. Handlers automatically register themselves on boot without cluttering a central file.
- **Built-in Execution Guards**: Intercept commands globally before execution. Support for `ownerOnly`, `developerOnly`, `adminOnly`, `privateOnly`, `groupOnly`, missing argument enforcement, and per-user `cooldown` rates natively baked in.
- **Prisma ORM Integrated**: Includes Prisma setup with SQLite database default and a singleton client in `utils/prisma.js`.

---

## 🚀 Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather) on Telegram)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sea-deep/telegram-bot-template.git
   cd telegram-bot-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Copy the example environment file and update it with your credentials:
   ```bash
   cp .env.example .env
   ```
   > 🔑 *Open `.env` and insert your `BOT_TOKEN`.*

4. **Initialize Database with Prisma**
   ```bash
   npm run prisma:push
   ```

---

## 💻 Running the Bot

| Mode | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the bot with native `--watch` hot-reloading in Node.js. |
| **Production** | `npm start` | Starts the Node.js process directly without needing compilation. |

---

## 📁 Detailed Project Structure

```text
telegram-bot-template/
├── plugins/           # ➔ Slash commands dipisahkan berdasarkan kategori
│   ├── general/
│   ├── utility/
│   └── interactive/
├── middleware/        # ➔ Event listeners, button triggers, scene stages, & handlers
│   ├── events/
│   ├── buttons/
│   └── scenes/
├── utils/             # ➔ Helper utilities (Logger, env, pathResolver, prisma)
├── index.js           # Main entry point
├── prisma/            # Prisma schema and configuration
├── .env.example       # Environment template
└── package.json       # Dependencies and scripts
```

---

## 🛡️ Telegraf vs Telegraf-Hardened

Project ini menggunakan **`telegraf-hardened`** sebagai pengganti `telegraf` standar. Berikut adalah beberapa perbedaan utama:

1. **Long-Polling Resilience & Conflict Handling (`409: Conflict`)**:
   - `telegraf-hardened` memiliki dukungan native untuk menangani error `409 Conflict` (misalnya saat bot direstart secara cepat di lingkungan Docker / CI / production).
   - Opsi `bot.launch({ polling: { retryOnConflict: true, maxRetryDelay: 30000 } })` mengaktifkan exponential backoff secara otomatis agar bot tidak crash akibat konflik session Telegram.

2. **Perbaikan Bug & Modul Komunitas**:
   - Menggunakan `@telegraf-hardened/types` yang terus diperbarui untuk kompatibilitas type-definition Telegram Bot API terbaru.
   - Patch dan perbaikan bug dari komunitas untuk kestabilan runtime dan pengelolaan event / middleware.

3. **Subpath Imports**:
   - Mendukung import subpath terstruktur langsung dari `telegraf-hardened`:
     - `telegraf-hardened/filters`
     - `telegraf-hardened/format`
     - `telegraf-hardened/types`
     - `telegraf-hardened/scenes`

---

## 📄 License

This project is licensed under the [GPL-3.0 License](./LICENSE).
