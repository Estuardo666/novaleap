"use client";

import { useEffect } from "react";

const RELOAD_GUARD_KEY = "novaleap-chunk-reload";

function shouldRecoverFromChunkError(reason: unknown) {
	if (!reason) {
		return false;
	}

	const message =
		typeof reason === "string"
			? reason
			: reason instanceof Error
				? reason.message
				: JSON.stringify(reason);

	return /ChunkLoadError|Loading chunk [^ ]+ failed|Failed to fetch dynamically imported module/i.test(message);
}

/**
 * ChunkErrorRecovery - Organismic Component
 *
 * Detects stale chunk-load failures after a deploy and forces one clean reload
 * so the browser picks up the latest Next.js asset manifest.
 *
 * @example
 * <ChunkErrorRecovery />
 */
const ChunkErrorRecovery: React.FC = () => {
	useEffect(() => {
		const reloadOnce = () => {
			if (sessionStorage.getItem(RELOAD_GUARD_KEY) === "1") {
				return;
			}

			sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
			window.location.reload();
		};

		const handleError = (event: ErrorEvent) => {
			if (shouldRecoverFromChunkError(event.error ?? event.message)) {
				reloadOnce();
			}
		};

		const handleRejection = (event: PromiseRejectionEvent) => {
			if (shouldRecoverFromChunkError(event.reason)) {
				reloadOnce();
			}
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleRejection);
		};
	}, []);

	useEffect(() => {
		sessionStorage.removeItem(RELOAD_GUARD_KEY);
	}, []);

	return null;
};

export default ChunkErrorRecovery;