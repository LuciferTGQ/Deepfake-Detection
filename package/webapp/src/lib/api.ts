// webapp/src/lib/api.ts
export interface AnalyzeResult {
  analysisId: string;
  confidence: number;
  label: string;
}

export async function analyzeVideo(file: File): Promise<AnalyzeResult> {
  const form = new FormData();
  form.append("file", file);
  const resp = await fetch("http://localhost:8000/api/analyze", { method: "POST", body: form });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(txt || "请求失败");
  }
  const data = await resp.json();
  return {
    analysisId: data.analysis_id,
    confidence: data.confidence_score,
    label: data.result_label,
  };
}