/**
 * Client-Side Audio & Lyric Intelligence Engine
 * 
 * Provides 100% browser-native audio scene segmentation, beat synchronization,
 * and lyric alignment using the Web Audio API. Eliminates the requirement for
 * proprietary multimodal cloud APIs, allowing full director functionality
 * across Perchance, Pollinations, local LLMs, and standard OpenAI endpoints.
 */

import { AudioBeatDrop, detectAudioPeakDrops } from './beatDetection';

export interface AudioArcBeat {
  lyric: string;
  beat?: string;
  duration: number;
  groupName: string;
  startTime?: string;
  endTime?: string;
  energyLevel?: 'low' | 'medium' | 'high' | 'peak';
}

export interface ClientBeatsOptions {
  minSceneDuration?: number;    // Default: 4.0s
  maxSceneDuration?: number;    // Default: 10.0s
  targetSceneDuration?: number; // Default: 6.0s
  sensitivity?: number;         // 0 to 100, default: 50
}

/**
 * Format seconds into MM:SS string
 */
export function formatTimeSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Parses raw lyric text into structured lines and section headings.
 */
export function parseLyricSections(lyricsText: string): { group: string; lines: string[] }[] {
  if (!lyricsText || !lyricsText.trim()) return [];

  const rawLines = lyricsText.split('\n').map(l => l.trim());
  const sections: { group: string; lines: string[] }[] = [];
  let currentGroup = 'Verse';
  let currentLines: string[] = [];

  for (const line of rawLines) {
    if (!line) {
      if (currentLines.length > 0) {
        sections.push({ group: currentGroup, lines: [...currentLines] });
        currentLines = [];
      }
      continue;
    }

    // Detect section headers like [Verse 1], [Chorus], [Bridge], [Intro], [Drop]
    const headerMatch = line.match(/^\[([A-Za-z0-9\s\-–]+)\]$/);
    if (headerMatch) {
      if (currentLines.length > 0) {
        sections.push({ group: currentGroup, lines: [...currentLines] });
        currentLines = [];
      }
      currentGroup = headerMatch[1].trim();
      continue;
    }

    // Ignore SFX markers if alone, or keep as lyric cue
    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    sections.push({ group: currentGroup, lines: [...currentLines] });
  }

  return sections;
}

/**
 * Flattens parsed lyric sections into an array of clean lines with group annotations.
 */
export function extractCleanLyricLines(lyricsText: string): { group: string; line: string }[] {
  const sections = parseLyricSections(lyricsText);
  const results: { group: string; line: string }[] = [];

  for (const sec of sections) {
    for (const line of sec.lines) {
      results.push({ group: sec.group, line });
    }
  }

  return results;
}

/**
 * Generates client-side timed scene beats from Web Audio metrics and lyrics.
 * Slices the audio into scenes between 4.0 and 10.0 seconds, snapped to musical
 * beat peaks and drops, and aligns lyrics intelligently.
 */
