// tiny shared helpers for the floating-orb fields (home, projects, awards)

/**
 * Push overlapping circles apart; heavier bodies (lower weight) move less.
 * @param {Array<{x: number, y: number, r: number, weight?: number}>} bodies
 * @param {number} [pad]
 */
export function separate(bodies, pad = 12) {
	for (let i = 0; i < bodies.length; i++) {
		for (let j = i + 1; j < bodies.length; j++) {
			const a = bodies[i];
			const b = bodies[j];
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const min = a.r + b.r + pad;
			const d2 = dx * dx + dy * dy;
			if (d2 > 0.01 && d2 < min * min) {
				const d = Math.sqrt(d2);
				const overlap = (min - d) / d;
				const wa = a.weight ?? 0.5;
				const wb = b.weight ?? 0.5;
				a.x -= dx * overlap * wa;
				a.y -= dy * overlap * wa;
				b.x += dx * overlap * wb;
				b.y += dy * overlap * wb;
			}
		}
	}
}

/**
 * Clamp a body's spring target inside the container. Without this the
 * wander/orbit target can sit beyond a wall, so the spring drives the
 * body into it forever and it jitters against the edge.
 * @param {{r: number}} b
 * @param {number} tx
 * @param {number} ty
 * @param {number} w
 * @param {number} h
 * @param {number} [inset] deeper than the wall clamp's inset on purpose,
 *   so a body's resting point never sits exactly on the boundary (which
 *   would flip-flop between wall contact and spring pull)
 * @returns {[number, number]}
 */
export function clampTarget(b, tx, ty, w, h, inset = 12) {
	return [
		Math.min(w - b.r - inset, Math.max(b.r + inset, tx)),
		Math.min(h - b.r - inset, Math.max(b.r + inset, ty))
	];
}

/**
 * Keep every circle inside the container, reflecting the velocity on
 * contact so arrivals bounce off. No minimum kick: targets are clamped
 * deeper inside via clampTarget, so the spring always pulls bodies away
 * from walls — a forced kick here just made them flip-flop against the
 * edge.
 * @param {Array<{x: number, y: number, r: number, vx: number, vy: number}>} bodies
 * @param {number} w
 * @param {number} h
 * @param {number} [inset]
 * @param {number} [bounce] restitution of the reflected velocity
 */
export function clampBounds(bodies, w, h, inset = 6, bounce = 0.7) {
	for (const b of bodies) {
		const minX = b.r + inset;
		const maxX = w - b.r - inset;
		const minY = b.r + inset;
		const maxY = h - b.r - inset;
		if (b.x < minX) {
			b.x = minX;
			b.vx = Math.abs(b.vx) * bounce;
		} else if (b.x > maxX) {
			b.x = maxX;
			b.vx = -Math.abs(b.vx) * bounce;
		}
		if (b.y < minY) {
			b.y = minY;
			b.vy = Math.abs(b.vy) * bounce;
		} else if (b.y > maxY) {
			b.y = maxY;
			b.vy = -Math.abs(b.vy) * bounce;
		}
	}
}
