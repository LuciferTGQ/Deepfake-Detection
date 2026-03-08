// webapp/src/lib/api.ts
export interface AnalyzeResult {
  analysisId: string;
  confidence: number;
  label: string;
}

interface AnalyzeResponse {
  analysis_id: string;
  confidence_score: number;
  result_label: string;
}

interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
  };
}

const DEFAULT_TIMEOUT_MS = 120000;

function isAnalyzeResponse(data: unknown): data is AnalyzeResponse {
  if (!data || typeof data !== "object") {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.analysis_id === "string" &&
    typeof candidate.confidence_score === "number" &&
    typeof candidate.result_label === "string"
  );
}

function toErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const apiError = payload as ApiErrorPayload;
    if (apiError.error?.message) {
      return apiError.error.message;
    }
  }
  return fallback;
}

export async function analyzeVideo(file: File): Promise<AnalyzeResult> {
  const form = new FormData();
  form.append("file", file);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  let resp: Response;
  try {
    resp = await fetch("http://localhost:8000/api/analyze", {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("请求超时，请缩短视频时长后重试");
    }
    throw new Error("网络错误，请检查后端服务是否启动");
  } finally {
    clearTimeout(timeout);
  }

  if (!resp.ok) {
    let parsedMessage: string | null = null;
    try {
      const payload = (await resp.json()) as ApiErrorPayload;
      parsedMessage = toErrorMessage(payload, `请求失败 (${resp.status})`);
    } catch {
      parsedMessage = null;
    }
    throw new Error(parsedMessage || `请求失败 (${resp.status})`);
  }

  const data: unknown = await resp.json();
  if (!isAnalyzeResponse(data)) {
    throw new Error("后端返回数据格式不正确，请检查接口契约");
  }

  return {
    analysisId: data.analysis_id,
    confidence: data.confidence_score,
    label: data.result_label,
  };
}