export function generateClientSideBeats(
  audioDuration: number,
  intensityData: number[] | null,
  detectedDrops: AudioBeatDrop[] = [],
  lyricsText: string = '',
  options: ClientBeatsOptions = {}
): AudioArcBeat[] {
  const exactDuration = Math.max(4, Math.floor(audioDuration || 60));
  const minDur = options.minSceneDuration ?? 4.0;
  const maxDur = options.maxSceneDuration ?? 10.0;
  // 1. Determine target scene duration
  const targetDur = options.targetSceneDuration ?? 6.0;

  // 2. Collect beat drops and high-energy transients
  const dropsToUse = (detectedDrops.length > 0)
    ? detectedDrops
    : (intensityData && intensityData.length > 0)
      ? detectAudioPeakDrops(intensityData, exactDuration, {
          sensitivity: options.sensitivity ?? 50,
          minDistanceSeconds: minDur
        })
      : [];

  // 3. Calculate cut timestamps [0, t1, t2, ..., exactDuration]
  const cutPoints: number[] = [0];
  let currentTime = 0;

  while (currentTime < exactDuration - minDur) {
    const idealNext = currentTime + targetDur;

    // Search for a candidate beat peak or drop near idealNext (within +/- 2.5s)
    let bestPeak: AudioBeatDrop | null = null;
    let bestDist = Infinity;

    for (const drop of dropsToUse) {
      const dist = Math.abs(drop.time - idealNext);
      const sceneLength = drop.time - currentTime;
      if (sceneLength >= minDur && sceneLength <= maxDur && dist <= 2.5) {
        // Favor major drops and higher prominence
        const weight = drop.isDrop ? 0.5 : 1.0;
        const score = dist * weight;
        if (score < bestDist) {
          bestDist = score;
          bestPeak = drop;
        }
      }
    }

    let nextCut = bestPeak ? Math.round(bestPeak.time * 10) / 10 : Math.round(idealNext * 10) / 10;
    
    // Ensure duration constraints
    if (nextCut - currentTime < minDur) nextCut = currentTime + minDur;
    if (nextCut - currentTime > maxDur) nextCut = currentTime + maxDur;
    if (nextCut >= exactDuration) break;

    // If remaining time after this cut is less than minDur, merge with end
    if (exactDuration - nextCut < minDur) {
      break;
    }

    cutPoints.push(nextCut);
    currentTime = nextCut;
  }
  cutPoints.push(exactDuration);

  // 4. Calculate raw scene durations
  const rawScenes: { start: number; end: number; duration: number }[] = [];
  for (let i = 0; i < cutPoints.length - 1; i++) {
    const start = cutPoints[i];
    const end = cutPoints[i + 1];
    rawScenes.push({
      start,
      end,
      duration: Math.round((end - start) * 10) / 10
    });
  }

  // 5. Ensure sum equals exactDuration exactly
  const total = rawScenes.reduce((acc, s) => acc + s.duration, 0);
  const diff = Math.round((exactDuration - total) * 10) / 10;
  if (diff !== 0 && rawScenes.length > 0) {
    const last = rawScenes[rawScenes.length - 1];
    last.duration = Math.max(minDur, Math.round((last.duration + diff) * 10) / 10);
    last.end = exactDuration;
  }

  // 6. Align lyrics to the generated scenes
  const lyricLines = extractCleanLyricLines(lyricsText);
  const totalScenes = rawScenes.length;
  const beats: AudioArcBeat[] = [];

  for (let i = 0; i < totalScenes; i++) {
    const scene = rawScenes[i];
    const progress = (scene.start + scene.duration / 2) / exactDuration;

    // Determine musical section naming
    let sectionName = 'Scene ' + (i + 1);
    let energyLevel: 'low' | 'medium' | 'high' | 'peak' = 'medium';

    if (progress < 0.12) {
      sectionName = 'Intro';
      energyLevel = 'low';
    } else if (progress > 0.88) {
      sectionName = 'Outro';
      energyLevel = 'low';
    } else {
      // Check if this scene overlaps a major drop
      const hasDrop = dropsToUse.some(d => d.isDrop && d.time >= scene.start && d.time <= scene.end);
      if (hasDrop) {
        sectionName = 'Drop / Climax';
        energyLevel = 'peak';
      } else if (progress > 0.35 && progress < 0.60) {
        sectionName = (i % 2 === 0) ? 'Chorus' : 'Verse 2';
        energyLevel = 'high';
      } else if (progress >= 0.60 && progress <= 0.75) {
        sectionName = 'Bridge / Buildup';
        energyLevel = 'high';
      } else {
        sectionName = 'Verse ' + (Math.floor(progress * 3) + 1);
        energyLevel = 'medium';
      }
    }

    // Assign lyric lines
    let sceneLyric = '';
    if (lyricLines.length > 0) {
      // Map lyric lines proportionally across scenes
      const linesPerScene = lyricLines.length / totalScenes;
      const startIdx = Math.floor(i * linesPerScene);
      const endIdx = Math.min(lyricLines.length, Math.floor((i + 1) * linesPerScene));
      const slice = lyricLines.slice(startIdx, Math.max(startIdx + 1, endIdx));

      sceneLyric = slice.map(s => s.line).join(' | ');
      if (slice[0] && slice[0].group && slice[0].group !== 'Verse') {
        sectionName = slice[0].group;
      }
    } else {
      // Dynamic musical beat description if no lyrics
      const descriptions: Record<string, string> = {
        'Intro': 'Atmospheric opening with ambient texture and subtle instrumentation buildup.',
        'Verse 1': 'Rhythmic bassline establishes the groove with intimate character focus.',
        'Verse 2': 'Driving percussion and intensifying motion as momentum builds.',
        'Chorus': 'Explosive melodic hook with dynamic cinematic camera sweeps.',
        'Drop / Climax': 'Maximum sonic surge and percussive release with kinetic visual cuts.',
        'Bridge / Buildup': 'Harmonic tension builds with dramatic lighting and suspenseful pacing.',
        'Outro': 'Decelerating tempo with lingering atmospheric visuals fading out.'
      };
      sceneLyric = descriptions[sectionName] || `Musical passage with ${energyLevel} energy.`;
    }

    beats.push({
      lyric: sceneLyric,
      beat: `Scene ${i + 1} (${formatTimeSeconds(scene.start)} - ${formatTimeSeconds(scene.end)}): ${sectionName}`,
      duration: scene.duration,
      groupName: sectionName,
      startTime: formatTimeSeconds(scene.start),
      endTime: formatTimeSeconds(scene.end),
      energyLevel
    });
  }

  return beats;
}

