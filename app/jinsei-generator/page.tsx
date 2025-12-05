"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';

// 改良版トークナイザー
function tokenize(text: string): string[] {
  const patterns = [
    'なくていい', 'すぎなくて', 'じゃなくて', 'ことができる', 'ことがある',
    'かもしれない', 'なければならない', 'ようにする', 'ことにする',
    'について', 'において', 'に対して', 'として', 'によって', 'にとって',
    'ている', 'ていた', 'ていく', 'てくる', 'てみる', 'ておく',
    'される', 'させる', 'られる', 'できる', 'すぎる',
    'だから', 'なので', 'けれど', 'しかし', 'そして', 'でも', 'ただ',
    'という', 'といった', 'のような', 'みたいな',
    'ながら', 'ために', 'ばかり', 'だけで', 'ほどの',
    'です', 'ます', 'だった', 'でした', 'ません',
    'ない', 'ある', 'いる', 'なる', 'する', 'くる', 'いく',
    'から', 'まで', 'より', 'ほど', 'くらい', 'ぐらい', 'など',
    'れば', 'たら', 'なら', 'ても', 'でも', 'のに', 'ので',
    'が', 'を', 'に', 'へ', 'で', 'と', 'や', 'の', 'は', 'も', 'か', 'よ', 'ね',
  ];

  const sortedPatterns = [...patterns].sort((a, b) => b.length - a.length);
  const result: string[] = [];

  const sentences = text.split(/([。！？\n]+)/).filter(s => s.trim());

  for (const segment of sentences) {
    if (/^[。！？\n]+$/.test(segment)) {
      result.push(segment[0]);
      continue;
    }

    let remaining = segment.trim();

    while (remaining.length > 0) {
      let matched = false;

      for (const pattern of sortedPatterns) {
        const idx = remaining.indexOf(pattern);
        if (idx > 0) {
          const before = remaining.slice(0, idx);
          if (before.trim()) result.push(before.trim());
          result.push(pattern);
          remaining = remaining.slice(idx + pattern.length);
          matched = true;
          break;
        } else if (idx === 0 && pattern.length < remaining.length) {
          result.push(pattern);
          remaining = remaining.slice(pattern.length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        if (remaining.trim()) result.push(remaining.trim());
        break;
      }
    }
  }

  return result.filter(t => t.length > 0);
}

const COLORS = [
  'bg-red-200 border-red-400',
  'bg-blue-200 border-blue-400',
  'bg-green-200 border-green-400',
  'bg-yellow-200 border-yellow-400',
  'bg-purple-200 border-purple-400',
  'bg-pink-200 border-pink-400',
  'bg-indigo-200 border-indigo-400',
  'bg-orange-200 border-orange-400',
  'bg-teal-200 border-teal-400',
  'bg-cyan-200 border-cyan-400',
  'bg-lime-200 border-lime-400',
  'bg-amber-200 border-amber-400',
];

const COLORS_LIGHT = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-orange-100',
  'bg-teal-100',
  'bg-cyan-100',
  'bg-lime-100',
  'bg-amber-100',
];

interface TokenData {
  token: string;
  sourceIndex: number;
}

interface TraceItem {
  token: string;
  sourceIndex: number;
  prevToken: string;
  candidates: TokenData[];
  isStart: boolean;
  isAutoAdded?: boolean;
}

interface SentenceData {
  original: string;
  tokens: string[];
  sourceIndex: number;
}

export default function JinseiGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const [generationTrace, setGenerationTrace] = useState<TraceItem[]>([]);
  const [showCorpus, setShowCorpus] = useState(false);
  const [showVisualization, setShowVisualization] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [newData, setNewData] = useState('');
  const [mixLevel, setMixLevel] = useState(0.6);

  // Google Fonts (Zen Maru Gothic) を読み込み
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [corpusLines, setCorpusLines] = useState([
    '人生はもっとシンプルでいい。',
    '大切なのはあなたがどう感じるかだけ。',
    '頑張りすぎなくていい。',
    'あなたのペースで歩けばそれが正解。',
    '環境を変える勇気が人生を変える。',
    '小さな一歩が未来を作る。',
    '人間関係は選んでいい。',
    'あなたを大切にしない人からは離れていい。',
    '他人と比べなくていい。',
    '昨日の自分と比べればそれでいい。',
    '疲れたら休んでいい。',
    '人生はマラソンじゃなくて散歩。',
    '行動すれば世界は変わる。',
    '動けば道は開ける。',
    '成功より成長を選べ。',
    '失敗は学びの種。',
    '夢を語れる人になれ。',
    '言葉には力がある。',
    '今日という日は二度と来ない。',
    'だから今を生きろ。',
    '自分を愛せる人が他人も愛せる。',
    'まず自分を許そう。',
    '完璧を求めなくていい。',
    '不完全でも美しい。',
    '過去は変えられない。',
    '未来は今から作れる。',
    '弱さを認められる人は強い。',
    '涙を流せる人は優しい。',
    '一人でも大丈夫。',
    'でも誰かがいるともっといい。',
  ]);

  const sentenceData: SentenceData[] = useMemo(() => {
    return corpusLines.map((line, sourceIndex) => ({
      original: line,
      tokens: tokenize(line),
      sourceIndex
    }));
  }, [corpusLines]);

  const allTokenData: TokenData[] = useMemo(() => {
    const data: TokenData[] = [];
    sentenceData.forEach(({ tokens, sourceIndex }) => {
      tokens.forEach(token => {
        data.push({ token, sourceIndex });
      });
    });
    return data;
  }, [sentenceData]);

  const unigramChain: Map<string, TokenData[]> = useMemo(() => {
    const map = new Map<string, TokenData[]>();
    sentenceData.forEach(({ tokens, sourceIndex }) => {
      for (let i = 0; i < tokens.length - 1; i++) {
        const key = tokens[i];
        const next: TokenData = { token: tokens[i + 1], sourceIndex };
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(next);
      }
    });
    return map;
  }, [sentenceData]);

  const sentenceStarters: TokenData[] = useMemo(() => {
    const starters: TokenData[] = [];
    sentenceData.forEach(({ tokens, sourceIndex }) => {
      if (tokens.length > 0 && !/^[。！？]$/.test(tokens[0])) {
        starters.push({ token: tokens[0], sourceIndex });
      }
    });
    return starters;
  }, [sentenceData]);

  const pickFromDifferentSource = (options: TokenData[], currentSourceIndex: number, probability: number): { picked: TokenData | undefined; allOptions: TokenData[] } => {
    if (options.length <= 1) return { picked: options[0], allOptions: options };

    let picked: TokenData;
    if (Math.random() < probability) {
      const differentSource = options.filter(o => o.sourceIndex !== currentSourceIndex);
      if (differentSource.length > 0) {
        picked = differentSource[Math.floor(Math.random() * differentSource.length)];
      } else {
        picked = options[Math.floor(Math.random() * options.length)];
      }
    } else {
      picked = options[Math.floor(Math.random() * options.length)];
    }

    return { picked, allOptions: options };
  };

  const generateSentence = useCallback((): { sentence: string; trace: TraceItem[] } => {
    const maxAttempts = 100;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const trace: TraceItem[] = [];
      let sentenceCount = 0;
      const maxSentences = Math.floor(Math.random() * 2) + 2;

      while (sentenceCount < maxSentences) {
        const starterIdx = Math.floor(Math.random() * sentenceStarters.length);
        const starter = sentenceStarters[starterIdx];
        let currentToken = starter.token;
        let currentSourceIndex = starter.sourceIndex;

        // 文頭トークンを記録（候補も含める）
        trace.push({
          token: currentToken,
          sourceIndex: currentSourceIndex,
          prevToken: '（文頭）',
          candidates: sentenceStarters.map(s => ({ token: s.token, sourceIndex: s.sourceIndex })),
          isStart: true
        });

        let wordCount = 1;
        const maxWords = Math.floor(Math.random() * 5) + 4;
        let consecutiveFromSameSource = 1;

        while (wordCount < maxWords) {
          const nextOptions = unigramChain.get(currentToken);
          if (!nextOptions || nextOptions.length === 0) break;

          let result;
          if (consecutiveFromSameSource >= 2) {
            result = pickFromDifferentSource(nextOptions, currentSourceIndex, 0.9);
          } else {
            result = pickFromDifferentSource(nextOptions, currentSourceIndex, mixLevel);
          }

          const nextData = result.picked;
          if (!nextData) break;

          // 遷移情報を記録
          trace.push({
            token: nextData.token,
            sourceIndex: nextData.sourceIndex,
            prevToken: currentToken,
            candidates: result.allOptions,
            isStart: false
          });

          if (nextData.sourceIndex === currentSourceIndex) {
            consecutiveFromSameSource++;
          } else {
            consecutiveFromSameSource = 1;
          }

          currentToken = nextData.token;
          currentSourceIndex = nextData.sourceIndex;
          wordCount++;

          if (currentToken === '。' || currentToken === '！' || currentToken === '？') {
            break;
          }
        }

        if (!/[。！？]/.test(currentToken)) {
          trace.push({
            token: '。',
            sourceIndex: -1,
            prevToken: currentToken,
            candidates: [{ token: '。', sourceIndex: -1 }],
            isStart: false,
            isAutoAdded: true
          });
        }

        sentenceCount++;
      }

      const text = trace.map(t => t.token).join('');

      const uniqueSources = new Set(trace.map(t => t.sourceIndex).filter(i => i >= 0));
      if (text.length <= 140 && text.length >= 15 && uniqueSources.size >= 2) {
        return { sentence: text, trace };
      }
    }

    return { sentence: '人生は散歩。動けば道は開ける。', trace: [] };
  }, [unigramChain, sentenceStarters, mixLevel]);

  const generate = () => {
    const result = generateSentence();
    setGeneratedText(result.sentence);
    setGenerationTrace(result.trace);
    setSelectedStep(null);
  };

  const addCorpusData = () => {
    const trimmed = newData.trim();
    if (trimmed && !corpusLines.includes(trimmed)) {
      setCorpusLines([...corpusLines, trimmed]);
      setNewData('');
    }
  };

  const removeCorpusData = (index: number) => {
    setCorpusLines(corpusLines.filter((_, i) => i !== index));
  };

  const tokensBySource: Record<number, string[]> = useMemo(() => {
    const grouped: Record<number, string[]> = {};
    allTokenData.forEach(({ token, sourceIndex }) => {
      if (!grouped[sourceIndex]) grouped[sourceIndex] = [];
      if (!grouped[sourceIndex].includes(token)) {
        grouped[sourceIndex].push(token);
      }
    });
    return grouped;
  }, [allTokenData]);

  const sourceCount = useMemo(() => {
    if (generationTrace.length === 0) return 0;
    return new Set(generationTrace.map(t => t.sourceIndex).filter(i => i >= 0)).size;
  }, [generationTrace]);

  // 候補をユニークにまとめる
  const getUniqueCandidates = (candidates: TokenData[]): { token: string; sources: number[] }[] => {
    const seen = new Map<string, number[]>();
    candidates.forEach(c => {
      if (!seen.has(c.token)) {
        seen.set(c.token, []);
      }
      if (!seen.get(c.token)!.includes(c.sourceIndex)) {
        seen.get(c.token)!.push(c.sourceIndex);
      }
    });
    return Array.from(seen.entries()).map(([token, sources]) => ({ token, sources }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4" style={{ fontFamily: '"Zen Maru Gothic", sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-1">
            ✨ バズり人生論ジェネレーター ✨
          </h1>
          <p className="text-gray-500 text-xs">
            マルコフ連鎖で異なる文を混ぜ合わせて生成
          </p>
        </div>

        {/* このツールについて */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-5 mb-4">
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="w-full flex items-center justify-between text-left font-medium text-gray-700"
          >
            <span>❓ このツールについて</span>
            <span className="text-purple-500">{showAbout ? '▲' : '▼'}</span>
          </button>

          {showAbout && (
            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">🎯 これは何？</h3>
                <p>
                  SNSでよく見かける「バズる人生論」っぽい文章を自動生成するジョークツールです。
                  「頑張らなくていい」「自分のペースで」といった定番フレーズを組み合わせて、
                  それっぽいけどどこか支離滅裂な名言を作り出します。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-1">⚙️ 仕組み（マルコフ連鎖）</h3>
                <p className="mb-2">
                  「マルコフ連鎖」という確率モデルを使っています。簡単に言うと：
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>学習データの文章を単語や助詞に分解（トークン化）</li>
                  <li>「Aの後にはB、C、Dが来やすい」という統計を作成</li>
                  <li>文頭からスタートし、次に来る単語を確率的に選択</li>
                  <li>異なる文章の断片が混ざり合って新しい文が生まれる</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-1">🎨 混合度とは？</h3>
                <p>
                  生成時にどれくらい「別の文章」から単語を持ってくるかの設定です。
                  低いと原文に近く、高いとカオスな文章になります。
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-purple-700">
                  💡 学習データを追加すると、その文のフレーズも混ざるようになります。
                  自分だけのオリジナル人生論ジェネレーターを作ってみましょう！
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 生成エリア */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-5 mb-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">混合度</span>
              <span className="text-sm font-medium text-purple-600">{Math.round(mixLevel * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mixLevel * 100}
              onChange={(e) => setMixLevel(Number(e.target.value) / 100)}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>原文に近い</span>
              <span>カオス</span>
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-4"
          >
            🌸 人生論を生成する 🌸
          </button>

          {generatedText && (
            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-400">
              <p className="text-gray-800 text-lg leading-relaxed mb-2">{generatedText}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-500 font-medium">🎨 {sourceCount}種類の文を混合</span>
                <span className="text-xs text-gray-400">{generatedText.length}/140文字</span>
              </div>
            </div>
          )}
        </div>

        {/* マルコフ連鎖の可視化 */}
        {generatedText && generationTrace.length > 0 && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-5 mb-4">
            <button
              onClick={() => setShowVisualization(!showVisualization)}
              className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
            >
              <span>🔗 マルコフ連鎖の可視化</span>
              <span className="text-purple-500">{showVisualization ? '▲' : '▼'}</span>
            </button>

            {showVisualization && (
              <div className="space-y-4">
                <p className="text-xs text-gray-500">各単語をタップすると、なぜその単語が選ばれたかを確認できます</p>

                {/* 連鎖の流れ */}
                <div className="flex flex-wrap items-center gap-1 text-sm">
                  {generationTrace.map((item, idx) => (
                    <span key={idx} className="flex items-center">
                      <button
                        onClick={() => setSelectedStep(selectedStep === idx ? null : idx)}
                        className={`px-2 py-1 rounded border-2 transition-all ${
                          item.sourceIndex >= 0
                            ? COLORS[item.sourceIndex % COLORS.length]
                            : 'bg-gray-200 border-gray-400'
                        } ${selectedStep === idx ? 'ring-2 ring-purple-500 ring-offset-1' : ''}`}
                      >
                        {item.token}
                      </button>
                      {idx < generationTrace.length - 1 && (
                        <span className="mx-1 text-gray-400">→</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* 選択されたステップの詳細説明 */}
                {selectedStep !== null && generationTrace[selectedStep] && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🔍</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2">
                          なぜ「{generationTrace[selectedStep].token}」が選ばれた？
                        </h4>

                        {generationTrace[selectedStep].isStart ? (
                          <p className="text-sm text-gray-600 mb-3">
                            これは<span className="font-bold text-purple-600">文頭</span>のトークンです。
                            学習データの中で文頭に来るものが候補となり、その中から選ばれました。
                          </p>
                        ) : generationTrace[selectedStep].isAutoAdded ? (
                          <p className="text-sm text-gray-600 mb-3">
                            文が句点で終わっていなかったため、<span className="font-bold text-purple-600">自動的に追加</span>されました。
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 mb-3">
                            学習データの中で「<span className="font-bold">{generationTrace[selectedStep].prevToken}</span>」の直後に来る単語が候補となり、その中からランダムに選ばれました。
                          </p>
                        )}

                        {!generationTrace[selectedStep].isAutoAdded && (
                          <>
                            <div className="bg-white/70 rounded-lg p-3 mb-3">
                              <p className="text-sm text-gray-700">
                                {generationTrace[selectedStep].isStart ? (
                                  <>
                                    学習データ<span className="font-bold text-purple-600">#{generationTrace[selectedStep].sourceIndex + 1}</span>が
                                    「<span className="font-bold">{generationTrace[selectedStep].token}</span>」で始まるため、文頭の候補に含まれていました。
                                  </>
                                ) : (
                                  <>
                                    学習データの中に「<span className="font-bold">{generationTrace[selectedStep].prevToken}</span>→<span className="font-bold">{generationTrace[selectedStep].token}</span>」という並びがあるため、候補に含まれていました。
                                  </>
                                )}
                              </p>
                            </div>

                            <p className="text-xs text-gray-500 mb-2">
                              {generationTrace[selectedStep].isStart ? '文頭の候補一覧' : `「${generationTrace[selectedStep].prevToken}」の後に来れる候補一覧`}：
                            </p>
                            <div className="space-y-1.5">
                              {getUniqueCandidates(generationTrace[selectedStep].candidates).map((c, i) => (
                                <div
                                  key={i}
                                  className={`flex items-center gap-2 p-1.5 rounded ${
                                    c.token === generationTrace[selectedStep].token
                                      ? 'bg-purple-100 ring-2 ring-purple-400'
                                      : 'bg-white/50'
                                  }`}
                                >
                                  <span
                                    className={`px-2 py-1 rounded text-xs border font-medium ${
                                      c.sources[0] >= 0 ? COLORS[c.sources[0] % COLORS.length] : 'bg-gray-200 border-gray-400'
                                    }`}
                                  >
                                    {c.token}
                                    {c.token === generationTrace[selectedStep].token && ' ✓'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ← #{c.sources.map(s => s + 1).join(', #')} {generationTrace[selectedStep].isStart
                                      ? `が「${c.token}」で始まるため`
                                      : `に「${generationTrace[selectedStep].prevToken}${c.token}」があるため`
                                    }
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {generationTrace[selectedStep].sourceIndex >= 0 && (
                          <div className={`mt-3 p-2 rounded-lg text-xs ${COLORS_LIGHT[generationTrace[selectedStep].sourceIndex % COLORS_LIGHT.length]}`}>
                            <span className="font-bold">出典：</span> #{generationTrace[selectedStep].sourceIndex + 1} {corpusLines[generationTrace[selectedStep].sourceIndex]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 使用された学習データ */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">使用された学習データ:</p>
                  <div className="space-y-1">
                    {[...new Set(generationTrace.map(t => t.sourceIndex))]
                      .filter(idx => idx >= 0)
                      .sort((a, b) => a - b)
                      .map(idx => (
                        <div
                          key={idx}
                          className={`text-xs p-2 rounded border-l-4 ${COLORS[idx % COLORS.length]}`}
                        >
                          <span className="font-bold">#{idx + 1}</span>: {corpusLines[idx]}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 学習データ管理 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-5">
          <button
            onClick={() => setShowCorpus(!showCorpus)}
            className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
          >
            <span>📚 学習データ（{corpusLines.length}件 / {allTokenData.length}トークン）</span>
            <span className="text-purple-500">{showCorpus ? '▲ 閉じる' : '▼ 開く'}</span>
          </button>

          {showCorpus && (
            <>
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <label className="text-sm font-medium text-purple-700 block mb-2">
                  新しい学習データを追加
                </label>
                <textarea
                  value={newData}
                  onChange={(e) => setNewData(e.target.value)}
                  placeholder="バズりそうな人生論を入力..."
                  className="w-full p-2 border border-purple-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows={2}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{newData.length}文字</span>
                  <button
                    onClick={addCorpusData}
                    disabled={!newData.trim()}
                    className="px-4 py-1.5 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    追加
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {corpusLines.map((line, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${COLORS[index % COLORS.length]} group`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-600">#{index + 1}</span>
                      <button
                        onClick={() => removeCorpusData(index)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{line}</p>
                    <div className="flex flex-wrap gap-1">
                      {tokensBySource[index]?.map((token, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 bg-white/50 rounded text-xs text-gray-600 border"
                        >
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          ※ このジェネレーターはパロディです
        </p>
      </div>
    </div>
  );
}
