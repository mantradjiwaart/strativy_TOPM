/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BoardroomServer } from './server/BoardroomServer';

new BoardroomServer().start().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`Failed to start server: ${message}\n`);
  process.exit(1);
});