/**
 * Formats user lyrics into a timestamped script with [MM:SS] cues aligned
 * to the detected scene cuts.
 */
export function formatLyricsWithTimestamps(
  lyricsText: string,
  beats: AudioArcBeat[]
): string {
  if (!beats || beats.length === 0) return lyricsText;

  const lines = beats.map((b) => {
    const timeStr = `[${b.startTime || '00:00'}]`;
    const group = b.groupName ? ` [${b.groupName}]` : '';
    return `${timeStr}${group} ${b.lyric}`;
  });

  return lines.join('\n\n');
}

/**
 * Exports storyboard scenes to Perchance-compatible syntax for perchance.org
 */
export function exportToPerchanceGenerator(
  storyboard: any[],
  projectName: string = 'AudioArc Project',
  narrative: string = '',
  styleName: string = 'Cinematic Film'
): string {
  if (!storyboard || storyboard.length === 0) return '';

  const header = `// -------------------------------------------------------------
// Perchance Generator: ${projectName}
// Generated with AudioArc: AI Filmmaking Assistant
// -------------------------------------------------------------

title = ${projectName} - AI Music Video Storyboard
visual_style = ${styleName}
narrative = ${narrative || 'Music video visual journey'}

output
  <h1>[title]</h1>
  <p><b>Visual Style:</b> [visual_style]</p>
  <p><b>Narrative:</b> [narrative]</p>
  <hr>
  [sceneView]

sceneView
  [s = scenes.selectOne, ""]
  <div style="background:#18181b; color:#f4f4f5; padding:16px; border-radius:12px; margin-bottom:16px; font-family:sans-serif; border:1px solid #27272a;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span style="font-weight:bold; color:#60a5fa;">SCENE [s.number] ([s.time])</span>
      <span style="background:#27272a; padding:2px 8px; border-radius:999px; font-size:12px;">[s.group]</span>
    </div>
    <p style="color:#fbbf24; font-style:italic;">"[s.lyric]"</p>
    <p><b>Visual:</b> [s.description]</p>
    <div style="background:#09090b; padding:10px; border-radius:8px; margin:8px 0; font-size:13px;">
      <span style="color:#a1a1aa; font-weight:bold;">Master Image Prompt:</span><br>
      [s.imagePrompt]
    </div>
    <div style="background:#09090b; padding:10px; border-radius:8px; margin:8px 0; font-size:13px;">
      <span style="color:#34d399; font-weight:bold;">Sora / Veo Video Prompt:</span><br>
      [s.soraPrompt]
    </div>
  </div>

scenes
`;

  const sceneEntries = storyboard.map((s, idx) => {
    const cleanLyric = (s.lyric || '').replace(/[\r\n]+/g, ' ').replace(/"/g, '\\"');
    const cleanDesc = (s.description || '').replace(/[\r\n]+/g, ' ').replace(/"/g, '\\"');
    const cleanImagePrompt = (s.imagePrompt || '').replace(/[\r\n]+/g, ' ').replace(/"/g, '\\"');
    const cleanSoraPrompt = (s.soraPrompt || '').replace(/[\r\n]+/g, ' ').replace(/"/g, '\\"');

    return `  scene${idx + 1}
    number = ${idx + 1}
    time = ${s.startTime || '00:00'} - ${s.endTime || '00:00'}
    group = ${s.groupName || 'Scene'}
    duration = ${s.duration || 4}s
    lyric = ${cleanLyric}
    description = ${cleanDesc}
    imagePrompt = ${cleanImagePrompt}
    soraPrompt = ${cleanSoraPrompt}
`;
  }).join('\n');

  return header + sceneEntries;
}
