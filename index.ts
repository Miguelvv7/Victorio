import { config as loadEnv } from "dotenv";
import { config, higgsfield, HiggsfieldError, APIError } from "@higgsfield/client/v2";

// Carga HF_CREDENTIALS desde .env.local (solo en servidor; nunca se imprime)
loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/text-to-video";

async function main(): Promise<number> {
  if (!process.env.HF_CREDENTIALS) {
    console.error("Falta HF_CREDENTIALS en .env.local (formato key-id:key-secret).");
    return 1;
  }

  config({ credentials: process.env.HF_CREDENTIALS });

  try {
    const result = await higgsfield.subscribe(MODEL, {
      input: {
        prompt: "A cinematic scene at sunset",
        duration: 5,
        resolution: "720p",
        aspect_ratio: "16:9",
      },
      withPolling: true,
    });

    // El SDK puede devolver estados que no están en su tipo (p. ej. "canceled")
    const status = result.status as string;

    if (status === "completed" && result.video?.url) {
      console.log(`Vídeo generado: ${result.video.url}`);
      return 0;
    }

    const motivo =
      status === "nsfw"
        ? "rechazada por moderación"
        : status === "failed"
          ? "falló"
          : status === "canceled" || status === "cancelled"
            ? "fue cancelada"
            : status === "completed"
              ? "terminó pero no devolvió URL de vídeo"
              : `terminó con estado inesperado "${status}"`;

    console.error(`La generación ${motivo} (request_id: ${result.request_id}).`);
    return 1;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`Error de la API (${error.statusCode ?? "?"}): ${error.message}`);
    } else if (error instanceof HiggsfieldError) {
      console.error(`Error de Higgsfield: ${error.message}`);
    } else {
      console.error("Error inesperado:", error instanceof Error ? error.message : error);
    }
    return 1;
  }
}

main().then((code) => process.exit(code));
