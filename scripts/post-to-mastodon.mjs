#!/usr/bin/env node

/**
 * Script de publication automatique sur Mastodon.
 * Détecte les nouveaux billets de blog publiés (non draft) dans le dernier commit
 * et envoie une notification sur Mastodon.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const SITE_URL = 'https://ludovic.coullet.net';
const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE || 'https://mastodon.social';
const MASTODON_ACCESS_TOKEN = process.env.MASTODON_ACCESS_TOKEN;
const IS_DRY_RUN = process.argv.includes('--dry-run') || !MASTODON_ACCESS_TOKEN;

// Extraction des arguments pour le diff
let before = '';
let after = '';

const beforeIdx = process.argv.indexOf('--before');
if (beforeIdx !== -1 && beforeIdx + 1 < process.argv.length) {
  before = process.argv[beforeIdx + 1];
}

const afterIdx = process.argv.indexOf('--after');
if (afterIdx !== -1 && afterIdx + 1 < process.argv.length) {
  after = process.argv[afterIdx + 1];
}

// Fallbacks
if (before === '0000000000000000000000000000000000000000' || !before) {
  before = 'HEAD~1';
}
if (!after) {
  after = 'HEAD';
}

console.log(`[Mastodon] Analyse des différences entre ${before} et ${after}...`);
if (IS_DRY_RUN) {
  console.log('[Mastodon] Mode Simulation (Dry Run) activé ou MASTODON_ACCESS_TOKEN manquant.');
}

/**
 * Analyse le frontmatter simple en Regex (évite d'importer une dépendance YAML lourde)
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return {};

  const lines = match[1].split('\n');
  const data = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();

      // Enlever les guillemets éventuels
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }

      data[key] = val;
    }
  }

  return data;
}

/**
 * Extrait l'ID (slug) du billet à partir du chemin du fichier
 */
function getPostId(filePath) {
  const relativePath = filePath.replace(/^src\/content\/blog\//, '');
  const ext = path.extname(relativePath);
  return relativePath.slice(0, -ext.length);
}

async function run() {
  let diffOutput = '';
  try {
    diffOutput = execSync(`git diff --name-status ${before} ${after}`, { encoding: 'utf8' });
  } catch (err) {
    console.warn(`[Mastodon] Impossible de comparer ${before} et ${after} directement via git diff. Utilisation de HEAD~1 à HEAD comme repli.`);
    try {
      diffOutput = execSync('git diff --name-status HEAD~1 HEAD', { encoding: 'utf8' });
      before = 'HEAD~1';
      after = 'HEAD';
    } catch (fallbackErr) {
      console.error('[Mastodon] Erreur critique: Impossible d\'obtenir le diff Git.', fallbackErr.message);
      process.exit(0); // On ne bloque pas la CI s'il n'y a pas d'historique git
    }
  }

  const lines = diffOutput.split('\n');
  const newPublications = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Le format de git diff --name-status est "STATUS\tFILEPATH"
    const [status, filePath] = line.split(/\s+/);
    if (!filePath) continue;

    // On ne s'intéresse qu'aux fichiers de blog dans src/content/blog/ se terminant par .md ou .mdx
    if (!filePath.startsWith('src/content/blog/') || (!filePath.endsWith('.md') && !filePath.endsWith('.mdx'))) {
      continue;
    }

    console.log(`[Mastodon] Analyse du fichier détecté : ${filePath} (Statut Git : ${status})`);

    // 1. Lire la version actuelle (dans le commit 'after' ou directement dans le working tree actuel)
    let currentContent = '';
    try {
      currentContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.log(`[Mastodon] Impossible de lire le fichier actuel ${filePath}. Il a peut-être été supprimé.`);
      continue;
    }

    const currentMeta = parseFrontmatter(currentContent);
    const isCurrentDraft = currentMeta.draft === 'true' || currentMeta.draft === true;

    if (isCurrentDraft) {
      console.log(`[Mastodon] ${filePath} est actuellement configuré comme brouillon (draft: true). Ignoré.`);
      continue;
    }

    // 2. Vérifier l'état précédent (dans le commit 'before')
    let wasDraft = true; // Par défaut, s'il n'existait pas, on considère qu'il était en brouillon/inexistant
    let existedBefore = false;

    try {
      const oldContent = execSync(`git show ${before}:${filePath}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      existedBefore = true;
      const oldMeta = parseFrontmatter(oldContent);
      wasDraft = oldMeta.draft === 'true' || oldMeta.draft === true;
    } catch (err) {
      // Si git show échoue, le fichier n'existait pas dans le commit précédent.
      existedBefore = false;
      wasDraft = true; 
    }

    // Si le fichier n'existait pas, ou s'il existait mais était un brouillon (draft: true),
    // et qu'il est maintenant publié (draft: false), alors c'est une NOUVELLE publication !
    if (!existedBefore || wasDraft) {
      console.log(`[Mastodon] 🎉 Nouvelle publication détectée pour : ${currentMeta.title || filePath}`);
      newPublications.push({
        id: getPostId(filePath),
        title: currentMeta.title || 'Nouveau billet',
        description: currentMeta.description || ''
      });
    } else {
      console.log(`[Mastodon] ${filePath} était déjà publié dans le commit précédent (déjà non-draft).`);
    }
  }

  if (newPublications.length === 0) {
    console.log('[Mastodon] Aucun nouveau billet de blog publié détecté dans ce push.');
    return;
  }

  for (const post of newPublications) {
    const postUrl = `${SITE_URL}/blog/${post.id}`;
    
    // Construction du message Mastodon
    let statusText = `✍️ Nouveau billet sur le blog !\n\n`;
    statusText += `« ${post.title} »\n`;
    if (post.description) {
      statusText += `${post.description}\n`;
    }
    statusText += `\n👉 ${postUrl}`;

    console.log(`\n[Mastodon] Message préparé :\n---------------------------\n${statusText}\n---------------------------`);

    if (IS_DRY_RUN) {
      console.log('[Mastodon] [Simulation] Le statut n\'a pas été publié sur Mastodon.');
    } else {
      try {
        console.log(`[Mastodon] Envoi du statut vers ${MASTODON_INSTANCE}...`);
        const response = await fetch(`${MASTODON_INSTANCE}/api/v1/statuses`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${MASTODON_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: statusText,
            visibility: 'public'
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Erreur API Mastodon (Status ${response.status}): ${errText}`);
        }

        const data = await response.json();
        console.log(`[Mastodon] ✅ Statut publié avec succès ! ID Mastodon : ${data.id}`);
      } catch (err) {
        console.error(`[Mastodon] ❌ Échec de la publication sur Mastodon :`, err.message);
      }
    }
  }
}

run().catch(err => {
  console.error('[Mastodon] Erreur inattendue dans le script de publication :', err);
});
