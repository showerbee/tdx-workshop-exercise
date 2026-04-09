#!/usr/bin/env node

/**
 * Reset Demo 2 Components
 *
 * This script restores the non-compliant components to their original state
 * for the SLDS 2 Transition workshop exercise.
 */

import { cpSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const backupDir = join(projectRoot, 'src/modules/ui/_backup');
const targetDir = join(projectRoot, 'src/modules/ui');

const components = ['nonCompliantCard', 'nonCompliantAlert'];

console.log('🔄 Resetting Demo 2 components to original state...\n');

for (const component of components) {
    const source = join(backupDir, component);
    const target = join(targetDir, component);

    if (!existsSync(source)) {
        console.error(`❌ Backup not found: ${source}`);
        continue;
    }

    try {
        cpSync(source, target, { recursive: true, force: true });
        console.log(`✅ Restored: ${component}`);
    } catch (error) {
        console.error(`❌ Failed to restore ${component}:`, error.message);
    }
}

console.log('\n✨ Demo 2 reset complete!');
console.log('   Refresh your browser to see the original non-compliant components.');
